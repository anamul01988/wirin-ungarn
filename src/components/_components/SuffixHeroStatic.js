"use client";
import React, { useState } from "react";

const SuffixHeroGrammarExplanations = () => {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panelId) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  return (
    <>
      <style>{`
        .exp_title h3 {
          margin-bottom: 12px;
          color: #436f4d;
        }
 
        .explanations {
          margin-top: 38px;
        }
 
        .explanations .exp_toggle_des {
          padding: 0.5em 1em;
          border-left: 2px solid #ddd;
          margin-bottom: 0.5em;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.2s ease;
        }
 
        .explanations .exp_toggle_des.closed {
          max-height: 0;
          opacity: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
 
        .explanations .exp_toggle_des.open {
          max-height: 2000px;
          opacity: 1;
        }
 
        .explanations .exp_toggle_title {
          position: relative;
          padding: 0.5em 1.5em 0.5em 1em;
          cursor: pointer;
          background: #436f4d;
          margin-bottom: 0.2em;
          border: 1px solid #eee;
          border-radius: 4px;
        }
 
        .explanations .exp_toggle_title::after {
          content: '▼';
          position: absolute;
          right: 1em;
          top: 50%;
          transform: translateY(-50%) rotate(0deg);
          transition: transform 0.25s ease;
          font-size: 0.8em;
          color: #fefbff;
        }
 
        .explanations .exp_toggle_title.active::after {
          transform: translateY(-50%) rotate(-180deg);
        }
 
        .exp_toggle_title h3 {
          padding: 0px;
          text-transform: initial;
          font-size: 17px;
          color: white;
          margin: 0;
        }
 
        p.suff_addtxt {
          background: rgb(67 111 77 / 17%);
          font-weight: bold;
          padding: 10px;
          margin-top: 25px;
          border-radius: 5px;
        }
 
        .exp_toggle_des ul {
          margin-left: 20px;
        }
 
        .exp_toggle_des li {
          margin-bottom: 8px;
        }
 
        .exp_toggle_des strong {
          color: #333;
        }
 
        .exp_toggle_des a {
          color: #436f4d;
          text-decoration: underline;
        }
 
        .exp_toggle_des a:hover {
          color: #2d4a33;
        }
      `}</style>

      <div className="explanations">
        <div className="exp_title">
          <h3>Erläuterung der Grammatik, die Du im Spiel kennen solltest</h3>
        </div>
        <div className="exp_toggle">
          {/* Panel 1: Besitz-Suffixe */}
          <div
            className={`exp_toggle_title ${
              activePanel === "possessive" ? "active" : ""
            }`}
            onClick={() => togglePanel("possessive")}
          >
            <h3>Besitz-Suffixe</h3>
          </div>
          <div
            className={`exp_toggle_des ${
              activePanel === "possessive" ? "open" : "closed"
            }`}
          >
            <strong>Ungarische Possessivsuffixe: Kurzüberblick</strong>
            <p>
              Possessivsuffixe (birtokos személyjelek) hängen direkt am
              Substantiv und zeigen Besitz an. Die Wahl des Suffixes richtet
              sich nach:
            </p>
            <ul>
              <li>
                <strong>Besitzer:</strong> Person &amp; Zahl (ich, du, er/es,
                wir, ihr, sie)
              </li>
              <li>
                <strong>Besitz:</strong> Zahl (Singular/Plural)
              </li>
              <li>
                <strong>Vokalharmonie (VH)</strong>
              </li>
              <li>
                <strong>Wortstamm-Endung:</strong> Vokal oder Konsonant
                (beeinflusst oft Bindevokal/-konsonant).
              </li>
            </ul>
            <strong>Übersicht der Suffix-Varianten (aus der Liste):</strong>
            <ul>
              <li>
                <strong>1. Person Singular (Einzahl) (én - mein):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -m (nach Vokal: <em>autóm</em>); -am/-em/-om
                    (nach Kons.: <em>házam, könyvem</em>)
                  </li>
                  <li>
                    Pl. Besitz: -im/-aim/-eim (<em>ruháim, könyveim</em>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>2. Person Singular (Einzahl) (te - dein):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -d (nach Vokal: <em>macskád</em>); -ad/-ed/-od
                    (nach Kons.: <em>tollad, kerted</em>)
                  </li>
                  <li>
                    Pl. Besitz: -id/-aid/-eid (<em>ablakaid</em>); -jeid (oft
                    nach Vokal/best. Kons.: <em>filmjeid</em>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>3. Person Singular (Einzahl) (ő - sein):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -a/-e (nach Kons.: <em>háza, étele</em>);
                    -ja/-je (oft nach Vokal/best. Kons.: <em>autója, kertje</em>
                    )
                  </li>
                  <li>
                    Pl. Besitz: -i/-ai/-ei (nach Kons.:{" "}
                    <em>ceruzái, barátai</em>); -jai/-jei (oft nach Vokal/best.
                    Kons.: <em>hobbijai</em>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>1. Person Plural (Mehrzahl) (mi - unser):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -nk (nach Vokal: <em>autónk</em>); -unk/-ünk
                    (nach Kons.: <em>házunk, kertünk</em>)
                  </li>
                  <li>
                    Pl. Besitz: -ink/-aink/-eink (
                    <em>kutyáink, barátaink, könyveink</em>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>2. Person Plural (Mehrzahl) (ti - euer):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -tok/-tek/-tök (nach Vokal:{" "}
                    <em>kutyátok, kertetek</em>); -atok/-etek/-ötök (nach Kons.:{" "}
                    <em>házatok</em>)
                  </li>
                  <li>
                    Pl. Besitz: -itok/-aitok/-eitek (
                    <em>táskáitok, szüleitek</em>); -jaitok (oft nach
                    Vokal/best. Kons.: <em>kerékpárjaitok</em>)
                  </li>
                </ul>
              </li>
              <li>
                <strong>3. Person Plural (Mehrzahl) (ők - ihr Pl.):</strong>
                <ul>
                  <li>
                    Sg. Besitz: -uk/-ük (nach Kons.: <em>házuk, könyvük</em>);
                    -juk/-jük (oft nach Vokal/best. Kons.:{" "}
                    <em>autójuk, kertjük</em>)
                  </li>
                  <li>
                    Pl. Besitz: -ik/-aik/-eik (nach Kons.:{" "}
                    <em>lakásaik, feladataik</em>); -jaik/-jeik (oft nach
                    Vokal/best. Kons. - kein direktes Bsp. in Liste)
                  </li>
                </ul>
              </li>
            </ul>
            <strong>Wichtig:</strong>
            <ul>
              <li>
                Die Vokalharmonie bestimmt die Vokalauswahl (a/e, o/ö, u/ü).
              </li>
              <li>
                Bindevokal (z.B. o/e/ö) oder Bindekonsonant -j- oft nötig,
                abhängig vom Stammende.
              </li>
            </ul>
            <p className="suff_addtxt">
              Weitere Informationen zu diesem Thema findest Du in unserem
              Grammatikkurs im Artikel{" "}
              <a
                href="https://wir-in-ungarn.hu/sprachlektion/man-hat-nicht-der-besitz-im-ungarischen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                „Man hat nicht": Der Besitz im Ungarischen (Teil 1).
              </a>
            </p>
          </div>

          {/* Panel 2: Lokal-Suffixe */}
          <div
            className={`exp_toggle_title ${
              activePanel === "local" ? "active" : ""
            }`}
            onClick={() => togglePanel("local")}
          >
            <h3>Lokal-Suffixe</h3>
          </div>
          <div
            className={`exp_toggle_des ${
              activePanel === "local" ? "open" : "closed"
            }`}
          >
            <strong>Ungarische Lokalfälle (Helyragok): Kurzüberblick</strong>
            <p>
              Lokalfälle (Kasusendungen) im Ungarischen drücken hauptsächlich
              Ort und Richtung aus und beantworten Fragen wie: Wo? Wohin? Woher?
              Bis wohin? Viele dieser Endungen treten in logischen Dreiergruppen
              auf. Die Wahl der Vokale in den Endungen folgt den Regeln der{" "}
              <strong>Vokalharmonie (VH)</strong>.
            </p>
            <strong>Die Hauptgruppen und ihre Funktionen:</strong>
            <ol>
              <li>
                <strong>
                  IN / HINEIN / HERAUS (geschlossene Räume, Inneres):
                </strong>
                <ul>
                  <li>
                    <strong>Wo?</strong> -ban/-ben (in): Zeigt eine Position{" "}
                    <em>innerhalb</em> von etwas an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>ban</strong> (im Haus), kert
                          <strong>ben</strong> (im Garten), bolt
                          <strong>ban</strong> (im Laden), víz
                          <strong>ben</strong> (im Wasser)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Wohin?</strong> -ba/-be (in...hinein): Zeigt eine
                    Bewegung <em>in</em> etwas hinein an. Auch bei Kostenangaben
                    (<em>kerül vmibe</em>).
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>ba</strong> (ins Haus), kert
                          <strong>be</strong> (in den Garten), víz
                          <strong>be</strong> (ins Wasser), kerül forint
                          <strong>ba</strong> (kostet... Forint)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Woher?</strong> -ból/-ből (aus...heraus): Zeigt eine
                    Bewegung <em>aus</em> etwas heraus an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>ból</strong> (aus dem Haus),
                          kert<strong>ből</strong> (aus dem Garten), autó
                          <strong>ból</strong> (aus dem Auto)
                        </em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>AUF / DARAUF / HERUNTER (Oberflächen, Orte):</strong>
                <ul>
                  <li>
                    <strong>Wo?</strong> -on/-en/-ön (auf); nach Vokal oft nur
                    -n: Zeigt eine Position <em>auf</em> einer Oberfläche oder{" "}
                    <em>an</em> einem Ort an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: asztal<strong>on</strong> (auf dem Tisch),
                          tető<strong>n</strong> (auf dem Dach), föld
                          <strong>ön</strong> (auf der Erde), hely
                          <strong>en</strong> (am Ort), Budapest
                          <strong>en</strong> (in Budapest)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Wohin?</strong> -ra/-re (auf...darauf): Zeigt eine
                    Bewegung <em>auf</em> eine Oberfläche hin an. Wird auch bei
                    abstrakten Zielen/Themen verwendet (warten <em>auf</em>,
                    brauchen <em>für</em>, denken <em>an</em>).
                    <ul>
                      <li>
                        <em>
                          Beispiele: asztal<strong>ra</strong> (auf den Tisch),
                          polc<strong>ra</strong> (aufs Regal), tér
                          <strong>re</strong> (auf den Platz), idő
                          <strong>re</strong> (auf die Zeit), szükség van pénz
                          <strong>re</strong> (Geld wird gebraucht)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Woher?</strong> -ról/-ről (von...herunter): Zeigt
                    eine Bewegung <em>von</em> einer Oberfläche weg an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: asztal<strong>ról</strong> (vom Tisch),
                          polc<strong>ról</strong> (vom Regal), székről (vom
                          Stuhl)
                        </em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  BEI / HINZU / WEG VON (äußerer Punkt, Nähe, Personen):
                </strong>
                <ul>
                  <li>
                    <strong>Wo?</strong> -nál/-nél (bei, an): Zeigt eine
                    Position <em>in der Nähe</em> von etwas/jemandem an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>nál</strong> (beim Haus), ablak
                          <strong>nál</strong> (am Fenster), fal
                          <strong>nál</strong> (an der Wand), tanár
                          <strong>nál</strong> (beim Lehrer)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Wohin?</strong> -hoz/-hez/-höz (zu...hin): Zeigt
                    eine Bewegung <em>zu</em> etwas/jemandem hin an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>hoz</strong> (zum Haus), orvos
                          <strong>hoz</strong> (zum Arzt), főnök
                          <strong>höz</strong> (zum Chef), barát
                          <strong>hoz</strong> (zum Freund)
                        </em>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Woher?</strong> -tól/-től (von...weg): Zeigt eine
                    Bewegung <em>von</em> etwas/jemandem weg an; auch bei
                    Ursprung/Grund.
                    <ul>
                      <li>
                        <em>
                          Beispiele: ház<strong>tól</strong> (vom Haus weg),
                          orvos<strong>tól</strong> (vom Arzt), tanár
                          <strong>tól</strong> (vom Lehrer), zaj
                          <strong>tól</strong> (vom Lärm)
                        </em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>BIS ZU (Limit):</strong>
                <ul>
                  <li>
                    -ig (bis): Zeigt das räumliche oder zeitliche Ende/Limit an.
                    <ul>
                      <li>
                        <em>
                          Beispiele: határ<strong>ig</strong> (bis zur Grenze),
                          Budapest<strong>ig</strong> (bis Budapest), vég
                          <strong>ig</strong> (bis zum Ende)
                        </em>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ol>
            <strong>Wichtiger Hinweis:</strong> Viele Verben im Ungarischen
            erfordern einen bestimmten Lokalkasus, auch wenn die Bedeutung nicht
            rein räumlich ist (z.B.{" "}
            <em>
              gondol vmi<strong>re</strong>
            </em>{" "}
            - an etw. denken,{" "}
            <em>
              bízik vmi<strong>ben</strong>
            </em>{" "}
            - auf etw. vertrauen,{" "}
            <em>
              beszél vki<strong>hez</strong>
            </em>{" "}
            - zu jmdm. sprechen,{" "}
            <em>
              fél vmi<strong>től</strong>
            </em>{" "}
            - Angst haben vor etw.). Diese muss man oft mit den Verben lernen.
            <p className="suff_addtxt">
              Eine ausführliche Erklärung zu diesem Thema findest Du in unserem
              Grammatikkurs im Artikel{" "}
              <a
                href="https://wir-in-ungarn.hu/sprachlektion/verortung-und-bewegungsrichtung-im-ungarischen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verortung und Bewegungsrichtung im Ungarischen.
              </a>
            </p>
          </div>

          {/* Panel 3: Verb-Suffixe */}
          <div
            className={`exp_toggle_title ${
              activePanel === "verb" ? "active" : ""
            }`}
            onClick={() => togglePanel("verb")}
          >
            <h3>Verb-Suffixe</h3>
          </div>
          <div
            className={`exp_toggle_des ${
              activePanel === "verb" ? "open" : "closed"
            }`}
          >
            <strong>Ungarische Verbkonjugation: Kurzüberblick</strong>
            <p>
              Ungarische Verben ändern ihre Endung sehr flexibel. Die Endung
              hängt ab von:
            </p>
            <ol>
              <li>
                <strong>Person und Numerus des Subjekts:</strong> Wer handelt?
                (Ich, Du, Er/Sie/Es, Wir, Ihr, Sie Plural)
              </li>
              <li>
                <strong>Tempus (Zeitform):</strong> Gegenwart (Jelen idő),
                Vergangenheit (Múlt idő).
              </li>
              <li>
                <strong>Modus:</strong> Indikativ (Aussage), Konditional
                (Bedingung, Wunsch), Imperativ (Befehl/Aufforderung).
              </li>
              <li>
                <strong>Definitheit (Bestimmtheit):</strong> Entscheidend! Die
                Konjugation variiert, je nachdem ob das direkte Objekt bestimmt
                (definit) oder unbestimmt (indefinit) ist.
                <ul>
                  <li>
                    <strong>Indefinite Konjugation (Alanyi ragozás):</strong>{" "}
                    Bei keinem oder unbestimmtem Objekt (z.B. <em>egy</em> Buch,{" "}
                    <em>valamit</em>).
                  </li>
                  <li>
                    <strong>Definite Konjugation (Tárgyas ragozás):</strong> Bei
                    bestimmtem Objekt (z.B. <em>a/az</em> Buch, Eigennamen,
                    Besitz).
                  </li>
                </ul>
              </li>
            </ol>
            <p>
              Die <strong>Vokalharmonie (VH)</strong> bestimmt die Vokale in den
              Endungen (tiefe VH: a/o/u in Endung; hohe VH: e/ö/ü in Endung).
            </p>

            <h4>1. Indikativ Gegenwart (Jelen idő)</h4>
            <ul>
              <li>
                <strong>Indefinite Konjugation (Alanyi):</strong>
                <ul>
                  <li>
                    1. Person Singular (Én): -ok/-ek/-ök (Bsp.:{" "}
                    <em>
                      olvas<strong>ok</strong>
                    </em>{" "}
                    - ich lese [etwas],{" "}
                    <em>
                      beszél<strong>ek</strong>
                    </em>{" "}
                    - ich spreche)
                  </li>
                  <li>
                    2. Person Singular (Te): -sz/-asz/-esz/-ol/-el/-öl (Bsp.:{" "}
                    <em>
                      vásárol<strong>sz</strong>
                    </em>{" "}
                    - du kaufst,{" "}
                    <em>
                      kérdez<strong>el</strong>
                    </em>{" "}
                    - du fragst)
                  </li>
                  <li>3. Person Singular (Ő): oft keine Endung</li>
                  <li>
                    1. Person Plural (Mi): -unk/-ünk (Bsp.:{" "}
                    <em>
                      akar<strong>unk</strong>
                    </em>{" "}
                    - wir wollen,{" "}
                    <em>
                      segít<strong>ünk</strong>
                    </em>{" "}
                    - wir helfen)
                  </li>
                  <li>
                    2. Person Plural (Ti): -tok/-tek/-tök (Bsp.:{" "}
                    <em>
                      akar<strong>tok</strong>
                    </em>{" "}
                    - ihr wollt,{" "}
                    <em>
                      beszél<strong>tek</strong>
                    </em>{" "}
                    - ihr sprecht)
                  </li>
                  <li>
                    3. Person Plural (Ők): -nak/-nek (Bsp.:{" "}
                    <em>
                      akar<strong>nak</strong>
                    </em>{" "}
                    - sie wollen,{" "}
                    <em>
                      beszél<strong>nek</strong>
                    </em>{" "}
                    - sie sprechen)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Definite Konjugation (Tárgyas):</strong>
                <ul>
                  <li>
                    1. Person Singular (Én): -om/-em/-öm (Bsp.:{" "}
                    <em>
                      olvas<strong>om</strong>
                    </em>{" "}
                    - ich lese es,{" "}
                    <em>
                      vezet<strong>em</strong>
                    </em>{" "}
                    - ich fahre es)
                  </li>
                  <li>
                    2. Person Singular (Te): -od/-ed/-öd (Bsp.:{" "}
                    <em>
                      olvas<strong>od</strong>
                    </em>{" "}
                    - du liest es,{" "}
                    <em>
                      kedvel<strong>ed</strong>
                    </em>{" "}
                    - du magst es)
                  </li>
                  <li>
                    3. Person Singular (Ő): -ja/-i (Bsp.:{" "}
                    <em>
                      olvas<strong>sa</strong>
                    </em>{" "}
                    - er liest es,{" "}
                    <em>
                      kér<strong>i</strong>
                    </em>{" "}
                    - er bittet darum)
                  </li>
                  <li>
                    1. Person Plural (Mi): -juk/-jük (Bsp.:{" "}
                    <em>
                      olvas<strong>suk</strong>
                    </em>{" "}
                    - wir lesen es,{" "}
                    <em>
                      vezet<strong>jük</strong>
                    </em>{" "}
                    - wir fahren es)
                  </li>
                  <li>
                    2. Person Plural (Ti): -játok/-itek (Bsp.:{" "}
                    <em>
                      olvas<strong>sátok</strong>
                    </em>{" "}
                    - ihr lest es,{" "}
                    <em>
                      kedvel<strong>itek</strong>
                    </em>{" "}
                    - ihr mögt es)
                  </li>
                  <li>
                    3. Person Plural (Ők): -ják/-ik (Bsp.:{" "}
                    <em>
                      olvas<strong>sák</strong>
                    </em>{" "}
                    - sie lesen es,{" "}
                    <em>
                      kedvel<strong>ik</strong>
                    </em>{" "}
                    - sie mögen es)
                  </li>
                </ul>
              </li>
            </ul>

            <h4>2. Indikativ Vergangenheit (Múlt idő)</h4>
            <p>
              Typisches Zeichen: -t oder -tt wird zwischen Stamm und
              Personalendung eingefügt.
            </p>
            <ul>
              <li>
                <strong>Indefinite Konjugation (Alanyi) - Beispiele:</strong>
                <ul>
                  <li>
                    1. Person Singular (Én): -tam/-tem (Bsp.:{" "}
                    <em>
                      mond<strong>tam</strong>
                    </em>{" "}
                    - ich sagte,{" "}
                    <em>
                      mesél<strong>tem</strong>
                    </em>{" "}
                    - ich erzählte)
                  </li>
                  <li>
                    3. Person Singular (Ő): -t/-ott/-ett/-ött (Bsp.:{" "}
                    <em>
                      mond<strong>ott</strong>
                    </em>{" "}
                    - er sagte,{" "}
                    <em>
                      kérdez<strong>ett</strong>
                    </em>{" "}
                    - er fragte)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Definite Konjugation (Tárgyas) - Beispiele:</strong>
                <ul>
                  <li>
                    1. Person Singular (Én): -tam/-tem (Bsp.:{" "}
                    <em>
                      lát<strong>tam</strong>
                    </em>{" "}
                    - ich sah es,{" "}
                    <em>
                      vezet<strong>tem</strong>
                    </em>{" "}
                    - ich fuhr es) → <strong>Achtung:</strong> Oft identisch mit
                    Indefinit! Kontext entscheidet.
                  </li>
                  <li>
                    3. Person Singular (Ő): -ta/-te (Bsp.:{" "}
                    <em>
                      mutat<strong>ta</strong>
                    </em>{" "}
                    - er zeigte es,{" "}
                    <em>
                      vezet<strong>te</strong>
                    </em>{" "}
                    - er fuhr es)
                  </li>
                  <li>
                    1. Person Plural (Mi): -tuk/-tük (Bsp.:{" "}
                    <em>
                      olvas<strong>tuk</strong>
                    </em>{" "}
                    - wir lasen es,{" "}
                    <em>
                      értet<strong>tük</strong>
                    </em>{" "}
                    - wir verstanden es)
                  </li>
                </ul>
              </li>
            </ul>

            <h4>3. Konditional (Feltételes mód) - "würde..."</h4>
            <p>
              Typisches Zeichen: -na/-ne (bzw. -ná/-né vor best. Endungen) wird
              eingefügt.
            </p>
            <ul>
              <li>
                <strong>Indefinite Konjugation (Alanyi) - Beispiele:</strong>
                <ul>
                  <li>
                    1. Person Plural (Mi): -nánk/-nénk (Bsp.:{" "}
                    <em>
                      dolgoz<strong>nánk</strong>
                    </em>{" "}
                    - wir würden arbeiten,{" "}
                    <em>
                      segíte<strong>nénk</strong>
                    </em>{" "}
                    - wir würden helfen)
                  </li>
                  <li>
                    2. Person Plural (Ti): -nátok/-nétek (Bsp.:{" "}
                    <em>
                      csinál<strong>nátok</strong>
                    </em>{" "}
                    - ihr würdet machen,{" "}
                    <em>
                      beszél<strong>nétek</strong>
                    </em>{" "}
                    - ihr würdet sprechen)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Definite Konjugation (Tárgyas) - Beispiele:</strong>
                <ul>
                  <li>
                    1. Person Plural (Mi): -nánk/-nénk (Bsp.:{" "}
                    <em>
                      olvas<strong>nánk</strong>
                    </em>{" "}
                    - wir würden es lesen) → <strong>Achtung:</strong> Identisch
                    mit Indefinit!
                  </li>
                  <li>
                    2. Person Plural (Ti): -nátok/-nétek (Bsp.:{" "}
                    <em>
                      olvas<strong>nátok</strong>
                    </em>{" "}
                    - ihr würdet es lesen) → <strong>Achtung:</strong> Identisch
                    mit Indefinit!
                  </li>
                </ul>
              </li>
            </ul>

            <h4>4. Imperativ (Felszólító mód) - Befehl/Aufforderung</h4>
            <p>
              Typisches Zeichen: -j, das sich oft an den vorhergehenden
              Konsonanten anpasst (-s, -sz, -z, -gy, -ty, -d, -dd).
            </p>
            <ul>
              <li>
                <strong>Indefinite Konjugation (Alanyi) - Beispiele:</strong>
                <ul>
                  <li>
                    2. Person Singular (Te): -j, -s/-sz/-z etc. (Bsp.:{" "}
                    <em>
                      Mond<strong>j</strong>!
                    </em>{" "}
                    - Sag!,{" "}
                    <em>
                      Dolgo<strong>zz</strong>!
                    </em>{" "}
                    - Arbeite!,{" "}
                    <em>
                      Olva<strong>ss</strong>!
                    </em>{" "}
                    - Lies!)
                  </li>
                  <li>
                    2. Person Plural (Ti): -jatok/-jetek (Bsp.:{" "}
                    <em>
                      Csinál<strong>jatok</strong>!
                    </em>{" "}
                    - Macht!,{" "}
                    <em>
                      Mesél<strong>jetek</strong>!
                    </em>{" "}
                    - Erzählt!)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Definite Konjugation (Tárgyas) - Beispiele:</strong>
                <ul>
                  <li>
                    2. Person Singular (Te): -d/-jad/-jed/-dd (Bsp.:{" "}
                    <em>
                      Olvas<strong>d</strong>!
                    </em>{" "}
                    - Lies es!,{" "}
                    <em>
                      Hoz<strong>d</strong>!
                    </em>{" "}
                    - Bring es!,{" "}
                    <em>
                      Ve<strong>dd</strong> meg!
                    </em>{" "}
                    - Kauf es!)
                  </li>
                  <li>
                    2. Person Plural (Ti): -játok/-jétek (Bsp.:{" "}
                    <em>
                      Ad<strong>játok</strong>!
                    </em>{" "}
                    - Gebt es!,{" "}
                    <em>
                      Vezes<strong>sétek</strong>!
                    </em>{" "}
                    - Führt es!)
                  </li>
                </ul>
              </li>
            </ul>

            <p>
              <strong>Zusammenfassend:</strong> Achte auf Person, Zahl,
              Zeit/Modus und vor allem <strong>Definitheit</strong>. Die Marker
              -t/-tt (Vergangenheit), -na/-ne (Konditional) und -j (Imperativ)
              sind Schlüsselhinweise.
            </p>

            <p className="suff_addtxt">
              Weitere Informationen zu diesem Thema findest Du in unserem
              Grammatikkurs im Artikel{" "}
              <a
                href="https://wir-in-ungarn.hu/sprachlektion/bestimmt-und-unbestimmt-einfache-logik-die-mit-der-zeit-verstaendlich-wird/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bestimmt und Unbestimmt: Einfache Logik, die mit der Zeit
                verständlich wird.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuffixHeroGrammarExplanations;
