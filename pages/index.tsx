import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import sectionConfig from "../designed-sections/sections.config";
import Layout from "../components/common/Layout";
import { getAllPageContents } from "../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../utils/msal/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../utils/dynamics-365/common/queries";
import { DynamicsPageProps } from "../types/dynamics-365/common/types";
import { instantiateCca } from "../utils/msal/cca";

interface DynamicsProps extends DynamicsPageProps {}

const Dynamics: NextPage<DynamicsProps> = (props: DynamicsProps) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
      preview={props.preview}
    >
      {props.dynamicsPageSections?.map((s) => {
        // sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
        //   sectionConfig[s["bsi_DesignedSection"].bsi_name]({
        //     dynamicsPageSection: s,
        //     dynamicsBlogs: props.dynamicsBlogs,
        //     key: s.bsi_pagesectionid,
        //   });
        const Section = sectionConfig[s.bsi_DesignedSection.bsi_name];
        return (
          <Section
            key={s.bsi_pagesectionid}
            dynamicsBlogs={props.dynamicsBlogs}
            dynamicsPageSection={s}
          />
        );
      })}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  try {
    const cca = await instantiateCca();
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
    const dynamicsPageResult: any = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Home'&${dynamicsWebpageQuery}`
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
      1,
      "",
      "",
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );
    return {
      props: {
        preview: !!preview,
        dynamicsPageSections: dynamicsPageSections,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
        dynamicsBlogs: dynamicsBlogs.value,
        dynamicsSocialPlatforms: dynamicsSocialPlatforms.value,
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

export default Dynamics;
