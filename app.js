/* =============================================
   LIA-portalen – App Logic
   ============================================= */

"use strict";

// ── SAMPLE DATA ─────────────────────────────────────────────────────────────
const SEED_DATA = [
  // ── IT & TEKNIK ────────────────────────────────────────────────────────────
  {
    id: "seed-1",
    company: "Knowit AB",
    role: "Frontendutvecklare",
    ort: "Stockholm",
    utbildning: "Webbutvecklare",
    period: "VT 2026",
    deadline: "2025-11-30",
    desc: "Hos oss på Knowit får du möjlighet att arbeta med moderna webbtekniker såsom React, TypeScript och GraphQL. Du ingår i ett produktteam som arbetar agilt och du kommer att bidra till verkliga kundprojekt redan från dag ett.",
    contact: "Sara Lindqvist",
    email: "lia@knowit.se",
    antal: 2,
    postedAt: "2025-10-01",
  },
  {
    id: "seed-2",
    company: "Consid AB",
    role: "Backendutvecklare .NET",
    ort: "Göteborg",
    utbildning: "Systemutvecklare",
    period: "HT 2025",
    deadline: "2025-10-20",
    desc: "Vi söker en LIA-student med intresse för .NET och C#. Du kommer att arbeta med mikrotjänster och REST API:er i en molnbaserad miljö på Azure. Goda möjligheter till anställning efter avslutad utbildning.",
    contact: "Johan Berg",
    email: "rekrytering@consid.se",
    antal: 1,
    postedAt: "2025-09-15",
  },
  {
    id: "seed-3",
    company: "Sogeti Sverige",
    role: "Testare / QA-ingenjör",
    ort: "Malmö",
    utbildning: "Mjukvarutestare",
    period: "VT 2026",
    deadline: "2025-12-15",
    desc: "Sogeti erbjuder en LIA-plats inom kvalitetssäkring och testning. Du lär dig automated testing med Selenium och Cypress, och arbetar i en erfaren QA-avdelning med starka rutiner och mentorskap.",
    contact: "Maria Johansson",
    email: "maria.johansson@sogeti.com",
    antal: 2,
    postedAt: "2025-10-05",
  },
  {
    id: "seed-4",
    company: "Atea Sverige AB",
    role: "IT-infrastrukturtekniker",
    ort: "Uppsala",
    utbildning: "IT-infrastruktur och molntjänster",
    period: "HT 2025",
    deadline: "2025-10-25",
    desc: "Atea söker en LIA-student med intresse för nätverk, servrar och molntjänster. Du kommer att arbeta med installation och drift av hårdvara, samt få praktisk erfarenhet av Azure och Microsoft 365.",
    contact: "Erik Nilsson",
    email: "hr.sweden@atea.se",
    antal: 1,
    postedAt: "2025-09-20",
  },
  {
    id: "seed-5",
    company: "Ramboll Sweden AB",
    role: "Data Analyst",
    ort: "Stockholm",
    utbildning: "Data Scientist",
    period: "VT 2026",
    deadline: "2025-11-20",
    desc: "Ramboll söker en dataanalytiker-LIA som vill arbeta med hållbarhetsprojekt. Du analyserar data med Python och Power BI och presenterar insikter till ingenjörsteam som arbetar med stadsplanering och energioptimering.",
    contact: "Anna Persson",
    email: "anna.persson@ramboll.com",
    antal: 1,
    postedAt: "2025-09-28",
  },
  {
    id: "seed-6",
    company: "Nexer Group",
    role: "iOS-utvecklare (Swift)",
    ort: "Linköping",
    utbildning: "Apputveckling",
    period: "VT 2026",
    deadline: "2025-12-01",
    desc: "Nexer Group erbjuder en LIA-plats inom iOS-utveckling. Du arbetar med SwiftUI och UIKit i projekt för stora svenska företag. Vi har ett starkt mentorprogram och du ägnar delar av din tid åt interna lärprojekt.",
    contact: "David Ek",
    email: "talent@nexergroup.com",
    antal: 2,
    postedAt: "2025-10-02",
  },
  {
    id: "seed-7",
    company: "Visma Consulting",
    role: "UX-designer",
    ort: "Stockholm",
    utbildning: "UX-design",
    period: "HT 2025",
    deadline: "2025-10-31",
    desc: "Visma söker en UX-designer för LIA som vill arbeta med användarcentrerad design för affärssystem. Du deltar i design sprints, gör användartester och skapar prototyper i Figma.",
    contact: "Lena Ström",
    email: "lia-visma@visma.com",
    antal: 1,
    postedAt: "2025-09-10",
  },
  {
    id: "seed-8",
    company: "Norrtelje Energi",
    role: "IT-support / Servicedesk",
    ort: "Norrtälje",
    utbildning: "IT-support",
    period: "VT 2026",
    deadline: "2026-01-15",
    desc: "Lär dig IT-support i praktiken hos ett lokalt energibolag. Arbetsuppgifterna inkluderar helpdesk, driftstöd, hantering av användarkonton i Active Directory och onboarding av ny hårdvara.",
    contact: "Thomas Grahn",
    email: "it@norteljenergi.se",
    antal: 1,
    postedAt: "2025-10-06",
  },
  {
    id: "seed-9",
    company: "Capio Sverige",
    role: "Systemförvaltare vård-IT",
    ort: "Göteborg",
    utbildning: "Systemutvecklare",
    period: "VT 2026",
    deadline: "2025-11-28",
    desc: "Capio söker LIA-student för arbete med systemförvaltning och integration av vårdsystem. Du arbetar nära IT- och verksamhetsteamet och lär dig hantera kritiska system i en reglerad miljö.",
    contact: "Malin Svensson",
    email: "malin.svensson@capio.se",
    antal: 1,
    postedAt: "2025-10-07",
  },
  {
    id: "seed-10",
    company: "Afry AB",
    role: "Inbyggda system / Embedded",
    ort: "Västerås",
    utbildning: "Inbyggda system",
    period: "HT 2025",
    deadline: "2025-10-18",
    desc: "Afry erbjuder LIA-plats inom embedded systems med fokus på C och C++ för realtidssystem. Du arbetar med hårdvarunära programmering för industri- och fordonssektorn i ett team av erfarna ingenjörer.",
    contact: "Björn Lindberg",
    email: "bjorn.lindberg@afry.com",
    antal: 1,
    postedAt: "2025-09-05",
  },
  {
    id: "seed-11",
    company: "Specsavers",
    role: "IT-projektassistent",
    ort: "Malmö",
    utbildning: "IT-projektledning",
    period: "VT 2026",
    deadline: "2025-12-20",
    desc: "Stöd vårt nordiska IT-projektteam med dokumentation, uppföljning och koordinering av projekt. Du lär dig arbeta med Jira, Confluence och agila metoder i en internationell miljö.",
    contact: "Petra Holm",
    email: "petra.holm@specsavers.com",
    antal: 1,
    postedAt: "2025-10-08",
  },
  {
    id: "seed-12",
    company: "CGI Sverige AB",
    role: "Cybersecurity-student",
    ort: "Stockholm",
    utbildning: "Cybersäkerhet",
    period: "VT 2026",
    deadline: "2025-12-10",
    desc: "CGI söker en säkerhetsstudent för LIA inom penetrationstestning och sårbarhetsbedömning. Du arbetar under handledning av certifierade säkerhetsexperter och deltar i kunduppdrag.",
    contact: "Anders Lund",
    email: "anders.lund@cgi.com",
    antal: 1,
    postedAt: "2025-10-04",
  },

  // ── SAMHÄLLSBYGGNAD ────────────────────────────────────────────────────────
  {
    id: "sb-1",
    company: "NCC Sverige AB",
    role: "Byggnadsingenjör – KA/BAS-P",
    ort: "Stockholm",
    utbildning: "Byggteknik",
    period: "VT 2026",
    deadline: "2025-12-05",
    desc: "NCC erbjuder LIA-plats för byggteknikstudenter med inriktning mot kontrollansvar (KA) och BAS-P. Du följer ett pågående bostadsprojekt i Stockholmsregionen och lär dig hantera byggmöten, ÄTA-arbeten, KMA-dokumentation och tidsplaner i BIM-miljö.",
    contact: "Karin Andersson",
    email: "karin.andersson@ncc.se",
    antal: 2,
    postedAt: "2025-10-10",
    source: "arbetsformedlingen.se",
  },
  {
    id: "sb-2",
    company: "Göteborgs Stad – Stadsbyggnadskontoret",
    role: "Planarkitektassistent",
    ort: "Göteborg",
    utbildning: "Stadsplanering",
    period: "VT 2026",
    deadline: "2025-12-01",
    desc: "Stadsbyggnadskontoret i Göteborg erbjuder en LIA-plats för studenter inom samhällsbyggnad eller stadsplanering. Du deltar i detaljplanearbete, remisshantering och samrådsprocesser. Erfarenhet av AutoCAD eller ArcGIS är meriterande.",
    contact: "Henrik Roos",
    email: "henrik.roos@stadbyggnad.goteborg.se",
    antal: 1,
    postedAt: "2025-10-09",
    source: "arbetsformedlingen.se",
  },
  {
    id: "sb-3",
    company: "Metria AB",
    role: "GIS-ingenjör",
    ort: "Uppsala",
    utbildning: "Geografiska informationssystem",
    period: "VT 2026",
    deadline: "2026-01-10",
    desc: "Metria söker en LIA-student med intresse för GIS och geodata. Du arbetar med insamling, analys och visualisering av geografisk information i ArcGIS och QGIS, och bidrar till projekt inom infrastruktur, naturvård och samhällsplanering.",
    contact: "Sofie Melin",
    email: "sofie.melin@metria.se",
    antal: 1,
    postedAt: "2025-10-11",
    source: "jobbsafari.se",
  },
  {
    id: "sb-4",
    company: "Fastighetsbyrån AB",
    role: "Fastighetsmäklarassistent",
    ort: "Malmö",
    utbildning: "Fastighetsmäklare",
    period: "HT 2025",
    deadline: "2025-10-28",
    desc: "Fastighetsbyrån i Malmö söker en LIA-student som vill lära sig mäklaryrket inifrån. Du deltar i visningar, upprättar objektsbeskrivningar, hanterar budgivningar och stöttar mäklarna i den dagliga verksamheten.",
    contact: "Pontus Ek",
    email: "pontus.ek@fastighetsbyran.se",
    antal: 1,
    postedAt: "2025-09-22",
    source: "jobbsafari.se",
  },
  {
    id: "sb-5",
    company: "Länsstyrelsen Skåne",
    role: "Miljö- och planingenjör",
    ort: "Kristianstad",
    utbildning: "Samhällsbyggnad och miljö",
    period: "VT 2026",
    deadline: "2025-12-19",
    desc: "Länsstyrelsen Skåne erbjuder LIA inom miljöskydd och fysisk planering. Du arbetar med tillsyn av miljöfarliga verksamheter, granskar detaljplaner ur ett länsperspektiv och deltar i arbetet med vattenförvaltning och naturvårdsärenden.",
    contact: "Åsa Lindgren",
    email: "asa.lindgren@lansstyrelsen.se",
    antal: 1,
    postedAt: "2025-10-03",
    source: "arbetsformedlingen.se",
  },
  {
    id: "sb-6",
    company: "Peab Sverige AB",
    role: "Projektingenjör – Anläggning",
    ort: "Sundsvall",
    utbildning: "Byggteknik",
    period: "VT 2026",
    deadline: "2025-12-08",
    desc: "Peab söker en LIA-student till ett av våra anläggningsprojekt i Mellansverige. Du arbetar med mängdförteckningar, uppföljning av kostnader och tid, myndighetskontakter och kvalitetsdokumentation. Körkort B är ett krav.",
    contact: "Lars Björk",
    email: "lars.bjork@peab.se",
    antal: 2,
    postedAt: "2025-10-08",
  },
  {
    id: "sb-7",
    company: "Botkyrka kommun",
    role: "Miljöinspektör – livsmedelskontroll",
    ort: "Tumba",
    utbildning: "Miljöinspektör",
    period: "VT 2026",
    deadline: "2026-01-20",
    desc: "Botkyrka kommuns miljö- och hälsoskyddsenhet erbjuder LIA för studenter på miljöinspektörsprogrammet. Du genomför inspektioner av livsmedelsverksamheter, skriver tjänsteutlåtanden och hanterar klagomålsärenden under handledning av erfarna inspektörer.",
    contact: "Carina Holm",
    email: "carina.holm@botkyrka.se",
    antal: 1,
    postedAt: "2025-10-12",
    source: "arbetsformedlingen.se",
  },
  {
    id: "sb-8",
    company: "WSP Sverige AB",
    role: "Lantmäteriassistent",
    ort: "Luleå",
    utbildning: "Lantmäteri",
    period: "VT 2026",
    deadline: "2025-12-15",
    desc: "WSP söker en lantmäterisstudent för LIA inom fastighetsbildning och ledningsrätt. Du deltar i förrättningsprocesser, utför fältmätningar med totalstation och GNSS, och upprättar förrättningshandlingar under handledning.",
    contact: "Mikael Strand",
    email: "mikael.strand@wsp.com",
    antal: 1,
    postedAt: "2025-10-07",
    source: "jobbsafari.se",
  },

  // ── VÅRD & OMSORG ──────────────────────────────────────────────────────────
  {
    id: "vo-1",
    company: "Stockholms Stad – Äldreomsorg",
    role: "Undersköterska – hemtjänst",
    ort: "Stockholm",
    utbildning: "Undersköterska",
    period: "VT 2026",
    deadline: "2026-01-15",
    desc: "Stockholms stad söker LIA-studenter till hemtjänsten i flera stadsdelar. Du arbetar med personlig omvårdnad, aktivering och social samvaro med äldre brukare. Du får arbeta nära erfarna undersköterskor och sjuksköterskor med tydlig handledning.",
    contact: "Fatima Al-Rashid",
    email: "fatima.al-rashid@stockholm.se",
    antal: 4,
    postedAt: "2025-10-10",
    source: "arbetsformedlingen.se",
  },
  {
    id: "vo-2",
    company: "Region Uppsala – Akademiska sjukhuset",
    role: "Medicinsk sekreterare",
    ort: "Uppsala",
    utbildning: "Medicinsk sekreterare",
    period: "VT 2026",
    deadline: "2025-12-12",
    desc: "Akademiska sjukhuset erbjuder LIA för medicinska sekreterare inom ortopedi och kirurgi. Du skriver diktat, hanterar remisser och tidbokning i TakeCare, och lär dig journalföring enligt patientdatalagen. Kurs i medicinsk terminologi och ITK krävs.",
    contact: "Eva Söderberg",
    email: "eva.soderberg@akademiska.se",
    antal: 2,
    postedAt: "2025-10-06",
    source: "jobbsafari.se",
  },
  {
    id: "vo-3",
    company: "Sahlgrenska Universitetssjukhuset",
    role: "Hälso- och sjukvårdsadministratör",
    ort: "Göteborg",
    utbildning: "Hälso- och sjukvårdsadministration",
    period: "VT 2026",
    deadline: "2025-12-20",
    desc: "Sahlgrenska söker LIA-studenter inom hälso- och sjukvårdsadministration till mottagningar inom medicin och neurologi. Arbetet innefattar patientadministration, schemaläggning, statistikrapportering och stöd till enhetschefer.",
    contact: "Ingrid Carlsson",
    email: "ingrid.carlsson@vgregion.se",
    antal: 2,
    postedAt: "2025-10-09",
    source: "arbetsformedlingen.se",
  },
  {
    id: "vo-4",
    company: "Frösunda Omsorg AB",
    role: "Socialpedagog – LSS boende",
    ort: "Norrköping",
    utbildning: "Socialpedagog",
    period: "VT 2026",
    deadline: "2025-12-01",
    desc: "Frösunda erbjuder LIA-plats för socialpedagoger vid ett gruppboende för vuxna med intellektuell funktionsnedsättning enligt LSS. Du arbetar med genomförandeplaner, aktivitetsstöd och dokumentation i Treserva. Stor vikt läggs vid bemötande och kommunikation.",
    contact: "Sandra Olsson",
    email: "sandra.olsson@frosunda.se",
    antal: 1,
    postedAt: "2025-10-04",
    source: "jobbsafari.se",
  },
  {
    id: "vo-5",
    company: "Region Skåne – Skånes universitetssjukhus",
    role: "Specialistundersköterska – akutsjukvård",
    ort: "Lund",
    utbildning: "Specialistundersköterska",
    period: "VT 2026",
    deadline: "2025-12-16",
    desc: "Sus i Lund söker en LIA-student på specialistundersköterskeprogrammet till akutmottagningen. Du arbetar med triagering, provtagning, EKG och assistans vid akuta ingrepp under handledning av specialistutbildad personal. Tidigare erfarenhet som undersköterska är ett krav.",
    contact: "Marcus Nilsson",
    email: "marcus.nilsson@skane.se",
    antal: 2,
    postedAt: "2025-10-11",
    source: "arbetsformedlingen.se",
  },
  {
    id: "vo-6",
    company: "Attendo Sverige AB",
    role: "Demensspecialiserad omsorgspersonal",
    ort: "Helsingborg",
    utbildning: "Undersköterska",
    period: "HT 2025",
    deadline: "2025-10-24",
    desc: "Attendo söker LIA-studenter till ett av våra äldreboenden med demensinriktning i Helsingborg. Du lär dig validationsmetoden, personcentrerad omvårdnad och dokumentation i Procapita. Vi erbjuder tätt mentorskap och daglig reflektion.",
    contact: "Britt-Marie Svensson",
    email: "britt-marie.svensson@attendo.se",
    antal: 2,
    postedAt: "2025-09-25",
    source: "jobbsafari.se",
  },
  {
    id: "vo-7",
    company: "Region Stockholm – Psykiatri Nordväst",
    role: "Undersköterska – psykiatrisk slutenvård",
    ort: "Stockholm",
    utbildning: "Vård och omsorg med inriktning psykiatri",
    period: "VT 2026",
    deadline: "2026-01-08",
    desc: "Region Stockholm erbjuder LIA på en psykiatrisk heldygnsvårdsavdelning i Sollentuna. Du deltar i omvårdnadsarbete, motiverande samtal och återhämtningsorienterat arbete. Handledning sker av legitimerad personal. Vi söker dig som är trygg i mötet med människor i kris.",
    contact: "Johan Ekström",
    email: "johan.ekstrom@regionstockholm.se",
    antal: 2,
    postedAt: "2025-10-08",
    source: "arbetsformedlingen.se",
  },
  {
    id: "vo-8",
    company: "Aleris Primärvård",
    role: "Hälsoadministratör – vårdcentral",
    ort: "Örebro",
    utbildning: "Hälso- och sjukvårdsadministration",
    period: "VT 2026",
    deadline: "2025-12-30",
    desc: "Aleris Primärvård söker en LIA-student till vår vårdcentral i Örebro. Du hanterar receptionsarbete, remissflöden, journaldokumentation i Cosmic och stöttar läkare och sjuksköterskor administrativt. Goda kunskaper i svenska krävs.",
    contact: "Helena Björn",
    email: "helena.bjorn@aleris.se",
    antal: 1,
    postedAt: "2025-10-05",
    source: "jobbsafari.se",
  },
];

