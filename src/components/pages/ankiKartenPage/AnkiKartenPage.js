"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ModalIcons from "@/components/_components/ModalIcons";

export default function AnkiKartenPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const route = useRouter();

  const handleBackToMenu = () => {
    route.back();
  };
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
        size={"lg"}
        dismiss={{
          enabled: false,
        }}
        className="bg-white relative border-4 border-green-700 rounded-2xl h-[96vh] custom__modal_area flex flex-col"
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

        <DialogBody className="overflow-y-auto p-6">
          <div className="mx-auto">
            {/* Main Title */}
            <Typography
              variant="h2"
              className="font-bold text-gray-900 mb-6 text-center"
            >
              Lerne Ungarisch mit Anki — Der Turbo für deinen Wortschatz!
            </Typography>

            {/* Introduction */}
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

            {/* What is Anki Section */}
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

            {/* Anki Set 1 */}
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

            {/* Installation Instructions */}
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

              {/* PC Installation */}
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

              {/* Browser Installation */}
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

              {/* Mobile Installation */}
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
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
