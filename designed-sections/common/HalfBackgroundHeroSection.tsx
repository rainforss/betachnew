import { Center, Flex, Heading, Box, SlideFade, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import * as React from "react";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";

interface IHalfBackgroundHeroSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const HalfBackgroundHeroSection: React.FunctionComponent<
  IHalfBackgroundHeroSectionProps
> = ({ dynamicsPageSection }) => {
  const [activeComponent, setActiveComponent] = React.useState(0);

  React.useEffect(() => {
    if (!dynamicsPageSection) {
      return;
    }
    const nextPage = () => {
      setActiveComponent((prevState) => {
        if (
          prevState ===
          dynamicsPageSection?.bsi_AttachedComponent_bsi_PageSection_bsi
            .length -
            1
        ) {
          return 0;
        } else {
          return prevState + 1;
        }
      });
    };
    let timer = setInterval(() => nextPage(), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [
    dynamicsPageSection,
    dynamicsPageSection?.bsi_AttachedComponent_bsi_PageSection_bsi.length,
  ]);

  if (!dynamicsPageSection) {
    return null;
  }

  return (
    <AnchorSection
      height="100vh"
      w="100%"
      sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
      key={dynamicsPageSection.bsi_pagesectionid}
    >
      <Center
        mx="auto"
        w="80%"
        h="100vh"
        minH="80vh"
        flexDirection="row"
        position="relative"
      >
        <Center w="50%" h="100vh" minH="80vh" top={0} mx="auto">
          {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi
            .length === 0 ? (
            <Flex
              w="90%"
              direction="column"
              justify="center"
              align="flex-start"
            >
              <Heading
                as="h5"
                fontSize="1.5rem"
                textTransform="uppercase"
                mb={4}
                color={dynamicsPageSection.bsi_overlinetextcolor || "inherit"}
              >
                {dynamicsPageSection.bsi_overline}
              </Heading>
              <Heading
                color={
                  dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"
                }
                fontSize={["2.5rem", "3.5rem"]}
                mb={6}
                opacity={1}
                textTransform="uppercase"
              >
                {dynamicsPageSection.bsi_mainheading}
              </Heading>
              <Text
                as="h3"
                opacity={1}
                color={dynamicsPageSection.bsi_subheadingtextcolor || "inherit"}
                mb={12}
              >
                {dynamicsPageSection.bsi_subheading}
              </Text>
              {dynamicsPageSection.bsi_hasctabutton && (
                <NextLink href={dynamicsPageSection.bsi_ctabuttonlink} passHref>
                  <Text
                    as="a"
                    py={2}
                    px={6}
                    transition="ease all 0.5s"
                    _hover={{
                      backgroundColor: "#9be368",
                      boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
                      color: "#fff",
                      transform: "translateY(-2px)",
                    }}
                    color={
                      dynamicsPageSection.bsi_ctabuttontextcolor || "black"
                    }
                    borderRadius="300px"
                    bgColor={
                      dynamicsPageSection.bsi_ctabuttonbgcolor || "white"
                    }
                    boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
                  >
                    {dynamicsPageSection.bsi_ctabuttontext}
                  </Text>
                </NextLink>
              )}
            </Flex>
          ) : (
            <Flex
              w="90vw"
              overflow="hidden"
              justify="flex-start"
              align="center"
              zIndex={10}
            >
              <Flex
                w="270vw"
                align="center"
                transform={`translateX(-${
                  activeComponent *
                  (100 /
                    dynamicsPageSection
                      .bsi_AttachedComponent_bsi_PageSection_bsi.length)
                }%)`}
              >
                {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi.map(
                  (a, index) => {
                    if (index <= 2) {
                      return (
                        <Box w="90vw" key={a.bsi_attachedcomponentid}>
                          <SlideFade
                            in={activeComponent === index}
                            offsetX="100px"
                            style={{ height: "100%" }}
                            reverse={false}
                            transition={{
                              enter: { duration: 0.5 },
                            }}
                          >
                            <Flex
                              direction="column"
                              justify="center"
                              align="center"
                            >
                              <Heading
                                as="h5"
                                fontSize="1.5rem"
                                textTransform="uppercase"
                                mb={4}
                              >
                                {a.bsi_overline}
                              </Heading>
                              <Heading
                                color="black"
                                fontSize={["2.5rem", "3.5rem"]}
                                mb={6}
                                opacity={1}
                                textTransform="uppercase"
                              >
                                {a.bsi_title}
                              </Heading>
                              <Text as="h3" opacity={1} color="black" mb={12}>
                                {a.bsi_subtitle}
                              </Text>
                              {a.bsi_hasctabutton && (
                                <NextLink href={a.bsi_ctabuttonlink} passHref>
                                  <Text
                                    as="a"
                                    py={2}
                                    px={6}
                                    transition="ease all 0.5s"
                                    _hover={{
                                      backgroundColor: "#9be368",
                                      boxShadow:
                                        "0px 15px 20px rgba(46, 229, 157, 0.4)",
                                      color: "#fff",
                                      transform: "translateY(-2px)",
                                    }}
                                    color={a.bsi_ctabuttontextcolor || "black"}
                                    borderRadius="300px"
                                    bgColor={a.bsi_ctabuttonbgcolor || "white"}
                                    boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
                                  >
                                    {a.bsi_ctabuttontext}
                                  </Text>
                                </NextLink>
                              )}
                            </Flex>
                          </SlideFade>
                        </Box>
                      );
                    }
                  }
                )}
              </Flex>
            </Flex>
          )}
        </Center>
        <Center w="50%" h="100%">
          <Image
            src={dynamicsPageSection.bsi_Background.bsi_cdnurl}
            alt={dynamicsPageSection.bsi_Background.bsi_alttext}
            width="240"
            height="562.5"
          />
        </Center>
      </Center>
    </AnchorSection>
  );
};

export default HalfBackgroundHeroSection;
