import { Badge, Flex, Image, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { DynamicsBlog } from "../utils/types";

interface IBlogTileProps {
  blogTitle: string;
  blogAuthors: DynamicsBlog["bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor"];
  blogTags: DynamicsBlog["bsi_BlogCategory_bsi_Blog_bsi_Blog"];
  blogSlug: string;
  publishDate: Date;
  blogCoverText: string;
  blogCoverImageUrl: string;
  blogCoverImageAltText: string;
}

const BlogTile: React.FunctionComponent<IBlogTileProps> = (props) => {
  return (
    <article>
      <Flex direction="column" width="100%" style={{ gap: "15px" }}>
        <NextLink href={`/blogs/${props.blogSlug}`}>
          <Image
            src={`${props.blogCoverImageUrl}?fm=jpg&fl=progressive`}
            alt={props.blogCoverImageAltText}
            width="100%"
            height="400px"
            objectFit="cover"
          />
        </NextLink>
        <Flex justify="space-between">
          <Flex align="center">
            {props.blogAuthors.map((b) => (
              <NextLink
                href={`/blogs/author/${b.bsi_slug}/page/1`}
                passHref
                key={b.bsi_slug}
              >
                <Link mr={3}>{b.bsi_name}</Link>
              </NextLink>
            ))}
          </Flex>
          <Flex align="center">
            {props.blogTags.map((b) => (
              <Badge colorScheme="teal" ml={2} key={b.bsi_slug}>
                <NextLink href={`/blogs/category/${b.bsi_slug}/page/1`}>
                  {b.bsi_name}
                </NextLink>
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Text as="small" suppressHydrationWarning>
          {props.publishDate.toLocaleDateString()}
        </Text>
        <NextLink href={`/blogs/${props.blogSlug}`}>
          <Link fontSize="1.7rem" fontWeight="bold">
            {props.blogTitle}
          </Link>
        </NextLink>

        <Text as="p">{props.blogCoverText}</Text>
        <NextLink href={`/blogs/${props.blogSlug}`} passHref>
          <Link fontSize="0.8rem">READ MORE &gt;&gt;</Link>
        </NextLink>
      </Flex>
    </article>
  );
};

export default BlogTile;
