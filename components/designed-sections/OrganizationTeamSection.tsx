import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IOrganizationTeamSectionProps {
  dynamicsPageSection: DynamicsPageSection;
}

const OrganizationTeamSection: React.FunctionComponent<
  IOrganizationTeamSectionProps
> = ({ dynamicsPageSection }) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={24}
      width="90%"
      mx="auto"
      borderBottom="2px solid rgb(241,241,241)"
    >
      <Flex flexDirection="column" alignItems="center" py={6}>
        <Heading
          color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
          as="h3"
          fontSize={["1rem", "1.25rem"]}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign={{ base: "center", md: "center" }}
        >
          {dynamicsPageSection.bsi_overline}
        </Heading>
        {dynamicsPageSection.bsi_mainheading && (
          <Text
            as="h3"
            display="inline"
            fontSize={["1.25rem", "2rem"]}
            color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
            fontWeight="extrabold"
            p={4}
            mb={4}
            borderStyle="dotted"
            borderColor={dynamicsPageSection.bsi_bordercolor || "transparent"}
            borderWidth="0 0 5px 0"
            textTransform="uppercase"
            textAlign="center"
          >
            {dynamicsPageSection.bsi_mainheading}
          </Text>
        )}
      </Flex>
      <Flex flexWrap="wrap">
        {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi.map(
          (ac) => (
            <Flex
              key={ac.bsi_attachedcomponentid}
              flexDirection="column"
              justify="center"
              alignItems="center"
              w={{ base: "50%", sm: "50%", md: "25%", lg: "20%" }}
              pb={6}
            >
              <Avatar
                size="2xl"
                my={4}
                border="1px solid grey"
                name={ac.bsi_title}
                src={
                  ac.bsi_AttachedComponent_bsi_ImageAsset_bsi_.length !== 0
                    ? ac.bsi_AttachedComponent_bsi_ImageAsset_bsi_[0].bsi_cdnurl
                    : undefined
                }
              />
              <Text
                color={ac.bsi_titletextcolor || "inherit"}
                fontWeight="bold"
              >
                {ac.bsi_title}
              </Text>
              <Text
                color={ac.bsi_subtitletextcolor || "inherit"}
                borderStyle="dotted"
                borderColor={ac.bsi_bordercolor || "transparent"}
                borderWidth="0 0 5px 0"
                fontSize="0.9rem"
              >
                {ac.bsi_subtitle}
              </Text>
              <Text
                color={ac.bsi_descriptiontextcolor || "inherit"}
                fontSize="0.8rem"
              >
                {ac.bsi_description}
              </Text>
            </Flex>
          )
        )}
      </Flex>
    </AnchorSection>
  );
};

export default OrganizationTeamSection;
