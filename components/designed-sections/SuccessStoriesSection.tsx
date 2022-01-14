import { Box, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import Carousel from "react-multi-carousel";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import "react-multi-carousel/lib/styles.css";

interface ISuccessStoriesSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const SuccessStoriesSection: React.FunctionComponent<
  ISuccessStoriesSectionProps
> = ({ dynamicsPageSection }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (dynamicsPageSection) {
    return (
      <AnchorSection
        sectionId={dynamicsPageSection.bsi_sectionid}
        key={dynamicsPageSection.bsi_pagesectionid}
        py={24}
      >
        <Box w="100%">
          <Flex flexDirection="column" w="90%" mx="auto" align="center">
            <Text
              as="h4"
              color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
              fontWeight="bold"
              fontSize="1.2rem"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_overline}
            </Text>
            <Heading
              as="h2"
              color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
              fontSize={["1.75rem", "2.5rem"]}
              fontWeight="bold"
              mb={24}
              p={4}
              borderStyle="dotted"
              borderColor={dynamicsPageSection.bsi_bordercolor || "transparent"}
              borderWidth="0 0 5px 0"
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_mainheading}
            </Heading>
          </Flex>
          {dynamicsPageSection.bsi_PageSection_bsi_ImageAsset_bsi_ImageA && (
            <Box w="90%" mx="auto">
              <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                arrows={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {dynamicsPageSection.bsi_PageSection_bsi_ImageAsset_bsi_ImageA.map(
                  (c) => (
                    <Center height="100px" key={c.bsi_imageassetid}>
                      <Link href={c.bsi_referencingurl}>
                        <Image
                          objectFit="contain"
                          width="200px"
                          height="100px"
                          src={`${c.bsi_cdnurl}?fm=jpg&fl=progressive`}
                          alt={c.bsi_alttext}
                        />
                      </Link>
                    </Center>
                  )
                )}
              </Carousel>
            </Box>
          )}
        </Box>
      </AnchorSection>
    );
  }
  return null;
};

export default SuccessStoriesSection;
