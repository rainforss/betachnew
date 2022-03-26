import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";

interface IProductOverviewSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const ProductOverviewSection: React.FunctionComponent<
  IProductOverviewSectionProps
> = ({ dynamicsPageSection }) => {
  if (!dynamicsPageSection) {
    return null;
  }

  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={24}
      width="95%"
      mx="auto"
      borderBottom="2px solid rgb(241,241,241)"
    >
      <Box w="90%" mx="auto">
        <Flex flexDirection="column" w="100%" mx="auto" align="center">
          <Heading
            color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
            fontSize={["1.25rem", "1.5rem"]}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign={{ base: "center", md: "start" }}
          >
            {dynamicsPageSection.bsi_overline}
          </Heading>
          <Text
            as="h3"
            fontSize={["1.75rem", "2.5rem"]}
            color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
            fontWeight="extrabold"
            p={4}
            mb={4}
            borderStyle="dotted"
            borderColor={dynamicsPageSection.bsi_bordercolor || "transparent"}
            borderWidth="0 0 5px 0"
            textTransform="uppercase"
          >
            {dynamicsPageSection.bsi_mainheading}
          </Text>
          <Flex
            flexDirection={{ base: "column", xl: "row" }}
            pt={2}
            align="stretch"
            style={{ gap: "50px" }}
          >
            <Box w={{ base: "100%", xl: "50%" }}>
              <Text
                as="p"
                color={dynamicsPageSection.bsi_paragraphtextcolor || "inherit"}
              >
                {dynamicsPageSection.bsi_paragraph}
              </Text>
              {dynamicsPageSection.bsi_videourl && (
                <Box
                  h={{ base: "30vh", sm: "40vh", md: "50vh" }}
                  w={["100%", "100%"]}
                  mx="auto"
                >
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
            </Box>
            <Flex flexDirection="column" w={{ base: "100%", xl: "50%" }}>
              <Text
                as="p"
                color={dynamicsPageSection.bsi_subheadingtextcolor || "inherit"}
                mb="3rem"
              >
                {dynamicsPageSection.bsi_subheading}
              </Text>
              <List spacing={3}>
                {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi.map(
                  (ac) => (
                    <ListItem key={ac.bsi_attachedcomponentid}>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      <Text as="h5" display="inline">
                        {ac.bsi_title}
                      </Text>
                      <Text as="p" ml="1.5em">
                        {ac.bsi_description}
                      </Text>
                    </ListItem>
                  )
                )}
              </List>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default ProductOverviewSection;
