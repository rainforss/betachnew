import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { DynamicsPageSection, PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { betachGreen, royalblue } from "../../utils/constants";

interface IProductSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: DynamicsPageSection;
  accessToken: string;
}

const ProductSection: React.FunctionComponent<IProductSectionProps> = ({
  pageSection,
  dynamicsPageSection,
}) => {
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
                      width={300}
                      height={300}
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
        py={36}
        width="95%"
        mx="auto"
        borderBottom="2px solid rgb(241,241,241)"
      >
        <Box w="100%">
          <Flex flexDirection="column" w="100%" mx="auto" align="center">
            <Heading
              color="#9be368"
              fontSize={["1.25rem", "1.5rem"]}
              fontWeight="bold"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_overline ||
                "Explore Dynamics 365 applications"}
            </Heading>
            <Text
              as="h3"
              fontSize={["1.75rem", "2.5rem"]}
              fontWeight="extrabold"
              p={4}
              mb={4}
              borderStyle="dotted"
              borderColor="#9be368"
              borderWidth="0 0 5px 0"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_mainheading || "Choose your fit."}
            </Text>

            <Flex flexWrap="wrap">
              {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi &&
                dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi.map(
                  (dp) => (
                    <Flex
                      flexDirection="column"
                      align="center"
                      justify="space-between"
                      w={["50%", "25%"]}
                      px={6}
                      key={dp.bsi_attachedcomponentid}
                    >
                      <Flex flexDirection="column" align="center">
                        <Image
                          src={`${dp.bsi_AttachedComponent_bsi_ImageAsset_bsi_[0].bsi_cdnurl}?fm=jpg&fl=progressive`}
                          alt={dp.bsi_name}
                          width={150}
                          height={150}
                          objectFit="contain"
                        />
                        <Text
                          as="h5"
                          fontWeight="bold"
                          fontSize="1.2rem"
                          color={betachGreen}
                        >
                          {dp.bsi_title}
                        </Text>
                        <Text as="p" textAlign="center" my={8} lineHeight="2">
                          {dp.bsi_description}
                        </Text>
                      </Flex>
                      {dp.bsi_hasctabutton && (
                        <NextLink
                          href={dp.bsi_ctabuttonlink || "/test"}
                          passHref
                        >
                          <Text
                            as="a"
                            py={2}
                            px={6}
                            bg={royalblue}
                            color="whiteAlpha.800"
                            borderRadius="300px"
                            transition="ease all 0.5s"
                            _hover={{
                              backgroundColor: "#9be368",
                              boxShadow:
                                "0px 12px 20px rgba(46, 229, 157, 0.4)",
                              color: "#fff",
                              transform: "translateY(-2px)",
                            }}
                            boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
                          >
                            {dp.bsi_ctabuttontext}
                          </Text>
                        </NextLink>
                      )}
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
