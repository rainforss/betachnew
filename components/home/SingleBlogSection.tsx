import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface ISingleBlogSectionProps {
  dynamicsBlog: DynamicsBlog;
  dynamicsPageSection: DynamicsPageSection;
}

const SingleBlogSection: React.FunctionComponent<ISingleBlogSectionProps> = ({
  dynamicsBlog,
  dynamicsPageSection,
}) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
    >
      <Flex flexDirection={"column"} width="80%" align="flex-start" mx="auto">
        <Image
          src={`${dynamicsBlog.bsi_BlogCoverImage.bsi_cdnurl}?fm=jpg&fl=progressive`}
          alt={dynamicsBlog.bsi_BlogCoverImage.bsi_alttext}
          objectFit="cover"
          objectPosition="center"
          width="100%"
          height="450px"
        />
        <Flex
          flexDirection="column"
          align="flex-start"
          my={16}
          style={{ gap: "20px" }}
        >
          <Heading as="h3">{dynamicsBlog.bsi_name}</Heading>
          <Text as="small">
            {dynamicsBlog.bsi_author}{" "}
            {new Date(dynamicsBlog.modifiedon).toLocaleDateString()}
          </Text>
          <article>
            <Box
              dangerouslySetInnerHTML={{ __html: dynamicsBlog.bsi_blogbody }}
            ></Box>
          </article>
        </Flex>
      </Flex>
    </AnchorSection>
  );
};

export default SingleBlogSection;
