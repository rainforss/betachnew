import { GetStaticProps, NextPage } from "next";
import { PageSection } from "../utils/types";
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

interface DynamicsProps {
  pageSections?: PageSection[];
  error?: any;
  // accessToken?: string;
  dynamicPageSections: any[];
  dynamicHeaderMenuItems: any[];
  dynamicFooterMenuItems: any[];
}

const Dynamics: NextPage<DynamicsProps> = (props: DynamicsProps) => {
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
      headerMenuItems={props.dynamicHeaderMenuItems}
      footerMenuItems={props.dynamicFooterMenuItems}
    >
      {props.dynamicPageSections?.map(
        (s: any) =>
          sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
          sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            dynamicsPageSection: s,
            key: s.pagesectionid,
            accessToken,
          })
      )}
      <SectionControl
        dynamicsPageSections={props.dynamicPageSections}
        currentHash={currentHash}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig(
      "9.1",
      accessToken,
      "https://betachplayground.crm.dynamics.com"
    );

    const dynamicPageSections = (
      await retrieveMultiple(
        config,
        "bsi_pagesections",
        "$filter= _bsi_webpage_value eq 1330693a-f556-ec11-8f8f-0022481ccfea&$select=bsi_name,bsi_pagesectionid,bsi_videourl,bsi_paragraph,bsi_ctabuttonlink,bsi_ctabuttontext,bsi_youtubevideoid,_bsi_designedsection_value,bsi_youtubevideoalttext,bsi_hasctabutton,bsi_mainheading,bsi_subheading,bsi_sectionid,bsi_featuredproducts&$orderby=createdon asc&$expand=bsi_ProductOffering_PageSection_bsi_PageS($select=bsi_productofferingid,bsi_name,bsi_productimage,bsi_productdescription,bsi_relativeurl,bsi_ctabuttontext),bsi_ImageAsset_PageSection_bsi_PageSectio,bsi_DesignedSection($select=bsi_name),bsi_Background($select=bsi_cdnurl)",
        { representation: true }
      )
    ).value;

    for (const section of dynamicPageSections) {
      const productOfferingRequest: any[] = [];
      (section as any).bsi_ProductOffering_PageSection_bsi_PageS.forEach(
        (po: any) => {
          productOfferingRequest.push(
            retrieve(
              config,
              "bsi_productofferings",
              po.bsi_productofferingid,
              "$select=bsi_productofferingid,bsi_name,bsi_productdescription,bsi_relativeurl,bsi_ctabuttontext&$expand=bsi_ImageAsset_ProductOffering_bsi_Produc($select=bsi_cdnurl,bsi_name)"
            )
          );
        }
      );
      const result = await Promise.all(productOfferingRequest);
      section.bsi_ProductOffering_PageSection_bsi_PageS = [...result];
    }

    const dynamicHeaderMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      "$filter=_bsi_navigationmenu_value eq 05038781-a557-ec11-8f8f-0022481ccfea&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)",
      { representation: true }
    );
    const dynamicFooterMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      "$filter=_bsi_navigationmenu_value eq 7fa63997-b257-ec11-8f8f-0022481ccfea&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)",
      { representation: true }
    );

    const promises = [
      dynamicHeaderMenuItemsRequest,
      dynamicFooterMenuItemsRequest,
    ];

    const results = await Promise.all(promises);

    const [dynamicHeaderMenuItems, dynamicFooterMenuItems] = results;
    return {
      props: {
        dynamicPageSections: dynamicPageSections,
        dynamicHeaderMenuItems: dynamicHeaderMenuItems.value,
        dynamicFooterMenuItems: dynamicFooterMenuItems.value,
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
