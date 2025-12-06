"use client";

import CrosswordGame from "./CrosswordGame";
import {
  DieWichtigstenVerben,
  TUTTI_FRUTTI_XML,
  ZahlenBis100,
  EinfacheHauptwoerter,
  DieWichtigstenVerben3,
  EinRaetselInA2B1,
  HeiteresBerufeRaten,
  xlRaetselInA1B2,
  GroesserSchnellerWeiter,
  AbstrakteWorterMitSagSeg,
  GroesserUndKleineTiere,
  RiesenraetselA1B1,
  MegaRaetselFuerFortgeschrittene,
  AlltaeglicheBegriffe,
  dieWichtigstenVerben2,
} from "./data/crosswordData";
// Mapping object for slug to XML data
const CROSSWORD_DATA_MAP = {
  "tutti-frutti-der-ungarische-obstkorb": TUTTI_FRUTTI_XML,
  "die-wichtigsten-verben-1": DieWichtigstenVerben,
  "zahlen-bis-100": ZahlenBis100,
  "einfache-hauptwoerter-0003": EinfacheHauptwoerter,
  "die-wichtigsten-verben-2": dieWichtigstenVerben2,
  "die-wichtigsten-verben-3": DieWichtigstenVerben3,
  "ein-raetsel-in-a2-b1": EinRaetselInA2B1,
  "heiteres-berufe-raten": HeiteresBerufeRaten,
  "xl-raetsel-in-a1-b2": xlRaetselInA1B2,
  "groesser-schneller-weiter": GroesserSchnellerWeiter,
  "abstrakte-woerter-mit-sag-seg": AbstrakteWorterMitSagSeg,
  "grosse-und-kleine-tiere": GroesserUndKleineTiere,
  "riesenraetsel-a1-b1": RiesenraetselA1B1,
  "mega-raetsel-fuer-fortgeschrittene": MegaRaetselFuerFortgeschrittene,
  "alltaegliche-begriffe": AlltaeglicheBegriffe,
};

export default function CrosswordGameWrapper({ slug }) {
  console.log("slug", slug);

  const xmlData = CROSSWORD_DATA_MAP[slug];
  console.log("xmlData", xmlData);

  if (!xmlData) {
    return null; // or return a "Not Found" component
  }

  return <CrosswordGame xmlData={xmlData} />;
}
