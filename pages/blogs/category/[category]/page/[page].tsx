import {
  WebApiConfig,
  retrieveMultiple,
  retrieve,
} from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Layout from "../../../../../components/Layout";
import SectionControl from "../../../../../components/SectionControl";
import cca from "../../../../../utils/cca";
import { getClientCredentialsToken } from "../../../../../utils/getClientCredentialsToken";
import {
  dynamicsPageSectionsQuery,
  productOfferingQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsFooterMenuItemsQuery,
  generateBlogsODataQuery,
} from "../../../../../utils/queries";
import {
  DynamicsPageSection,
  DynamicsBlog,
  xmlDynamicsBlog,
} from "../../../../../utils/types";
import sectionConfig from "../../../../../components/designed-sections/sections.config";
import { useRouter } from "next/dist/client/router";
import { generateBlogsQuery } from "../../../../../utils/fetchXmlQueries";
import { BLOGS_PLAGE_LIMIT } from "../../../../../utils/constants";

interface IBlogCategoryProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: xmlDynamicsBlog[];
  companyLogoUrl: string;
}

interface IParams extends ParsedUrlQuery {
  category: string;
  page: string;
}

const CategoryPage: React.FunctionComponent<IBlogCategoryProps> = (props) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      companyLogoUrl={props.companyLogoUrl}
    >
      {props.dynamicsPageSections?.map(
        (s: any) =>
          sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
          sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            dynamicsPageSection: s,
            key: s.pagesectionid,
            dynamicsBlogs: props.dynamicsBlogs,
          })
      )}
    </Layout>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig(
    "9.1",
    accessToken,
    "https://betachplayground.crm.dynamics.com"
  );
  const dynamicsBlogCategoriesResult: any = (
    await retrieveMultiple(
      config,
      "bsi_blogcategories",
      "$select=bsi_name&$orderby=createdon asc&$expand=bsi_BlogCategory_bsi_Blog_bsi_Blog($select=bsi_name)"
    )
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsBlogCategoriesResult.forEach((bcr: any) => {
    const maxPage = Math.ceil(
      bcr.bsi_BlogCategory_bsi_Blog_bsi_Blog.length / 1
    );
    for (let i = 1; i <= maxPage; i++) {
      paths.push({
        params: {
          category: (bcr.bsi_name as String).toLowerCase().replace(/ /g, "-"),
          page: i + "",
        },
      });
    }
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (req) => {
  try {
    const { category, page } = req.params as IParams;
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig(
      "9.1",
      accessToken,
      "https://betachplayground.crm.dynamics.com"
    );

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blogs'&$select=bsi_webpageid&$expand=bsi_Website($select=bsi_name;$expand=bsi_CompanyLogo($select=bsi_cdnurl))`
      )
    ).value;

    if (dynamicsPageResult.length === 0) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    const dynamicsPageSections = (
      await retrieveMultiple(
        config,
        "bsi_pagesections",
        `$filter= _bsi_webpage_value eq ${dynamicsPageResult[0].bsi_webpageid}&${dynamicsPageSectionsQuery}`,
        { representation: true }
      )
    ).value;

    for (const section of dynamicsPageSections) {
      const productOfferingRequest: any[] = [];
      (section as any).bsi_ProductOffering_PageSection_bsi_PageS.forEach(
        (po: any) => {
          productOfferingRequest.push(
            retrieve(
              config,
              "bsi_productofferings",
              po.bsi_productofferingid,
              productOfferingQuery
            )
          );
        }
      );
      const result = await Promise.all(productOfferingRequest);
      section.bsi_ProductOffering_PageSection_bsi_PageS = [...result];
    }

    const dynamicsHeaderMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      dynamicsHeaderMenuItemsQuery,
      { representation: true }
    );
    const dynamicsFooterMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      dynamicsFooterMenuItemsQuery,
      { representation: true }
    );

    const dynamicsBlogsRequest = retrieveMultiple(
      config,
      "bsi_blogs",
      `${generateBlogsODataQuery(parseInt(page), category)}`,
      { maxPageSize: BLOGS_PLAGE_LIMIT }
    );

    const promises = [
      dynamicsHeaderMenuItemsRequest,
      dynamicsFooterMenuItemsRequest,
      dynamicsBlogsRequest,
    ];

    const layoutResults = await Promise.all(promises);

    const [dynamicsHeaderMenuItems, dynamicsFooterMenuItems, dynamicsBlogs] =
      layoutResults;

    return {
      props: {
        dynamicsPageSections: dynamicsPageSections,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
        dynamicsBlogs: dynamicsBlogs.value,
        companyLogoUrl:
          dynamicsPageResult[0].bsi_Website.bsi_CompanyLogo.bsi_cdnurl,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      props: {
        error,
      },
    };
  }
};
