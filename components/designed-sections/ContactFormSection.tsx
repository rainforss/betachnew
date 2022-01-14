import * as React from "react";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import { Box, Flex, Text } from "@chakra-ui/react";
import { betachGreen } from "../../utils/constants";

interface IContactFormSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const ContactFormSection: React.FunctionComponent<IContactFormSectionProps> = ({
  dynamicsPageSection,
}) => {
  const formContainerRef = React.createRef<HTMLDivElement>();

  if (!dynamicsPageSection) {
    return null;
  }
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      w="100%"
      minH={["80vh", "100vh"]}
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
        minH={["80vh", "100vh"]}
        justify="space-between"
        flexDirection={["column", "row"]}
        bgColor="rgba(255,255,255,0.75)"
        mx="auto"
        p={16}
        ref={formContainerRef}
      >
        <Flex w={["100%", "45%"]} flexDir="column" mb={[12, 0]}>
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
            fontSize={["1.75rem", "2.5rem"]}
            fontWeight="700"
            mb={4}
            pb={4}
            borderStyle="dotted"
            borderColor="#9be368"
            borderWidth="0 0 5px 0"
            textTransform="uppercase"
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
