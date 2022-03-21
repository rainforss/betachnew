import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import sectionConfig from "../components/designed-sections/sections.config";
import Layout from "../components/Layout";
import cca from "../utils/cca";
import { getAllPageContents } from "../utils/getAllPageContents";
import { getClientCredentialsToken } from "../utils/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../utils/queries";
import { DynamicsBlog, DynamicsPageProps } from "../utils/types";

interface DynamicsPagesProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  pageName: string;
}

const DynamicsPages: NextPage<DynamicsPagesProps> = (
  props: DynamicsPagesProps
) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
      preview={props.preview}
    >
      {props.dynamicsPageSections?.map(
        (s: any) =>
          sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
          sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            dynamicsPageSection: s,
            dynamicsBlogs: props.dynamicsBlogs,
            key: s.pagesectionid,
          })
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsPagesResult: any = (
    await retrieveMultiple(
      config,
      "bsi_webpages",
      "$filter=bsi_published ne false and _bsi_parentwebpageid_value eq null&$select=bsi_name,bsi_pageurl"
    )
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsPagesResult.forEach((pr: any) => {
    if (pr.bsi_name !== "Blogs" && pr.bsi_name !== "Blog Template")
      paths.push({
        params: {
          pageName: pr.bsi_pageurl.replace(/\//g, ""),
        },
      });
  });
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
    const { pageName } = params as IParams;
    const webpageName = pageName.replace(/-/g, " ");

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq '${webpageName}'&${dynamicsWebpageQuery}`
      )
    ).value;
    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
      dynamicsSocialPlatforms,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      preview,
      undefined,
      undefined,
      undefined,
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );
    return {
      props: {
        preview: preview,
        dynamicsPageSections: dynamicsPageSections,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
        dynamicsSocialPlatforms: dynamicsSocialPlatforms.value,
        dynamicsBlogs: dynamicsBlogs.value as DynamicsBlog[],
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

export default DynamicsPages;
