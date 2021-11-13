import { Box } from "@chakra-ui/react";
import resolveResponse from "contentful-resolve-response";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import BusinessBanterSection from "../components/home/BusinessBanterSection";
import ClientFeatureSection from "../components/home/ClientFeatureSection";
import HeroSection from "../components/home/HeroSection";
import NewsSection from "../components/home/NewsSection";
import ProductSection from "../components/home/ProductSection";
import SuccessStoriesSection from "../components/home/SuccessStoriesSection";
import Layout from "../components/Layout";
import SectionControl from "../components/SectionControl";
import { CONTENTFUL_CDN_API_ROOT, sections } from "../utils/constants";
import { PageSection } from "../utils/types";

interface HomeProps {
  pageSections?: PageSection[];
  error?: any;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
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

  console.log(props.pageSections);

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
    <Layout>
      {props.pageSections?.map(
        (s) =>
          sectionMap[s.fields.sectionType.replace(" ", "")] &&
          sectionMap[s.fields.sectionType.replace(" ", "")]({
            pageSection: s,
            key: s.sys.id,
          })
      )}
      <SectionControl sections={props.pageSections} currentHash={currentHash} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(
      `${CONTENTFUL_CDN_API_ROOT}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_DELIVERY_API_KEY}&order=fields.sequence&content_type=section&fields.page.sys.id=63GFhidC1yGFFnTmkqYhni&include=10`
    );
    const pageSections = resolveResponse(await response.json());
    return {
      props: {
        pageSections,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error,
      },
    };
  }
};
