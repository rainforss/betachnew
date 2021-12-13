import { NavbarItem, SectionItem } from "./types";

export const CONTENTFUL_CDN_API_ROOT = "https://cdn.contentful.com";

export const D365_WEBSITE_ID = "1eb4dbcd-8959-ec11-8f8f-0022481ccfea";

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
