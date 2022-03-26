import { Box, Center, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";

interface IFeaturedPersonQuoteSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const FeaturedPersonQuoteSection: React.FunctionComponent<
  IFeaturedPersonQuoteSectionProps
> = ({ dynamicsPageSection }) => {
  if (!dynamicsPageSection) {
    return null;
  }
  return (
    <AnchorSection
      w="100%"
      sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
      key={dynamicsPageSection.bsi_pagesectionid}
    >
      <Center
        id="hero-background"
        bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
        opacity={0.9}
        bgSize="cover"
        bgPos="center"
        w="100%"
        minH={{ base: "65vh", sm: "100vh" }}
        bgRepeat="no-repeat"
        flexDirection="column"
        position="relative"
      >
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          top="0"
          left="0"
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Flex
            flexDirection={{ base: "column" }}
            alignItems="stretch"
            justify="center"
            w={{ base: "100%", sm: "55%" }}
            h="100%"
            style={{ gap: "5rem" }}
            py={12}
          >
            <Flex flexDirection={{ base: "column" }} alignItems="center">
              <Text
                textTransform="uppercase"
                as="h4"
                fontSize="1.5rem"
                color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
              >
                {dynamicsPageSection.bsi_overline}
              </Text>
              <Text
                as="h3"
                fontSize={["2.5rem", "3.5rem"]}
                textTransform="uppercase"
                fontWeight="bold"
                borderStyle="dotted"
                borderColor={
                  dynamicsPageSection.bsi_bordercolor || "transparent"
                }
                borderWidth="0 0 5px 0"
                color={
                  dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"
                }
              >
                {dynamicsPageSection.bsi_mainheading}
              </Text>
            </Flex>
            <Text
              as="article"
              bgColor="white"
              px={24}
              py={12}
              borderRadius="0 30px 30px 0"
            >
              {dynamicsPageSection.bsi_paragraph}
            </Text>
          </Flex>
          {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi
            .length > 0 && (
            <Flex
              w={{ base: "100%", sm: "45%" }}
              h="100%"
              flexDirection={{ base: "column" }}
              alignItems="stretch"
              justify="flex-end"
              px={24}
              py={{ base: 12, sm: 48 }}
            >
              <Text
                as="p"
                color={
                  dynamicsPageSection
                    .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                    .bsi_descriptiontextcolor || "inherit"
                }
                fontSize={{ base: "2.5rem", md: "3rem" }}
                textAlign="start"
                textTransform="uppercase"
                mb={16}
              >
                {`"${dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi[0].bsi_description}"`}
              </Text>
              <Text
                as="span"
                color={
                  dynamicsPageSection
                    .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                    .bsi_titletextcolor || "inherit"
                }
                fontSize={{ base: "1.5rem", md: "1.75rem" }}
                textAlign="start"
              >
                {
                  dynamicsPageSection
                    .bsi_AttachedComponent_bsi_PageSection_bsi[0].bsi_title
                }
              </Text>
              <Text
                as="span"
                color={
                  dynamicsPageSection
                    .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                    .bsi_subtitletextcolor || "inherit"
                }
                fontSize={{ base: "1.5rem", md: "1.75rem" }}
                textAlign="start"
              >
                {
                  dynamicsPageSection
                    .bsi_AttachedComponent_bsi_PageSection_bsi[0].bsi_subtitle
                }
              </Text>
            </Flex>
          )}
        </Flex>
      </Center>
    </AnchorSection>
  );
};

export default FeaturedPersonQuoteSection;