// ── STATE ────────────────────────────────────────────────────────────────────
const state = {
  listings: [],
  filtered: [],
  search: "",
  filterOrt: "",
  filterUtbildning: "",
  sort: "newest",
};

// ── STORAGE ──────────────────────────────────────────────────────────────────
function getUserListings() {
  try {
    return JSON.parse(localStorage.getItem("lia_listings") || "[]");
  } catch {
    return [];
  }
}

function loadListings() {
  const jsData = Array.isArray(window.JOBBSAFARI_DATA) ? window.JOBBSAFARI_DATA : [];
  state.listings = [...jsData, ...SEED_DATA, ...getUserListings()];
}

function saveUserListing(listing) {
  try {
    const stored = getUserListings();
    stored.push(listing);
    localStorage.setItem("lia_listings", JSON.stringify(stored));
  } catch (e) {
    console.error("Could not save listing:", e);
  }
}

// ── ARBETSFÖRMEDLINGEN JOBSEARCH API ─────────────────────────────────────────
function stripHtml(str) {
  return str.replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
}

async function fetchAFListings() {
  const countEl = document.getElementById("results-count");
  countEl.textContent = "Hämtar annonser från Arbetsförmedlingen…";

  const url =
    "https://jobsearch.api.jobtechdev.se/search" +
    "?q=LIA+yrkesh%C3%B6gskola" +
    "&limit=30" +
    "&sort=pubdate-desc";

  try {
    const resp = await fetch(url, { headers: { accept: "application/json" } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const hits = Array.isArray(data.hits) ? data.hits : [];

    const afListings = hits.map(h => {
      const rawDesc = h.description?.text || h.description?.text_formatted || "";
      const desc    = stripHtml(rawDesc).slice(0, 700);
      const ort     = h.workplace_address?.municipality || h.workplace_address?.city || "Sverige";
      const edu     = h.occupation?.label || h.occupation_field?.label || "";
      const deadline = h.application_deadline
        ? h.application_deadline.slice(0, 10)
        : "";
      const postedAt = h.publication_date
        ? h.publication_date.slice(0, 10)
        : new Date().toISOString().slice(0, 10);
      const sourceUrl =
        h.webpage_url ||
        `https://arbetsformedlingen.se/platsbanken/annonser/${h.id}`;

      return {
        id:        `af-${h.id}`,
        company:   h.employer?.name || "Okänt företag",
        role:      h.headline || "LIA-plats",
        ort,
        utbildning: edu,
        period:    "",
        deadline,
        desc,
        contact:   h.application_details?.reference || "",
        email:     h.application_details?.email || "",
        antal:     h.number_of_vacancies || 1,
        postedAt,
        source:    "arbetsformedlingen.se",
        sourceUrl,
      };
    }).filter(l => l.desc.length > 20);

    state.listings = [...afListings, ...SEED_DATA, ...getUserListings()];
    rebuildDropdowns();
    applyFilters();
  } catch (err) {
    console.warn("AF JobSearch fetch failed:", err);
    // Fall back silently to seed data already loaded
    applyFilters();
  }
}

// ── DOM REFS ─────────────────────────────────────────────────────────────────
const grid        = document.getElementById("listings-grid");
const emptyState  = document.getElementById("empty-state");
const countEl     = document.getElementById("results-count");
const searchInput = document.getElementById("search-input");
const clearBtn    = document.getElementById("search-clear");
const selOrt      = document.getElementById("filter-ort");
const selEdu      = document.getElementById("filter-utbildning");
const selSort     = document.getElementById("filter-sort");

// ── NAVIGATION ───────────────────────────────────────────────────────────────
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`view-${view}`).classList.add("active");
  });
});

