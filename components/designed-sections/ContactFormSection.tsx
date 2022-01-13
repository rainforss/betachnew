import * as React from "react";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import Image from "next/image";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { betachGreen } from "../../utils/constants";

interface IContactFormSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const ContactFormSection: React.FunctionComponent<IContactFormSectionProps> = ({
  dynamicsPageSection,
}) => {
  if (!dynamicsPageSection) {
    return null;
  }
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      w="100%"
      minH="80vh"
      h="fit-content"
      position="relative"
      overflow="hidden"
    >
      <Center
        id="hero-background"
        bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
        opacity={0.45}
        bgSize="cover"
        bgPos="center"
        w="100%"
        minH="80vh"
        bgAttachment="fixed"
        bgRepeat="no-repeat"
        flexDirection="column"
        position="relative"
      ></Center>
      <Flex
        w="100%"
        minH="80vh"
        justify="space-between"
        position="absolute"
        flexDirection={["column", "row"]}
        top={0}
        mx="auto"
        p={16}
      >
        <Flex w={["100%", "45%"]} flexDir="column">
          <Text
            as="h4"
            color={betachGreen}
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
          >
            {dynamicsPageSection.bsi_overline}
          </Text>
          <Text
            as="h2"
            fontSize="2.5rem"
            fontWeight="700"
            mb={4}
            pb={4}
            borderStyle="dotted"
            borderColor="#9be368"
            borderWidth="0 0 5px 0"
          >
            {dynamicsPageSection.bsi_mainheading}
          </Text>
          <Text
            as="h4"
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
            mb={6}
          >
            {dynamicsPageSection.bsi_subheading}
          </Text>
          <Text as="p">{dynamicsPageSection.bsi_paragraph}</Text>
        </Flex>
        <Box
          w={["100%", "45%"]}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              dynamicsPageSection.bsi_MarketingFormPage.msdyncrm_javascriptcode,
          }}
        ></Box>
      </Flex>
    </AnchorSection>
  );
};

export default ContactFormSection;
