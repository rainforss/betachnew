import { Box, Center, Flex, Heading, Text } from "@chakra-ui/layout";
import AnchorSection from "../AnchorSection";
import NextLink from "next/link";
import { DynamicsPageSection } from "../../utils/types";
import React, { useEffect, useState } from "react";
import { SlideFade } from "@chakra-ui/react";

interface IHeroSectionProps {
  dynamicsPageSection?: DynamicsPageSection;
}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({
  dynamicsPageSection,
}) => {
  const [activeComponent, setActiveComponent] = useState(0);

  useEffect(() => {
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
        id="hero-background"
        bgImage={`${dynamicsPageSection.bsi_Background.bsi_cdnurl}?fm=jpg&fl=progressive`}
        opacity={0.6}
        bgSize="cover"
        bgPos="center"
        w="100%"
        h="100vh"
        minH="80vh"
        bgAttachment="fixed"
        bgRepeat="no-repeat"
        flexDirection="column"
        position="relative"
      ></Center>
      <Center
        w="100%"
        h="100vh"
        minH="80vh"
        position="absolute"
        top={0}
        mx="auto"
      >
        {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi
          .length === 0 ? (
          <Flex w="90%" direction="column" justify="center" align="center">
            <Heading as="h5" fontSize="1.5rem" textTransform="uppercase" mb={4}>
              {dynamicsPageSection.bsi_overline}
            </Heading>
            <Heading
              color="black"
              fontSize={["2.5rem", "3.5rem"]}
              mb={6}
              opacity={1}
              textTransform="uppercase"
            >
              {dynamicsPageSection.bsi_mainheading ||
                "Your Dynamics 365 Experts"}
            </Heading>
            <Text as="h3" opacity={1} color="black" mb={12}>
              {dynamicsPageSection.bsi_subheading ||
                "Saving your business time and money by boosting productivity, collaboration, and operational agility."}
            </Text>
            {dynamicsPageSection.bsi_hasctabutton && (
              <NextLink
                href={
                  dynamicsPageSection.bsi_ctabuttonlink ||
                  "https://outlook.office365.com/owa/calendar/BetachSolutions@betach.com/bookings/"
                }
                passHref
              >
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
                  color={dynamicsPageSection.bsi_ctabuttontextcolor || "black"}
                  borderRadius="300px"
                  bgColor={dynamicsPageSection.bsi_ctabuttonbgcolor || "white"}
                  boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
                >
                  {dynamicsPageSection.bsi_ctabuttontext || "Get Started"}
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
                  dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi
                    .length)
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
                              {a.bsi_title || "Your Dynamics 365 Experts"}
                            </Heading>
                            <Text as="h3" opacity={1} color="black" mb={12}>
                              {a.bsi_subtitle ||
                                "Saving your business time and money by boosting productivity, collaboration, and operational agility."}
                            </Text>
                            {a.bsi_hasctabutton && (
                              <NextLink
                                href={
                                  a.bsi_ctabuttonlink ||
                                  "https://outlook.office365.com/owa/calendar/BetachSolutions@betach.com/bookings/"
                                }
                                passHref
                              >
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
                                  {a.bsi_ctabuttontext || "Get Started"}
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
    </AnchorSection>
  );
};
export default HeroSection;
