import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  useMediaQuery,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import MenuItemDropdown from "./NavbarItem";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface INavbarProps {
  menuItems: any[];
}

const MotionBox = motion<BoxProps>(Box);
const MotionFlex = motion<FlexProps>(Flex);

const Navbar: React.FunctionComponent<INavbarProps> = ({ menuItems }) => {
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  const menu: Variants = {
    open: (origin) => ({
      transform: [
        "scale(1,1)",
        "scale(0.14285714285,1)",
        "scale(0.14285714285,7)",
      ],
      transformOrigin: origin,
      animationFillMode: "forwards",
      transition: {
        transform: {
          duration: 1,
          times: [0, 0.5, 1],
        },
        transformOrigin: {
          delay: 0.5,
          duration: 0,
        },
      },
    }),
    close: (origin) => ({
      transform: [
        "scale(0.14285714285,7)",
        "scale(0.14285714285,1)",
        "scale(1,1)",
      ],
      animationFillMode: "forwards",
      transformOrigin: origin,
      transition: {
        transform: {
          duration: 1,
          times: [0, 0.5, 1],
        },
        transformOrigin: {
          delay: 0.5,
          duration: 0,
        },
      },
    }),
    expand: {
      clipPath: `circle(200vh at 50% 70.5px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        delay: 0.5,
      },
    },
    collapse: {
      clipPath: "circle(25px at 50% 70.5px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <Flex
        justify="space-around"
        fontSize="1rem"
        fontWeight="bold"
        align="center"
        display="none"
        w={["33%", "auto"]}
        sx={{ "@media screen and (min-width: 480px)": { display: "flex" } }}
      >
        {menuItems.map((mi) => (
          <MenuItemDropdown
            key={mi.bsi_navigationmenuid}
            faceMenuItem={mi}
            dropdownItems={mi.bsi_NavigationMenuSubItem_NavigationMenuI}
          />
        ))}
      </Flex>
      <MotionBox
        w="calc(100vw)"
        h="100vh"
        bg="white"
        position="absolute"
        top="0"
        left="0"
        display="block"
        sx={{ "@media screen and (min-width: 480px)": { display: "none" } }}
        clipPath="circle(25px at 50% 70.5px)"
        animate={menuOpen ? "expand" : "collapse"}
        variants={menu}
      >
        <Flex
          mt="60px"
          w="30px"
          h="21px"
          mx="auto"
          display={["flex", "none"]}
          flexDirection="column"
          justify="space-between"
          onClick={() => setMenuOpen((prevstate) => !prevstate)}
        >
          <MotionBox
            initial={false}
            alignSelf="flex-end"
            height="3px"
            width="30px"
            bgColor="black"
            style={{ transformOrigin: "right 50%" }}
            custom={menuOpen ? "top right" : "right 50%"}
            animate={menuOpen ? "open" : "close"}
            variants={menu}
          ></MotionBox>
          <MotionBox
            initial={false}
            alignSelf="center"
            height="3px"
            width="30px"
            bgColor="black"
            style={{ transformOrigin: "center" }}
            custom="center"
            animate={menuOpen ? "open" : "close"}
            variants={menu}
          ></MotionBox>
          <MotionBox
            initial={false}
            alignSelf="flex-start"
            height="3px"
            width="30px"
            bgColor="black"
            style={{ transformOrigin: "left 50%" }}
            custom={menuOpen ? "bottom left" : "left 50%"}
            animate={menuOpen ? "open" : "close"}
            variants={menu}
          ></MotionBox>
        </Flex>
        <Flex
          mt={24}
          h="60vh"
          flexDir="column"
          justify="space-around"
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
      </MotionBox>
    </>
  );
};

export default Navbar;
