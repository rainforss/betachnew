import * as React from "react";

interface IAnchorSectionProps {
  sectionId: string;
}

const AnchorSection: React.FunctionComponent<IAnchorSectionProps> = (props) => {
  return <section id={props.sectionId}>{props.children}</section>;
};

export default AnchorSection;
