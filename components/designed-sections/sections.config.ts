import { FunctionComponent } from "react";
import BusinessBanterSection from "../home/BusinessBanterSection";
import ClientFeatureSection from "../home/ClientFeatureSection";
import HeroSection from "../home/HeroSection";
import NewsSection from "../home/NewsSection";
import ProductSection from "../home/ProductSection";
import SuccessStoriesSection from "../home/SuccessStoriesSection";
import BlogsDisplaySection from "../home/BlogsDisplaySection";
import SingleBlogSection from "../home/SingleBlogSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
  BlogsDisplaySection,
  SingleBlogSection,
};

export default sections;
