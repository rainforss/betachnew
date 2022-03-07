import { FunctionComponent } from "react";
import BusinessBanterSection from "./BusinessBanterSection";
import ClientFeatureSection from "./ClientFeatureSection";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import ProductSection from "./ProductSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import BlogsDisplaySection from "./BlogsDisplaySection";
import SingleBlogSection from "./SingleBlogSection";
import ContactFormSection from "./ContactFormSection";
import ProductOverviewSection from "./ProductOverviewSection";
import ProductFeatureVideoLeftSection from "./ProductFeatureVideoLeftSection";
import ProductFeatureVideoRightSection from "./ProductFeatureVideoRightSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
  BlogsDisplaySection,
  SingleBlogSection,
  ContactFormSection,
  ProductOverviewSection,
  ProductFeatureVideoLeftSection,
  ProductFeatureVideoRightSection,
};

export default sections;
