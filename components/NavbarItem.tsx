import { Link } from "@chakra-ui/layout";
import * as React from "react";
import NextLink from "next/link";

interface INavbarItemProps {
  faceMenuItem: any;
  dropdownItems?: any[];
}

const NavbarItem: React.FunctionComponent<INavbarItemProps> = (props) => {
  return (
    <NextLink href={props.faceMenuItem.bsi_linkurl || "#"} passHref>
      <Link
        mx={2}
        py={2}
        px={props.dropdownItems?.length !== 0 ? 1 : 4}
        bgColor={"transparent"}
        borderRadius="300px"
        color={"blackAlpha.800"}
        textTransform="uppercase"
        fontSize={["2rem", "1rem"]}
      >
        {props.faceMenuItem.bsi_name}
      </Link>
    </NextLink>
  );
};

export default NavbarItem;
