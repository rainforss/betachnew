import * as React from "react";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import { Box, Flex, Text } from "@chakra-ui/react";
import Script from "next/script";

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
      minH={{ base: "60vh", md: "80vh" }}
      position="relative"
      overflow="hidden"
      bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
      bgSize="cover"
      bgPos="center"
    >
      {/* <Center
        id="hero-background"
        bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
        opacity={0.45}
        bgSize="cover"
        bgPos="center"
        w="100%"
        minH={["80vh", "100vh"]}
        bgAttachment="fixed"
        bgRepeat="no-repeat"
        flexDirection="column"
        position="relative"
      ></Center> */}
      <Flex
        w="100%"
        minH={{ base: "60vh", md: "80vh" }}
        justify="space-between"
        flexDirection={{ base: "column", md: "row" }}
        bgColor="rgba(255,255,255,0.75)"
        mx="auto"
        p={16}
      >
        <Flex w={{ base: "100%", md: "45%" }} flexDir="column" mb={[12, 0]}>
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
            fontWeight="700"
            color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
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
            as="h4"
            color={dynamicsPageSection.bsi_subheadingtextcolor || "inherit"}
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
            mb={6}
          >
            {dynamicsPageSection.bsi_subheading}
          </Text>
          <Text
            as="p"
            color={dynamicsPageSection.bsi_paragraphtextcolor || "inherit"}
          >
            {dynamicsPageSection.bsi_paragraph}
          </Text>
        </Flex>
        <Box
          w={{ base: "100%", md: "45%" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              dynamicsPageSection.bsi_MarketingFormPage.msdyncrm_javascriptcode,
          }}
        ></Box>
        <Script
          src="https://mktdplp102cdn.azureedge.net/public/latest/js/form-loader.js?v=1.77.1005"
          strategy="lazyOnload"
        />
        <Script
          src="https://mktdplp102cdn.azureedge.net/public/latest/js/ws-tracking.js?v=1.77.1005"
          strategy="lazyOnload"
        />
      </Flex>
    </AnchorSection>
  );
};

export default ContactFormSection;
