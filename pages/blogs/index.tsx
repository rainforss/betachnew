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
  productOfferingQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsFooterMenuItemsQuery,
} from "../../utils/queries";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import sectionConfig from "../../components/designed-sections/sections.config";

interface IBlogsProps {
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: DynamicsBlog[];
  companyLogoUrl: string;
}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [currentHash, setCurrentHash] = useState("");
  const [changingHash, setChangingHash] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    //Used to monitor section change, not supported on IE
    const allSections = document.querySelectorAll("section");
    const onSectionEntry = (entry: any[]) => {
      entry.forEach((change: any) => {
        if (change.isIntersecting && !changingHash) {
          setChangingHash(true);
          setCurrentHash(change.target.id);
        }
      });
    };
    const options = { threshold: [0.5] };
    const observer = new IntersectionObserver(onSectionEntry, options);
    for (let sec of allSections) {
      observer.observe(sec);
    }
  });

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      setChangingHash(true);
      setCurrentHash(url.substr(2));
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      setChangingHash(false);
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    async function getToken() {
      const response: any = await fetch("/api/getToken");
      const tokenResponse = await response.json();
      const token = tokenResponse.accessToken;
      setAccessToken(() => token);
    }
    if (!accessToken) {
      getToken();
    }
  }, [accessToken]);

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
            accessToken,
            dynamicsBlogs: props.dynamicsBlogs,
          })
      )}
      <SectionControl
        dynamicsPageSections={props.dynamicsPageSections}
        currentHash={currentHash}
      />
    </Layout>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async (req) => {
  try {
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
      `$select=bsi_name,bsi_blogbody,bsi_urlslug,bsi_blogcovertext,bsi_author,modifiedon&$expand=bsi_BlogCoverImage($select=bsi_alttext,bsi_cdnurl)`
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
