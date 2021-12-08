import { Box } from "@chakra-ui/layout";
import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode | string;
  headerMenuItems: any[];
  footerMenuItems: any[];
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <Box w="100%">
      <Header menuItems={props.headerMenuItems} />
      {props.children}
      <Footer menuItems={props.footerMenuItems} />
    </Box>
  );
};

export default Layout;