// ── POPULATE FILTER DROPDOWNS ────────────────────────────────────────────────
function buildDropdowns() {
  const orter = [...new Set(state.listings.map(l => l.ort))].sort();
  const utbs  = [...new Set(state.listings.map(l => l.utbildning))].sort();

  orter.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o; opt.textContent = o;
    selOrt.appendChild(opt);
  });

  utbs.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u; opt.textContent = u;
    selEdu.appendChild(opt);
  });
}

function rebuildDropdowns() {
  // Keep selections, rebuild with all current data
  const prevOrt = selOrt.value;
  const prevEdu = selEdu.value;
  selOrt.innerHTML  = '<option value="">Alla orter</option>';
  selEdu.innerHTML  = '<option value="">Alla utbildningar</option>';
  buildDropdowns();
  selOrt.value = prevOrt;
  selEdu.value = prevEdu;
}

// ── FILTER & SORT ────────────────────────────────────────────────────────────
function applyFilters() {
  const q   = state.search.toLowerCase();
  let data  = state.listings.filter(l => {
    if (state.filterOrt && l.ort !== state.filterOrt) return false;
    if (state.filterUtbildning && l.utbildning !== state.filterUtbildning) return false;
    if (q) {
      const hay = `${l.company} ${l.role} ${l.ort} ${l.utbildning} ${l.desc}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  data.sort((a, b) => {
    switch (state.sort) {
      case "ort":         return a.ort.localeCompare(b.ort, "sv");
      case "utbildning":  return a.utbildning.localeCompare(b.utbildning, "sv");
      case "deadline":    return (a.deadline || "9999") < (b.deadline || "9999") ? -1 : 1;
      default:            return new Date(b.postedAt) - new Date(a.postedAt);
    }
  });

  state.filtered = data;
  renderListings();
}

// ── RENDER ───────────────────────────────────────────────────────────────────
function renderListings() {
  grid.innerHTML = "";
  const count = state.filtered.length;
  countEl.textContent = count === 0
    ? "Inga platser hittades"
    : count === 1 ? "1 LIA-plats hittad" : `${count} LIA-platser hittade`;

  if (count === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  state.filtered.forEach(listing => {
    grid.appendChild(createCard(listing));
  });
}

function createCard(l) {
  const card = document.createElement("article");
  card.className = "card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${l.role} på ${l.company}`);

  const isNew       = daysSince(l.postedAt) <= 7;
  const deadlineTxt = formatDeadline(l.deadline);
  const isSoon      = isDeadlineSoon(l.deadline);
  const initials    = l.company.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  card.innerHTML = `
    <div class="card-header">
      <div class="card-logo">${initials}</div>
      ${isNew ? '<span class="card-new-badge">Ny</span>' : ""}
    </div>
    <div class="card-company">${escHtml(l.company)}</div>
    <div class="card-role">${escHtml(l.role)}</div>
    <div class="card-meta">
      <span class="tag tag-ort">📍 ${escHtml(l.ort)}</span>
      <span class="tag tag-edu">🎓 ${escHtml(l.utbildning)}</span>
      ${l.antal > 1 ? `<span class="tag tag-spots">👥 ${l.antal} platser</span>` : ""}
    </div>
    <p class="card-desc">${escHtml(l.desc)}</p>
    <div class="card-footer">
      <span class="${isSoon ? "deadline-soon" : ""}">${deadlineTxt}</span>
      <span class="card-cta">Läs mer →</span>
    </div>
  `;

  card.addEventListener("click", () => openModal(l));
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openModal(l); });
  return card;
}

