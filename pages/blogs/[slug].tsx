import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import sectionConfig from "../../components/designed-sections/sections.config";
import Layout from "../../components/Layout";
import cca from "../../utils/cca";
import { getAllPageContents } from "../../utils/getAllPageContents";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import { DynamicsPageSection } from "../../utils/types";

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
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
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
    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      1,
      "",
      "",
      slug
    );
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
