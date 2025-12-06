// This file now uses dynamic imports to load crossword data on demand
// This prevents Vercel build issues with large files

// Mapping object for slug to crossword file name
export const CROSSWORD_FILE_MAP = {
  "tutti-frutti-der-ungarische-obstkorb": "TUTTI_FRUTTI_XML",
  "die-wichtigsten-verben-1": "DieWichtigstenVerben",
  "zahlen-bis-100": "ZahlenBis100",
  "einfache-hauptwoerter-0003": "EinfacheHauptwoerter",
  "die-wichtigsten-verben-2": "dieWichtigstenVerben2",
  "die-wichtigsten-verben-3": "DieWichtigstenVerben3",
  "ein-raetsel-in-a2-b1": "EinRaetselInA2B1",
  "heiteres-berufe-raten": "HeiteresBerufeRaten",
  "xl-raetsel-in-a1-b2": "xlRaetselInA1B2",
  "groesser-schneller-weiter": "GroesserSchnellerWeiter",
  "abstrakte-woerter-mit-sag-seg": "AbstrakteWorterMitSagSeg",
  "grosse-und-kleine-tiere": "GroesserUndKleineTiere",
  "riesenraetsel-a1-b1": "RiesenraetselA1B1",
  "mega-raetsel-fuer-fortgeschrittene": "MegaRaetselFuerFortgeschrittene",
  "alltaegliche-begriffe": "AlltaeglicheBegriffe",
};

// Dynamic import function to load crossword data
// Using explicit imports for better webpack analysis
export async function loadCrosswordData(slug) {
  const fileName = CROSSWORD_FILE_MAP[slug];
  if (!fileName) {
    return null;
  }

  try {
    let module;
    switch (fileName) {
      case "TUTTI_FRUTTI_XML":
        module = await import("./crosswords/TUTTI_FRUTTI_XML.js");
        return module.TUTTI_FRUTTI_XML;
      case "DieWichtigstenVerben":
        module = await import("./crosswords/DieWichtigstenVerben.js");
        return module.DieWichtigstenVerben;
      case "ZahlenBis100":
        module = await import("./crosswords/ZahlenBis100.js");
        return module.ZahlenBis100;
      case "EinfacheHauptwoerter":
        module = await import("./crosswords/EinfacheHauptwoerter.js");
        return module.EinfacheHauptwoerter;
      case "dieWichtigstenVerben2":
        module = await import("./crosswords/dieWichtigstenVerben2.js");
        return module.dieWichtigstenVerben2;
      case "DieWichtigstenVerben3":
        module = await import("./crosswords/DieWichtigstenVerben3.js");
        return module.DieWichtigstenVerben3;
      case "EinRaetselInA2B1":
        module = await import("./crosswords/EinRaetselInA2B1.js");
        return module.EinRaetselInA2B1;
      case "HeiteresBerufeRaten":
        module = await import("./crosswords/HeiteresBerufeRaten.js");
        return module.HeiteresBerufeRaten;
      case "xlRaetselInA1B2":
        module = await import("./crosswords/xlRaetselInA1B2.js");
        return module.xlRaetselInA1B2;
      case "GroesserSchnellerWeiter":
        module = await import("./crosswords/GroesserSchnellerWeiter.js");
        return module.GroesserSchnellerWeiter;
      case "AbstrakteWorterMitSagSeg":
        module = await import("./crosswords/AbstrakteWorterMitSagSeg.js");
        return module.AbstrakteWorterMitSagSeg;
      case "GroesserUndKleineTiere":
        module = await import("./crosswords/GroesserUndKleineTiere.js");
        return module.GroesserUndKleineTiere;
      case "RiesenraetselA1B1":
        module = await import("./crosswords/RiesenraetselA1B1.js");
        return module.RiesenraetselA1B1;
      case "MegaRaetselFuerFortgeschrittene":
        module = await import(
          "./crosswords/MegaRaetselFuerFortgeschrittene.js"
        );
        return module.MegaRaetselFuerFortgeschrittene;
      case "AlltaeglicheBegriffe":
        module = await import("./crosswords/AlltaeglicheBegriffe.js");
        return module.AlltaeglicheBegriffe;
      default:
        return null;
    }
  } catch (error) {
    console.error(`Failed to load crossword data for ${slug}:`, error);
    return null;
  }
}
