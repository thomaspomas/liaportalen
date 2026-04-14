#!/usr/bin/env node
/**
 * Jobbsafari LIA-scraper
 * Hämtar LIA-annonser från Jobbsafari via __NEXT_DATA__ (SSR-JSON).
 * Kör med: node scraper.js
 * Skriver resultatet till: data/jobbsafari-data.js
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "sv-SE,sv;q=0.9,en;q=0.8",
  Accept: "text/html,application/xhtml+xml",
};

const SEARCH_TERMS = ["LIA", "lärande i arbete yrkeshögskola"];
const BASE = "https://jobbsafari.se";
const DELAY_MS = 400; // artig paus mellan anrop

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractNextData(html) {
  const m = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function stripHtml(str = "") {
  return str
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Normalisera deadline – sätt null för de som sitter på år 2500+ */
function normalizeDeadline(endDate) {
  if (!endDate) return null;
  const d = new Date(endDate);
  if (d.getFullYear() > 2100) return null;
  return d.toISOString().slice(0, 10);
}

/** Hämta sökresultat och returnera job-slugs */
async function fetchSearchSlugs(query) {
  const url = `${BASE}/lediga-jobb?sok=${encodeURIComponent(query)}`;
  console.log(`  Söker: ${url}`);
  const res = await fetch(url, { headers: HEADERS });
  const html = await res.text();
  const data = extractNextData(html);
  const results = data?.props?.pageProps?.jobEntries?.results ?? [];
  console.log(`  → ${results.length} träffar`);
  return results.map((r) => ({ slug: r.slug, pk: r.pk }));
}

/** Hämta fullständig annons */
async function fetchJob(slug) {
  const url = `${BASE}/jobb/${slug}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const html = await res.text();
  const data = extractNextData(html);
  return data?.props?.pageProps?.jobEntry ?? null;
}

/** Mappa Jobbsafari-jobb till LIA-portalens format */
function mapJob(job) {
  const ort =
    job.locations?.[0]?.area?.name ||
    job.locations?.[0]?.name ||
    "Sverige";

  const desc = stripHtml(job.description || "").slice(0, 700);

  const deadline = normalizeDeadline(job.endDate);

  const postedAt = job.startDate
    ? new Date(job.startDate).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const sourceUrl =
    job.apply?.href ||
    `${BASE}/jobb/${job.slug}`;

  return {
    id: `js-${job.pk}`,
    company: job.company?.name || "Okänt företag",
    role: job.title || "LIA-plats",
    ort,
    utbildning: job.subcategories?.[0] || job.category?.name || "",
    period: "",
    deadline,
    desc,
    contact: "",
    email: job.apply?.method === "email" ? (job.apply?.href || "") : "",
    antal: 1,
    postedAt,
    source: "jobbsafari.se",
    sourceUrl,
  };
}

async function main() {
  console.log("🔍 Jobbsafari LIA-scraper startar…\n");

  // Samla unika slugs från alla söktermer
  const seen = new Set();
  const slugEntries = [];

  for (const term of SEARCH_TERMS) {
    const results = await fetchSearchSlugs(term);
    for (const r of results) {
      if (!seen.has(r.pk)) {
        seen.add(r.pk);
        slugEntries.push(r);
      }
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n📋 ${slugEntries.length} unika annonser att hämta…\n`);

  const listings = [];

  for (let i = 0; i < slugEntries.length; i++) {
    const { slug, pk } = slugEntries[i];
    process.stdout.write(`  [${i + 1}/${slugEntries.length}] ${slug}…`);
    try {
      const job = await fetchJob(slug);
      if (job && job.description) {
        listings.push(mapJob(job));
        process.stdout.write(" ✓\n");
      } else {
        process.stdout.write(" (ingen beskrivning, hoppas över)\n");
      }
    } catch (e) {
      process.stdout.write(` fel: ${e.message}\n`);
    }
    if (i < slugEntries.length - 1) await sleep(DELAY_MS);
  }

  // Skriv data-fil som window-global (fungerar med file://)
  const outDir = resolve(__dirname, "data");
  mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, "jobbsafari-data.js");

  const generated = new Date().toISOString();
  const js = `// Autogenererad av scraper.js – ${generated}
// Kör "node scraper.js" för att uppdatera
window.JOBBSAFARI_DATA = ${JSON.stringify(listings, null, 2)};
`;

  writeFileSync(outFile, js, "utf8");
  console.log(`\n✅ ${listings.length} annonser sparade till data/jobbsafari-data.js`);
}

main().catch((e) => {
  console.error("Fel:", e);
  process.exit(1);
});
