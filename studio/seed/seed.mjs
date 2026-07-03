// One-off content seed script.
//
// Populates a Sanity dataset with the real, current content from the live
// site (elmlodgekennels.co.uk), re-fetched directly because the original
// Umbraco content cache checked into this repo (App_Data/umbraco.config)
// had drifted out of date — pricing, photos and a whole "Play Area"
// facility had been added on the live site since that snapshot was taken.
//
// Usage:
//   node --env-file=.env.seed seed/seed.mjs
//
// Requires .env.seed with:
//   SANITY_PROJECT_ID=...
//   SANITY_DATASET=production
//   SANITY_API_TOKEN=...   (a token with "Editor" or "Administrator" permissions)

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID or SANITY_API_TOKEN. Create studio/.env.seed (see seed/seed.mjs header) and re-run with --env-file=.env.seed."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function imagePath(...segments) {
  return path.join(__dirname, "images", ...segments);
}

const uploadCache = new Map();

async function uploadImage(...segments) {
  const key = segments.join("/");
  if (uploadCache.has(key)) return uploadCache.get(key);

  const filePath = imagePath(...segments);
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: path.basename(filePath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadCache.set(key, ref);
  return ref;
}

function block(text, style = "normal") {
  return {
    _type: "block",
    style,
    children: [{ _type: "span", text }],
  };
}

function key(prefix, i) {
  return `${prefix}-${i}`;
}

async function run() {
  console.log("Uploading images...");
  const [
    entranceImg,
    paddockImg,
    privateWalkImg,
    tiddlesImg,
    rioImg,
    singleKennelImg,
    doubleKennelImg,
    undercoverRunsImg,
    receptionImg1,
    receptionImg2,
    receptionImg3,
    paddockGalleryImg1,
    paddockGalleryImg2,
    paddockGalleryImg3,
    playAreaImg1,
    playAreaImg2,
    playAreaImg3,
    privateWalkGalleryImg1,
    privateWalkGalleryImg2,
  ] = await Promise.all([
    uploadImage("1001", "kennel-entrance.jpg"),
    uploadImage("1002", "exercise_paddock_main.jpg"),
    uploadImage("1003", "private_walk.jpg"),
    uploadImage("1004", "kennels-tiddles.jpg"),
    uploadImage("1006", "new-kennels-011.jpg"),
    uploadImage("1006", "kennels-empty.jpg"),
    uploadImage("2110", "img_0570.jpg"),
    uploadImage("1010", "undercover-runs.jpg"),
    uploadImage("2109", "img_0581.jpg"),
    uploadImage("1008", "reception-tiddles.jpg"),
    uploadImage("2105", "img_0562.jpg"),
    uploadImage("2103", "img_0573.jpg"),
    uploadImage("2104", "img_0572.jpg"),
    uploadImage("2100", "img_0571.jpg"),
    uploadImage("2098", "img_0561.jpg"),
    uploadImage("2101", "img_0565.jpg"),
    uploadImage("2111", "img_0583.jpg"),
    uploadImage("1009", "private-walk.jpg"),
    uploadImage("2102", "img_0564.jpg"),
  ]);

  console.log("Creating documents...");

  const kennelsPage = {
    _id: "page-kennels",
    _type: "page",
    title: "Kennels",
    slug: { _type: "slug", current: "kennels" },
    bodyText: [
      block(
        "Elm lodge is a very special place with a relaxed, friendly atmosphere with that personal touch ensuring our Dog Guests feel right at home. We ensure we have the best kennel facilities possible, so we are always looking to invest in upgrading our facilities to make sure that we can continue to provide great service."
      ),
      block(
        '"We can administer injections if required, and there is NO CHARGE for administering any kind of medication for your dog."'
      ),
      block(
        "Our Kennels are set in our beautiful gardens. A walk through the gardens takes you to reception and then on to our exercise paddock which is securely fenced for your dog's safety, and means they have the freedom to run and play lead free."
      ),
    ],
    contentPanels: [
      {
        _key: "kennel-features",
        heading: "The Kennel Features",
        content: [
          block("Flat screen TV & canvas paintings for that homely feel"),
          block("Radiator heating for a constant warm temperature for those chilly nights"),
          block("A dedicated member of staff to cater to all your dog's needs"),
          block("Double glazed windows & doors"),
          block("Radio/CD playing relaxing music to soothe & relax"),
        ],
      },
      {
        _key: "price-list",
        heading: "Price List - Per Day",
        content: [
          block(
            "This includes walks through our private walk area, meals and treats, regular checks throughout the day, and night security. Medication is given if required. Diabetic pets welcome."
          ),
          block("Daycare - £12.00"),
          block("Small Dog - £15.00"),
          block("Medium Dog - £18.00"),
          block("Large Dog - £20.00"),
          block("Extra Large Dog - £25.00"),
          block("Food is not supplied."),
        ],
      },
      {
        _key: "opening-hours",
        heading: "Opening Hours",
        content: [
          block("Business hours including daycare hours:"),
          block("Business hours: Mon - Sun, 7am - 5pm"),
          block("Daycare hours: Mon - Sun, 7am - 6pm (drop off by 3pm)"),
        ],
      },
    ],
    featuresList: [
      {
        _key: "rio",
        title: "Rio",
        image: rioImg,
        description: [block("All set for bed with his own leopard print blanket.")],
      },
      {
        _key: "tiddles",
        title: "Tiddles",
        image: tiddlesImg,
        description: [block("Enjoying his stay for the night, snuggled up in a fleece blanket.")],
      },
      {
        _key: "single-kennel",
        title: "Single Kennel",
        image: singleKennelImg,
        description: [block("Here's one of our empty boarding kennels ready for your dog!")],
      },
      {
        _key: "double-kennel",
        title: "Double Kennel",
        image: doubleKennelImg,
        description: [block("A spacious double boarding kennel ready for your dogs!")],
      },
    ],
    isMembersOnly: false,
    isContactPage: false,
  };

  const facilitiesPage = {
    _id: "page-facilities",
    _type: "page",
    title: "Facilities",
    slug: { _type: "slug", current: "facilities" },
    contentPanels: [
      {
        _key: "price-list",
        heading: "Price List - Per Day",
        content: [
          block(
            "This includes walks through our private walk area, meals and treats, regular checks throughout the day, and night security. Medication is given if required. Diabetic pets welcome."
          ),
          block("Daycare - £12.00"),
          block("Small Dog - £12.00"),
          block("Medium Dog - £15.00"),
          block("Large Dog - £18.00"),
          block("Extra Large Dog - £25.00"),
        ],
      },
    ],
    facilities: [
      {
        _key: "undercover-runs",
        title: "Undercover Runs",
        description: [block("Which provide exercise and interaction even with typical British weather.")],
        images: [undercoverRunsImg].map((img, i) => ({ ...img, _key: key("undercover", i) })),
      },
      {
        _key: "reception",
        title: "Reception",
        description: [block("Reception area which has a modern food preparation area.")],
        images: [receptionImg1, receptionImg2, receptionImg3].map((img, i) => ({
          ...img,
          _key: key("reception", i),
        })),
      },
      {
        _key: "exercise-paddock",
        title: "Exercise Paddock",
        description: [
          block("Enclosed and secure exercise paddock where your dog can have a run get regular exercise."),
        ],
        images: [paddockGalleryImg1, paddockGalleryImg2, paddockGalleryImg3].map((img, i) => ({
          ...img,
          _key: key("paddock", i),
        })),
      },
      {
        _key: "play-area",
        title: "Play Area",
        images: [playAreaImg1, playAreaImg2, playAreaImg3].map((img, i) => ({
          ...img,
          _key: key("play", i),
        })),
      },
      {
        _key: "private-walk",
        title: "Private Walk",
        description: [block("Private walks through the countryside.")],
        images: [privateWalkGalleryImg1, privateWalkGalleryImg2].map((img, i) => ({
          ...img,
          _key: key("walk", i),
        })),
      },
    ],
    isMembersOnly: false,
    isContactPage: false,
  };

  const directionsPanel = {
    _key: "directions",
    heading: "Directions from the Cromwell Rd Roundabout",
    content: [
      block("Take the 3rd exit onto Redmoor Ln"),
      block("Keep right to continue toward Belt Drove"),
      block("Turn right onto Belt Drove"),
      block("We are approximately 300 yards along the road"),
    ],
  };

  const aboutUsPage = {
    _id: "page-about-us",
    _type: "page",
    title: "About Us",
    slug: { _type: "slug", current: "about-us" },
    bodyText: [
      block("We are open Monday to Sunday. Please do not arrive after 8pm."),
      block(
        "We charge for day of arrival and day of collection. However, there is a reduction for multiple dogs and any pet not collected by 5pm will be subject to a charge of one extra day's boarding."
      ),
      block("Payment may be made by cheque accompanied by a cheque guarantee card or cash."),
      block("Please contact us to arrange a visit."),
    ],
    contentPanels: [directionsPanel],
    showMap: true,
    isMembersOnly: false,
    isContactPage: false,
  };

  const thankYouPage = {
    _id: "page-thank-you",
    _type: "page",
    title: "Thank You",
    slug: { _type: "slug", current: "thank-you" },
    bodyText: [
      block(
        "We will be sure to get back to you as soon as possible, should you need to contact us promptly please call 07429 700154."
      ),
      block("Kind Regards"),
      block("Elm Lodge Kennels"),
    ],
    isMembersOnly: false,
    isContactPage: false,
  };

  const contactUsPage = {
    _id: "page-contact-us",
    _type: "page",
    title: "Contact Us",
    slug: { _type: "slug", current: "contact-us" },
    contentPanels: [directionsPanel],
    isMembersOnly: false,
    isContactPage: true,
    recipientEmailAddress: "reception@elmlodgekennels.co.uk",
    emailSubject: "Elm Lodge Kennels Contact Form",
    thankYouPage: { _type: "reference", _ref: "page-thank-you" },
  };

  const priceList = {
    _id: "priceList",
    _type: "priceList",
    title: "Prices",
    slug: { _type: "slug", current: "prices" },
    mainContent: [
      block(
        "This includes walks through our private walk area, meals and treats, regular checks throughout the day, and night security. Medication is given if required. Diabetic pets welcome."
      ),
      block("Food is not supplied."),
    ],
    tableTitle: "Price List - Per Day",
    rows: [
      { _key: "daycare", label: "Daycare", price: "£12.00" },
      { _key: "small", label: "Small Dog", price: "£15.00" },
      { _key: "medium", label: "Medium Dog", price: "£18.00" },
      { _key: "large", label: "Large Dog", price: "£20.00" },
      { _key: "xlarge", label: "Extra Large Dog", price: "£25.00" },
    ],
  };

  const articleIndex = {
    _id: "articleIndex",
    _type: "articleIndex",
    title: "News",
    slug: { _type: "slug", current: "news" },
    pageSize: 5,
  };

  const homePage = {
    _id: "homePage",
    _type: "homePage",
    title: "Home",
    slug: { _type: "slug", current: "/" },
    bodyText: [
      block(
        "Elm lodge kennels are a family business run by Betty, who is fully licensed, based in the village of Wisbech in Cambridgeshire, we ensure a relaxed, safe and friendly atmosphere where the care and welfare of our Dog Guests are of prime importance. Set in a peaceful landscape away from any busy main roads, the quiet atmosphere and relaxing, rural setting is the perfect retreat for your dogs whilst you are away. Your dog can enjoy the benefits of our modern, heated dog kennels whilst also having access to acres of garden."
      ),
      block('"Enjoy your holiday, your dog certainly will enjoy theirs with us"', "h2"),
      block(
        "We take enormous pride in offering the highest standard of care and accommodation for your pets. Every dog is groomed and cared for individually throughout the day by our family who we promise, will cater to your dog's every whim. All at no extra cost to you, it's all part of our service."
      ),
    ],
    slideshow: [
      {
        _key: "entrance",
        image: entranceImg,
        caption: [
          block("Kennel Entrance", "h3"),
          block("Entrance into the Elm Lodge Boarding Kennels in Cambridge, Cambridgeshire."),
        ],
      },
      {
        _key: "private-walk",
        image: privateWalkImg,
        caption: [
          block("Private Walk", "h3"),
          block("Ronnie the German Shepherd enjoying one of our regular private walks through the countryside."),
        ],
      },
      {
        _key: "paddock",
        image: paddockImg,
        caption: [
          block("Dog Exercise Paddock", "h3"),
          block("Enclosed and secure exercise paddock where your dog can have a run and get regular exercise."),
        ],
      },
    ],
  };

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Elm Lodge Kennels",
    address: "8 Belt Drove Begdale Elm Wisbech, PE14 0BA",
    // Geocoded from the postcode (PE14 0BA) via api.postcodes.io.
    latitude: 52.635136,
    longitude: 0.146792,
    telephone: "07429 700154",
    email: "parkerwarden@googlemail.com",
    facebookLink: "https://www.facebook.com/Elm-Lodge-Kennels-953357804752390",
    copyrightText: "Elm lodge Kennels",
    licenseNumber: "AW038",
    creditText: "Created by Brights Ideas (Andrew Bright)",
    creditUrl: "http://brights-solutions.com",
    primaryNavigation: [
      { _type: "reference", _ref: "homePage", _key: "nav-home" },
      { _type: "reference", _ref: "page-kennels", _key: "nav-kennels" },
      { _type: "reference", _ref: "page-facilities", _key: "nav-facilities" },
      { _type: "reference", _ref: "page-about-us", _key: "nav-about" },
      { _type: "reference", _ref: "page-contact-us", _key: "nav-contact" },
    ],
  };

  const docs = [
    homePage,
    kennelsPage,
    facilitiesPage,
    aboutUsPage,
    thankYouPage,
    contactUsPage,
    priceList,
    articleIndex,
    siteSettings,
  ];

  const tx = client.transaction();
  docs.forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();

  console.log(`Seeded ${docs.length} documents into "${dataset}".`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
