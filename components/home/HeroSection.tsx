import { Center, Flex, Heading, Text } from "@chakra-ui/layout";
import * as React from "react";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { royalblue } from "../../utils/constants";
import { PageSection } from "../../utils/types";

interface IHeroSectionProps {
  pageSection: PageSection;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({
  pageSection,
}) => {
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
};

export default HeroSection;
