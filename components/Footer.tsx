import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { betachGreen } from "../utils/constants";

interface IFooterProps {
  menuItems: any[];
}

const Footer: React.FunctionComponent<IFooterProps> = ({ menuItems }) => {
  return (
    <Box w="100%" h="35vh" bg="blackAlpha.900">
      <Flex w="90%" mx="auto" py="5vh">
        {menuItems.map((m) => (
          <Flex
            key={m.bsi_navigationmenuitemid}
            w="22%"
            h="80%"
            px={6}
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Text as="h5" color="whiteAlpha.900" mb={8}>
              {m.bsi_name}
            </Text>
            {m.bsi_NavigationMenuSubItem_NavigationMenuI.map((b: any) =>
              b.bsi_linkurl ? (
                <NextLink
                  href={b.bsi_linkurl || "#"}
                  key={b.bsi_navigationmenusubitemid}
                  passHref
                >
                  <Link color="whiteAlpha.700">{b.bsi_name}</Link>
                </NextLink>
              ) : (
                <Text
                  key={b.bsi_navigationmenusubitemid}
                  as="p"
                  color="whiteAlpha.700"
                >
                  {b.bsi_name}
                </Text>
              )
            )}
          </Flex>
        ))}

        <Flex
          w="30%"
          h="100%"
          justifyContent="flex-start"
          align="center"
          flexDirection="column"
          style={{ gap: "35px" }}
        >
          <Flex w="60%" justifyContent="space-between" color="whiteAlpha.900">
            <Icon fontSize="1.2rem" as={FaFacebookF} />
            <Icon fontSize="1.2rem" as={FaTwitter} />
            <Icon fontSize="1.2rem" as={FaYoutube} />
            <Icon fontSize="1.2rem" as={FaLinkedinIn} />
          </Flex>
          <Text as="p" color="whiteAlpha.700">
            Sign up for our newsletter to get the latest updates on news &
            events!
          </Text>
          <NextLink
            href="https://betachmarketing.microsoftcrmportals.com/subscribe"
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
              color={"black"}
              borderRadius="300px"
              bgColor={"white"}
              boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
            >
              SIGN UP
            </Text>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
