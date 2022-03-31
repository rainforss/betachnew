import { NotAllowedIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { DynamicsSocialPlatform } from "../../types/dynamics-365/common/types";
import BreadCrumb from "./BreadCrumb";

import Header from "./Header";

const Footer = dynamic(() => import("./Footer"));

interface ILayoutProps {
  children?: React.ReactNode | string;
  headerMenuItems: any[];
  footerMenuItems: any[];
  dynamicsSocialPlatforms: DynamicsSocialPlatform[];
  companyLogoUrl: string;
  preview?: boolean;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const router = useRouter();

  const exitPreview = async () => {
    await fetch(
      `/api/exit-preview?pathName=${encodeURIComponent(router.asPath)}`
    );
    router.reload();
  };
  return (
    <Box w="100%">
      <Header
        menuItems={props.headerMenuItems}
        companyLogoUrl={props.companyLogoUrl}
      />
      <BreadCrumb />
      {props.preview && (
        <Tooltip hasArrow label="Exit preview mode" bg="red.600">
          <Button
            aria-label="Exit preview mode"
            position="fixed"
            zIndex="99"
            bottom={8}
            left={8}
            colorScheme="pink"
            rightIcon={<NotAllowedIcon fontSize="20px" fontWeight="bold" />}
            onClick={exitPreview}
          >
            PREVIEW MODE
          </Button>
        </Tooltip>
      )}
      {props.children}
      <Footer
        menuItems={props.footerMenuItems}
        dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      />
    </Box>
  );
};

export default Layout;
