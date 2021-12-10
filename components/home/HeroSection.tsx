import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { royalblue } from "../../utils/constants";
import { PageSection } from "../../utils/types";
import React from "react";
import Image from "next/image";

interface IHeroSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: any;
  accessToken: string;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({
  pageSection,
  dynamicsPageSection,
  accessToken,
}) => {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    async function getImageString(token: string) {
      const response: any = await fetch(
        `https://betachplayground.crm.dynamics.com/api/data/v9.1/bsi_pagesections(${dynamicsPageSection.bsi_pagesectionid})/bsi_backgroundimage/?size=full`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const image = await response.json();
      setImageData((prevstate) => image.value);
    }
    if (dynamicsPageSection && accessToken && !imageData) {
      getImageString(accessToken);
    }
  }, [accessToken, dynamicsPageSection, imageData]);

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
        >
          <Flex w="90%" justify="center" align="center">
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
        </Center>
      </AnchorSection>
    );
  }
  if (dynamicsPageSection) {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
        key={dynamicsPageSection.bsi_pagesectionid}
      >
        <Center
          id="hero-background"
          bgImage="/hero_image.jpg"
          bgSize="cover"
          bgPos="center"
          w="100%"
          h="80vh"
          minH="80vh"
          bgAttachment="fixed"
          bgRepeat="no-repeat"
          flexDirection="column"
          position="relative"
        >
          <Flex w="90%" justify="center" align="center" zIndex={9}>
            <Flex direction="column" mr={12}>
              <Heading color="whiteAlpha.900" fontSize="3.5rem" mb={6}>
                {dynamicsPageSection.bsi_mainheading ||
                  "Your Dynamics 365 Experts"}
              </Heading>
              <Text as="h3">
                {dynamicsPageSection.bsi_subheading ||
                  "Saving your business time and money by boosting productivity, collaboration, and operational agility."}
              </Text>
            </Flex>

            <NextLink
              href={
                dynamicsPageSection.bsi_ctabuttonlink ||
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
                {dynamicsPageSection.bsi_ctabuttontext || "Get Started"}
              </Text>
            </NextLink>
          </Flex>
        </Center>
      </AnchorSection>
    );
  }
  return null;
};
export default HeroSection;
