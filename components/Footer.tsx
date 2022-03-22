import {
  Box,
  Flex,
  Text,
  Link,
  Icon,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { DynamicsSocialPlatform } from "../utils/types";
import { dynamicsSocialPlatformMap } from "../utils/constants";
import ContactForm from "./ContactForm";

interface IFooterProps {
  menuItems: any[];
  dynamicsSocialPlatforms: DynamicsSocialPlatform[];
}

const Footer: React.FunctionComponent<IFooterProps> = ({
  menuItems,
  dynamicsSocialPlatforms,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%" minH="35vh" bg="blackAlpha.900">
      <Flex w="90%" mx="auto" py="5vh" flexWrap="wrap">
        {menuItems.map((m) => (
          <Flex
            key={m.bsi_navigationmenuitemid}
            w={[`100%`, `${70 / menuItems.length}%`]}
            h="80%"
            p={6}
            justifyContent={["center", "flex-start"]}
            align={["center", "unset"]}
            flexDirection="column"
          >
            <Text as="h5" color="whiteAlpha.900" mb={8}>
              {m.bsi_name}
            </Text>
            {m.bsi_NavigationMenuSubItem_NavigationMenuI.map((b: any) =>
              b.bsi_linkurl ? (
                <NextLink
                  href={b.bsi_linkurl || "#"}
                  key={b.bsi_navigationmenusubitemid}
                  passHref
                >
                  <Link color="whiteAlpha.700">{b.bsi_name}</Link>
                </NextLink>
              ) : (
                <Text
                  key={b.bsi_navigationmenusubitemid}
                  as="p"
                  color="whiteAlpha.700"
                >
                  {b.bsi_name}
                </Text>
              )
            )}
          </Flex>
        ))}

        <Flex
          w={["100%", "30%"]}
          h="80%"
          p={6}
          justifyContent="flex-start"
          align="center"
          flexDirection="column"
          style={{ gap: "35px" }}
        >
          <Flex w="60%" justifyContent="space-between" color="whiteAlpha.900">
            {dynamicsSocialPlatforms.map((p) => (
              <Link
                href={p.bsi_socialplatformurl}
                key={p.bsi_socialplatformid}
                role="group"
              >
                <Icon
                  fontSize="1.2rem"
                  as={
                    dynamicsSocialPlatformMap[
                      p.bsi_socialplatformchannel as number
                    ]
                  }
                  transition="transform 0.3s ease"
                  _groupHover={{ transform: "scale(1.5,1.5)" }}
                />
              </Link>
            ))}
          </Flex>
          <Text as="p" color="whiteAlpha.700">
            Sign up for our newsletter to get the latest updates on news &
            events!
          </Text>
          <Button
            py={2}
            px={6}
            transition="ease all 0.5s"
            _hover={{
              backgroundColor: "#9be368",
              boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
              color: "#fff",
              transform: "translateY(-2px)",
            }}
            color={"black"}
            borderRadius="300px"
            bgColor={"white"}
            boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
            onClick={onOpen}
          >
            MESSAGE US
          </Button>
        </Flex>
      </Flex>
      <ContactForm
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        sentTo={{ name: "", id: "" }}
      />
    </Box>
  );
};

export default Footer;
