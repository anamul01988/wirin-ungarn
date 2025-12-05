"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  // Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";
import "./AnkiKartenPage.css";
import { ArchivePageHeaderImage } from "@/lib/utils/utils";
export default function AnkiKartenPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const route = useRouter();

  // const handleBackToMenu = () => {
  //   route.back()
  // };
  const handleClose = () => {
    setOpen(false);
    route.push("/");
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const navigateToHome = () => {
    route.push("/");
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        // size={"lg"}
        dismiss={{
          enabled: false,
        }}
        className="common_diallog__area dialog-anki-karten bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] flex flex-col"
      >
        {/* Floating Cross + Love Icons */}
        {open && (
          <ModalIcons
            onClose={handleClose}
            onFavorite={() => console.log("Favorite clicked")}
            onLayers={() => console.log("Layers clicked")}
            onShare={() => console.log("Share clicked")}
          />
        )}

        <DialogBody className="overflow-y-auto custom__modal_area mr-1 flex-1 p-[30px]">
          <div className="mx-auto">
            {/* Main Title */}
            {/* <Typography
              variant="h2"
              className="font-bold text-gray-900 mb-6 text-center"
            >
              Lerne Ungarisch mit Anki — Der Turbo für deinen Wortschatz!
            </Typography>

            <div className="mb-8">
              <Typography
                variant="paragraph"
                className="text-gray-700 mb-4 leading-relaxed"
              >
                Hier findest du kostenlose, sorgfältig entwickelte ungarische
                Anki-Kartensets für nachhaltigen Wortschatzaufbau. Das
                kostenlose Lernprogramm Anki musst du zunächst installieren —
                wir erklären dir hier, wie du startest.
              </Typography>
              <Typography
                variant="paragraph"
                className="text-gray-700 leading-relaxed"
              >
                Das kostenlose Lernprogramm Anki musst du zunächst installieren
                — wir erklären dir hier, wie du startest.
              </Typography>
            </div>

            <div className="mb-8">
              <Typography variant="h3" className="font-bold text-gray-900 mb-4">
                Was ist Anki und warum ist es so effektiv?
              </Typography>

              <Typography
                variant="paragraph"
                className="text-gray-700 mb-4 leading-relaxed"
              >
                Anki ist ein kostenloses Programm für digitale Karteikarten, das
                auf der bewährten "Spaced Repetition" Methode basiert.
              </Typography>

              <div className="space-y-4 mb-4">
                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-2"
                  >
                    Intelligentes Timing:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    Anki merkt sich, wie gut du ein Vokabel kanntest und zeigt
                    schwierige Begriffe häufiger, einfache seltener an.
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-2"
                  >
                    Effizientes Lernen:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    Das System wiederholt Vokabeln kurz bevor du sie vergisst
                    und überträgt sie so vom Kurzzeit- ins Langzeitgedächtnis.
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-2"
                  >
                    Flexibel und multimedial:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    Du kannst Text, Bilder und Audio-Dateien in deine Karten
                    einbauen — perfekt für die Aussprache.
                  </Typography>
                </div>
              </div>

              <Typography
                variant="paragraph"
                className="text-gray-700 mb-4 leading-relaxed font-medium"
              >
                Kurz gesagt: Statt sturem Pauken konzentrierst du dich auf das,
                was wirklich nötig ist.
              </Typography>

              <Typography
                variant="paragraph"
                className="text-gray-700 leading-relaxed"
              >
                Bevor wir dir erklären, wie du Anki installierst, geben wir dir
                einen Überblick über unsere kostenlosen, herunterladbaren Kurse.
              </Typography>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-medium"
                  >
                    Download
                  </Typography>
                </div>
                <div className="flex-1">
                  <Typography
                    variant="h4"
                    className="font-bold text-red-600 mb-3"
                  >
                    Anki-Set 1: Ungarisch-Grundwortschatz
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-gray-700 leading-relaxed"
                  >
                    Dieses Anki-Set ist ideal für Anfänger. Du bekommst nicht
                    nur Übersetzungen, sondern auch authentische Aussprache,
                    Kontext, Plural- und Akkusativformen, Beispielsätze und
                    Grammatikerklärungen. Basierend auf 700 Grundwörtern umfasst
                    das Set 9800 Karten.
                  </Typography>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Typography variant="h3" className="font-bold text-gray-900 mb-4">
                So installierst und nutzt du Anki
              </Typography>

              <Typography
                variant="paragraph"
                className="text-gray-700 mb-6 leading-relaxed"
              >
                Anki ist auf fast allen Geräten verfügbar — wähle die passende
                Version für dich.
              </Typography>

              <div className="mb-6">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900 mb-3"
                >
                  Auf dem PC (Windows, Mac, Linux) - Die empfohlene Methode
                </Typography>

                <Typography
                  variant="paragraph"
                  className="text-gray-700 mb-4 leading-relaxed"
                >
                  Die Desktop-Version ist das Herzstück von Anki — hier
                  importierst und verwaltest du deine Kartensets.
                </Typography>

                <div className="space-y-3">
                  <div>
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 mb-1"
                    >
                      Download:
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      Lade dir die Software von der offiziellen Webseite
                      herunter:{" "}
                      <a
                        href="https://apps.ankiweb.net/"
                        className="text-red-600 hover:underline font-medium"
                      >
                        Anki für Windows, Mac oder Linux
                      </a>
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 mb-1"
                    >
                      Installation:
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      Folge den einfachen Schritten des Installationsprogramms.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900 mb-3"
                >
                  Im Browser (AnkiWeb)
                </Typography>

                <Typography
                  variant="paragraph"
                  className="text-gray-700 mb-4 leading-relaxed"
                >
                  Du kannst Anki auch direkt im Browser über AnkiWeb nutzen —
                  perfekt für Wiederholungen unterwegs, wenn kein Computer zur
                  Verfügung steht oder du nichts installieren möchtest.
                </Typography>

                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-1"
                  >
                    Nutzung:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    Erstelle dir auf der folgenden Seite ein kostenloses Konto.
                    Dieses Konto brauchst du auch, um deine Lernfortschritte
                    zwischen deinem PC und Handy zu synchronisieren.{" "}
                    <a
                      href="https://ankiweb.net/"
                      className="text-red-600 hover:underline font-medium"
                    >
                      AnkiWeb
                    </a>
                  </Typography>
                </div>
              </div>

              <div className="mb-6">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900 mb-3"
                >
                  Auf dem Handy (Android & iOS)
                </Typography>

                <Typography
                  variant="paragraph"
                  className="text-gray-700 mb-4 leading-relaxed"
                >
                  Für unterwegs gibt es auch mobile Apps. Die Android-Version
                  ist kostenlos, die iOS-Version kostet einmalig.
                </Typography>

                <div className="space-y-3">
                  <div>
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 mb-1"
                    >
                      Android:
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      Kostenlose App im Google Play Store:{" "}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.ichi2.anki"
                        className="text-red-600 hover:underline font-medium"
                      >
                        AnkiDroid
                      </a>
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-900 mb-1"
                    >
                      iOS:
                    </Typography>
                    <Typography variant="paragraph" className="text-gray-700">
                      Im App Store:{" "}
                      <a
                        href="https://apps.apple.com/app/ankimobile-flashcards/id373493387"
                        className="text-red-600 hover:underline font-medium"
                      >
                        AnkiMobile Flashcards
                      </a>
                    </Typography>
                  </div>
                </div>
              </div>
            </div> */}
            {/* ---------------------------------- */}
            {/* <Typography
              variant="h2"
              className="font-bold text-gray-900 mb-6 text-left text-[32px]"
            >
              Lerne Ungarisch mit Anki — Der Turbo für deinen Wortschatz!
            </Typography> */}
            <div className="w-full relative flex items-center justify-center mb-3">
              <ArchivePageHeaderImage
                imageUrl="/headlineImages/Anki-Karten.jpg"
                imageAlt="Anki Karten"
              />
            </div>
            <div class="anki_karten-container">
              <p class="anki_karten-intro-text ai-optimize-7 ai-optimize-introduction">
                Du möchtest deinen ungarischen Wortschatz nicht nur lernen,
                sondern auch langfristig im Gedächtnis behalten? Dann haben wir
                genau das Richtige für dich: Unsere sorgfältig ausgearbeiteten
                Ungarisch-Kartensets, die wir dir auf dieser Seite{" "}
                <strong>kostenlos zur Verfügung stellen</strong>.
              </p>
              <p class="anki_karten-description-text ai-optimize-8">
                Alles, was du für die Nutzung brauchst, ist das ebenfalls
                kostenlose Lernprogramm Anki zu installieren. Auf dieser Seite
                erklären wir dir, wie du mit Anki und unseren Kartensets sofort
                durchstarten kannst.
              </p>

              <h3 class="anki_karten-section-title ai-optimize-9">
                Was ist Anki und warum ist es so effektiv?
              </h3>
              <p class="anki_karten-content-text ai-optimize-10">
                Anki ist ein kostenloses Programm (mit einer Ausnahme, siehe
                unten), mit dem du digitale Karteikarten lernst. Das Besondere
                an Anki ist die Methode der „gespreizten Wiederholung" (Spaced
                Repetition). Das klingt kompliziert, ist aber genial einfach:
              </p>

              <ul class="anki_karten-feature-list">
                <li class="ai-optimize-11">
                  <strong>Intelligentes Timing:</strong> Anki merkt sich, wie
                  gut du eine Vokabel wusstest. Begriffe, die du schwierig
                  findest, werden dir öfter und in kürzeren Abständen gezeigt.
                  Vokabeln, die du schon gut kannst, erscheinen seltener.
                </li>
                <li class="ai-optimize-12">
                  <strong>Effizientes Lernen:</strong> Durch dieses System
                  wiederholst du Vokabeln genau dann, wenn du kurz davor bist,
                  sie zu vergessen. Das spart unglaublich viel Zeit und sorgt
                  dafür, dass die Wörter vom Kurzzeit- ins Langzeitgedächtnis
                  wandern.
                </li>
                <li class="ai-optimize-13">
                  <strong>Flexibel und multimedial:</strong> Du kannst nicht nur
                  Text, sondern auch Bilder und Audio-Dateien in deine Karten
                  einfügen — perfekt, um die Aussprache gleich mitzulernen.
                </li>
              </ul>
              <p class="anki_karten-summary-text ai-optimize-14">
                Kurz gesagt: Statt sturem Pauken konzentrierst du dich auf das,
                was wirklich nötig ist.
              </p>
              <p class="anki_karten-content-text ai-optimize-15">
                <strong>
                  Bevor wir zur Erklärung kommen, wie du Anki auf Deinem
                  Computer/Handy installieren kannst, hier schon mal die
                  Übersicht über unsere Kurse, die du dir (natürlich) kostenlos
                  herunterladen kannst.
                </strong>
              </p>

              <div class="anki_karten-set-card">
                <h2 class="anki_karten-card-title ai-optimize-16">
                  Anki-Set 1: Ungarisch-Grundwortschatz
                </h2>
                <div class="anki_karten-card-content">
                  <div class="anki_karten-download-icon">
                    <a href="https://wir-in-ungarn.hu/wiucontent/uploads/Ungarisch-Kurs_Basisw_rter.apkg">
                      <img
                        src="https://wir-in-ungarn.hu/wiucontent/uploads/2023/07/Download-Button-WIU.png"
                        alt="download_icon"
                      />
                    </a>
                    <a href="https://wir-in-ungarn.hu/wiucontent/uploads/Ungarisch-Kurs_Basisw_rter.apkg">
                      <span class="anki_karten-download-text">Download</span>
                    </a>
                  </div>
                  <p class="anki_karten-card-description ai-optimize-17">
                    Dieses Anki-Set ist ist ideal für den Start in die
                    ungarische Sprache. Es ist mehr als nur ein Vokabeltrainer:
                    Du lernst die Wörter nicht nur mit ihrer Übersetzung,
                    sondern auch mit der authentischen Aussprache und im
                    Kontext. Plural- und Akkusativformen werden separat
                    aufgezeigt und mit Beispielsätzen kannst du dann die
                    Struktur der Sprache üben. Kurze Erklärungen zur Grammatik,
                    warum ein Wort/Satz wie aufgebaut ist, helfen dir dabei, die
                    Sprache von Grund auf richtig zu verstehen und anzuwenden.
                    Auf Basis von 700 Grundwörtern umfasst der Lernstapel 9800
                    Karten.
                  </p>
                </div>
              </div>
              <h2></h2>
              <h2 class="ai-optimize-6">
                <strong>So installierst und nutzt du Anki</strong>
              </h2>
              <p class="ai-optimize-7">
                Anki ist auf fast allen Geräten verfügbar. Such dir einfach die
                passende Version für dich aus.
              </p>

              <h4 class="ai-optimize-46">
                <strong>
                  {" "}
                  Auf dem PC (Windows, Mac, Linux) – Die empfohlene Methode
                </strong>
              </h4>
              <p class="ai-optimize-9">
                Die Desktop-Version ist das Herzstück von Anki. Hier kannst du
                am bequemsten neue Kartenstapel (wie unsere Ungarisch-Sets)
                importieren und verwalten.
              </p>

              <ul>
                <li class="ai-optimize-10">
                  <strong>Download:</strong> Lade dir die Software von der
                  offiziellen Webseite herunter:
                  <ul>
                    <li class="ai-optimize-11">
                      <strong>
                        <a href="https://apps.ankiweb.net/">
                          Anki für Windows, Mac oder Linux
                        </a>
                      </strong>
                    </li>
                  </ul>
                </li>
                <li class="ai-optimize-12">
                  <strong>Installation:</strong> Folge den einfachen Schritten
                  des Installationsprogramms.
                </li>
              </ul>
              <h4 class="ai-optimize-47">
                <strong> Im Browser (AnkiWeb)</strong>
              </h4>
              <p class="ai-optimize-14">
                Wenn du gerade keinen Zugriff auf deinen Computer hast oder
                nichts installieren möchtest, kannst du Anki auch direkt im
                Browser nutzen. AnkiWeb ist ideal zum Wiederholen unterwegs.
              </p>

              <ul>
                <li class="ai-optimize-15">
                  <strong>Nutzung:</strong> Erstelle dir auf der folgenden Seite
                  ein kostenloses Konto. Dieses Konto brauchst du auch, um deine
                  Lernfortschritte zwischen deinem PC und Handy zu
                  synchronisieren.
                  <ul>
                    <li class="ai-optimize-16">
                      <strong>
                        <a href="https://www.google.com/search?q=https://ankiweb.net/">
                          AnkiWeb
                        </a>
                      </strong>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4 class="ai-optimize-48">
                <strong> Auf dem Handy (Android &amp; iOS)</strong>
              </h4>
              <p class="ai-optimize-18">
                Mit den mobilen Apps hast du deine Vokabeln immer dabei und
                kannst Wartezeiten perfekt zum Lernen nutzen.
              </p>

              <ul>
                <li class="ai-optimize-19">
                  <strong>Für Android (kostenlos):</strong> Die App heißt{" "}
                  <strong>AnkiDroid</strong>.
                  <ul>
                    <li class="ai-optimize-20">
                      <strong>
                        <a href="https://play.google.com/store/apps/details?id=com.ichi2.anki&amp;hl=de">
                          AnkiDroid im Google Play Store
                        </a>
                      </strong>
                    </li>
                  </ul>
                </li>
                <li class="ai-optimize-21">
                  <strong>
                    Für iPhone/iPad (kostenpflichtig, ca. 30,00€ einmalig):
                  </strong>{" "}
                  Die App heißt <strong>AnkiMobile</strong>.
                  <ul>
                    <li class="ai-optimize-22">
                      <strong>
                        <a href="https://apps.apple.com/us/app/ankimobile-flashcards/id373493387">
                          AnkiMobile im Apple App Store
                        </a>
                      </strong>
                    </li>
                  </ul>
                </li>
              </ul>
              <h5 class="ai-optimize-23">
                <strong>
                  Warum kostet die Apple-App, während der Rest gratis ist?
                </strong>
              </h5>
              <p class="ai-optimize-24">
                Das ist eine wichtige und faire Frage! Anki ist ein
                Open-Source-Projekt, das von einem kleinen Team rund um den
                Hauptentwickler Damien Elmes betrieben wird. Die Entwicklung und
                der Unterhalt der Server für die Synchronisation kosten Geld.
              </p>

              <ul>
                <li class="ai-optimize-25">
                  Die <strong>Desktop-Version</strong> und die{" "}
                  <strong>Android-App</strong> (die von freiwilligen Entwicklern
                  gepflegt wird) sind kostenlos.
                </li>
                <li class="ai-optimize-26">
                  Der Verkauf der{" "}
                  <strong>offiziellen iOS-App "AnkiMobile"</strong> ist die
                  Haupteinnahmequelle, um das gesamte Projekt am Leben zu
                  erhalten und weiterzuentwickeln.
                </li>
              </ul>
              <p class="ai-optimize-27">
                Du kannst es also als eine Art Unterstützung für dieses
                großartige Lernwerkzeug sehen. Wenn du kein iPhone nutzt oder
                die Kosten scheust, ist die Kombination aus der kostenlosen
                PC-Version und AnkiWeb im Browser eine super Alternative!
              </p>
              <p class="ai-optimize-28">
                <strong>Wichtiger Hinweis:</strong> Es gibt andere Apps im App
                Store, die "Anki" im Namen tragen. Nur{" "}
                <strong>"AnkiMobile Flashcards"</strong> ist die offizielle App,
                die sich nahtlos mit der Desktop-Version und AnkiWeb
                synchronisieren lässt.
              </p>

              <h4 class="ai-optimize-29">
                <strong>
                  Anleitung: So importierst du unser Ungarisch-Kartenset
                </strong>
              </h4>
              <p class="ai-optimize-30">
                Du hast Anki installiert? Perfekt! Jetzt brauchst du nur noch
                unsere Vokabeln. Unsere Kartensets kommen als *.colpkg-Datei.
                Dies ist eine komplette Sammlung. So fügst du sie hinzu:
              </p>
              <p class="ai-optimize-31">
                <strong>Wichtiger Hinweis:</strong> Eine *.colpkg-Datei ersetzt
                deine komplette aktuelle Anki-Sammlung. Wenn du Anki zum ersten
                Mal nutzt, ist das kein Problem. Falls du bereits eigene
                Kartenstapel hast, erstelle vorher unbedingt eine Sicherung über
                Datei &gt; Exportieren!
              </p>

              <h5 class="ai-optimize-32">
                <strong>Schritt-für-Schritt-Anleitung</strong>
              </h5>
              <ol>
                <li class="ai-optimize-33">
                  <strong>Herunterladen:</strong> Lade unser Ungarisch-Kartenset
                  von unserer Webseite herunter und speichere die *.colpkg-Datei
                  an einem Ort, wo du sie leicht wiederfindest (z. B. auf dem
                  Desktop).
                </li>
                <li class="ai-optimize-34">
                  <strong>Anki öffnen:</strong> Starte die Anki-Anwendung auf
                  deinem Computer.
                </li>
                <li class="ai-optimize-35">
                  <strong>Importieren:</strong>
                  <ul>
                    <li class="ai-optimize-36">
                      Klicke in der Menüleiste oben auf Datei.
                    </li>
                    <li class="ai-optimize-37">
                      Wähle die Option Importieren...
                    </li>
                  </ul>
                </li>
                <li class="ai-optimize-38">
                  <strong>Datei auswählen:</strong>
                  <ul>
                    <li class="ai-optimize-39">
                      Es öffnet sich ein Fenster. Navigiere zu dem Ort, an dem
                      du die *.colpkg-Datei gespeichert hast.
                    </li>
                    <li class="ai-optimize-40">
                      Wähle die Datei aus und klicke auf Öffnen.
                    </li>
                  </ul>
                </li>
                <li class="ai-optimize-41">
                  <strong>Bestätigen:</strong> Anki wird dich warnen, dass das
                  Importieren einer *.colpkg-Datei deine bestehende Sammlung
                  ersetzen wird. Bestätige den Vorgang.
                </li>
                <li class="ai-optimize-42">
                  <strong>Fertig!</strong> Der Kartenstapel "Ungarisch –
                  Basisbegriffe" (oder ähnlich) erscheint nun in deiner
                  Stapel-Übersicht und du kannst direkt mit dem Lernen beginnen.
                </li>
              </ol>
              <h5 class="ai-optimize-43">
                <strong>Synchronisation mit dem Handy (optional)</strong>
              </h5>
              <p class="ai-optimize-44">
                Wenn du auch mobil lernen möchtest, klicke nach dem Import auf
                den "Synchronisieren"-Button in Anki. Melde dich mit deinem
                zuvor erstellten AnkiWeb-Konto an. Öffne danach AnkiDroid oder
                AnkiMobile auf deinem Handy und synchronisiere ebenfalls – schon
                sind alle Karten auf all deinen Geräten!
              </p>
              <p class="ai-optimize-45">
                <strong>Viel Spaß und Erfolg beim Ungarischlernen!</strong>
              </p>

              <h5 class="ai-optimize-9"></h5>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
