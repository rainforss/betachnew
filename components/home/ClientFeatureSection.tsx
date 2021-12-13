import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";
import { betachGreen } from "../../utils/constants";
import { DynamicsPageSection, PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IClientFeatureSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: DynamicsPageSection;
}

const ClientFeatureSection: React.FunctionComponent<IClientFeatureSectionProps> =
  ({ pageSection, dynamicsPageSection }) => {
    if (pageSection) {
      return (
        <AnchorSection
          sectionId={
            pageSection.fields.sectionId || "tarin-resources-casestudy"
          }
          key={pageSection.sys.id}
        >
          <Center minH="120vh" flexDirection="column" mx="auto">
            <Flex flexDirection="column" align="center" w="70%" mt={24}>
              <Text
                as="h4"
                color={betachGreen}
                fontWeight="bold"
                fontSize="1.2rem"
                textTransform="uppercase"
              >
                {pageSection.fields.sectionMainHeading || "Featured Client"}
              </Text>
              <Text as="h2" fontSize="2.5rem" fontWeight="700" my={2}>
                {pageSection.fields.sectionSubHeading ||
                  "Tarin Resources | Betach Solutions"}
              </Text>
              <Text as="p" textAlign="center">
                {pageSection.fields.sectionParagraph ||
                  "Betach worked alongside Tarin Resources to provide them with a powerful solution to manage their expert knowledge regarding data and technology, allowing their clients the freedom to be successful by utilizing the best data and services available."}
              </Text>
              {pageSection.fields.featuredProducts && (
                <Text
                  as="span"
                  fontSize="1.2rem"
                  fontWeight="900"
                  mt={6}
                  mb={10}
                >
                  Built on{" "}
                  {pageSection.fields.featuredProducts.map((p, index) => {
                    if (index === 0) {
                      return (
                        <Text key={p} as="span">
                          {p}
                        </Text>
                      );
                    } else {
                      return (
                        <Text key={p} as="span">
                          ,&nbsp;{p}
                        </Text>
                      );
                    }
                  })}
                </Text>
              )}
            </Flex>
            {pageSection.fields.videoUrl && (
              <iframe
                src={pageSection.fields.videoUrl}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${pageSection.fields.youtubeVideoId}?autoplay=1><img src=https://img.youtube.com/vi/${pageSection.fields.youtubeVideoId}/maxresdefault.jpg alt='${pageSection.fields.youtubeVideoAltText}'><span>▶</span></a>`}
                height="700"
                width="70%"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
              ></iframe>
            )}
            <Box h="50px" bgColor={betachGreen} w="70%" my={8}></Box>
          </Center>
        </AnchorSection>
      );
    }
    if (dynamicsPageSection) {
      return (
        <AnchorSection
          sectionId={
            dynamicsPageSection.bsi_sectionid || "tarin-resources-casestudy"
          }
          key={dynamicsPageSection.bsi_pagesectionid}
        >
          <Center minH="120vh" flexDirection="column" mx="auto">
            <Flex flexDirection="column" align="center" w="70%" mt={24}>
              <Text
                as="h4"
                color={betachGreen}
                fontWeight="bold"
                fontSize="1.2rem"
                textTransform="uppercase"
              >
                {dynamicsPageSection.bsi_mainheading || "Featured Client"}
              </Text>
              <Text as="h2" fontSize="2.5rem" fontWeight="700" my={2}>
                {dynamicsPageSection.bsi_subheading ||
                  "Tarin Resources | Betach Solutions"}
              </Text>
              <Text as="p" textAlign="center">
                {dynamicsPageSection.bsi_paragraph ||
                  "Betach worked alongside Tarin Resources to provide them with a powerful solution to manage their expert knowledge regarding data and technology, allowing their clients the freedom to be successful by utilizing the best data and services available."}
              </Text>
              {dynamicsPageSection.bsi_featuredproducts && (
                <Text
                  as="span"
                  fontSize="1.2rem"
                  fontWeight="900"
                  mt={6}
                  mb={10}
                >
                  Built on{" "}
                  {dynamicsPageSection.bsi_featuredproducts
                    .split(";")
                    .map((p: any, index: number) => {
                      if (index === 0) {
                        return (
                          <Text key={p} as="span">
                            {p}
                          </Text>
                        );
                      } else {
                        return (
                          <Text key={p} as="span">
                            ,&nbsp;{p}
                          </Text>
                        );
                      }
                    })}
                </Text>
              )}
            </Flex>
            {dynamicsPageSection.bsi_videourl && (
              <iframe
                src={dynamicsPageSection.bsi_videourl}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${dynamicsPageSection.bsi_youtubevideoid}?autoplay=1><img src=https://img.youtube.com/vi/${dynamicsPageSection.bsi_youtubevideoid}/maxresdefault.jpg alt='${dynamicsPageSection.bsi_youtubevideoalttext}'><span>▶</span></a>`}
                height="700"
                width="70%"
                scrolling="no"
                frameBorder="0"
                loading="lazy"
                allowFullScreen={true}
              ></iframe>
            )}
            <Box h="50px" bgColor={betachGreen} w="70%" my={8}></Box>
          </Center>
        </AnchorSection>
      );
    }
    return null;
  };

export default ClientFeatureSection;
