import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticProps } from "next";
import sectionConfig from "../../components/designed-sections/sections.config";
import Layout from "../../components/Layout";
import cca from "../../utils/cca";
import { getAllPageContents } from "../../utils/getAllPageContents";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../../utils/queries";
import { DynamicsPageSection, xmlDynamicsBlog } from "../../utils/types";

interface IBlogsProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: xmlDynamicsBlog[];
  companyLogoUrl: string;
  preview: boolean;
}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
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
            dynamicsBlogs: props.dynamicsBlogs,
          })
      )}
    </Layout>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blogs'&${dynamicsWebpageQuery}`
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
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_headermenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_footermenuid
    );

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
