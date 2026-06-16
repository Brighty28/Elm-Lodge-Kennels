// One-off content seed script.
// Populates a freshly-created Sanity dataset with the real content recovered
// from the legacy Umbraco site's content cache (App_Data/umbraco.config),
// so the new site launches with real copy instead of empty documents.
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

async function uploadImage(...segments) {
  const filePath = imagePath(...segments);
  const asset = await client.assets.upload("image", readFileSync(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function block(text, style = "normal") {
  return {
    _type: "block",
    style,
    children: [{ _type: "span", text }],
  };
}

async function run() {
  console.log("Uploading images...");
  const [
    entranceImg,
    paddockImg,
    privateWalkImg,
    tiddlesImg,
    rioImg,
    emptyKennelImg,
    facilityPaddockImg,
    receptionImg,
    facilityPrivateWalkImg,
    undercoverRunsImg,
  ] = await Promise.all([
    uploadImage("1001", "kennel-entrance.jpg"),
    uploadImage("1002", "exercise_paddock_main.jpg"),
    uploadImage("1003", "private_walk.jpg"),
    uploadImage("1004", "kennels-tiddles.jpg"),
    uploadImage("1005", "kennels-rio.jpg"),
    uploadImage("1006", "kennels-empty.jpg"),
    uploadImage("1007", "exercise-paddock.jpg"),
    uploadImage("1008", "reception-tiddles.jpg"),
    uploadImage("1009", "private-walk.jpg"),
    uploadImage("1010", "undercover-runs.jpg"),
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
        heading: "THE KENNEL FEATURES:",
        content: [
          block("Flat screen TV & canvas paintings for that homely feel"),
          block("Radiator Heating for a constant warm temperature for those chilly nights"),
          block("A dedicated member of staff to cater to all your dog's needs"),
          block("Double Glazed windows & doors"),
          block("Radio/CD playing relaxing music to soothe & relax"),
        ],
      },
      {
        _key: "price-list",
        heading: "PRICES LIST - PER NIGHT",
        content: [
          block(
            "This includes walks through our private walk area, meals and treats, regular checks throughout the day, and night security. Medication is given if required. Diabetic pets welcome."
          ),
          block("Small Dog - £10.00"),
          block("Medium Dog - £12.00"),
          block("Large Dog - £12.00"),
        ],
      },
    ],
    featuresList: [
      { _key: "rio", title: "Rio", image: rioImg, description: [block("All set for bed with his own leopard print blanket.")] },
      { _key: "tiddles", title: "Tiddles", image: tiddlesImg, description: [block("Enjoying his stay for the night, snuggled up in a fleece blanket.")] },
      { _key: "boarding-kennel", title: "Boarding Kennel", image: emptyKennelImg, description: [block("Here's one of our empty boarding kennels ready for your dog!")] },
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
        heading: "PRICES LIST - PER NIGHT",
        content: [
          block(
            "This includes walks through our private walk area, meals and treats, regular checks throughout the day, and night security. Medication is given if required. Diabetic pets welcome."
          ),
          block("Small Dog - £10.00"),
          block("Medium Dog - £12.00"),
          block("Large Dog - £12.00"),
        ],
      },
    ],
    featuresList: [
      { _key: "exercise-paddock", title: "Exercise Paddock", image: facilityPaddockImg, description: [block("Enclosed and secure exercise paddock where your dog can have a run get regular exercise.")] },
      { _key: "reception", title: "Reception", image: receptionImg, description: [block("Reception area which has a modern food preparation area.")] },
      { _key: "undercover-runs", title: "Undercover Runs", image: undercoverRunsImg, description: [block("Which provide exercise and interaction even with typical British weather.")] },
      { _key: "private-walk", title: "Private Walk", image: facilityPrivateWalkImg, description: [block("Private walks through the countryside.")] },
    ],
    isMembersOnly: false,
    isContactPage: false,
  };

  const aboutUsPage = {
    _id: "page-about-us",
    _type: "page",
    title: "About Us",
    slug: { _type: "slug", current: "about-us" },
    bodyText: [
      block("We are open MONDAY TO SUNDAY. PLEASE DO NOT ARRIVE AFTER 8PM."),
      block(
        "We charge for day of arrival and day of collection. However, there is a reduction for multiple dogs and any pet not collected by 8pm will be subject to a charge of one extra day's boarding."
      ),
      block("Payment may be made by cheque accompanied by a cheque guarantee card or cash."),
      block("Please contact us to arrange a visit."),
    ],
    contentPanels: [
      {
        _key: "directions",
        heading: "Directions from the Cromwell Rd Roundabout",
        content: [
          block("Take the 3rd exit onto Redmoor Ln"),
          block("Keep right to continue toward Belt Drove"),
          block("Turn right onto Belt Drove"),
          block("We are approximately 300 yards along the road"),
        ],
      },
    ],
    isMembersOnly: false,
    isContactPage: false,
  };

  const thankYouPage = {
    _id: "page-thank-you",
    _type: "page",
    title: "Thank You",
    slug: { _type: "slug", current: "thank-you" },
    bodyText: [
      block("We will be sure to get back to you as soon as possible, should you need to contact us promptly please call 07429 700154."),
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
    bodyText: [
      block(
        "We are based in Wisbech near Cambridgeshire, If you are interested in our services give us a call on 07429 700154, email at parkerwarden@googlemail.com or fill out the form below and I'll get back to you, please get in touch!"
      ),
    ],
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
    ],
    tableTitle: "Prices List - Per Night",
    rows: [
      { _key: "small", label: "Small Dog", price: "£10.00" },
      { _key: "medium", label: "Medium Dog", price: "£12.00" },
      { _key: "large", label: "Large Dog", price: "£12.00" },
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
      block("\"Enjoy your holiday, your dog certainly will enjoy theirs with us\"", "h2"),
      block(
        "We take enormous pride in offering the highest standard of care and accommodation for your pets. Every dog is groomed and cared for individually throughout the day by our family who we promise, will cater to your dog's every whim. All at no extra cost to you, it's all part of our service."
      ),
    ],
    slideshow: [
      {
        _key: "entrance",
        image: entranceImg,
        caption: [block("Kennel Entrance", "h3"), block("Entrance into the Elm Lodge Boarding Kennels in Cambridge, Cambridgeshire.")],
      },
      {
        _key: "paddock",
        image: paddockImg,
        caption: [block("Dog Exercise Paddock", "h3"), block("Enclosed and secure exercise paddock where your dog can have a run and get regular exercise.")],
      },
      {
        _key: "private-walk",
        image: privateWalkImg,
        caption: [block("Private Walk", "h3"), block("Ronnie the German Shepherd enjoying one of our regular private walks through the countryside.")],
      },
    ],
  };

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Elm Lodge Kennels",
    address: "8 Belt Drove, Begdale, Elm, Wisbech, PE14 0BA",
    telephone: "01945 860 883",
    email: "parkerwarden@googlemail.com",
    facebookLink: "https://www.facebook.com/Elm-Lodge-Kennels-953357804752390",
    copyrightText: "Elm Lodge Kennels",
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
