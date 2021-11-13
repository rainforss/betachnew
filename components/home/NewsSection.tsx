import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import * as React from "react";
import { betachGreen, royalblue } from "../../utils/constants";
import { PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";

interface INewsSectionProps {
  pageSection: PageSection;
}

const NewsSection: React.FunctionComponent<INewsSectionProps> = ({
  pageSection,
}) => {
  return (
    <AnchorSection
      sectionId={pageSection.fields.sectionId || "introduction"}
      key={pageSection.sys.id}
    >
      <Box w="100%" my={24}>
        <Flex flexDirection="column" w="90%" mx="auto" align="center">
          <Flex>
            {pageSection.fields.displayedProducts &&
              pageSection.fields.displayedProducts.map((dp) => (
                <Flex
                  flexDirection="column"
                  align="center"
                  w="33%"
                  px={6}
                  key={dp.sys.id}
                >
                  <Text
                    as="h5"
                    fontWeight="extrabold"
                    color="blackAlpha.800"
                    fontSize="2.5rem"
                  >
                    {dp.fields.productName}
                  </Text>
                  {dp.fields.subheading && (
                    <Text
                      as="h5"
                      fontWeight="bold"
                      color="blackAlpha.800"
                      fontSize="1.3rem"
                      textAlign="center"
                    >
                      {dp.fields.subheading}
                    </Text>
                  )}
                  <Text as="p" textAlign="center" my={8} lineHeight="2">
                    {dp.fields.productDescription}
                  </Text>
                  <NextLink href={dp.fields.ctaButtonLink}>
                    <Text
                      as="span"
                      py={4}
                      px={6}
                      bg={royalblue}
                      color="whiteAlpha.800"
                      borderRadius="300px"
                    >
                      {dp.fields.ctaButtonText || "Learn more"}
                    </Text>
                  </NextLink>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default NewsSection;
