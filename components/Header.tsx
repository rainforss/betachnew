import { Box, Center, Flex, Image, Link, Text } from "@chakra-ui/react";
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
      >
        <Link w="33%" href="/">
          <Image
            src={companyLogoUrl}
            alt="Betach Logo"
            w="100%"
            objectFit="contain"
          />
        </Link>
        <Navbar menuItems={menuItems} />
        <Center w={["33%", "auto"]}>
          <Text
            as="a"
            href="#"
            py={2}
            px={6}
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
        </Center>
      </Flex>
    </Box>
  );
};

export default Header;
