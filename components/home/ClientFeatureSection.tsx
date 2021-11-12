import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";
import { betachGreen } from "../../utils/constants";
import { PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IClientFeatureSectionProps {
  pageSection: PageSection;
}

const ClientFeatureSection: React.FunctionComponent<IClientFeatureSectionProps> =
  ({ pageSection }) => {
    return (
      <AnchorSection
        sectionId={pageSection.fields.sectionId || "tarin-resources-casestudy"}
        key={pageSection.sys.id}
      >
        <Center minH="120vh" flexDirection="column" mx="auto">
          <Flex flexDirection="column" align="center" w="70%" mt={24}>
            <Text
              as="h4"
              color={betachGreen}
              fontWeight="bold"
              fontSize="1.2rem"
              textTransform="uppercase"
            >
              {pageSection.fields.sectionMainHeading || "Featured Client"}
            </Text>
            <Text as="h2" fontSize="2.5rem" fontWeight="700" my={2}>
              {pageSection.fields.sectionSubHeading ||
                "Tarin Resources | Betach Solutions"}
            </Text>
            <Text as="p" textAlign="center">
              {pageSection.fields.sectionParagraph ||
                "Betach worked alongside Tarin Resources to provide them with a powerful solution to manage their expert knowledge regarding data and technology, allowing their clients the freedom to be successful by utilizing the best data and services available."}
            </Text>
            {pageSection.fields.featuredProducts && (
              <Text as="span" fontSize="1.2rem" fontWeight="900" mt={6} mb={10}>
                Built on{" "}
                {pageSection.fields.featuredProducts.map((p, index) => {
                  if (index === 0) {
                    return (
                      <Text key={p} as="span">
                        {p}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={p} as="span">
                        ,&nbsp;{p}
                      </Text>
                    );
                  }
                })}
              </Text>
            )}
          </Flex>
          {pageSection.fields.videoUrl && (
            <iframe
              src={pageSection.fields.videoUrl}
              height="700"
              width="70%"
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          )}
          <Box h="50px" bgColor={betachGreen} w="70%" my={8}></Box>
        </Center>
      </AnchorSection>
    );
  };

export default ClientFeatureSection;
