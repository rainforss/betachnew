import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import * as React from "react";
import Carousel from "react-multi-carousel";
import { DynamicsPageSection, PageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import "react-multi-carousel/lib/styles.css";
import { betachGreen } from "../../utils/constants";

interface ISuccessStoriesSectionProps {
  pageSection?: PageSection;
  dynamicsPageSection?: DynamicsPageSection;
}

const SuccessStoriesSection: React.FunctionComponent<ISuccessStoriesSectionProps> =
  ({ pageSection, dynamicsPageSection }) => {
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
    if (pageSection) {
      return (
        <AnchorSection
          sectionId={pageSection.fields.sectionId || "success-stories"}
          key={pageSection.sys.id}
        >
          <Box w="100%" mb={24} pb={24}>
            <Flex flexDirection="column" w="90%" mx="auto" align="center">
              <Heading
                color="blackAlpha.900"
                fontSize="2.5rem"
                fontWeight="bold"
                mb={6}
                mt={24}
              >
                {pageSection.fields.sectionMainHeading || "Success Stories"}
              </Heading>
            </Flex>
            <Box
              w="90%"
              h="20px"
              mx="auto"
              mt={8}
              mb={16}
              bg={betachGreen}
            ></Box>
            {pageSection.fields.carouselImages && (
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
                  {pageSection.fields.carouselImages.map((c) => (
                    <Center height="100px" key={c.sys.id}>
                      <Image
                        objectFit="contain"
                        width={100}
                        height={100}
                        src={c.fields.file.url}
                        alt={c.fields.file.fileName}
                      />
                    </Center>
                  ))}
                </Carousel>
              </Box>
            )}
          </Box>
        </AnchorSection>
      );
    }
    if (dynamicsPageSection) {
      return (
        <AnchorSection
          sectionId={dynamicsPageSection.bsi_sectionid || "success-stories"}
          key={dynamicsPageSection.bsi_pagesectionid}
        >
          <Box w="100%" mb={24} pb={24}>
            <Flex flexDirection="column" w="90%" mx="auto" align="center">
              <Heading
                color="blackAlpha.900"
                fontSize="2.5rem"
                fontWeight="bold"
                mb={6}
                mt={24}
              >
                {dynamicsPageSection.bsi_mainheading || "Success Stories"}
              </Heading>
            </Flex>
            <Box
              w="90%"
              h="20px"
              mx="auto"
              mt={8}
              mb={16}
              bg={betachGreen}
            ></Box>
            {dynamicsPageSection.bsi_ImageAsset_PageSection_bsi_PageSectio && (
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
                  {dynamicsPageSection.bsi_ImageAsset_PageSection_bsi_PageSectio.map(
                    (c: any) => (
                      <Center height="100px" key={c.bsi_imageassetid}>
                        <Image
                          mx="auto"
                          objectFit="contain"
                          maxWidth="80%"
                          maxH="100px"
                          src={`${c.bsi_cdnurl}?fm=jpg&fl=progressive`}
                          alt={c.bsi_alttext}
                        />
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
