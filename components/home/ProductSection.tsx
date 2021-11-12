import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import * as React from "react";
import { PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { betachGreen, royalblue } from "../../utils/constants";

interface IProductSectionProps {
  pageSection: PageSection;
}

const ProductSection: React.FunctionComponent<IProductSectionProps> = ({
  pageSection,
}) => {
  return (
    <AnchorSection
      sectionId={pageSection.fields.sectionId || "introduction"}
      key={pageSection.sys.id}
    >
      <Box w="100%">
        <Flex flexDirection="column" w="90%" mx="auto" align="center">
          <Heading
            color="blackAlpha.900"
            fontSize="1.5rem"
            fontWeight="bold"
            mb={6}
            mt={24}
          >
            {pageSection.fields.sectionMainHeading ||
              "Explore Dynamics 365 applications"}
          </Heading>
          <Text as="h3" fontSize="2.5rem" fontWeight="extrabold" mb={24}>
            {pageSection.fields.sectionSubHeading || "Choose your fit."}
          </Text>

          <Flex>
            {pageSection.fields.displayedProducts &&
              pageSection.fields.displayedProducts.map((dp) => (
                <Flex
                  flexDirection="column"
                  align="center"
                  w="25%"
                  mx={6}
                  key={dp.sys.id}
                >
                  <Image
                    src={dp.fields.productImage.fields.file.url}
                    alt={dp.fields.productImage.fields.file.fileName}
                    objectFit="contain"
                  />
                  <Text as="h5" fontWeight="bold" color={betachGreen}>
                    {dp.fields.productName}
                  </Text>
                  <Text as="p" textAlign="center" my={8} lineHeight="2">
                    {dp.fields.productDescription}
                  </Text>
                  <NextLink href={dp.fields.relativeUrl}>
                    <Text
                      as="span"
                      py={4}
                      px={6}
                      bg={royalblue}
                      color="whiteAlpha.800"
                      borderRadius="300px"
                    >
                      {pageSection.fields.ctaButtonText || "Learn more"}
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

export default ProductSection;
