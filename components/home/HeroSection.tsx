import { Center, Flex, Heading, Text } from "@chakra-ui/layout";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { royalblue } from "../../utils/constants";
import { DynamicsPageSection, PageSection } from "../../utils/types";
import React from "react";

interface IHeroSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: DynamicsPageSection;
  accessToken: string;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({
  pageSection,
  dynamicsPageSection,
}) => {
  if (pageSection) {
    return (
      <AnchorSection
        sectionId={pageSection.fields.sectionId || "introduction"}
        key={pageSection.sys.id}
      >
        <Center
          bgImage={pageSection.fields.sectionBackgroundImage.fields.file.url}
          bgSize="cover"
          bgPos="center"
          h="80vh"
          minH="80vh"
          bgAttachment="fixed"
          bgRepeat="no-repeat"
          position="relative"
        ></Center>
        <Flex
          w="90%"
          justify="center"
          align="center"
          position="absolute"
          top={0}
          mx="auto"
          zIndex={10}
        >
          <Flex direction="column" mr={12}>
            <Heading color="whiteAlpha.900" fontSize="3.5rem" mb={6}>
              {pageSection.fields.sectionMainHeading ||
                "Your Dynamics 365 Experts"}
            </Heading>
            <Text as="h3">
              {pageSection.fields.sectionSubHeading ||
                "Saving your business time and money by boosting productivity, collaboration, and operational agility."}
            </Text>
          </Flex>

          <NextLink
            href={
              pageSection.fields.ctaButtonLink ||
              "https://outlook.office365.com/owa/calendar/BetachSolutions@betach.com/bookings/"
            }
          >
            <Text
              as="span"
              py={4}
              px={6}
              bg={royalblue}
              color="whiteAlpha.800"
              borderRadius="300px"
            >
              {pageSection.fields.ctaButtonText || "Get Started"}
            </Text>
          </NextLink>
        </Flex>
      </AnchorSection>
    );
  }
  if (dynamicsPageSection) {
    return (
      <AnchorSection
        height="100vh"
        w="100%"
        sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
        key={dynamicsPageSection.bsi_pagesectionid}
      >
        <Center
          id="hero-background"
          bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
          opacity={0.6}
          bgSize="cover"
          bgPos="center"
          w="100%"
          h="100vh"
          minH="80vh"
          bgAttachment="fixed"
          bgRepeat="no-repeat"
          flexDirection="column"
          position="relative"
        ></Center>
        <Center
          w="100%"
          h="100vh"
          minH="80vh"
          position="absolute"
          top={0}
          mx="auto"
        >
          <Flex w="90%" justify="center" align="center" zIndex={10}>
            <Flex direction="column" align="center">
              <Heading color="black" fontSize="3.5rem" mb={6} opacity={1}>
                {dynamicsPageSection
                  .bsi_AttachedComponent_bsi_PageSection_bsi[0].bsi_title ||
                  "Your Dynamics 365 Experts"}
              </Heading>
              <Text as="h3" opacity={1} color="black" mb={12}>
                {dynamicsPageSection
                  .bsi_AttachedComponent_bsi_PageSection_bsi[0].bsi_subtitle ||
                  "Saving your business time and money by boosting productivity, collaboration, and operational agility."}
              </Text>
              {dynamicsPageSection.bsi_hasctabutton && (
                <NextLink
                  href={
                    dynamicsPageSection
                      .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                      .bsi_ctabuttonlink ||
                    "https://outlook.office365.com/owa/calendar/BetachSolutions@betach.com/bookings/"
                  }
                  passHref
                >
                  <Text
                    as="a"
                    py={2}
                    px={6}
                    transition="ease all 0.5s"
                    _hover={{
                      backgroundColor: "#9be368",
                      boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
                      color: "#fff",
                      transform: "translateY(-2px)",
                    }}
                    color={
                      dynamicsPageSection
                        .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                        .bsi_ctabuttontextcolor || "black"
                    }
                    borderRadius="300px"
                    bgColor={
                      dynamicsPageSection
                        .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                        .bsi_ctabuttonbgcolor || "white"
                    }
                    boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
                  >
                    {dynamicsPageSection
                      .bsi_AttachedComponent_bsi_PageSection_bsi[0]
                      .bsi_ctabuttontext || "Get Started"}
                  </Text>
                </NextLink>
              )}
            </Flex>
          </Flex>
        </Center>
      </AnchorSection>
    );
  }
  return null;
};
export default HeroSection;
