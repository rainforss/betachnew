import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import sectionConfig from "../../../../../designed-sections/sections.config";
import Layout from "../../../../../components/common/Layout";
import { instantiateCca } from "../../../../../utils/msal/cca";
import { getAllPageContents } from "../../../../../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../../../../../utils/msal/getClientCredentialsToken";
import {
  dynamicsBlogAuthorsQuery,
  dynamicsWebpageQuery,
} from "../../../../../utils/dynamics-365/common/queries";
import { DynamicsPageProps } from "../../../../../types/dynamics-365/common/types";

interface IBlogAuthorProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  author: string;
  page: string;
}

const AuthorPage: React.FunctionComponent<IBlogAuthorProps> = (props) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
    >
      {props.dynamicsPageSections?.map((s) => {
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

export default AuthorPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const cca = await instantiateCca();
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsBlogAuthorsResult: any = (
    await retrieveMultiple(config, "bsi_blogauthors", dynamicsBlogAuthorsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsBlogAuthorsResult.forEach((ba: any) => {
    const maxPage = Math.ceil(
      ba.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor.length /
        parseInt(process.env.BLOGS_PAGE_SIZE!)
    );
    for (let i = 1; i <= maxPage; i++) {
      paths.push({
        params: {
          author: ba.bsi_slug,
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
    const { author, page } = req.params as IParams;
    const cca = await instantiateCca();
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
      dynamicsSocialPlatforms,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      false,
      parseInt(page),
      "",
      author,
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );

    return {
      props: {
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
