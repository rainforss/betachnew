import { Box, Flex, Heading } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import BlogTile from "../BlogTile";

interface IBlogsDisplaySectionProps {
  dynamicsBlogs: DynamicsBlog[];
  dynamicsPageSection: DynamicsPageSection;
}

const BlogsDisplaySection: React.FunctionComponent<IBlogsDisplaySectionProps> =
  ({ dynamicsBlogs, dynamicsPageSection }) => {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid}
        key={dynamicsPageSection.bsi_pagesectionid}
      >
        <Heading as="h2" width="90%" mx="auto" my={16}>
          {dynamicsPageSection.bsi_mainheading}
        </Heading>
        <Flex
          width="90%"
          mx="auto"
          flexWrap="wrap"
          mb={16}
          style={{ gap: "6%" }}
        >
          {dynamicsBlogs.map((db) => (
            <Box key={db.bsi_blogid} width="47%" mb={8}>
              <BlogTile
                blogTitle={db.bsi_name}
                blogAuthor={db.bsi_author.split(";")}
                blogSlug={db.bsi_urlslug}
                blogCoverImageUrl={db.bsi_BlogCoverImage.bsi_cdnurl}
                blogCoverImageAltText={db.bsi_BlogCoverImage.bsi_alttext}
                blogCoverText={db.bsi_blogcovertext}
                publishDate={new Date(db.modifiedon)}
              />
            </Box>
          ))}
        </Flex>
      </AnchorSection>
    );
  };

export default BlogsDisplaySection;
