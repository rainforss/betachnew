import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import sectionConfig from "../components/designed-sections/sections.config";
import Layout from "../components/Layout";
import SectionControl from "../components/SectionControl";
import cca from "../utils/cca";
import { getAllPageContents } from "../utils/getAllPageContents";
import { getClientCredentialsToken } from "../utils/getClientCredentialsToken";
import { DynamicsPageSection, PageSection } from "../utils/types";

interface DynamicsProps {
  pageSections?: PageSection[];
  error?: any;
  // accessToken?: string;
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  companyLogoUrl: string;
  preview: boolean;
}

const Dynamics: NextPage<DynamicsProps> = (props: DynamicsProps) => {
  const [currentHash, setCurrentHash] = useState("");
  const [changingHash, setChangingHash] = useState(false);
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
          })
      )}
      <SectionControl
        dynamicsPageSections={props.dynamicsPageSections}
        currentHash={currentHash}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
    console.log(tokenResponse);
    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Home'&$select=bsi_webpageid&$expand=bsi_Website($select=bsi_name;$expand=bsi_CompanyLogo($select=bsi_cdnurl))`
      )
    ).value;
    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      preview
    );
    return {
      props: {
        preview: !!preview,
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

export default Dynamics;
