import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { betachGreen, royalblue } from "../../utils/constants";
import { getImageStrings } from "../../utils/getImageStrings";

interface IProductSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: any;
  accessToken: string;
}

const ProductSection: React.FunctionComponent<IProductSectionProps> = ({
  pageSection,
  dynamicsPageSection,
  accessToken,
}) => {
  const [imageCollection, setImageCollection] = useState<string[]>([]);
  useEffect(() => {
    if (dynamicsPageSection && imageCollection.length === 0 && accessToken) {
      const promises: any[] = [];
      dynamicsPageSection.bsi_ProductOffering_PageSection_bsi_PageS.forEach(
        (po: any) =>
          promises.push(
            getImageStrings(
              accessToken,
              "bsi_productofferings",
              po.bsi_productofferingid,
              "bsi_productimage"
            )
          )
      );
      console.log(promises);
      Promise.all(promises).then((values) => {
        setImageCollection((prevstate) => values);
      });
    }
  }, [dynamicsPageSection, accessToken, imageCollection.length]);
  if (pageSection) {
    return (
      <AnchorSection
        sectionId={pageSection.fields.sectionId || "introduction"}
        key={pageSection.sys.id}
      >
        <Box w="100%" mb={24}>
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
                    px={6}
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
  }

  if (dynamicsPageSection) {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
        key={dynamicsPageSection.bsi_pagesectionid}
      >
        <Box w="100%" mb={24}>
          <Flex flexDirection="column" w="90%" mx="auto" align="center">
            <Heading
              color="blackAlpha.900"
              fontSize="1.5rem"
              fontWeight="bold"
              mb={6}
              mt={24}
            >
              {dynamicsPageSection.bsi_mainheading ||
                "Explore Dynamics 365 applications"}
            </Heading>
            <Text as="h3" fontSize="2.5rem" fontWeight="extrabold" mb={24}>
              {dynamicsPageSection.bsi_subheading || "Choose your fit."}
            </Text>

            <Flex>
              {dynamicsPageSection.bsi_ProductOffering_PageSection_bsi_PageS &&
                dynamicsPageSection.bsi_ProductOffering_PageSection_bsi_PageS.map(
                  (dp: any, index: number) => (
                    <Flex
                      flexDirection="column"
                      align="center"
                      w="25%"
                      px={6}
                      key={dp.bsi_productofferingid}
                    >
                      <Image
                        src={
                          imageCollection.length !== 0
                            ? `data:image/png;base64,${imageCollection[index]}`
                            : `data:image/png;base64,${dp.bsi_productimage}`
                        }
                        alt={dp.bsi_name}
                        width="80%"
                        objectFit="contain"
                      />
                      <Text as="h5" fontWeight="bold" color={betachGreen}>
                        {dp.bsi_name}
                      </Text>
                      <Text as="p" textAlign="center" my={8} lineHeight="2">
                        {dp.bsi_productdescription}
                      </Text>
                      <NextLink href={dp.bsi_relativeurl}>
                        <Text
                          as="span"
                          py={4}
                          px={6}
                          bg={royalblue}
                          color="whiteAlpha.800"
                          borderRadius="300px"
                        >
                          {dynamicsPageSection.bsi_ctabuttontext ||
                            "Learn more"}
                        </Text>
                      </NextLink>
                    </Flex>
                  )
                )}
            </Flex>
          </Flex>
        </Box>
      </AnchorSection>
    );
  }

  return null;
};

export default ProductSection;
