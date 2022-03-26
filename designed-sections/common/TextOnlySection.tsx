import { Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";

interface ITextOnlySectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const TextOnlySection: React.FunctionComponent<ITextOnlySectionProps> = ({
  dynamicsPageSection,
}) => {
  if (!dynamicsPageSection) {
    return null;
  }
  return (
    <AnchorSection
      w="100%"
      sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
      key={dynamicsPageSection.bsi_pagesectionid}
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
      </Flex>
    </AnchorSection>
  );
};

export default TextOnlySection;
