import { Flex, Image, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";

interface IBlogTileProps {
  blogTitle: string;
  blogAuthor: string[];
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
        <Text as="small" suppressHydrationWarning>
          {props.blogAuthor.map((b) => b)}{" "}
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
