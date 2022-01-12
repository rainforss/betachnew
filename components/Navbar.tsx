import { SearchIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import * as React from "react";
import MenuItemDropdown from "./NavbarItem";

interface INavbarProps {
  menuItems: any[];
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ menuItems }) => {
  return (
    <Flex
      justify="space-around"
      fontSize="1rem"
      fontWeight="bold"
      align="center"
    >
      {menuItems.map((mi) => (
        <MenuItemDropdown
          key={mi.bsi_navigationmenuid}
          faceMenuItem={mi}
          dropdownItems={mi.bsi_NavigationMenuSubItem_NavigationMenuI}
        />
      ))}
    </Flex>
  );
};

export default Navbar;
