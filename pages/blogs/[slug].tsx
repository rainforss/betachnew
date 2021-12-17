import {
  WebApiConfig,
  retrieve,
  retrieveMultiple,
} from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import cca from "../../utils/cca";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import {
  dynamicsPageSectionsQuery,
  attachedComponentsQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsFooterMenuItemsQuery,
} from "../../utils/queries";
import * as React from "react";
import { DynamicsPageSection } from "../../utils/types";

import Layout from "../../components/Layout";

import sectionConfig from "../../components/designed-sections/sections.config";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface ISlugProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: any[];
  companyLogoUrl: string;
}

const Slug: React.FunctionComponent<ISlugProps> = (props) => {
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
            dynamicsBlog: props.dynamicsBlogs[0],
          })
      )}
    </Layout>
  );
};

export default Slug;

export const getStaticPaths: GetStaticPaths = async () => {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig(
    "9.1",
    accessToken,
    "https://betachplayground.crm.dynamics.com"
  );
  const dynamicsBlogsResult: any = (
    await retrieveMultiple(
      config,
      "bsi_blogs",
      "$select=bsi_name,bsi_urlslug&$orderby=createdon asc"
    )
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsBlogsResult.forEach((br: any) =>
    paths.push({
      params: {
        slug: (br.bsi_urlslug as String).toLowerCase().replace(/ /g, "-"),
      },
    })
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (req) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const { slug } = req.params as IParams;

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blog Template'&$select=bsi_webpageid&$expand=bsi_Website($select=bsi_name;$expand=bsi_CompanyLogo($select=bsi_cdnurl))`
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
      `$filter=bsi_urlslug eq '${slug}'&$select=bsi_name,bsi_blogbody,bsi_urlslug,bsi_blogcovertext,bsi_author,modifiedon&$expand=bsi_BlogCoverImage($select=bsi_alttext,bsi_cdnurl)`
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
