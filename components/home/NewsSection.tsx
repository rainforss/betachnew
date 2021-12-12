import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import * as React from "react";
import { royalblue } from "../../utils/constants";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { DynamicsPageSection } from "../../utils/types";

interface INewsSectionProps {
  dynamicsPageSection: DynamicsPageSection;
}

const NewsSection: React.FunctionComponent<INewsSectionProps> = ({
  dynamicsPageSection,
}) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
      key={dynamicsPageSection.bsi_sectionid}
    >
      <Box w="100%" my={24}>
        <Flex flexDirection="column" w="90%" mx="auto" align="center">
          <Flex>
            {dynamicsPageSection.bsi_ProductOffering_PageSection_bsi_PageS &&
              dynamicsPageSection.bsi_ProductOffering_PageSection_bsi_PageS.map(
                (dp: any) => (
                  <Flex
                    flexDirection="column"
                    align="center"
                    w="33%"
                    px={6}
                    key={dp.bsi_productofferingid}
                  >
                    <Text
                      as="h5"
                      fontWeight="extrabold"
                      color="blackAlpha.800"
                      fontSize="2.5rem"
                    >
                      {dp.bsi_name}
                    </Text>
                    {dp.bsi_subheading && (
                      <Text
                        as="h5"
                        fontWeight="bold"
                        color="blackAlpha.800"
                        fontSize="1.3rem"
                        textAlign="center"
                      >
                        {dp.bsi_subheading}
                      </Text>
                    )}
                    <Text as="p" textAlign="center" my={8} lineHeight="2">
                      {dp.bsi_productdescription}
                    </Text>
                    <NextLink href={dp.bsi_relativeurl || "/test"} passHref>
                      <Link
                        as="span"
                        py={4}
                        px={6}
                        bg={royalblue}
                        color="whiteAlpha.800"
                        borderRadius="300px"
                      >
                        {dp.bsi_ctaButtonText || "Learn more"}
                      </Link>
                    </NextLink>
                  </Flex>
                )
              )}
          </Flex>
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default NewsSection;
