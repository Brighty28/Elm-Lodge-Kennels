import { createClient } from "@sanity/client";

// Server-only — never imported from client components.
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});
