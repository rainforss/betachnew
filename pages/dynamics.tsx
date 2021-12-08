import { GetStaticProps, NextPage } from "next";
import { PageSection } from "../utils/types";
import { getClientCredentialsToken } from "../utils/getClientCredentialsToken";
import cca from "../utils/cca";
import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import BusinessBanterSection from "../components/home/BusinessBanterSection";
import ClientFeatureSection from "../components/home/ClientFeatureSection";
import HeroSection from "../components/home/HeroSection";
import NewsSection from "../components/home/NewsSection";
import ProductSection from "../components/home/ProductSection";
import SuccessStoriesSection from "../components/home/SuccessStoriesSection";
import Layout from "../components/Layout";
import SectionControl from "../components/SectionControl";

interface DynamicsProps {
  pageSections?: PageSection[];
  error?: any;
  accessToken?: string;
  dynamicPageSections: any[];
  dynamicHeaderMenuItems: any[];
  dynamicFooterMenuItems: any[];
}

const Dynamics: NextPage<DynamicsProps> = (props: DynamicsProps) => {
  const [currentHash, setCurrentHash] = useState("");
  const [changingHash, setChangingHash] = useState(false);
  const router = useRouter();
  const sectionMap: { [key: string]: any } = {
    Hero: HeroSection,
    CaseStudy: ClientFeatureSection,
    ProductOffering: ProductSection,
    Podcast: BusinessBanterSection,
    News: NewsSection,
    ClientsDisplay: SuccessStoriesSection,
  };

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
  return (
    <Layout
      headerMenuItems={props.dynamicHeaderMenuItems}
      footerMenuItems={props.dynamicFooterMenuItems}
    >
      {props.dynamicPageSections?.map(
        (s: any) =>
          sectionMap[
            s[
              "bsi_sectiontype@OData.Community.Display.V1.FormattedValue"
            ].replace(" ", "")
          ] &&
          sectionMap[
            s[
              "bsi_sectiontype@OData.Community.Display.V1.FormattedValue"
            ].replace(" ", "")
          ]({
            dynamicsPageSection: s,
            key: s.pagesectionid,
            accessToken: props.accessToken,
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
        "$filter= _bsi_webpage_value eq 1330693a-f556-ec11-8f8f-0022481ccfea&$orderby=createdon asc&$expand=bsi_ProductOffering_PageSection_bsi_PageS",
        { representation: true }
      )
    ).value;
    const dynamicHeaderMenuItems = (
      await retrieveMultiple(
        config,
        "bsi_navigationmenuitems",
        "$filter=_bsi_navigationmenu_value eq 05038781-a557-ec11-8f8f-0022481ccfea&$expand=bsi_NavigationMenuSubItem_NavigationMenuI",
        { representation: true }
      )
    ).value;
    const dynamicFooterMenuItems = (
      await retrieveMultiple(
        config,
        "bsi_navigationmenuitems",
        "$filter=_bsi_navigationmenu_value eq 7fa63997-b257-ec11-8f8f-0022481ccfea&$expand=bsi_NavigationMenuSubItem_NavigationMenuI",
        { representation: true }
      )
    ).value;
    return {
      props: {
        accessToken,
        dynamicPageSections,
        dynamicHeaderMenuItems,
        dynamicFooterMenuItems,
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
