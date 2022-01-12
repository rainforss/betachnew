import { ChakraProps, ResponsiveValue, Text } from "@chakra-ui/react";
import * as React from "react";

interface IAnchorSectionProps extends ChakraProps {
  sectionId: string;
}

const AnchorSection: React.FunctionComponent<IAnchorSectionProps> = ({
  sectionId,
  children,
  ...chakraProps
}) => {
  return (
    <Text as="section" {...chakraProps} id={sectionId}>
      {children}
    </Text>
  );
};

export default AnchorSection;
