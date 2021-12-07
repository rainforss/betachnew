import { Box, Flex, Link } from "@chakra-ui/layout";
import * as React from "react";
import { PageSection, SectionItem } from "../utils/types";
import NextLink from "next/link";
import { Text } from "@chakra-ui/react";

interface ISectionControlProps {
  sections?: PageSection[];
  activeSectionId?: string;
  currentHash: string;
  dynamicsPageSections?: any;
}

const SectionControl: React.FunctionComponent<ISectionControlProps> = (
  props
) => {
  if (props.sections) {
    return (
      <Flex
        direction="column"
        position="fixed"
        right="50px"
        top="50%"
        transform="translateY(-50%)"
      >
        {props.sections &&
          props.sections.map((s) => (
            <React.Fragment key={s.fields.sectionId}>
              <NextLink href={`#${s.fields.sectionId}`}>
                <Link position="relative" my={1}>
                  <Box
                    h="8px"
                    w="8px"
                    role="group"
                    bg={
                      s.fields.sectionId === props.currentHash
                        ? "blackAlpha.800"
                        : "blackAlpha.400"
                    }
                    borderRadius="50%"
                  >
                    <Text
                      as="span"
                      fontSize="0.7rem"
                      position="absolute"
                      right="0"
                      top="0"
                      transform="translate(400px,-25%)"
                      transition="transform ease-in-out 0.5s, opacity ease-in-out 0.15s"
                      opacity={0}
                      width="170px"
                      _groupHover={{
                        opacity: 1,
                        transform: "translate(0,-25%)",
                      }}
                    >
                      {s.fields.sectionName}
                    </Text>
                  </Box>
                </Link>
              </NextLink>
            </React.Fragment>
          ))}
      </Flex>
    );
  }
  if (props.dynamicsPageSections) {
    return (
      <Flex
        direction="column"
        position="fixed"
        right="50px"
        top="50%"
        transform="translateY(-50%)"
      >
        {props.dynamicsPageSections &&
          props.dynamicsPageSections.map((s: any) => (
            <React.Fragment key={s.bsi_sectionid}>
              <NextLink href={`#${s.bsi_sectionid}`}>
                <Link position="relative" my={1}>
                  <Box
                    h="8px"
                    w="8px"
                    role="group"
                    bg={
                      s.bsi_sectionid === props.currentHash
                        ? "blackAlpha.800"
                        : "blackAlpha.400"
                    }
                    borderRadius="50%"
                  >
                    <Text
                      as="span"
                      fontSize="0.7rem"
                      position="absolute"
                      right="0"
                      top="0"
                      transform="translate(400px,-25%)"
                      transition="transform ease-in-out 0.5s, opacity ease-in-out 0.15s"
                      opacity={0}
                      width="170px"
                      _groupHover={{
                        opacity: 1,
                        transform: "translate(0,-25%)",
                      }}
                    >
                      {s.bsi_name}
                    </Text>
                  </Box>
                </Link>
              </NextLink>
            </React.Fragment>
          ))}
      </Flex>
    );
  }
  return null;
};

export default SectionControl;
