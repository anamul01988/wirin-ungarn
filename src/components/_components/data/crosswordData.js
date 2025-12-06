// This file uses lazy loading with individual import functions
// Each crossword is loaded on-demand to prevent Vercel build memory issues
// Webpack can statically analyze these imports for proper code splitting

// Mapping object for slug to loader function
const CROSSWORD_LOADERS = {
  "tutti-frutti-der-ungarische-obstkorb": () =>
    import("./crosswords/TUTTI_FRUTTI_XML").then((m) => m.TUTTI_FRUTTI_XML),
  "die-wichtigsten-verben-1": () =>
    import("./crosswords/DieWichtigstenVerben").then(
      (m) => m.DieWichtigstenVerben
    ),
  "zahlen-bis-100": () =>
    import("./crosswords/ZahlenBis100").then((m) => m.ZahlenBis100),
  "einfache-hauptwoerter-0003": () =>
    import("./crosswords/EinfacheHauptwoerter").then(
      (m) => m.EinfacheHauptwoerter
    ),
  "die-wichtigsten-verben-2": () =>
    import("./crosswords/dieWichtigstenVerben2").then(
      (m) => m.dieWichtigstenVerben2
    ),
  "die-wichtigsten-verben-3": () =>
    import("./crosswords/DieWichtigstenVerben3").then(
      (m) => m.DieWichtigstenVerben3
    ),
  "ein-raetsel-in-a2-b1": () =>
    import("./crosswords/EinRaetselInA2B1").then((m) => m.EinRaetselInA2B1),
  "heiteres-berufe-raten": () =>
    import("./crosswords/HeiteresBerufeRaten").then(
      (m) => m.HeiteresBerufeRaten
    ),
  "xl-raetsel-in-a1-b2": () =>
    import("./crosswords/xlRaetselInA1B2").then((m) => m.xlRaetselInA1B2),
  "groesser-schneller-weiter": () =>
    import("./crosswords/GroesserSchnellerWeiter").then(
      (m) => m.GroesserSchnellerWeiter
    ),
  "abstrakte-woerter-mit-sag-seg": () =>
    import("./crosswords/AbstrakteWorterMitSagSeg").then(
      (m) => m.AbstrakteWorterMitSagSeg
    ),
  "grosse-und-kleine-tiere": () =>
    import("./crosswords/GroesserUndKleineTiere").then(
      (m) => m.GroesserUndKleineTiere
    ),
  "riesenraetsel-a1-b1": () =>
    import("./crosswords/RiesenraetselA1B1").then((m) => m.RiesenraetselA1B1),
  "mega-raetsel-fuer-fortgeschrittene": () =>
    import("./crosswords/MegaRaetselFuerFortgeschrittene").then(
      (m) => m.MegaRaetselFuerFortgeschrittene
    ),
  "alltaegliche-begriffe": () =>
    import("./crosswords/AlltaeglicheBegriffe").then(
      (m) => m.AlltaeglicheBegriffe
    ),
};

// Async function to load crossword data by slug
export async function loadCrosswordData(slug) {
  const loader = CROSSWORD_LOADERS[slug];
  if (!loader) {
    return null;
  }
  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load crossword data for ${slug}:`, error);
    return null;
  }
}
