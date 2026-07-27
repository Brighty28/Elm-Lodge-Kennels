import {groq} from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    address,
    latitude,
    longitude,
    telephone,
    email,
    facebookLink,
    twitterLink,
    instagramLink,
    copyrightText,
    licenseNumber,
    creditText,
    creditUrl,
    openingHours[]{days, hours},
    openingHoursNote,
    contactSubjects,
    primaryNavigation[]->{
      _type,
      title,
      "slug": slug.current
    }
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroHeadline,
    heroSubtext,
    architectureEyebrow,
    architectureHeading,
    architectureBody,
    architectureImage,
    countryLuxeHeading,
    countryLuxeSubtext,
    featuresList[]{ title, image, description },
    whatsappHeading,
    whatsappSubtext,
    whatsappChecklist,
    ctaHeading,
    ctaSubtext
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    heroSubtext,
    bodyText,
    contentPanels[]{
      heading,
      content
    },
    featuresList[]{
      title,
      image,
      description
    },
    facilities[]{
      title,
      description,
      images
    },
    bookingNotice,
    dailySchedule[]{ heading, body },
    showMap,
    isMembersOnly,
    isContactPage,
    recipientEmailAddress,
    emailSubject,
    "thankYouSlug": thankYouPage->slug.current
  }
`

export const priceListQuery = groq`
  *[_type == "priceList"][0]{
    title,
    mainContent,
    tableTitle,
    rows[]{
      label,
      price,
      notes
    }
  }
`

export const articleIndexQuery = groq`
  *[_type == "articleIndex"][0]{
    title,
    bodyText,
    pageSize
  }
`

export const articlesQuery = groq`
  *[_type == "article"] | order(articleDate desc){
    title,
    "slug": slug.current,
    articleDate,
    articleSummary,
    image
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    title,
    articleDate,
    articleSummary,
    body,
    image
  }
`

export const allPageSlugsQuery = groq`
  *[_type == "page"]{ "slug": slug.current }
`

export const allArticleSlugsQuery = groq`
  *[_type == "article"]{ "slug": slug.current }
`

export const siteMapQuery = groq`
  {
    "pages": *[_type == "page" && defined(slug.current)]{ title, "slug": slug.current } | order(title asc),
    "priceList": *[_type == "priceList"][0]{ title },
    "articleIndex": *[_type == "articleIndex"][0]{ title }
  }
`

export const searchQuery = groq`
  *[
    (_type == "page" || _type == "article" || _type == "priceList") &&
    [title, pt::text(bodyText), pt::text(body), articleSummary][@ match $term + "*"]
  ]{
    _type,
    title,
    "slug": slug.current,
    "snippet": coalesce(articleSummary, pt::text(bodyText), pt::text(body))
  }
`
