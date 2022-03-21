import { NavbarItem, SectionItem } from "./types";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const CONTENTFUL_CDN_API_ROOT = "https://cdn.contentful.com";

export const D365_WEBSITE_ID = "1eb4dbcd-8959-ec11-8f8f-0022481ccfea";

export const BLOGS_PLAGE_LIMIT = 4;

export const royalblue = "#173f5e";

export const betachGreen = "#9be368";

export const sections: SectionItem[] = [
  { name: "introduction", sectionId: "introduction" },
  { name: "Tarin Resources", sectionId: "tarin-resources-casestudy" },
];

export const menuItems: NavbarItem[] = [
  {
    face: { name: "About", url: "/about" },
    dropdown: [{ name: "About", url: "/about" }],
  },
  {
    face: { name: "Dynamics 365", url: "/dynamics-365" },
    dropdown: [{ name: "About", url: "/about" }],
  },
  {
    face: { name: "Our Services", url: "/our-services" },
    dropdown: [{ name: "About", url: "/about" }],
  },
  {
    face: { name: "Resources", url: "/resources" },
    dropdown: [{ name: "About", url: "/about" }],
  },
  { face: { name: "Get in Touch", url: "/contact" }, dropdown: [] },
  { face: { name: "Customer Portal", url: "/customer-portal" }, dropdown: [] },
];

export const dynamicsSocialPlatformMap: { [key: number]: IconType } = {
  606600000: FaLinkedinIn,
  606600001: FaInstagram,
  606600002: FaYoutube,
  606600003: FaFacebookF,
  606600004: FaTwitter,
  606600005: FaPinterest,
  606600006: FaWhatsapp,
};
