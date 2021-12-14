import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { DynamicsPageSection, PageSection } from "../utils/types";
import { getClientCredentialsToken } from "../utils/getClientCredentialsToken";
import cca from "../utils/cca";
import {
  retrieveMultiple,
  WebApiConfig,
  retrieve,
} from "dataverse-webapi/lib/node";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SectionControl from "../components/SectionControl";
import sectionConfig from "../components/designed-sections/sections.config";
import {
  dynamicsFooterMenuItemsQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsPageSectionsQuery,
  productOfferingQuery,
} from "../utils/queries";
import { ParsedUrlQuery } from "querystring";
import { D365_WEBSITE_ID } from "../utils/constants";

interface DynamicsPagesProps {
  pageSections?: PageSection[];
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  companyLogoUrl: string;
}

interface IParams extends ParsedUrlQuery {
  pageName: string;
}

const DynamicsPages: NextPage<DynamicsPagesProps> = (
  props: DynamicsPagesProps
) => {
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
          })
      )}
      <SectionControl
        dynamicsPageSections={props.dynamicsPageSections}
        currentHash={currentHash}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig(
    "9.1",
    accessToken,
    "https://betachplayground.crm.dynamics.com"
  );
  const dynamicsPagesResult: any = await retrieve(
    config,
    "bsi_websites",
    D365_WEBSITE_ID,
    "$select=bsi_name&$expand=bsi_WebPage_Website_bsi_Website($select=bsi_name)"
  );
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsPagesResult.bsi_WebPage_Website_bsi_Website.forEach((pr: any) => {
    if (pr.bsi_name !== "Blogs" && pr.bsi_name !== "Blog Template")
      paths.push({
        params: {
          pageName: (pr.bsi_name as String).toLowerCase().replace(/ /g, "-"),
        },
      });
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (req) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig(
      "9.1",
      accessToken,
      "https://betachplayground.crm.dynamics.com"
    );
    const { pageName } = req.params as IParams;
    const webpageName = pageName.replace(/-/g, " ");

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq '${webpageName}'&$select=bsi_webpageid&$expand=bsi_Website($select=bsi_name;$expand=bsi_CompanyLogo($select=bsi_cdnurl))`
      )
    ).value;
    console.log(dynamicsPageResult);
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

    const promises = [
      dynamicsHeaderMenuItemsRequest,
      dynamicsFooterMenuItemsRequest,
    ];

    const layoutResults = await Promise.all(promises);

    const [dynamicsHeaderMenuItems, dynamicsFooterMenuItems] = layoutResults;
    return {
      props: {
        dynamicsPageSections: dynamicsPageSections,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
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
