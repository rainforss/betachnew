import { Center, Flex, Heading, Text } from "@chakra-ui/layout";
import * as React from "react";
import { PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IBusinessBanterSectionProps {
  pageSection: PageSection;
}

const BusinessBanterSection: React.FunctionComponent<IBusinessBanterSectionProps> =
  ({ pageSection }) => {
    return (
      <AnchorSection
        sectionId={pageSection.fields.sectionId || "business-banter"}
        key={pageSection.sys.id}
      >
        <Center
          bgImage={pageSection.fields.sectionBackgroundImage.fields.file.url}
          bgSize="cover"
          bgPos="center"
          h="80vh"
          minH="80vh"
          bgAttachment="fixed"
          bgRepeat="no-repeat"
        >
          <Flex w="90%" justify="center" flexDirection="column" align="center">
            <Flex direction="column" mb={12}>
              <Heading as="h2" color="whiteAlpha.900" fontSize="3rem" mb={6}>
                {pageSection.fields.sectionMainHeading || "BUSINESS BANTER"}
              </Heading>
              <Text as="h3" textAlign="center">
                {pageSection.fields.sectionSubHeading ||
                  "Stay up to date with the business world with our Podcast"}
              </Text>
            </Flex>
            <iframe
              title="Betach‘s Business Banter - Episode 6 featuring Professor Theo Stratopoulos"
              allowTransparency={true}
              height="450px"
              width="80%"
              style={{ border: "none", minWidth: "min(100%, 430px)" }}
              scrolling="no"
              data-name="pb-iframe-player"
              src="https://www.podbean.com/player-v2/?i=cxcpw-112081c-pb&amp;from=pb6admin&amp;square=1&amp;share=1&amp;download=1&amp;rtl=0&amp;fonts=Arial&amp;skin=f6f6f6&amp;font-color=&amp;btn-skin=7&amp;size=450"
              allowFullScreen={true}
            ></iframe>
          </Flex>
        </Center>
      </AnchorSection>
    );
  };

export default BusinessBanterSection;
