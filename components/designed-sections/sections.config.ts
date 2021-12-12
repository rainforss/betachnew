import { FunctionComponent } from "react";
import BusinessBanterSection from "../home/BusinessBanterSection";
import ClientFeatureSection from "../home/ClientFeatureSection";
import HeroSection from "../home/HeroSection";
import NewsSection from "../home/NewsSection";
import ProductSection from "../home/ProductSection";
import SuccessStoriesSection from "../home/SuccessStoriesSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
};

export default sections;
