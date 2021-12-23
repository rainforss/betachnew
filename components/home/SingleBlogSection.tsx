import { Badge, Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";

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
      <Flex
        flexDirection={"column"}
        width="80%"
        align="flex-start"
        mx="auto"
        my={12}
      >
        <Image
          src={`${dynamicsBlog.bsi_BlogCoverImage.bsi_cdnurl}?fm=jpg&fl=progressive`}
          alt={dynamicsBlog.bsi_BlogCoverImage.bsi_alttext}
          objectFit="contain"
          objectPosition="center"
          height="450px"
          alignSelf="center"
        />
        <Flex
          flexDirection="column"
          align="stretch"
          my={16}
          width="100%"
          style={{ gap: "20px" }}
        >
          <Heading as="h3">{dynamicsBlog.bsi_name}</Heading>
          <Flex justify="flex-start">
            <Flex align="center">
              {dynamicsBlog.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor.map((b) => (
                <NextLink
                  href={`/blogs/author/${b.bsi_slug}/page/1`}
                  passHref
                  key={b.bsi_slug}
                >
                  <Link mr={3}>{b.bsi_name}</Link>
                </NextLink>
              ))}
            </Flex>
            <div suppressHydrationWarning>
              {new Date(dynamicsBlog.modifiedon).toLocaleDateString()}
            </div>
            <Flex align="center" ml={12}>
              {dynamicsBlog.bsi_BlogCategory_bsi_Blog_bsi_Blog.map((b) => (
                <Badge colorScheme="teal" ml={2} key={b.bsi_slug}>
                  <NextLink href={`/blogs/category/${b.bsi_slug}/page/1`}>
                    {b.bsi_name}
                  </NextLink>
                </Badge>
              ))}
            </Flex>
          </Flex>

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
