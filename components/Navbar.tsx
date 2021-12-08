import { SearchIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import * as React from "react";
import MenuItemDropdown from "./NavbarItem";

interface INavbarProps {
  menuItems: any[];
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ menuItems }) => {
  return (
    <Flex justify="space-around" fontSize="0.8rem" align="center">
      {menuItems.map((mi) => (
        <MenuItemDropdown
          key={mi.bsi_linkurl}
          faceMenuItem={mi}
          dropdownItems={mi.bsi_NavigationMenuSubItem_NavigationMenuI}
        />
      ))}
    </Flex>
  );
};

export default Navbar;