// ── MODAL ────────────────────────────────────────────────────────────────────
const overlay   = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const closeBtn  = document.getElementById("modal-close");

function openModal(l) {
  const isSoon = isDeadlineSoon(l.deadline);
  modalBody.innerHTML = `
    <p class="modal-company">${escHtml(l.company)}</p>
    <h2 id="modal-title" class="modal-role">${escHtml(l.role)}</h2>
    <div class="modal-tags">
      <span class="tag tag-ort">📍 ${escHtml(l.ort)}</span>
      <span class="tag tag-edu">🎓 ${escHtml(l.utbildning)}</span>
      ${l.antal > 1 ? `<span class="tag tag-spots">👥 ${l.antal} platser</span>` : ""}
    </div>
    ${l.period ? `<div class="modal-section"><h3>Period</h3><p>${escHtml(l.period)}</p></div>` : ""}
    <div class="modal-section">
      <h3>Om rollen</h3>
      <p>${escHtml(l.desc).replace(/\n/g, "<br>")}</p>
    </div>
    ${l.contact ? `<div class="modal-section"><h3>Kontaktperson</h3><p>${escHtml(l.contact)}</p></div>` : ""}
    ${l.deadline ? `
      <div class="modal-section">
        <h3>Sista ansökningsdag</h3>
        <p class="${isSoon ? "deadline-soon" : ""}">${formatDeadlineLong(l.deadline)}</p>
      </div>` : ""}
    ${l.source ? `<div class="modal-section"><h3>Källa</h3><p>Hämtad från <strong>${escHtml(l.source)}</strong></p></div>` : ""}
    ${l.email
      ? `<a class="modal-apply-btn" href="mailto:${encodeURIComponent(l.email)}?subject=LIA-ansökan – ${encodeURIComponent(l.role)}">✉️ Ansök via e-post</a>`
      : l.sourceUrl
        ? `<a class="modal-apply-btn" href="${escHtml(l.sourceUrl)}" target="_blank" rel="noopener">🔗 ${l.source === "jobbsafari.se" ? "Ansök hos arbetsgivaren" : "Ansök på Arbetsförmedlingen"}</a>`
        : ""
    }
  `;
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ── POST FORM ────────────────────────────────────────────────────────────────
const postForm   = document.getElementById("post-form");
const descField  = document.getElementById("f-desc");
const descCount  = document.getElementById("desc-count");
const formSuccess = document.getElementById("form-success");

descField.addEventListener("input", () => {
  const len = descField.value.length;
  descCount.textContent = `${len} / 800`;
  descCount.style.color = len > 800 ? "var(--red)" : "var(--gray-400)";
});

postForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm()) return;

  const newListing = {
    id:          `user-${Date.now()}`,
    company:     val("f-company"),
    role:        val("f-role"),
    ort:         val("f-ort"),
    utbildning:  val("f-utbildning"),
    period:      val("f-period"),
    deadline:    val("f-deadline"),
    desc:        val("f-desc"),
    email:       val("f-email"),
    antal:       parseInt(val("f-antal") || "1", 10),
    postedAt:    new Date().toISOString().slice(0, 10),
  };

  saveUserListing(newListing);
  state.listings.push(newListing);

  // Reset and show success
  postForm.reset();
  descCount.textContent = "0 / 800";
  formSuccess.classList.remove("hidden");
  rebuildDropdowns();
  applyFilters();

  // Hide success after 8 s
  setTimeout(() => formSuccess.classList.add("hidden"), 8000);
});

