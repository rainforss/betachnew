import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { betachGreen } from "../utils/constants";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <Box w="100%" h="35vh" bg="blackAlpha.900">
      <Flex w="90%" h="25vh" mx="auto" py="5vh">
        <Flex
          w="33%"
          h="80%"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Text as="h5" color="whiteAlpha.900" mb={8}>
            Betach Solutions
          </Text>
          <Text as="p" color="whiteAlpha.700">
            Suite 100, 801 Manning Road NE Calgary, AB, Canada T2E 7M8
          </Text>
          <Flex flexDirection="column" color="whiteAlpha.700">
            <NextLink href="tel:+14039842473">
              <Link>+1 (403) 984-2473</Link>
            </NextLink>
            <NextLink href="mailto:info@betach.com">
              <Link>info@betach.com</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Privacy Policy & Cookies</Link>
            </NextLink>
          </Flex>
        </Flex>
        <Flex
          w="20%"
          h="100%"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Text as="h5" color="whiteAlpha.900" mb={8}>
            Info
          </Text>
          <Flex flexDirection="column" color="whiteAlpha.700">
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>About Us</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Partners</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Success Stories</Link>
            </NextLink>
          </Flex>
        </Flex>
        <Flex
          w="20%"
          h="100%"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Text as="h5" color="whiteAlpha.900" mb={8}>
            Resources
          </Text>
          <Flex flexDirection="column" color="whiteAlpha.700">
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Careers</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Blogs</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>Events</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>News</Link>
            </NextLink>
            <NextLink href="/eventsmaster/2020/6/10/build-remote-work-capabilities-securely-and-quickly">
              <Link>eBooks</Link>
            </NextLink>
          </Flex>
        </Flex>
        <Flex
          w="30%"
          h="100%"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Flex
            w="60%"
            justifyContent="space-between"
            color="whiteAlpha.900"
            mb={8}
          >
            <Icon fontSize="1.2rem" as={FaSearch} />
            <Icon fontSize="1.2rem" as={FaFacebookF} />
            <Icon fontSize="1.2rem" as={FaTwitter} />
            <Icon fontSize="1.2rem" as={FaYoutube} />
            <Icon fontSize="1.2rem" as={FaLinkedinIn} />
          </Flex>
          <Text as="p" color="whiteAlpha.700">
            Sign up for our newsletter to get the latest updates on news &
            events!
          </Text>
          <NextLink href="https://betachmarketing.microsoftcrmportals.com/subscribe">
            <Text
              as="span"
              py={4}
              px={6}
              mt={12}
              bg={betachGreen}
              color="whiteAlpha.800"
              borderRadius="300px"
              width="fit-content"
              alignSelf="center"
            >
              SIGN UP
            </Text>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
