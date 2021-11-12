import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { menuItems } from "../utils/constants";
import MenuItemDropdown from "./NavbarItem";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <Flex justify="space-around" fontSize="0.8rem" align="center">
      {menuItems.map((mi) => (
        <MenuItemDropdown
          key={mi.face.url}
          faceMenuItem={mi.face}
          dropdownItems={mi.dropdown}
        />
      ))}
      <SearchIcon ml={2} fontSize="1.1rem" />
    </Flex>
  );
};

export default Navbar;
