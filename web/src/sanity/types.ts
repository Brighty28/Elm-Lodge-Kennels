import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type NavLink = {
  _type: "page" | "homePage" | "priceList" | "articleIndex";
  title: string;
  slug: string;
};

export type SiteSettings = {
  title?: string;
  address?: string;
  telephone?: string;
  email?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  copyrightText?: string;
  primaryNavigation?: NavLink[];
};

export type Feature = {
  title?: string;
  image?: SanityImageSource;
  description?: PortableTextBlock[];
};

export type Slide = {
  image?: SanityImageSource;
  caption?: PortableTextBlock[];
};

export type HomePage = {
  title?: string;
  bodyText?: PortableTextBlock[];
  slideshow?: Slide[];
  featuresList?: Feature[];
};

export type ContentPanel = {
  heading?: string;
  content?: PortableTextBlock[];
};

export type Page = {
  title: string;
  bodyText?: PortableTextBlock[];
  contentPanels?: ContentPanel[];
  featuresList?: Feature[];
  isMembersOnly?: boolean;
  isContactPage?: boolean;
  recipientEmailAddress?: string;
  emailSubject?: string;
  thankYouSlug?: string;
};

export type PriceRow = {
  label?: string;
  price?: string;
  notes?: string;
};

export type PriceList = {
  title?: string;
  mainContent?: PortableTextBlock[];
  tableTitle?: string;
  rows?: PriceRow[];
};

export type ArticleIndex = {
  title?: string;
  bodyText?: PortableTextBlock[];
  pageSize?: number;
};

export type ArticleSummary = {
  title: string;
  slug: string;
  articleDate: string;
  articleSummary?: string;
  image?: SanityImageSource;
};

export type Article = {
  title: string;
  articleDate: string;
  articleSummary?: string;
  body?: PortableTextBlock[];
  image?: SanityImageSource;
};
