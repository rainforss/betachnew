import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import sectionConfig from "../../components/designed-sections/sections.config";
import Layout from "../../components/Layout";
import cca from "../../utils/cca";
import { getAllPageContents } from "../../utils/getAllPageContents";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import {
  dynamicsBlogSlugsQuery,
  dynamicsWebpageQuery,
} from "../../utils/queries";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface ISlugProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: DynamicsBlog[];
  companyLogoUrl: string;
  preview: boolean;
}

const Slug: React.FunctionComponent<ISlugProps> = (props) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (props.dynamicsBlogs.length === 0) {
      router.push("/404");
    }
  }
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      companyLogoUrl={props.companyLogoUrl}
      preview={props.preview}
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
  const dynamicsBlogSlugsResult: any = (
    await retrieveMultiple(config, "bsi_blogs", dynamicsBlogSlugsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsBlogSlugsResult.forEach((br: any) =>
    paths.push({
      params: {
        slug: (br.bsi_slug as String).toLowerCase().replace(/ /g, "-"),
      },
    })
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const { slug } = params as IParams;

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blog Template'&${dynamicsWebpageQuery}`
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
      preview,
      1,
      "",
      "",
      slug,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );
    if ((dynamicsBlogs.value as any).length === 0) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        preview: preview,
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