document.getElementById("go-to-listings").addEventListener("click", e => {
  e.preventDefault();
  formSuccess.classList.add("hidden");
  document.querySelector('[data-view="student"]').click();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function validateForm() {
  const fields = [
    { id: "f-company",    msg: "Ange företagsnamn" },
    { id: "f-role",       msg: "Ange roll/titel" },
    { id: "f-ort",        msg: "Ange ort" },
    { id: "f-utbildning", msg: "Ange relevant utbildning" },
    { id: "f-desc",       msg: "Beskriv rollen (minst 30 tecken)" },
    { id: "f-email",      msg: "Ange en giltig e-postadress" },
  ];
  let ok = true;
  fields.forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    const errEl = el.closest(".form-group").querySelector(".field-error");
    const value = el.value.trim();
    let error = "";

    if (!value) {
      error = msg;
    } else if (id === "f-desc" && value.length < 30) {
      error = "Beskrivningen är för kort (minst 30 tecken)";
    } else if (id === "f-email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Ange en giltig e-postadress";
    }

    if (error) {
      el.classList.add("invalid");
      errEl.textContent = error;
      ok = false;
    } else {
      el.classList.remove("invalid");
      errEl.textContent = "";
    }
  });
  return ok;
}

// ── EVENT LISTENERS ──────────────────────────────────────────────────────────
searchInput.addEventListener("input", () => {
  state.search = searchInput.value.trim();
  clearBtn.classList.toggle("visible", state.search.length > 0);
  applyFilters();
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.search = "";
  clearBtn.classList.remove("visible");
  applyFilters();
  searchInput.focus();
});

