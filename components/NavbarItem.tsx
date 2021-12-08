import { Text } from "@chakra-ui/layout";
import * as React from "react";
import { MenuItem } from "../utils/types";
import NextLink from "next/link";
import { royalblue } from "../utils/constants";

interface INavbarItemProps {
  faceMenuItem: any;
  dropdownItems?: any[];
}

const NavbarItem: React.FunctionComponent<INavbarItemProps> = (props) => {
  return (
    <NextLink href={props.faceMenuItem.bsi_linkurl}>
      <Text
        as="span"
        mx={2}
        py={2}
        px={props.dropdownItems?.length !== 0 ? 1 : 4}
        bgColor={props.dropdownItems?.length !== 0 ? "transparent" : royalblue}
        borderRadius="300px"
        color={
          props.dropdownItems?.length !== 0
            ? "blackAlpha.800"
            : "whiteAlpha.800"
        }
      >
        {props.faceMenuItem.bsi_name}
      </Text>
    </NextLink>
  );
};

export default NavbarItem;
