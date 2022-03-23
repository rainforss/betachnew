import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";

interface IHeaderProps {
  menuItems: any[];
  companyLogoUrl: string;
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  menuItems,
  companyLogoUrl,
}) => {
  return (
    <Box
      height="150px"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      zIndex={99}
    >
      <Flex
        justify="space-between"
        w="100%"
        px={16}
        mx="auto"
        h="100%"
        align="center"
        position="relative"
      >
        <Link w={{ base: "22%", lg: "200px" }} href="/">
          <Image
            src={companyLogoUrl}
            alt="Betach Logo"
            w="100%"
            objectFit="contain"
          />
        </Link>
        <Navbar menuItems={menuItems} />
        <Center w={["auto", "auto"]}>
          <Text
            as="a"
            href="#"
            py={2}
            px={{ base: 4, xl: 6 }}
            display={{ base: "none", md: "inline" }}
            fontSize={["0.7rem", "0.8rem"]}
            transition="ease all 0.5s"
            color="black"
            background="white"
            boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
            borderRadius="500px"
            _hover={{
              backgroundColor: "#9be368",
              boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
              color: "#fff",
              transform: "translateY(-2px)",
            }}
          >
            GET IN TOUCH
          </Text>
          <IconButton
            display={{ base: "block", md: "none" }}
            colorScheme="teal"
            margin="0px"
            fontSize={{ base: "2rem", md: "1rem" }}
            w={{ base: "5rem", md: "auto" }}
            h={{ base: "5rem", md: "2.5rem" }}
            aria-label="Get in touch"
            icon={<EmailIcon />}
          />
        </Center>
      </Flex>
    </Box>
  );
};

export default Header;
