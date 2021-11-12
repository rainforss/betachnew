import { Box } from "@chakra-ui/layout";
import * as React from "react";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode | string;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <Box w="100%" h="200vh">
      <Header />
      {props.children}
    </Box>
  );
};

export default Layout;
