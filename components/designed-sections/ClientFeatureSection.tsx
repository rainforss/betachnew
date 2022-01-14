import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";
import { betachGreen } from "../../utils/constants";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IClientFeatureSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const ClientFeatureSection: React.FunctionComponent<
  IClientFeatureSectionProps
> = ({ dynamicsPageSection }) => {
  if (dynamicsPageSection) {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid}
        key={dynamicsPageSection.bsi_pagesectionid}
        py={24}
      >
        <Center
          minH={{ base: "30vh", md: "60vh" }}
          flexDirection="column"
          mx="auto"
        >
          <Flex flexDirection="column" align="center" w={["90%", "70%"]}>
            <Text
              as="h4"
              color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
              fontWeight="bold"
              fontSize="1.2rem"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_overline}
            </Text>
            <Text
              as="h2"
              fontSize={["1.75rem", "2.5rem"]}
              color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
              fontWeight="700"
              mb={4}
              pb={4}
              borderStyle="dotted"
              borderColor={dynamicsPageSection.bsi_bordercolor || "transparent"}
              borderWidth="0 0 5px 0"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_mainheading}
            </Text>
            <Text
              as="p"
              textAlign="center"
              color={dynamicsPageSection.bsi_paragraphtextcolor || "inherit"}
            >
              {dynamicsPageSection.bsi_paragraph}
            </Text>
            {dynamicsPageSection.bsi_featuredproducts && (
              <Text as="span" fontSize="1.2rem" fontWeight="900" mt={6} mb={10}>
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
            <Box h={{ base: "30vh", md: "60vh" }} w={["95%", "80%"]} mx="auto">
              <iframe
                src={dynamicsPageSection.bsi_videourl}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${dynamicsPageSection.bsi_youtubevideoid}?autoplay=1><img src=https://img.youtube.com/vi/${dynamicsPageSection.bsi_youtubevideoid}/maxresdefault.jpg style="object-fit:cover;" alt='${dynamicsPageSection.bsi_youtubevideoalttext}'><span>▶</span></a>`}
                height="100%"
                width="100%"
                scrolling="no"
                frameBorder="0"
                loading="lazy"
                allowFullScreen={true}
              ></iframe>
            </Box>
          )}
        </Center>
      </AnchorSection>
    );
  }
  return null;
};

export default ClientFeatureSection;
