import {
  WebApiConfig,
  retrieveMultiple,
  retrieve,
} from "dataverse-webapi/lib/node";
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import SectionControl from "../../components/SectionControl";
import cca from "../../utils/cca";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import {
  dynamicsPageSectionsQuery,
  attachedComponentsQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsFooterMenuItemsQuery,
  generateBlogsODataQuery,
} from "../../utils/queries";
import {
  DynamicsBlog,
  DynamicsPageSection,
  xmlDynamicsBlog,
} from "../../utils/types";
import sectionConfig from "../../components/designed-sections/sections.config";
import {
  generateBlogsQuery,
  generatePageSectionsQuery,
} from "../../utils/fetchXmlQueries";
import { BLOGS_PLAGE_LIMIT } from "../../utils/constants";

interface IBlogsProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: xmlDynamicsBlog[];
  companyLogoUrl: string;
}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
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

export default Blogs;

export const getStaticProps: GetStaticProps = async (req) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

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
        `$filter=_bsi_webpage_value eq ${dynamicsPageResult[0].bsi_webpageid}&${dynamicsPageSectionsQuery}`,
        { representation: true }
      )
    ).value;

    for (const section of dynamicsPageSections) {
      const productOfferingRequest: any[] = [];
      (section as any).bsi_AttachedComponent_bsi_PageSection_bsi.forEach(
        (po: any) => {
          productOfferingRequest.push(
            retrieve(
              config,
              "bsi_attachedcomponents",
              po.bsi_attachedcomponentid,
              attachedComponentsQuery
            )
          );
        }
      );
      const result = await Promise.all(productOfferingRequest);
      section.bsi_AttachedComponent_bsi_PageSection_bsi = [...result];
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
      `${generateBlogsODataQuery(1, "")}`,
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