selOrt.addEventListener("change",  () => { state.filterOrt = selOrt.value; applyFilters(); });
selEdu.addEventListener("change",  () => { state.filterUtbildning = selEdu.value; applyFilters(); });
selSort.addEventListener("change", () => { state.sort = selSort.value; applyFilters(); });

function resetFilters() {
  searchInput.value = "";
  selOrt.value  = "";
  selEdu.value  = "";
  selSort.value = "newest";
  clearBtn.classList.remove("visible");
  state.search = "";
  state.filterOrt = "";
  state.filterUtbildning = "";
  state.sort = "newest";
  applyFilters();
}

document.getElementById("reset-filters").addEventListener("click", resetFilters);
document.getElementById("empty-reset").addEventListener("click",  resetFilters);

// Form field live-validation clear
["f-company","f-role","f-ort","f-utbildning","f-desc","f-email"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", () => {
    el.classList.remove("invalid");
    el.closest(".form-group").querySelector(".field-error").textContent = "";
  });
});

// ── HELPERS ──────────────────────────────────────────────────────────────────
function val(id) { return document.getElementById(id).value.trim(); }

function escHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function daysSince(dateStr) {
  if (!dateStr) return 999;
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
}

function formatDeadline(dateStr) {
  if (!dateStr) return "Ej angiven";
  const d = new Date(dateStr);
  const days = Math.ceil((d - Date.now()) / 86400000);
  if (days < 0)  return "Deadline passerad";
  if (days === 0) return "Sista dag idag!";
  if (days <= 7)  return `⚠ ${days} dag${days !== 1 ? "ar" : ""} kvar`;
  return `Sista ansökningsdag: ${d.toLocaleDateString("sv-SE", { day: "numeric", month: "short", year: "numeric" })}`;
}

function formatDeadlineLong(dateStr) {
  if (!dateStr) return "Ej angiven";
  const d = new Date(dateStr);
  const days = Math.ceil((d - Date.now()) / 86400000);
  const formatted = d.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  if (days < 0)  return `${formatted} (deadline passerad)`;
  if (days === 0) return `${formatted} – sista dag idag!`;
  if (days <= 7)  return `${formatted} (${days} dag${days !== 1 ? "ar" : ""} kvar!)`;
  return formatted;
}

function isDeadlineSoon(dateStr) {
  if (!dateStr) return false;
  const days = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
  return days >= 0 && days <= 7;
}

// ── BOOT ─────────────────────────────────────────────────────────────────────
loadListings();
buildDropdowns();
applyFilters();
fetchAFListings(); // async – uppdaterar listan när AF svarar
