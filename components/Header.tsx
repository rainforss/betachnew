import { Box, Flex, Image } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";

interface IHeaderProps {
  menuItems: any[];
}

const Header: React.FunctionComponent<IHeaderProps> = ({ menuItems }) => {
  return (
    <Box height="150px">
      <Flex justify="space-between" w="70%" mx="auto" h="100%" align="center">
        <Image
          src="/betachlogo.png"
          alt="Betach Logo"
          w="200px"
          objectFit="contain"
        />
        <Navbar menuItems={menuItems} />
      </Flex>
    </Box>
  );
};

export default Header;
