// src/lib/appwriteConfig.js
// ─────────────────────────────────────────────────────────────
//  Safe for CLIENT components only ("use client" pages/components)
//  Do NOT import this in Server Components or API Route handlers.
//  For server-side Appwrite calls, use the admin SDK with a server key.
// ─────────────────────────────────────────────────────────────

import { Client, Databases, Storage } from 'appwrite';

// ── Validate env vars at module load (fails loudly in dev) ──
const ENDPOINT  = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT   = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!ENDPOINT || !PROJECT) {
  throw new Error(
    '[appwriteConfig] Missing env vars.\n' +
    'Add NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID to .env.local'
  );
}

// ── Singleton pattern — one client instance for the whole app ──
let clientInstance = null;

function getClient() {
  if (clientInstance) return clientInstance;

  clientInstance = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT);

  return clientInstance;
}

const client    = getClient();
const databases = new Databases(client);
const storage   = new Storage(client);

export { client, databases, storage };

// ── Named exports for convenience ──
export const APPWRITE_CONFIG = {
  endpoint  : ENDPOINT,
  projectId : PROJECT,

  // ── Database & Collection IDs ──
  // Store these as env vars too so you never hardcode IDs in components.
  // Add them to .env.local as:
  databaseId          : process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  collectionPartnerId : process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PARTNER,
};