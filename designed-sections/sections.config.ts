import { FunctionComponent } from "react";
import BusinessBanterSection from "./common/BusinessBanterSection";
import ClientFeatureSection from "./common/ClientFeatureSection";
import HeroSection from "./common/HeroSection";
import NewsSection from "./common/NewsSection";
import ProductSection from "./common/ProductSection";
import SuccessStoriesSection from "./common/SuccessStoriesSection";
import BlogsDisplaySection from "./common/BlogsDisplaySection";
import SingleBlogSection from "./common/SingleBlogSection";
import ContactFormSection from "./common/ContactFormSection";
import ProductOverviewSection from "./common/ProductOverviewSection";
import ProductFeatureVideoLeftSection from "./common/ProductFeatureVideoLeftSection";
import ProductFeatureVideoRightSection from "./common/ProductFeatureVideoRightSection";
import HalfBackgroundHeroSection from "./common/HalfBackgroundHeroSection";
import OrganizationTeamSection from "./common/OrganizationTeamSection";
import FeaturedPersonQuoteSection from "./common/FeaturedPersonQuoteSection";
import TextOnlySection from "./common/TextOnlySection";

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
  HalfBackgroundHeroSection,
  OrganizationTeamSection,
  FeaturedPersonQuoteSection,
  TextOnlySection,
};

export default sections;
