import * as React from "react";
import {
  Box,
  Button,
  Fade,
  Flex,
  Link,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import { AnimatePresence, motion } from "framer-motion";
import { MotionFlex } from "./Navbar";

interface INavbarItemProps {
  faceMenuItem: any;
  dropdownItems: any[];
}

const NavbarItem: React.FunctionComponent<INavbarItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (props.dropdownItems.length === 0) {
    return (
      <Flex h="100%" mx="1rem" justify="center" align="center">
        <Link href={props.faceMenuItem.bsi_linkurl}>
          {props.faceMenuItem.bsi_name}
        </Link>
      </Flex>
    );
  }
  return (
    <>
      <Flex
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        bg="transparent"
        h="100%"
        w={{ base: "100%", lg: "unset" }}
        alignItems="center"
        justifyContent="center"
        mx="1rem"
        position={{ base: "relative", lg: "unset" }}
      >
        <Link>
          {props.faceMenuItem.bsi_name}
          <ChevronDownIcon />
        </Link>
        <AnimatePresence>
          {isOpen && (
            <MotionFlex
              key={props.faceMenuItem.bsi_navigationmenuitemid}
              position="absolute"
              top={{ base: "0", lg: "150px" }}
              w="100%"
              h={{ base: "100%", lg: "auto" }}
              p={6}
              alignItems="center"
              justifyContent="center"
              bg="linear-gradient(to top right, #bdebaa 0%, #7dd956 100%)"
              initial={{ left: "100%", opacity: 0 }}
              animate={{
                left: "0",
                opacity: 1,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
              exit={{
                left: "-100%",
                opacity: 0,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
              flexWrap="wrap"
              style={{ gap: "2rem" }}
            >
              {props.dropdownItems.map((i) => (
                <Link
                  key={i.bsi_navigationmenusubitemid}
                  href={i.bsi_linkurl}
                  color="darkgreen"
                >
                  {i.bsi_name}
                </Link>
              ))}
            </MotionFlex>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default NavbarItem;
