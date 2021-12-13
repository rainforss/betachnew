import { Box } from "@chakra-ui/layout";
import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode | string;
  headerMenuItems: any[];
  footerMenuItems: any[];
  companyLogoUrl: string;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <Box w="100%">
      <Header
        menuItems={props.headerMenuItems}
        companyLogoUrl={props.companyLogoUrl}
      />
      {props.children}
      <Footer menuItems={props.footerMenuItems} />
    </Box>
  );
};

export default Layout;
