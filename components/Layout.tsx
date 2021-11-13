import { Box } from "@chakra-ui/layout";
import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode | string;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <Box w="100%">
      <Header />
      {props.children}
      <Footer />
    </Box>
  );
};

export default Layout;
