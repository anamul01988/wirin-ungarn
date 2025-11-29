// Quiz data - 415 questions
export const FRENCH_QUIZ_DATA = [
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik a legnagyobb tó Magyarországon?",
    questionDE: "Welcher ist der größte See in Ungarn?",
    answers: [
      {
        answerHU: "Balaton",
        answerDE: "Plattensee (Balaton)",
        isCorrect: true,
      },
      {
        answerHU: "Velencei-tó",
        answerDE: "Velencei-See",
        isCorrect: false,
      },
      {
        answerHU: "Fertő-tó",
        answerDE: "Neusiedler See",
        isCorrect: false,
      },
    ],
    explanationHU:
      'A Balaton, a "magyar tenger", Közép-Európa legnagyobb édesvizű tava, Magyarország nyugati felén terül el, népszerű üdülőhely.',
    explanationDE:
      'Der Balaton, das "ungarische Meer", der größte Süßwassersee Mitteleuropas, liegt im westlichen Teil Ungarns und ist ein beliebter Ferienort.',
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hány folyó szeli át Budapestet?",
    questionDE: "Wie viele Flüsse durchqueren Budapest?",
    answers: [
      {
        answerHU: "Csak egy, a Duna folyik keresztül.",
        answerDE: "Nur einer, die Donau fließt hindurch.",
        isCorrect: true,
      },
      {
        answerHU: "Kettő: a Duna és a Tisza folyók.",
        answerDE: "Zwei: die Flüsse Donau und Theiß.",
        isCorrect: false,
      },
      {
        answerHU: "Három: Duna, Tisza, és a Garam.",
        answerDE: "Drei: Donau, Theiß und die Gran.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapestet egyedül a Duna szeli át, mely kettéválasztja a várost Budára és Pestre, de egyben összeköti is a két partot.",
    explanationDE:
      "Budapest wird nur von der Donau durchflossen, die die Stadt in Buda und Pest teilt, aber auch beide Ufer miteinander verbindet.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Hogyan nevezik magyarul a 'Große Ungarische Tiefebene' területet?",
    questionDE: "Wie heißt die 'Große Ungarische Tiefebene' auf Ungarisch?",
    answers: [
      {
        answerHU: "Kisalföld",
        answerDE: "Kleine Tiefebene",
        isCorrect: false,
      },
      {
        answerHU: "Alföld",
        answerDE: "Tiefebene",
        isCorrect: true,
      },
      {
        answerHU: "Dunántúl",
        answerDE: "Transdanubien",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A  legnagyobb tájegység az Alföld, melyet Nagy Magyar Alföldnek is hívnak. Az ország délkeleti részét foglalja el.",
    explanationDE:
      "Die größte Region ist die Tiefebene, die auch Große Ungarische Tiefebene genannt wird. Sie nimmt den südöstlichen Teil des Landes ein.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik magyar hegység legismertebb túracélpontja a Kékestető?",
    questionDE:
      "Welches ungarische Gebirge hat als bekanntestes Wanderziel den Kékestető?",
    answers: [
      {
        answerHU: "Mecsek",
        answerDE: "Mecsek",
        isCorrect: false,
      },
      {
        answerHU: "Mátra",
        answerDE: "Mátra",
        isCorrect: true,
      },
      {
        answerHU: "Bükk",
        answerDE: "Bükkgebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Mátra népszerű túracélpontja a Kékestető, mely Magyarország legmagasabb pontja 1014 méterrel, és lenyűgöző kilátást nyújt.",
    explanationDE:
      "Die Mátra ist ein beliebtes Wanderziel, insbesondere der Kékestető, der mit 1014 Metern der höchste Punkt Ungarns ist und eine atemberaubende Aussicht bietet.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik város híres porcelánmanufaktúrájáról?",
    questionDE: "Welche Stadt ist berühmt für ihre Porzellan-Manufaktur?",
    answers: [
      {
        answerHU: "Herend",
        answerDE: "Herend",
        isCorrect: true,
      },
      {
        answerHU: "Zsolnay",
        answerDE: "Zsolnay",
        isCorrect: false,
      },
      {
        answerHU: "Hollóháza",
        answerDE: "Hollóháza",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Herend városa világhírű porcelánmanufaktúrájáról ismert, mely kézzel festett, luxus minőségű porcelánokat készít.",
    explanationDE:
      "Die Stadt Herend ist weltberühmt für ihre Porzellanmanufaktur, die handbemaltes Porzellan von luxuriöser Qualität herstellt.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik folyó mellett található Győr?",
    questionDE: "An welchem Fluss liegt Győr?",
    answers: [
      {
        answerHU: "A Rába mellett",
        answerDE: "An der Raab",
        isCorrect: true,
      },
      {
        answerHU: "A Tisza mellett",
        answerDE: "An der Theiß",
        isCorrect: false,
      },
      {
        answerHU: "A Dráva mellett",
        answerDE: "An der Drau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Győr a Mosoni-Duna és a Rába folyók találkozásánál fekszik,  gyönyörű barokk belvárossal büszkélkedhet.",
    explanationDE:
      "Győr liegt am Zusammenfluss der Mosoni-Donau und der Raab und rühmt sich einer wunderschönen barocken Innenstadt.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hol található Esztergom?",
    questionDE: "Wo befindet sich Esztergom?",
    answers: [
      {
        answerHU: "A Duna jobb partján, közel a szlovák határhoz",
        answerDE: "Am rechten Donauufer, nahe der slowakischen Grenze",
        isCorrect: true,
      },
      {
        answerHU: "A Duna bal partján, Budapest közelében",
        answerDE: "Am linken Ufer der Donau, in der Nähe von Budapest",
        isCorrect: false,
      },
      {
        answerHU: "A Duna északi partján, a Visegrádi-hegység lábánál",
        answerDE: "Am nördlichen Donauufer, am Fuße des Visegráder Gebirges",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Esztergom Budapesttől északnyugatra, a szlovák határ közelében található. Az Esztergomi Bazilika az ország legnagyobb temploma.",
    explanationDE:
      "Esztergom liegt nordwestlich von Budapest, nahe der slowakischen Grenze. Die Basilika von Esztergom ist die größte Kirche des Landes.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik magyar megye székhelye Eger?",
    questionDE: "Welche ungarische Komitats-Hauptstadt ist Eger?",
    answers: [
      {
        answerHU: "Heves megye székhelye",
        answerDE: "Hauptstadt des Komitats Heves",
        isCorrect: true,
      },
      {
        answerHU: "Bács-Kiskun megye székhelye",
        answerDE: "Hauptstadt des Komitats Bács-Kiskun",
        isCorrect: false,
      },
      {
        answerHU: "Győr-Moson-Sopron megye székhelye",
        answerDE: "Hauptstadt des Komitats Győr-Moson-Sopron",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Eger Heves megye székhelye, híres történelmi város a  barokk belvárosáról, borvidékéről és termálfürdőiről ismert.",
    explanationDE:
      "Eger ist die Hauptstadt des Komitats Heves und eine berühmte historische Stadt, bekannt für ihre barocke Innenstadt, ihr Weinanbaugebiet und ihre Thermalbäder.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik város híres a gyógyfürdőiről: Hajdúszoboszló vagy Szombathely?",
    questionDE:
      "Welche Stadt ist berühmt für ihre Heilbäder: Hajdúszoboszló oder Szombathely?",
    answers: [
      {
        answerHU: "Hajdúszoboszló",
        answerDE: "Hajdúszoboszló",
        isCorrect: true,
      },
      {
        answerHU: "Szombathely",
        answerDE: "Szombathely",
        isCorrect: false,
      },
      {
        answerHU: "Mindkettő",
        answerDE: "Beides",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hajdúszoboszló  gyógyfürdőiről híres. Európa egyik legnagyobb fürdőkomplexuma várja a látogatókat.",
    explanationDE:
      "Hajdúszoboszló ist berühmt für seine Heilbäder. Einer der größten Bäderkomplexe Europas erwartet die Besucher.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik városban áll a Halászbástya?",
    questionDE: "In welcher Stadt steht die Fischerbastei?",
    answers: [
      {
        answerHU: "Budapesten",
        answerDE: "In Budapest",
        isCorrect: true,
      },
      {
        answerHU: "Pécsett",
        answerDE: "In Pécs",
        isCorrect: false,
      },
      {
        answerHU: "Szegeden",
        answerDE: "In Szeged",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Halászbástya Budapesten, a budai Várnegyedben található, ahonnan pazar panoráma nyílik a Dunára és a Parlamentre.",
    explanationDE:
      "Die Fischerbastei befindet sich in Budapest, im Burgviertel von Buda, von wo aus man einen herrlichen Panoramablick auf die Donau und das Parlament hat.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hol található a Visegrádi fellegvár?",
    questionDE: "Wo befindet sich die Festung von Visegrád?",
    answers: [
      {
        answerHU: "A Dunakanyarban",
        answerDE: "Im Donauknie",
        isCorrect: true,
      },
      {
        answerHU: "A Pilis-hegységben",
        answerDE: "Im Pilisgebirge",
        isCorrect: false,
      },
      {
        answerHU: "A Budai-hegységben",
        answerDE: "Im Budaer Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Visegrádi fellegvár a Dunakanyarban, egy magas hegytetőn található, festői környezetben, csodálatos kilátással.",
    explanationDE:
      "Die Burg Visegrád liegt in der Donauknie, auf einem hohen Hügel, in malerischer Umgebung mit herrlicher Aussicht.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik hegy a legmagasabb pont Magyarországon?",
    questionDE: "Welcher Berg ist der höchste Punkt in Ungarn?",
    answers: [
      {
        answerHU: "Kékestető",
        answerDE: "Kékestető",
        isCorrect: true,
      },
      {
        answerHU: "Galyatető",
        answerDE: "Galyatető",
        isCorrect: false,
      },
      {
        answerHU: "Írott-kő",
        answerDE: "Geschriebenstein",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A  Mátra hegységben található Kékestető 1014 méter magas, így az ország legmagasabb pontja, és kedvelt kirándulóhely.",
    explanationDE:
      "Der Kékestető im Matra-Gebirge ist 1014 Meter hoch und somit der höchste Punkt des Landes und ein beliebtes Ausflugsziel.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik nagyváros helyezkedik el a Tisza alsó szakaszán?",
    questionDE: "Welche Großstadt liegt am Unterlauf der Theiß?",
    answers: [
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: true,
      },
      {
        answerHU: "Szolnok",
        answerDE: "Szolnok",
        isCorrect: false,
      },
      {
        answerHU: "Miskolc",
        answerDE: "Miskolc",
        isCorrect: false,
      },
    ],
    explanationHU:
      'Szeged a Tisza alsó, déli szakaszán terül el.  A "Napfény városa"  gazdag kulturális élettel és szecessziós épületekkel várja.',
    explanationDE:
      'Szeged liegt am unteren, südlichen Abschnitt der Theiß. Die "Stadt des Sonnenscheins" erwartet Sie mit einem reichen kulturellen Leben und Jugendstilgebäuden.',
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hol találjuk a 'Hortobágy' nevű pusztát?",
    questionDE: "Wo befindet sich die Puszta namens 'Hortobágy'?",
    answers: [
      {
        answerHU: "Kelet-Magyarországon, Debrecen környékén",
        answerDE: "In Ostungarn, Nähe Debrecen",
        isCorrect: true,
      },
      {
        answerHU: "Közép-Alföldön, a Tisza partján",
        answerDE: "In der Mittleren Tiefebene, am Ufer der Theiß",
        isCorrect: false,
      },
      {
        answerHU: "Észak-Alföldön, a Sajó völgyében",
        answerDE: "In der Nördlichen Großen Tiefebene, im Sajó-Tal",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Hortobágy az Alföldön terül el, híres puszta, mely  természeti értékeivel és  lovakat bemutató hagyományőrző programokkal  várja.",
    explanationDE:
      "Die Hortobágy liegt in der Tiefebene und ist eine berühmte Puszta, die mit ihren Naturschätzen und traditionellen Programmen mit Pferdevorführungen lockt.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik folyó képezi részben Magyarország és Szlovákia határát?",
    questionDE:
      "Welcher Fluss bildet teils die Grenze zwischen Ungarn und der Slowakei?",
    answers: [
      {
        answerHU: "A Duna",
        answerDE: "Die Donau",
        isCorrect: true,
      },
      {
        answerHU: "A Tisza",
        answerDE: "Die Theiß",
        isCorrect: false,
      },
      {
        answerHU: "A Dráva",
        answerDE: "Die Drau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Duna folyó több szakaszon is határfolyó  Magyarország és Szlovákia között, fontos vízi út is egyben.",
    explanationDE:
      "Die Donau ist in mehreren Abschnitten ein Grenzfluss zwischen Ungarn und der Slowakei und gleichzeitig eine wichtige Wasserstraße.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik város híres a katedrálisáról, amely Magyarország egyik legnagyobb temploma?",
    questionDE:
      "Welche Stadt ist berühmt für ihre Kathedrale, eine der größten Kirchen Ungarns?",
    answers: [
      {
        answerHU: "Esztergom",
        answerDE: "Esztergom",
        isCorrect: true,
      },
      {
        answerHU: "Pannonhalma",
        answerDE: "Pannonhalma",
        isCorrect: false,
      },
      {
        answerHU: "Székesfehérvár",
        answerDE: "Stuhlweißenburg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Esztergom városa büszkélkedhet a Bazilikával, mely Magyarország legnagyobb temploma,  az ország  egyházi központja.",
    explanationDE:
      "Die Stadt Esztergom ist stolz auf ihre Basilika, die größte Kirche Ungarns und das kirchliche Zentrum des Landes.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik város a 'hídiváros', melynek részei a Duna két oldalán helyezkednek el?",
    questionDE:
      "Welche Stadt ist die 'Brückenstadt', deren Teile an beiden Donauseiten liegen?",
    answers: [
      {
        answerHU: "Budapest",
        answerDE: "Budapest",
        isCorrect: true,
      },
      {
        answerHU: "Győr",
        answerDE: "Győr",
        isCorrect: false,
      },
      {
        answerHU: "Vác",
        answerDE: "Waitzen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapest a „hídiváros”, mert a Duna feletti hidak összekötik Budát és Pestet, amelyek 1873-ig önálló városok voltak.",
    explanationDE:
      'Budapest ist die "Brückenstadt", denn die Brücken über die Donau verbinden Buda und Pest, die bis 1873 eigenständige Städte waren.',
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik magyar város található a Bükk hegység közelében?",
    questionDE: "Welche ungarische Stadt liegt in der Nähe des Bükk-Gebirges?",
    answers: [
      {
        answerHU: "Miskolc",
        answerDE: "Miskolc",
        isCorrect: true,
      },
      {
        answerHU: "Ózd",
        answerDE: "Ózd",
        isCorrect: false,
      },
      {
        answerHU: "Szikszó",
        answerDE: "Szikszó",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Miskolc a Bükk hegység lábánál fekszik,  az ország harmadik legnagyobb városa, ipari és kulturális központ.",
    explanationDE:
      "Miskolc liegt am Fuße des Bükk-Gebirges und ist die drittgrößte Stadt des Landes, ein Industrie- und Kulturzentrum.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik folyó található teljesen Magyarország területén belül?",
    questionDE:
      "Welcher Fluss befindet sich vollständig innerhalb der Grenzen Ungarns?",
    answers: [
      {
        answerHU: "A Zala",
        answerDE: "Die Zala",
        isCorrect: true,
      },
      {
        answerHU: "A Duna",
        answerDE: "Die Donau",
        isCorrect: false,
      },
      {
        answerHU: "A Dráva",
        answerDE: "Die Drau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Zala folyó teljes egészében Magyarországon folyik, a  Balatonba ömlik, Nyugat-Magyarország fontos vízfolyása.",
    explanationDE:
      "Der Fluss Zala fließt vollständig durch Ungarn, mündet in den Plattensee und ist ein wichtiges Gewässer Westungarns.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik város nevezetes a Zsolnay kerámiáról?",
    questionDE: "Welche Stadt ist für die Zsolnay-Keramik bekannt?",
    answers: [
      {
        answerHU: "Pécs",
        answerDE: "Pécs",
        isCorrect: true,
      },
      {
        answerHU: "Sopron",
        answerDE: "Sopron",
        isCorrect: false,
      },
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Pécs városa nevezetes a Zsolnay kerámiáról, mely  a város jelképe, gyönyörű épületeken és dísztárgyakon csodálható meg.",
    explanationDE:
      "Die Stadt Pécs ist berühmt für das Zsolnay-Keramik, das Wahrzeichen der Stadt, das auf wunderschönen Gebäuden und Ziergegenständen bewundert werden kann.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik híres tó található Hévíz városánál?",
    questionDE: "Welcher berühmte See liegt bei der Stadt Hévíz?",
    answers: [
      {
        answerHU: "Európa legnagyobb termáltava",
        answerDE: "Der größte Thermalsee Europas",
        isCorrect: true,
      },
      {
        answerHU: "Európa egyik legmélyebb tava",
        answerDE: "Einer der tiefsten Seen Europas",
        isCorrect: false,
      },
      {
        answerHU: "A Tisza egyik mesterséges tava",
        answerDE: "Einer der künstlichen Seen der Theiß",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hévíz városánál található a Hévízi-tó, a világ legnagyobb biológiailag aktív termáltava,  gyógyhatású vizéről híres.",
    explanationDE:
      "In der Nähe der Stadt Hévíz befindet sich der Hévízer See, der größte biologisch aktive Thermalsee der Welt, der für sein heilendes Wasser berühmt ist.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik megye központja Szolnok?",
    questionDE: "Von welchem Komitat ist Szolnok die Hauptstadt?",
    answers: [
      {
        answerHU: "Jász-Nagykun-Szolnok megye",
        answerDE: "Komitat Jász-Nagykun-Szolnok",
        isCorrect: true,
      },
      {
        answerHU: "Borsod-Abaúj-Zemplén megye",
        answerDE: "Komitat Borsod-Abaúj-Zemplén",
        isCorrect: false,
      },
      {
        answerHU: "Veszprém megye",
        answerDE: "Komitat Veszprém",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szolnok város a Tisza folyó partján fekszik,  Jász-Nagykun-Szolnok megye központja,  fontos közlekedési csomópont.",
    explanationDE:
      "Die Stadt Szolnok liegt am Ufer der Theiß, ist das Zentrum des Komitats Jász-Nagykun-Szolnok und ein wichtiger Verkehrsknotenpunkt.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik folyó folyik végig szinte teljesen Kelet-Magyarországon, mielőtt Romániába átlépne?",
    questionDE:
      "Welcher Fluss fließt fast komplett durch Ostungarn, bevor er nach Rumänien übertritt?",
    answers: [
      {
        answerHU: "A Kraszna",
        answerDE: "Die Kraszna",
        isCorrect: true,
      },
      {
        answerHU: "A Tisza",
        answerDE: "Die Theiß",
        isCorrect: false,
      },
      {
        answerHU: "A Zagyva",
        answerDE: "Die Zagyva",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Kraszna folyó kelet-Magyarországon, Szabolcs-Szatmár-Bereg megyében folyik, majd Romániába lép át.",
    explanationDE:
      "Der Fluss Kraszna fließt in Ostungarn, im Komitat Szabolcs-Szatmár-Bereg, und tritt dann nach Rumänien über.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik tó partján rendezik meg gyakran a 'Strandröplabda Fesztivált' és horgászversenyeket?",
    questionDE:
      "An welchem See werden oft Beachvolleyball-Festivals und Angelwettbewerbe veranstaltet?",
    answers: [
      {
        answerHU: "A Velencei-tónál",
        answerDE: "Am Velence-See",
        isCorrect: true,
      },
      {
        answerHU: "A Fertő-tónál",
        answerDE: "Am Neusiedler See",
        isCorrect: false,
      },
      {
        answerHU: "A Tisza-tónál",
        answerDE: "Am Theiß-See",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Velencei-tó partján gyakran rendeznek strandröplabda fesztivált és horgászversenyeket, kedvelt  pihenőhely Budapest közelében.",
    explanationDE:
      "Am Ufer des Velencer Sees finden oft Beachvolleyball-Festivals und Angelwettbewerbe statt, ein beliebter Erholungsort in der Nähe von Budapest.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Mi Magyarország fővárosa?",
    questionDE: "Welche ist die Hauptstadt Ungarns?",
    answers: [
      {
        answerHU: "Debrecen",
        answerDE: "Debrecen",
        isCorrect: false,
      },
      {
        answerHU: "Budapest",
        answerDE: "Budapest",
        isCorrect: true,
      },
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapest Magyarország fővárosa, az ország  politikai, gazdasági és kulturális központja, a Duna két partján terül el.",
    explanationDE:
      "Budapest ist die Hauptstadt Ungarns, das politische, wirtschaftliche und kulturelle Zentrum des Landes, das sich an beiden Ufern der Donau erstreckt.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Hány szomszédos országa van Magyarországnak?",
    questionDE: "Wie viele Nachbarländer hat Ungarn?",
    answers: [
      {
        answerHU: "Öt",
        answerDE: "Fünf",
        isCorrect: false,
      },
      {
        answerHU: "Hét",
        answerDE: "Sieben",
        isCorrect: true,
      },
      {
        answerHU: "Kilenc",
        answerDE: "Neun",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyarországnak hét szomszédos országa van:  Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország és Szlovénia.",
    explanationDE:
      "Ungarn hat sieben Nachbarländer: Österreich, die Slowakei, die Ukraine, Rumänien, Serbien, Kroatien und Slowenien.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik folyó folyik keresztül Baján?",
    questionDE: "Welcher Fluss fließt durch Baja?",
    answers: [
      {
        answerHU: "Tisza",
        answerDE: "Theiß",
        isCorrect: false,
      },
      {
        answerHU: "Duna",
        answerDE: "Donau",
        isCorrect: true,
      },
      {
        answerHU: "A Garam",
        answerDE: "Die Gran",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Baja városa a Duna bal partján fekszik,  ahol a folyó délről északra fordul,  a város a Duna menti síkságon található.",
    explanationDE:
      "Die Stadt Baja liegt am linken Ufer der Donau, wo sich der Fluss von Süden nach Norden wendet, die Stadt liegt in der Donauebene.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU:
      "Melyik Balaton-parti város híres pezsgő éjszakai életéről a déli oldalon?",
    questionDE:
      "Welche Stadt an der Südseite des Balaton ist für ihr lebhaftes Nachtleben bekannt?",
    answers: [
      {
        answerHU: "Balatonboglár",
        answerDE: "Balatonboglár",
        isCorrect: false,
      },
      {
        answerHU: "Siófok",
        answerDE: "Siófok",
        isCorrect: true,
      },
      {
        answerHU: "Balatonfenyves",
        answerDE: "Balatonfenyves",
        isCorrect: false,
      },
    ],
    explanationHU:
      'Siófok a Balaton déli partján fekszik,  pezsgő éjszakai életéről és nyári fesztiváljairól ismert, a "Balaton fővárosa".',
    explanationDE:
      'Siófok liegt am Südufer des Plattensees, ist bekannt für sein pulsierendes Nachtleben und seine Sommerfestivals, die "Hauptstadt des Plattensees".',
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik folyó vezeti le a Balaton vizét a Dunába?",
    questionDE: "Welcher Fluss leitet das Wasser des Balaton in die Donau ab?",
    answers: [
      {
        answerHU: "Zala",
        answerDE: "Zala",
        isCorrect: false,
      },
      {
        answerHU: "Sió",
        answerDE: "Sió",
        isCorrect: true,
      },
      {
        answerHU: "Körös",
        answerDE: "Körös",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Sió-csatorna vezeti le a Balaton vizét a Dunába, szabályozza a tó vízszintjét, és  hajózható is kisebb hajók számára.",
    explanationDE:
      "Der Sió-Kanal leitet das Wasser des Plattensees in die Donau ab, reguliert den Wasserstand des Sees und ist auch für kleinere Schiffe schiffbar.",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik ország fekszik Magyarország keleti határán?",
    questionDE: "Welches Land grenzt im Osten an Ungarn?",
    answers: [
      {
        answerHU: "Szerbia",
        answerDE: "Serbien",
        isCorrect: false,
      },
      {
        answerHU: "Románia",
        answerDE: "Rumänien",
        isCorrect: true,
      },
      {
        answerHU: "Szlovákia",
        answerDE: "Slowakei",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyarország keleti határán Románia fekszik, hosszú határszakaszon osztoznak, a határ  része a Maros folyó.",
    explanationDE:
      "An der östlichen Grenze Ungarns liegt Rumänien, mit dem es sich einen langen Grenzabschnitt teilt, ein Teil der Grenze ist der Fluss Mureș (Maros).",
  },
  {
    category: "Geografie",
    level: 1,
    questionHU: "Melyik város Szabolcs-Szatmár-Bereg megye székhelye?",
    questionDE:
      "Welche Stadt  ist Hauptstadt des Komitats Szabolcs-Szatmár-Bereg?",
    answers: [
      {
        answerHU: "Eger",
        answerDE: "Eger",
        isCorrect: false,
      },
      {
        answerHU: "Nyíregyháza",
        answerDE: "Nyíregyháza",
        isCorrect: true,
      },
      {
        answerHU: "Sátoraljaújhely",
        answerDE: "Sátoraljaújhely",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Nyíregyháza Szabolcs-Szatmár-Bereg megye székhelye, a régió legnagyobb városa,  dinamikusan fejlődő kulturális és gazdasági központ.",
    explanationDE:
      "Nyíregyháza ist die Hauptstadt des Komitats Szabolcs-Szatmár-Bereg, die größte Stadt der Region, ein sich dynamisch entwickelndes kulturelles und wirtschaftliches Zentrum.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor történt a 'Honfoglalás' (Landnahme)?",
    questionDE: "Wann fand die 'Landnahme' (Honfoglalás) der Ungarn statt?",
    answers: [
      {
        answerHU:
          "A honfoglalás a 9. század végén, körülbelül 895–896-ban zajlott le.",
        answerDE:
          "Die Landnahme fand Ende des 9. Jahrhunderts, etwa in den Jahren 895–896, statt. ",
        isCorrect: true,
      },
      {
        answerHU: "A honfoglalás a 9. században, konkrétan 896-ban történt.",
        answerDE: "Die Landnahme erfolgte im 9. Jahrhundert, konkret 896.",
        isCorrect: false,
      },
      {
        answerHU:
          "A honfoglalás 1920-ban történt, amikor a Trianoni békeszerződés életbe lépett.",
        answerDE:
          "Die Landnahme erfolgte 1920, als der Vertrag von Trianon in Kraft trat.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A magyar honfoglalás 895-896 körül történt,  ekkor vették birtokba a magyar törzsek a Kárpát-medencét, megalapítva az államot.",
    explanationDE:
      "Die ungarische Landnahme erfolgte um 895-896, als die ungarischen Stämme das Karpatenbecken in Besitz nahmen und den Staat gründeten.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Ki volt az első magyar király?",
    questionDE: "Wer war der erste ungarische König?",
    answers: [
      {
        answerHU: "Szent István",
        answerDE: "Heiliger Stephan (Stephan I.)",
        isCorrect: true,
      },
      {
        answerHU: "Mátyás király",
        answerDE: "König Matthias",
        isCorrect: false,
      },
      {
        answerHU: "II. András",
        answerDE: "Andreas II.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "I. Istvánt,  Szent Istvánt  1000-ben koronázták Magyarország első királyává, az államalapító, a kereszténység terjesztője.",
    explanationDE:
      "Stephan I., der Heilige Stephan, wurde im Jahr 1000 zum ersten König von Ungarn gekrönt, der Staatsgründer, der Verbreiter des Christentums.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Melyik híres uralkodót nevezik 'Igazságos' Mátyás királynak?",
    questionDE:
      "Welcher berühmte Herrscher wird als 'gerechter' König Matthias bezeichnet?",
    answers: [
      {
        answerHU: "Hunyadi Mátyás",
        answerDE: "Hunyadi Mátyás",
        isCorrect: true,
      },
      {
        answerHU: "Szapolyai János",
        answerDE: "Johann Zápolya",
        isCorrect: false,
      },
      {
        answerHU: "Mátyás Rákosi",
        answerDE: "Mátyás Rákosi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hunyadi Mátyást  igazságosságáról, bölcsességéről és igazságos ítéleteiről nevezték „Igazságos” Mátyás királynak.",
    explanationDE:
      'Matthias Corvinus wurde wegen seiner Gerechtigkeit, Weisheit und gerechten Urteile "Matthias der Gerechte" genannt.',
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Milyen jelentős esemény történt 1956-ban Magyarországon?",
    questionDE: "Welches bedeutende Ereignis fand 1956 in Ungarn statt?",
    answers: [
      {
        answerHU:
          "1956-ban a magyar nép felkelést szervezett a kommunista diktatúra és a szovjet elnyomás ellen, forradalom és szabadságharc formájában.",
        answerDE:
          "1956 erhob sich das ungarische Volk in einem Aufstand gegen die kommunistische Diktatur und sowjetische Unterdrückung, in Form einer Revolution und eines Freiheitskampfes.",
        isCorrect: true,
      },
      {
        answerHU:
          "1956-ban Magyarország hivatalosan csatlakozott a Varsói Szerződéshez, ami a keleti blokk erősödését jelezte.",
        answerDE:
          "1956 trat Ungarn offiziell dem Warschauer Pakt bei, was die Stärkung des Ostblocks signalisierte.",
        isCorrect: false,
      },
      {
        answerHU:
          "1956-ban az országban az első demokratikus választásokat rendezték meg, amelyek azonban nem hozták meg a várt változásokat.",
        answerDE:
          "1956 wurden die ersten demokratischen Wahlen im Land abgehalten, die jedoch nicht die erwarteten Veränderungen brachten.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1956-ban  magyar forradalom és szabadságharc tört ki a kommunista diktatúra és a szovjet elnyomás ellen, a nép felkelése.",
    explanationDE:
      "1956 brach der ungarische Aufstand und Freiheitskampf gegen die kommunistische Diktatur und die sowjetische Unterdrückung aus, der Volksaufstand.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Melyik híres csata zajlott 1526-ban?",
    questionDE: "Welche berühmte Schlacht fand 1526 statt?",
    answers: [
      {
        answerHU: "A mohácsi csata",
        answerDE: "Die Schlacht von Mohács",
        isCorrect: true,
      },
      {
        answerHU: "A pozsonyi csata",
        answerDE: "Die Schlacht von Pressburg",
        isCorrect: false,
      },
      {
        answerHU: "A rigómezei csata",
        answerDE: "Die Schlacht auf dem Amselfeld",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1526-ban zajlott a mohácsi csata, ahol  a török hadsereg legyőzte a magyar sereget,  Magyarország történelmének sorsfordító eseménye.",
    explanationDE:
      "1526 fand die Schlacht bei Mohács statt, in der die türkische Armee das ungarische Heer besiegte, ein schicksalhaftes Ereignis in der Geschichte Ungarns.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor történt a Rákóczi-szabadságharc?",
    questionDE: "Wann fand der Rákóczi-Freiheitskampf statt?",
    answers: [
      {
        answerHU: "1703–1711",
        answerDE: "1703–1711",
        isCorrect: true,
      },
      {
        answerHU: "1848–1849",
        answerDE: "1848–1849",
        isCorrect: false,
      },
      {
        answerHU: "1914–1918",
        answerDE: "1914–1918",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Rákóczi-szabadságharc 1703-tól 1711-ig tartott, II. Rákóczi Ferenc vezetésével,  a Habsburg uralom elleni küzdelem.",
    explanationDE:
      "Der Rákóczi-Freiheitskampf dauerte von 1703 bis 1711 unter der Führung von Franz II. Rákóczi, der Kampf gegen die Habsburger Herrschaft.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Melyik békeszerződés csonkította meg Magyarország területét 1920-ban?",
    questionDE: "Welcher Friedensvertrag verkleinerte Ungarns Gebiet 1920?",
    answers: [
      {
        answerHU: "A trianoni békeszerződés",
        answerDE: "Der Vertrag von Trianon",
        isCorrect: true,
      },
      {
        answerHU: "A Varsói Szerződés",
        answerDE: "Der Warschauer Pakt",
        isCorrect: false,
      },
      {
        answerHU: "A párizsi béke",
        answerDE: "Der Pariser Frieden",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1920-as trianoni békeszerződés csonkította meg Magyarország területét,  elvesztette területe kétharmadát, és  sok magyarlakta terület került  más országokhoz.",
    explanationDE:
      "Der Vertrag von Trianon von 1920 verstümmelte das Gebiet Ungarns, es verlor zwei Drittel seines Territoriums, und viele von Ungarn bewohnte Gebiete kamen zu anderen Ländern.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Ki volt 'Mátyás király'?",
    questionDE: "Wer war 'König Matthias'?",
    answers: [
      {
        answerHU:
          "Hunyadi Mátyás, a 15. századi uralkodó, akit az 'Igazságos' jelzővel is illettek.",
        answerDE:
          'Matthias Hunyadi, ein Herrscher des 15. Jahrhunderts, der auch mit dem Beinamen "der Gerechte" belegt wurde.',
        isCorrect: true,
      },
      {
        answerHU:
          "Rákóczi Mátyás, egy 17. századi erdélyi fejedelem, aki a Habsburgok ellen harcolt.",
        answerDE:
          "Mátyás Rákóczi, ein siebenbürgischer Fürst des 17. Jahrhunderts, der gegen die Habsburger kämpfte.",
        isCorrect: false,
      },
      {
        answerHU: "Dobó Mátyás, az egri vár védője a török ostrom idején.",
        answerDE:
          "Dobó Mátyás, der Verteidiger der Burg von Eger während der türkischen Belagerung.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mátyás király,  más néven Corvin Mátyás, Magyarország egyik  legnagyobb királya,  reneszánsz udvart tartott, igazságos uralkodóként emlékeznek rá.",
    explanationDE:
      "König Matthias, auch Matthias Corvinus genannt, ist einer der größten Könige Ungarns, er führte einen Renaissance-Hof und wird als gerechter Herrscher in Erinnerung behalten.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor alakult meg az Osztrák–Magyar Monarchia?",
    questionDE: "Wann entstand die Österreichisch-Ungarische Monarchie?",
    answers: [
      {
        answerHU: "1867-ben, a kiegyezéskor",
        answerDE: "1867 beim Ausgleich",
        isCorrect: true,
      },
      {
        answerHU: "1848-ban, a forradalom után",
        answerDE: "1848, nach der Revolution",
        isCorrect: false,
      },
      {
        answerHU: "1918-ban, a Monarchia végekor",
        answerDE: "1918, am Ende der Monarchie",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az Osztrák–Magyar Monarchia 1867-ben jött létre az osztrák-magyar kiegyezéssel,  dualista államként,  Magyarország belső autonómiát kapott.",
    explanationDE:
      "Die Österreichisch-Ungarische Monarchie entstand 1867 durch den österreichisch-ungarischen Ausgleich als dualistischer Staat, Ungarn erhielt innere Autonomie.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Ki vezette az 1848–49-es szabadságharcot?",
    questionDE: "Wer führte den Freiheitskampf 1848–49?",
    answers: [
      {
        answerHU: "Kossuth Lajos",
        answerDE: "Lajos Kossuth",
        isCorrect: true,
      },
      {
        answerHU: "Petőfi Sándor",
        answerDE: "Sándor Petőfi",
        isCorrect: false,
      },
      {
        answerHU: "Rákóczi Ferenc",
        answerDE: "Franz Rákóczi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1848–49-es szabadságharcot Kossuth Lajos vezette kormányzóelnökként,  a Habsburg uralom elleni  nemzeti felkelés.",
    explanationDE:
      "Der Freiheitskampf von 1848-49 wurde von Lajos Kossuth als Gouverneurpräsident geführt, der nationale Aufstand gegen die Habsburger Herrschaft.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor történt az 1956-os forradalom?",
    questionDE: "Wann ereignete sich die Revolution von 1956?",
    answers: [
      {
        answerHU: "Október 23-án kezdődött",
        answerDE: "Sie begann am 23. Oktober",
        isCorrect: true,
      },
      {
        answerHU: "Március 15-én kezdődött",
        answerDE: "Sie begann am 15. März",
        isCorrect: false,
      },
      {
        answerHU: "Június 4-én",
        answerDE: "Am 4. Juni",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1956-os forradalom október 23-án tört ki, a  kommunista diktatúra és a szovjet megszállás elleni népfelkelés,  világraszóló esemény.",
    explanationDE:
      "Der Aufstand von 1956 brach am 23. Oktober aus, der Volksaufstand gegen die kommunistische Diktatur und die sowjetische Besatzung, ein welterschütterndes Ereignis.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Melyik királyhoz köthető a budai Mátyás-templom névadása?",
    questionDE: "Welcher König ist Namensgeber der Matthiaskirche in Buda?",
    answers: [
      {
        answerHU: "Hunyadi Mátyáshoz",
        answerDE: "Zu Matthias Hunyadi / zu Matthias Corvinus",
        isCorrect: true,
      },
      {
        answerHU: "II. Andráshoz",
        answerDE: "Zu Andreas II.",
        isCorrect: false,
      },
      {
        answerHU: "IV. Béla",
        answerDE: "Béla IV.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A budai Mátyás-templom  IV. Béla idején épült a 13. században,  Mátyás király uralkodása alatt  élte fénykorát,  innen a névadás.",
    explanationDE:
      "Die Matthias-Kirche in Buda wurde unter Béla IV. im 13. Jahrhundert erbaut, unter der Herrschaft von König Matthias erlebte sie ihre Blütezeit, daher der Name.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Ki volt Magyarország kormányzója az 1920-as évektől 1944-ig?",
    questionDE: "Wer war Ungarns Regent von 1920 bis 1944?",
    answers: [
      {
        answerHU: "Horthy Miklós",
        answerDE: "Miklós Horthy",
        isCorrect: true,
      },
      {
        answerHU: "Kun Béla",
        answerDE: "Béla Kun",
        isCorrect: false,
      },
      {
        answerHU: "Nagy Imre",
        answerDE: "Imre Nagy",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Horthy Miklós volt Magyarország kormányzója 1920-tól 1944-ig,  a két világháború közötti időszakban irányította az országot.",
    explanationDE:
      "Miklós Horthy war von 1920 bis 1944 Reichsverweser von Ungarn, er lenkte das Land in der Zwischenkriegszeit.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Mikor lett Budapest egységes várossá Buda, Pest és Óbuda egyesítésével?",
    questionDE:
      "Wann wurde Budapest zur einheitlichen Stadt durch den Zusammenschluss von Buda, Pest und Óbuda?",
    answers: [
      {
        answerHU: "1873-ban",
        answerDE: "1873",
        isCorrect: true,
      },
      {
        answerHU: "1849-ben",
        answerDE: "1849",
        isCorrect: false,
      },
      {
        answerHU: "1900-ban",
        answerDE: "1900",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapest 1873-ban lett egységes várossá Buda, Pest és Óbuda egyesítésével,  ezzel  létrejött a modern főváros.",
    explanationDE:
      "Budapest wurde 1873 durch die Vereinigung von Buda, Pest und Óbuda zu einer einzigen Stadt, wodurch die moderne Hauptstadt entstand.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Melyik városban született Kossuth Lajos, az 1848–49-es szabadságharc vezető egyénisége?",
    questionDE:
      "In welcher Stadt wurde Lajos Kossuth geboren, die Führungsfigur des Freiheitskampfs 1848–49?",
    answers: [
      {
        answerHU: "Monokon",
        answerDE: "In Monok",
        isCorrect: true,
      },
      {
        answerHU: "Debrecenben",
        answerDE: "In Debrecen",
        isCorrect: false,
      },
      {
        answerHU: "Kecskeméten",
        answerDE: "In Kecskemét",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kossuth Lajos Monokon született,  az 1848–49-es szabadságharc  ikonikus vezetője,  kiemelkedő politikus és szónok.",
    explanationDE:
      "Lajos Kossuth wurde in Monok geboren, der ikonische Anführer des Freiheitskampfes von 1848-49, ein herausragender Politiker und Redner.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Mikor született a 'millennium' alkalmából az ezredéves emlékmű a Hősök terén Budapesten?",
    questionDE:
      "Wann entstand das Millennium-Denkmal auf dem Heldenplatz in Budapest?",
    answers: [
      {
        answerHU:
          "Körülbelül 1896-ban, a honfoglalás ezredéves évfordulójának alkalmából épült az ezredéves emlékmű a Hősök terén.",
        answerDE:
          "Ungefähr 1896, anlässlich des tausendjährigen Jubiläums der Landnahme, wurde das Millenniumsdenkmal auf dem Heldenplatz errichtet.",
        isCorrect: true,
      },
      {
        answerHU:
          "1867-ben, a kiegyezés alkalmából, a dualizmus megteremtésének szimbólumaként",
        answerDE:
          "1867, anlässlich des Ausgleichs, als Symbol für die Schaffung des Dualismus",
        isCorrect: false,
      },
      {
        answerHU:
          "1848-ban, a forradalom és szabadságharc emlékére, a nemzeti függetlenség jelképeként",
        answerDE:
          "1848, zum Gedenken an die Revolution und den Freiheitskampf, als Symbol der nationalen Unabhängigkeit",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A budapesti Hősök tere  ezredéves emlékműve 1896-ban készült a millennium alkalmából,  a magyar államalapítás  ezeréves évfordulójára.",
    explanationDE:
      "Der Heldenplatz in Budapest ist ein tausendjähriges Denkmal, das 1896 anlässlich des Millenniums, des tausendjährigen Jubiläums der ungarischen Staatsgründung, errichtet wurde.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Melyik dinasztia uralkodott a 9. század végétől a 14. századig Magyarországon?",
    questionDE:
      "Welche Dynastie regierte Ungarn vom Ende des 9. bis ins 14. Jahrhundert?",
    answers: [
      {
        answerHU: "Anjou-ház",
        answerDE: "Haus Anjou",
        isCorrect: false,
      },
      {
        answerHU: "Árpád-ház",
        answerDE: "Árpáden-Dynastie",
        isCorrect: true,
      },
      {
        answerHU: "Hunyadi-család",
        answerDE: "Hunyadi-Familie",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az Árpád-ház uralkodott Magyarországon a 9. század végétől a 14. századig,  az első magyar királyi dinasztia,  Szent István is ide tartozott.",
    explanationDE:
      "Das Haus Árpád herrschte in Ungarn vom Ende des 9. bis zum 14. Jahrhundert, die erste ungarische Königsdynastie, zu der auch der Heilige Stephan gehörte.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Hogyan nevezik a hét magyar vezért a honfoglalás korából?",
    questionDE:
      "Wie nannte man die Gruppe der sieben ungarischen Fürsten bei der Landnahme?",
    answers: [
      {
        answerHU: "Hét levente",
        answerDE: "Sieben junge Krieger",
        isCorrect: false,
      },
      {
        answerHU: "Hét vezér",
        answerDE: "Sieben Stammesfürsten",
        isCorrect: true,
      },
      {
        answerHU: "Hét atya",
        answerDE: "Sieben Väter",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A honfoglalás korából származó hét magyar vezért hét vezérnek nevezik,  Árpád  kiemelkedett közülük,  ő vezette a törzseket.",
    explanationDE:
      "Die sieben ungarischen Fürsten aus der Zeit der Landnahme werden sieben Fürsten genannt, Árpád ragte unter ihnen hervor, er führte die Stämme an.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Melyik században vált Magyarország a Habsburg Birodalom részévé?",
    questionDE:
      "In welchem Jahrhundert wurde Ungarn Teil der Habsburgermonarchie?",
    answers: [
      {
        answerHU: "15. században",
        answerDE: "Im 15. Jahrhundert",
        isCorrect: false,
      },
      {
        answerHU: "16. században",
        answerDE: "Im 16. Jahrhundert",
        isCorrect: true,
      },
      {
        answerHU: "18. században",
        answerDE: "18. Jahrhundert",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyarország a 16. században, az 1526-os mohácsi csata után fokozatosan vált a Habsburg Birodalom részévé,  hosszú ideig tartott a folyamat.",
    explanationDE:
      "Ungarn wurde im 16. Jahrhundert, nach der Schlacht bei Mohács 1526, schrittweise Teil des Habsburger Reiches, der Prozess dauerte lange.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Melyik magyar király erősítette meg a kereszténységet számos kolostor alapításával?",
    questionDE:
      "Welcher ungarische König gründete viele Klöster und festigte so das Christentum?",
    answers: [
      {
        answerHU:
          "Könyves Kálmán, aki törvényeivel erősítette a királyi hatalmat.",
        answerDE:
          "Kálmán der Buchkundige/Gelehrte, der die königliche Macht mit seinen Gesetzen stärkte. ",
        isCorrect: false,
      },
      {
        answerHU:
          "I. László (Szent László) számos kolostor alapításával erősítette meg a kereszténységet Magyarországon.",
        answerDE:
          "Ladislaus I. (Heiliger Ladislaus) stärkte das Christentum in Ungarn durch die Gründung zahlreicher Klöster.",
        isCorrect: true,
      },
      {
        answerHU:
          "II. Géza, aki a Német-római Birodalommal ápolt szoros kapcsolatokat.",
        answerDE:
          "Géza II., der enge Beziehungen zum Heiligen Römischen Reich pflegte.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szent László magyar király  számos kolostort alapított, ezzel  erősítve meg a kereszténységet az országban,  egyházi és világi  hatalom megszilárdítója.",
    explanationDE:
      "Der ungarische König Heiliger Ladislaus gründete zahlreiche Klöster und stärkte damit das Christentum im Land, Festigung der kirchlichen und weltlichen Macht.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mikor szabadult fel Buda a török uralom alól?",
    questionDE: "Wann wurde Buda von der türkischen Herrschaft befreit?",
    answers: [
      {
        answerHU: "1526",
        answerDE: "1526",
        isCorrect: false,
      },
      {
        answerHU: "1686",
        answerDE: "1686",
        isCorrect: true,
      },
      {
        answerHU: "1703",
        answerDE: "1703",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Buda 1686-ban szabadult fel a török uralom alól,  egy hosszú ostrom után,  a Szent Liga csapatai foglalták vissza,  véget ért a török hódoltság kora.",
    explanationDE:
      "Buda wurde 1686 von der türkischen Herrschaft befreit, nach einer langen Belagerung wurde es von den Truppen der Heiligen Liga zurückerobert, das Zeitalter der türkischen Herrschaft endete.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Ki volt az utolsó magyar király a köztársaság kikiáltása előtt (1918)?",
    questionDE:
      "Wer war der letzte König Ungarns vor Ausrufung der Republik 1918?",
    answers: [
      {
        answerHU:
          "I. Ferenc József, aki 1867-től 1916-ig uralkodott az Osztrák–Magyar Monarchia részeként.",
        answerDE:
          "Franz Joseph I., der von 1867 bis 1916 als Teil der Österreichisch-Ungarischen Monarchie herrschte.",
        isCorrect: false,
      },
      {
        answerHU:
          "IV. Károly, aki 1916-tól uralkodott, de 1918-ban lemondott a magyar trónról.",
        answerDE:
          "Karl IV., der von 1916 regierte, aber 1918 auf den ungarischen Thron verzichtete.",
        isCorrect: true,
      },
      {
        answerHU:
          "Habsburg Ottó, az utolsó trónörökös, aki bár sosem uralkodott ténylegesen, de a trónigényéről sosem mondott le.",
        answerDE:
          "Otto von Habsburg, der letzte Thronfolger, der zwar nie tatsächlich regierte, aber nie auf seinen Thronanspruch verzichtete.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "IV. Károly volt az utolsó magyar király a köztársaság 1918-as kikiáltása előtt,  1916-tól uralkodott, de  lemondott a trónról a háború végén.",
    explanationDE:
      "Karl IV. war der letzte ungarische König vor der Ausrufung der Republik 1918, er herrschte ab 1916, verzichtete aber am Ende des Krieges auf den Thron.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Mit jelent az 1867-es „osztrák–magyar kiegyezés” röviden?",
    questionDE:
      "Was bedeutet der 1867 „Österreichisch-Ungarische Ausgleich“ kurz gesagt?",
    answers: [
      {
        answerHU:
          "Magyarország teljes függetlenségének kinyilvánítása Ausztriától, a Habsburg Birodalom felbomlása.",
        answerDE:
          "Erklärung der vollständigen Unabhängigkeit Ungarns von Österreich, Auflösung des Habsburgerreiches.",
        isCorrect: false,
      },
      {
        answerHU:
          "Kompromisszum a Habsburgokkal, amely nagyobb magyar önállóságot eredményezett a dualista monarchián belül.",
        answerDE:
          "Kompromiss mit den Habsburgern, der zu größerer ungarischer Selbstständigkeit innerhalb der dualistischen Monarchie führte.",
        isCorrect: true,
      },
      {
        answerHU:
          "Magyarország csatlakozása a Német Szövetséghez Ausztria közvetítésével, a magyar szuverenitás elvesztése.",
        answerDE:
          "Ungarns Beitritt zum Deutschen Bund durch Vermittlung Österreichs, Verlust der ungarischen Souveränität.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1867-es osztrák-magyar kiegyezés  egy dualista állam létrehozását jelentette,  Magyarország  belső önállóságot kapott az Osztrák Birodalmon belül.",
    explanationDE:
      "Der österreichisch-ungarische Ausgleich von 1867 bedeutete die Schaffung eines dualistischen Staates, Ungarn erhielt innere Autonomie innerhalb des österreichischen Reiches.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Melyik évben csatlakozott Magyarország az Európai Unióhoz?",
    questionDE: "Wann trat Ungarn der Europäischen Union bei?",
    answers: [
      {
        answerHU: "1998",
        answerDE: "1998",
        isCorrect: false,
      },
      {
        answerHU: "2004",
        answerDE: "2004",
        isCorrect: true,
      },
      {
        answerHU: "2010",
        answerDE: "2010",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyarország 2004. május 1-jén csatlakozott az Európai Unióhoz,  együtt Lengyelországgal, Csehországgal, Szlovákiával és más országokkal.",
    explanationDE:
      "Ungarn trat der Europäischen Union am 1. Mai 2004 zusammen mit Polen, der Tschechischen Republik, der Slowakei und anderen Ländern bei.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU:
      "Ki lett az 1989-es rendszerváltás után Magyarország államfője?",
    questionDE:
      "Wer wurde nach der Wende von 1989 ungarischer Staatspräsident?",
    answers: [
      {
        answerHU: "Antall József",
        answerDE: "József Antall",
        isCorrect: false,
      },
      {
        answerHU: "Göncz Árpád",
        answerDE: "Árpád Göncz",
        isCorrect: true,
      },
      {
        answerHU: "Horn Gyula",
        answerDE: "Gyula Horn",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Göncz Árpád lett az 1989-es rendszerváltás után Magyarország első köztársasági elnöke,  1990-től 2000-ig töltötte be a tisztséget.",
    explanationDE:
      "Árpád Göncz wurde nach der Wende von 1989 der erste Präsident der Republik Ungarn, er bekleidete das Amt von 1990 bis 2000.",
  },
  {
    category: "Geschichte",
    level: 1,
    questionHU: "Miért fontos 1989 Magyarország történetében?",
    questionDE:
      "Welche Bedeutung hat das Jahr 1989 für die ungarische Geschichte?",
    answers: [
      {
        answerHU: "Az államalapítás ezeréves évfordulója volt",
        answerDE: "Es war das tausendjährige Jubiläum der Staatsgründung",
        isCorrect: false,
      },
      {
        answerHU:
          "Véget ért a kommunista rendszer, demokratikus átmenet kezdődött",
        answerDE:
          "Das kommunistische System endete, ein demokratischer Übergang begann",
        isCorrect: true,
      },
      {
        answerHU: "Az ország belépett a NATO-ba",
        answerDE: "Das Land trat der NATO bei",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1989  fontos év Magyarország történelmében,  ekkor  zárult le a szocialista korszak,  megkezdődött a demokratikus átmenet, szabad választásokkal.",
    explanationDE:
      "1989 ist ein wichtiges Jahr in der Geschichte Ungarns, in diesem Jahr endete die sozialistische Ära, der demokratische Übergang begann mit freien Wahlen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik étel tekinthető a magyar konyha egyik ikonikus fogásának?",
    questionDE: "Welches Gericht gilt als eine Ikone der ungarischen Küche?",
    answers: [
      {
        answerHU: "Egy paprikás húsétel",
        answerDE: "Ein papriziertes Fleischgericht",
        isCorrect: true,
      },
      {
        answerHU: "Egy tejfölös tésztaétel",
        answerDE: "Ein Nudelgericht mit Sauerrahm",
        isCorrect: false,
      },
      {
        answerHU: "Egy gombás rizsétel",
        answerDE: "Ein Pilz-Reisgericht",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A gulyás  a magyar konyha egyik legismertebb és legikonikusabb fogása,  marhahúsból készül, paprikával, hagymával, köménnyel ízesítve.",
    explanationDE:
      "Das Gulasch ist eines der bekanntesten und ikonischsten Gerichte der ungarischen Küche, es wird aus Rindfleisch zubereitet und mit Paprika, Zwiebeln und Kümmel gewürzt.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a 'lángos' fő alapanyaga?",
    questionDE: "Was ist die Hauptzutat des 'Lángos'?",
    answers: [
      {
        answerHU:
          'Kelt tészta (liszt, élesztő, víz), bő olajban kisütve, "fokhagymás lével" megkenve.',
        answerDE:
          'Hefeteig (Mehl, Hefe, Wasser), in reichlich Öl ausgebacken und mit "Knoblauchsaft"bestrichen.',
        isCorrect: true,
      },
      {
        answerHU:
          "Vékonyra nyújtott, fűszeres burgonyalepény, ropogósra sütve, tejföllel kínálva.",
        answerDE:
          "Dünn ausgerollter, gewürzter Kartoffelfladen, knusprig gebacken, mit Sauerrahm serviert.",
        isCorrect: false,
      },
      {
        answerHU:
          "lesztő nélküli tészta, sajttal és tejföllel gazdagon megrakva, kemencében sütve.",
        answerDE:
          "Hefefreier Teig, reichlich mit Käse und Sauerrahm belegt, im Ofen gebacken.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A lángos fő alapanyaga a lisztből, vízből, élesztőből és sóból készült tészta,  olajban sütik ki, fokhagymásan, sajtosan, tejfölösen fogyasztják.",
    explanationDE:
      "Die Hauptzutaten von Lángos sind Teig aus Mehl, Wasser, Hefe und Salz, es wird in Öl ausgebacken und mit Knoblauch, Käse und Sauerrahm gegessen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a fő összetevője a 'lecsó' nevű magyar ételnek?",
    questionDE: "Was ist die Hauptzutat des ungarischen 'Lecsó'?",
    answers: [
      {
        answerHU: "Paprika, paradicsom, hagyma",
        answerDE: "Paprika, Tomaten, Zwiebeln",
        isCorrect: true,
      },
      {
        answerHU: "Tojás és sonka",
        answerDE: "Eier und Schinken",
        isCorrect: false,
      },
      {
        answerHU: "Hal és tejföl",
        answerDE: "Fisch und Sauerrahm",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A lecsó fő összetevői a paprika, paradicsom és hagyma,  szaftos zöldséges ragu,  hússal vagy kolbásszal is gazdagíthatják,  nyáron népszerű fogás.",
    explanationDE:
      "Die Hauptbestandteile von Letscho sind Paprika, Tomaten und Zwiebeln, ein saftiges Gemüse-Ragout, es kann auch mit Fleisch oder Wurst angereichert werden, ein beliebtes Gericht im Sommer.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki találta fel a Rubik-kockát?",
    questionDE: "Wer erfand den Zauberwürfel?",
    answers: [
      {
        answerHU: "Rubik Ernő",
        answerDE: "Ernő Rubik",
        isCorrect: true,
      },
      {
        answerHU: "Bolyai János",
        answerDE: "János Bolyai",
        isCorrect: false,
      },
      {
        answerHU: "Neumann János",
        answerDE: "John von Neumann",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Rubik Ernő magyar építészmérnök találta fel a Rubik-kockát 1974-ben,  világszerte ismert logikai játék,  milliók játsszák.",
    explanationDE:
      "Ernő Rubik, ein ungarischer Architekt, erfand 1974 den Rubik's Cube, ein weltweit bekanntes Logikspiel, das von Millionen gespielt wird.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Milyen találmány fűződik Bíró László nevéhez?",
    questionDE: "Welche Erfindung ist mit dem Namen László Bíró verbunden?",
    answers: [
      {
        answerHU: "A golyóstoll",
        answerDE: "Der Kugelschreiber",
        isCorrect: true,
      },
      {
        answerHU: "A villanykörte",
        answerDE: "Die Glühbirne",
        isCorrect: false,
      },
      {
        answerHU: "A telefonközpont",
        answerDE: "Die Telefonzentrale",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bíró László  újságíró és feltaláló  nevéhez fűződik a modern golyóstoll feltalálása,  forradalmasította az írást,  irodai eszköz lett világszerte.",
    explanationDE:
      "László Bíró, ein Journalist und Erfinder, wird die Erfindung des modernen Kugelschreibers zugeschrieben, er revolutionierte das Schreiben, es wurde weltweit zu einem Büroartikel.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki volt Puskás Ferenc?",
    questionDE: "Wer war Ferenc Puskás?",
    answers: [
      {
        answerHU:
          "Világhírű magyar labdarúgó, az Aranycsapat kapitánya, a Real Madrid legendás játékosa.",
        answerDE:
          "Weltberühmter ungarischer Fußballspieler, Kapitän der Goldenen Elf, ein legendärer Spieler von Real Madrid.",
        isCorrect: true,
      },
      {
        answerHU:
          "Olimpiai bajnok úszó, aki a pillangóúszásban ért el kiemelkedő sikereket.",
        answerDE:
          "Olympischer Schwimmmeister, der im Schmetterlingsschwimmen herausragende Erfolge erzielte.",
        isCorrect: false,
      },
      {
        answerHU:
          "Híres magyar teniszező, aki Wimbledonban is diadalmaskodott.",
        answerDE:
          "Berühmter ungarischer Tennisspieler, der auch in Wimbledon triumphierte.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Puskás Ferenc  legendás magyar labdarúgó, az Aranycsapat kapitánya,  a Real Madrid sztárja,  még ma is a világ legjobb futballistái között tartják számon.",
    explanationDE:
      "Ferenc Puskás, eine legendäre ungarische Fußballspieler, Kapitän der Goldenen Elf, Star von Real Madrid, gilt noch heute als einer der besten Fußballer der Welt.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki írta a 'Himnusz' szövegét?",
    questionDE:
      "Wer verfasste den Text der ungarischen Nationalhymne ('Himnusz')?",
    answers: [
      {
        answerHU: "Kölcsey Ferenc",
        answerDE: "Ferenc Kölcsey",
        isCorrect: true,
      },
      {
        answerHU: "Vörösmarty Mihály",
        answerDE: "Mihály Vörösmarty",
        isCorrect: false,
      },
      {
        answerHU: "Petőfi Sándor",
        answerDE: "Sándor Petőfi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A magyar Himnusz szövegét Kölcsey Ferenc írta 1823-ban,  nemzeti imánk,  ünnepi alkalmakkor énekeljük, Erkel Ferenc zenéjével.",
    explanationDE:
      "Den Text der ungarischen Nationalhymne schrieb Ferenc Kölcsey im Jahr 1823, unsere Nationalhymne, die wir zu feierlichen Anlässen mit der Musik von Ferenc Erkel singen.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki volt Jókai Mór, és mit írt?",
    questionDE: "Wer war Mór Jókai und was verfasste er?",
    answers: [
      {
        answerHU:
          "Író, a magyar romantikus irodalom kiemelkedő alakja, többek közt 'Az arany ember' regény szerzője.",
        answerDE:
          "Schriftsteller, eine bedeutende Figur der ungarischen Romantik, u.a. Autor des Romans 'Der Goldmensch'.",
        isCorrect: true,
      },
      {
        answerHU:
          "Költő és politikus, a reformkor egyik vezéralakja, a 'Szózat' című hazafias vers szerzője.",
        answerDE:
          "Dichter und Politiker, eine führende Figur der Reformzeit, der Autor des patriotischen Gedichts 'Szózat'.",
        isCorrect: false,
      },
      {
        answerHU:
          "Politikus és író, a kiegyezés utáni időszak egyik meghatározó alakja, a 'Nemzeti dal' szerzője.",
        answerDE:
          "Politiker und Schriftsteller, eine der prägenden Figuren der Zeit nach dem Ausgleich, der Verfasser des 'Nationallieds'.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Jókai Mór  a magyar romantikus irodalom kiemelkedő alakja,  regényíró,  népszerű és termékeny szerző,  művei  izgalmas történeteket mesélnek el.",
    explanationDE:
      "Mór Jókai ist eine herausragende Figur der ungarischen Romantik, ein Romanschriftsteller, ein beliebter und produktiver Autor, dessen Werke spannende Geschichten erzählen.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU:
      "Melyik híres zeneszerző komponálta a 'Kékszakállú herceg vára' című operát?",
    questionDE:
      "Welcher berühmte Komponist schrieb die Oper 'Herzog Blaubarts Burg'?",
    answers: [
      {
        answerHU: "Bartók Béla",
        answerDE: "Béla Bartók",
        isCorrect: true,
      },
      {
        answerHU: "Erkel Ferenc",
        answerDE: "Ferenc Erkel",
        isCorrect: false,
      },
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bartók Béla komponálta a  'Kékszakállú herceg vára' című operát,  a 20. század  legjelentősebb magyar zeneszerzője,  világhírű művész.",
    explanationDE:
      "Béla Bartók komponierte die Oper 'Herzog Blaubarts Burg', der bedeutendste ungarische Komponist des 20. Jahrhunderts, ein weltberühmter Künstler.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki az 'Édes Anna' írója?",
    questionDE: "Wer ist der Autor von 'Édes Anna'?",
    answers: [
      {
        answerHU: "Kosztolányi Dezső",
        answerDE: "Dezső Kosztolányi",
        isCorrect: true,
      },
      {
        answerHU: "Karinthy Frigyes",
        answerDE: "Frigyes Karinthy",
        isCorrect: false,
      },
      {
        answerHU: "Babits Mihály",
        answerDE: "Mihály Babits",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kosztolányi Dezső az  'Édes Anna' írója,  a magyar modern irodalom  kiemelkedő alakja,  költő, író, műfordító,  széles körű munkásság.",
    explanationDE:
      "Dezső Kosztolányi ist der Autor von 'Édes Anna', eine herausragende Figur der ungarischen modernen Literatur, Dichter, Schriftsteller, Übersetzer, ein umfassendes Werk.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Melyik rendező készítette a 'Sátántangó' című filmet?",
    questionDE: "Welcher Regisseur drehte den Film 'Sátántangó'?",
    answers: [
      {
        answerHU: "Tarr Béla",
        answerDE: "Béla Tarr",
        isCorrect: true,
      },
      {
        answerHU: "Szabó István",
        answerDE: "István Szabó",
        isCorrect: false,
      },
      {
        answerHU: "Jancsó Miklós",
        answerDE: "Miklós Jancsó",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tarr Béla rendezte a  'Sátántangó' című filmet,  híres  hosszú beállításairól,  lassú tempójú,  mélyenszántó művészeti alkotás.",
    explanationDE:
      "Béla Tarr inszenierte den Film 'Sátántangó', berühmt für seine langen Einstellungen, ein langsam erzähltes, tiefgründiges Kunstwerk.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Melyik írónő alkotta a 'Abigél' című ifjúsági regényt?",
    questionDE: "Welche Autorin schrieb den Jugendroman 'Abigél'?",
    answers: [
      {
        answerHU: "Szabó Magda",
        answerDE: "Magda Szabó",
        isCorrect: true,
      },
      {
        answerHU: "Tormay Cécile",
        answerDE: "Cécile Tormay",
        isCorrect: false,
      },
      {
        answerHU: "Lesznai Anna",
        answerDE: "Anna Lesznai",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szabó Magda  alkotta az  'Abigél' című  népszerű ifjúsági regényt,  lányregény,  titkokkal,  szerelmi szállal,  izgalmas történet.",
    explanationDE:
      "Magda Szabó schuf den beliebten Jugendroman 'Abigél', ein Mädchenroman mit Geheimnissen, einer Liebesgeschichte, einer spannenden Geschichte.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU:
      "Melyik festőművész alkotta a 'Magyarok bejövetele' (Feszty-körkép) monumentális alkotást?",
    questionDE:
      "Welcher Maler schuf das monumentale Werk 'Einzug der Ungarn' (Feszty-Panorama)?",
    answers: [
      {
        answerHU: "Feszty Árpád",
        answerDE: "Árpád Feszty",
        isCorrect: true,
      },
      {
        answerHU: "Székely Bertalan",
        answerDE: "Bertalan Székely",
        isCorrect: false,
      },
      {
        answerHU: "Lotz Károly",
        answerDE: "Károly Lotz",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Feszty Árpád  festőművész alkotta a  'Magyarok bejövetele'  körképet,  a honfoglalás  óriási méretű festménye,  látványos alkotás.",
    explanationDE:
      "Árpád Feszty, ein Maler, schuf das Rundbild 'Einzug der Magyaren', ein riesiges Gemälde der Landnahme, ein spektakuläres Werk.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki volt Petőfi Sándor?",
    questionDE: "Wer war Sándor Petőfi?",
    answers: [
      {
        answerHU: "Költő és forradalmár 1848-ban",
        answerDE: "Dichter und Revolutionär 1848",
        isCorrect: true,
      },
      {
        answerHU: "Orvos, aki a C-vitamint felfedezte",
        answerDE: "Der Arzt, der das Vitamin C entdeckte",
        isCorrect: false,
      },
      {
        answerHU: "Feltaláló, aki a golyóstollat kitalálta",
        answerDE: "Erfinder, der den Kugelschreiber erfand",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Petőfi Sándor  a magyar költészet egyik legnagyobb alakja,  az 1848–49-es forradalom  lelkesítője,  a 'Nemzeti dal' szerzője,  forradalmi költő.",
    explanationDE:
      "Sándor Petőfi ist eine der größten Figuren der ungarischen Dichtung, der Anfeuerer der Revolution von 1848-49, der Autor des 'Nationalen Liedes', ein revolutionärer Dichter.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Miben volt jelentős Semmelweis Ignác?",
    questionDE: "Worin war Ignác Semmelweis bedeutend?",
    answers: [
      {
        answerHU: "A gyermekágyi láz megelőzésében",
        answerDE: "In der Verhütung des Kindbettfiebers",
        isCorrect: true,
      },
      {
        answerHU: "Az első vérátömlesztésben",
        answerDE: "Bei der ersten Bluttransfusion",
        isCorrect: false,
      },
      {
        answerHU: "A penicillin feltalálásában",
        answerDE: "Bei der Erfindung des Penicillins",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Semmelweis Ignác orvos  jelentősége a gyermekágyi láz megelőzésében rejlik,  az „anyák megmentője”,  a higiénia fontosságát fedezte fel.",
    explanationDE:
      'Ignaz Semmelweis, ein Arzt, dessen Bedeutung in der Prävention von Kindbettfieber liegt, der "Retter der Mütter", der die Bedeutung der Hygiene entdeckte.',
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Milyen tevékenységben tűnt ki Munkácsy Mihály?",
    questionDE: "Worin zeichnete sich Mihály Munkácsy aus?",
    answers: [
      {
        answerHU:
          "Festőművészetben, a magyar realista és romantikus festészet egyik legjelentősebb alakjaként.",
        answerDE:
          "In der Malerei, als einer der bedeutendsten Vertreter der ungarischen realistischen und romantischen Malerei.",
        isCorrect: true,
      },
      {
        answerHU:
          "Szobrászművészetben, monumentális köztéri szobrok és emlékművek alkotójaként.",
        answerDE:
          "In der Bildhauerei, als Schöpfer monumentaler öffentlicher Skulpturen und Denkmäler.",
        isCorrect: false,
      },
      {
        answerHU:
          "Építészetben, a historizáló stílusú épületek, köztük templomok és középületek tervezőjeként.",
        answerDE:
          "In der Architektur, als Planer von Gebäuden im historistischen Stil, darunter Kirchen und öffentliche Gebäude.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Munkácsy Mihály festőművész  realista stílusban alkotott,  történelmi és  társadalmi témákat ábrázolt,  világhírű festővé vált.",
    explanationDE:
      "Mihály Munkácsy, ein Maler, der im realistischen Stil schuf, historische und soziale Themen darstellte und zu einem weltberühmten Maler wurde.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Melyik opera a 'Hunyadi László' szerzője?",
    questionDE: "Welcher Komponist schrieb die Oper 'Hunyadi László'?",
    answers: [
      {
        answerHU: "Erkel Ferenc",
        answerDE: "Ferenc Erkel",
        isCorrect: true,
      },
      {
        answerHU: "Bartók Béla",
        answerDE: "Béla Bartók",
        isCorrect: false,
      },
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Erkel Ferenc  zeneszerző  alkotta a  'Hunyadi László' című operát,  több  népszerű nemzeti operát komponált,  a magyar  opera  megteremtője.",
    explanationDE:
      "Ferenc Erkel, ein Komponist, der die Oper 'Ladislaus Hunyadi' komponierte, er komponierte mehrere beliebte Nationalopern, der Schöpfer der ungarischen Oper.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Melyik filmrendező alkotta a 'Mephisto' című alkotást?",
    questionDE: "Welcher Regisseur schuf den Film 'Mephisto'?",
    answers: [
      {
        answerHU: "Szabó István",
        answerDE: "István Szabó",
        isCorrect: true,
      },
      {
        answerHU: "Tarr Béla",
        answerDE: "Béla Tarr",
        isCorrect: false,
      },
      {
        answerHU: "Makk Károly",
        answerDE: "Károly Makk",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szabó István filmrendező alkotta a  'Mephisto' című  filmet,  a  film  Oscar-díjat nyert,  világszerte elismert rendező.",
    explanationDE:
      "István Szabó, ein Filmregisseur, schuf den Film 'Mephisto', der Film gewann einen Oscar, ein weltweit anerkannter Regisseur.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Melyik építész tervezte a Parlamentet Budapesten?",
    questionDE: "Welcher Architekt entwarf das Budapester Parlamentsgebäude?",
    answers: [
      {
        answerHU: "Steindl Imre",
        answerDE: "Imre Steindl",
        isCorrect: true,
      },
      {
        answerHU: "Lechner Ödön",
        answerDE: "Ödön Lechner",
        isCorrect: false,
      },
      {
        answerHU: "Ybl Miklós",
        answerDE: "Miklós Ybl",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Steindl Imre építész tervezte a  budapesti Parlamentet,  a  Parlament  neogótikus stílusban épült,  a város egyik  ikonikus épülete.",
    explanationDE:
      "Imre Steindl, ein Architekt, entwarf das Budapester Parlament, das Parlament wurde im neugotischen Stil erbaut, eines der ikonischen Gebäude der Stadt.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Milyen tudományos elméletet dolgozott ki Eötvös Loránd?",
    questionDE: "Welche wissenschaftliche Theorie entwickelte Loránd Eötvös?",
    answers: [
      {
        answerHU:
          "Kidolgozta a róla elnevezett torziós inga segítségével a gravitációs tér finom változásainak mérését.",
        answerDE:
          "Er entwickelte mithilfe der nach ihm benannten Drehwaage die Methode zur Messung feiner Veränderungen des Gravitationsfeldes.",
        isCorrect: true,
      },
      {
        answerHU:
          "Ő fektette le a speciális relativitáselmélet alapjait, amely az idő és a tér viszonyát írja le.",
        answerDE:
          "Er legte die Grundlagen der speziellen Relativitätstheorie, die das Verhältnis von Zeit und Raum beschreibt.",
        isCorrect: false,
      },
      {
        answerHU:
          "A kvantummechanika egyik megalapozója volt, aki a részecskék viselkedését vizsgálta.",
        answerDE:
          "Er war einer der Begründer der Quantenmechanik, der das Verhalten von Teilchen untersuchte.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Eötvös Loránd  tudós  a gravitációs  erő  kutatásában ért el eredményeket,  az Eötvös-inga  pontos méréseket tett lehetővé a  gravitációs tér  vizsgálatában.",
    explanationDE:
      "Loránd Eötvös, ein Wissenschaftler, erzielte Ergebnisse in der Erforschung der Gravitationskraft, die Eötvös-Waage ermöglichte genaue Messungen bei der Untersuchung des Gravitationsfeldes.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU:
      "Melyik híres magyar zeneszerző írta a „Rhapsody No. 2” zongoradarabot?",
    questionDE:
      "Welcher berühmte ungarische Komponist schrieb das Stück „Rhapsody No. 2“ für Klavier?",
    answers: [
      {
        answerHU: "Bartók Béla",
        answerDE: "Béla Bartók",
        isCorrect: false,
      },
      {
        answerHU: "Liszt Ferenc",
        answerDE: "Franz Liszt",
        isCorrect: true,
      },
      {
        answerHU: "Dohnányi Ernő",
        answerDE: "Ernst von Dohnányi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Liszt Ferenc  zeneszerző  írta a  „II. magyar rapszódiát”,  virtuóz zongoraműveket komponált,  a romantika  kiemelkedő zeneszerzője,  világhírű művész.",
    explanationDE:
      "Franz Liszt, ein Komponist, schrieb die „Ungarische Rhapsodie Nr. 2“, er komponierte virtuose Klavierwerke, ein herausragender Komponist der Romantik, ein weltberühmter Künstler.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki volt Sir Georg Solti?",
    questionDE: "Wer war Sir Georg Solti?",
    answers: [
      {
        answerHU: "Egy magyar operaénekes",
        answerDE: "Ein ungarischer Opernsänger",
        isCorrect: false,
      },
      {
        answerHU: "Világhírű karmester volt",
        answerDE: "Er war ein weltberühmter Dirigent",
        isCorrect: true,
      },
      {
        answerHU: "Egy híres balett-táncos",
        answerDE: "Ein berühmter Balletttänzer",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Solti György (Sir Georg Solti) karmester világszerte elismert,  londoni Covent Garden  zeneigazgatója is volt,  számos díjat nyert,  magyar származású.",
    explanationDE:
      "Georg Solti (Sir Georg Solti), ein Dirigent, der weltweit anerkannt ist, war auch Musikdirektor des Londoner Covent Garden, gewann zahlreiche Preise, ungarischer Abstammung.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki rendezte a „Fehér Isten” (Underdog) című filmet?",
    questionDE: "Wer hat den Film „Fehér Isten“ (Underdog) inszeniert?",
    answers: [
      {
        answerHU: "Szabó István",
        answerDE: "István Szabó",
        isCorrect: false,
      },
      {
        answerHU: "Mundruczó Kornél",
        answerDE: "Kornél Mundruczó",
        isCorrect: true,
      },
      {
        answerHU: "Jancsó Miklós",
        answerDE: "Miklós Jancsó",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mundruczó Kornél rendezte a  „Fehér Isten”  filmet,  a cannes-i filmfesztiválon  díjat nyert,  érdekes  történet  az ember és kutya kapcsolatáról.",
    explanationDE:
      "Kornél Mundruczó inszenierte den Film „Weißer Gott“, der beim Filmfestival in Cannes einen Preis gewann, eine interessante Geschichte über die Beziehung zwischen Mensch und Hund.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU:
      "Ki vezette az 1950-es évek „Aranycsapatát” (azaz a legendás magyar labdarúgó-válogatottat)?",
    questionDE:
      "Welcher ungarische Fußballtrainer führte die „Goldene Elf“ der 1950er Jahre an?",
    answers: [
      {
        answerHU: "Baróti Lajos",
        answerDE: "Lajos Baróti",
        isCorrect: false,
      },
      {
        answerHU: "Sebes Gusztáv",
        answerDE: "Gusztáv Sebes",
        isCorrect: true,
      },
      {
        answerHU: "Mészöly Kálmán",
        answerDE: "Kálmán Mészöly",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sebes Gusztáv  volt az Aranycsapat  szövetségi kapitánya,  az 1950-es évek  legendás magyar labdarúgó-válogatottja,  Puskás Ferenc vezetésével.",
    explanationDE:
      "Gusztáv Sebes war der Verbandskapitän der Goldenen Elf, der legendären ungarischen Fußballnationalmannschaft der 1950er Jahre, mit Ferenc Puskás an der Spitze.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU: "Ki írta a „Szindbád” (Sindbad) című művet?",
    questionDE: "Wer schrieb das Werk „Sindbad“ (Szindbád)?",
    answers: [
      {
        answerHU: "Molnár Ferenc",
        answerDE: "Ferenc Molnár",
        isCorrect: false,
      },
      {
        answerHU: "Krúdy Gyula",
        answerDE: "Gyula Krúdy",
        isCorrect: true,
      },
      {
        answerHU: "Babits Mihály",
        answerDE: "Mihály Babits",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Krúdy Gyula írta a  „Szindbád”  novellaciklust,  a magyar  lírai próza  mestere,  hangulatos,  álomszerű történetek,  különleges világ.",
    explanationDE:
      "Gyula Krúdy schrieb den Novellenzyklus „Sindbad“, der Meister der ungarischen lyrischen Prosa, stimmungsvolle, traumhafte Geschichten, eine besondere Welt.",
  },
  {
    category: "Persönlichkeiten",
    level: 1,
    questionHU:
      "Ki rendezte 1943-ban az „Casablanca” című filmet és kapott érte Oscar-díjat, magyar származásúként?",
    questionDE:
      "Welcher in Ungarn geborene Regisseur erhielt 1943 für „Casablanca“ einen Oscar?",
    answers: [
      {
        answerHU:
          "Kertész Mihály (Michael Curtiz), aki Hollywood aranykorának egyik legelismertebb rendezője volt.",
        answerDE:
          "Michael Curtiz (Mihály Kertész), der einer der anerkanntesten Regisseure des goldenen Zeitalters Hollywoods war.",
        isCorrect: true,
      },
      {
        answerHU:
          "Korda Sándor (Alexander Korda), aki főként brit filmproducerként és rendezőként vált ismertté.",
        answerDE:
          "Alexander Korda, der hauptsächlich als britischer Filmproduzent und Regisseur bekannt wurde.",
        isCorrect: false,
      },
      {
        answerHU:
          'Lugosi Béla, aki elsősorban Drakula megformálásáról híres színész volt."',
        answerDE:
          "Béla Lugosi, ein Schauspieler, der vor allem für seine Darstellung des Dracula berühmt war.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kertész Mihály (Michael Curtiz) rendezte a  „Casablanca”  filmet 1943-ban,  Oscar-díjat nyert érte,  Hollywood  legnagyobb rendezői közé tartozott.",
    explanationDE:
      "Michael Curtiz (Mihály Kertész) inszenierte 1943 den Film „Casablanca“, für den er einen Oscar gewann, er gehörte zu den größten Regisseuren Hollywoods.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi Magyarország nemzeti ünnepe március 15-én?",
    questionDE: "Welcher ungarische Nationalfeiertag ist am 15. März?",
    answers: [
      {
        answerHU:
          "Az 1848-49-es forradalom és szabadságharc emléknapja, a polgári átalakulás kezdete.",
        answerDE:
          "Gedenktag der Revolution und des Freiheitskampfes von 1848-49, der Beginn des bürgerlichen Wandels.",
        isCorrect: true,
      },
      {
        answerHU:
          "A Magyar Köztársaság kikiáltásának napja, a modern magyar állam születésének ünnepe.",
        answerDE:
          "Der Tag der Ausrufung der Ungarischen Republik, das Fest der Geburt des modernen ungarischen Staates.",
        isCorrect: false,
      },
      {
        answerHU:
          "A honfoglalás emléknapja, az ősi magyarok Kárpát-medencébe érkezésének ünnepe.",
        answerDE:
          "Der Gedenktag der Landnahme, das Fest der Ankunft der alten Ungarn im Karpatenbecken.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Március 15-én  az 1848–49-es forradalom és szabadságharc  kezdetére emlékezünk,  nemzeti ünnep,  a  szabadság és  nemzeti összetartozás  napja Magyarországon.",
    explanationDE:
      "Am 15. März gedenken wir des Beginns der Revolution und des Freiheitskampfes von 1848-49, ein Nationalfeiertag, der Tag der Freiheit und des nationalen Zusammenhalts in Ungarn.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit jelképez a húsvéti locsolkodás hagyománya Magyarországon?",
    questionDE:
      "Was symbolisiert der Osterbrauch des Wasserbesprenkelns (locsolkodás) in Ungarn?",
    answers: [
      {
        answerHU:
          "A tavaszi megtisztulást, a termékenységet és az újjászületést szimbolizálja a vízzel való locsolás.",
        answerDE:
          "Das Besprengen mit Wasser symbolisiert die Reinigung im Frühling, Fruchtbarkeit und Wiedergeburt.",
        isCorrect: true,
      },
      {
        answerHU:
          "Az új ruha viselésének hagyománya a tavasz kezdetén, a megújulás jeleként.",
        answerDE:
          "Die Tradition, zu Frühlingsbeginn neue Kleidung zu tragen, als Zeichen der Erneuerung.",
        isCorrect: false,
      },
      {
        answerHU:
          "A téli gonosz szellemek elűzésének rituáléja, a tavasz köszöntése zajkeltéssel.",
        answerDE:
          "Das Ritual zur Vertreibung der bösen Wintergeister, die Begrüßung des Frühlings mit Lärm.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A húsvéti locsolkodás hagyománya  a  tavaszi  megújulást, megtisztulást és termékenységet jelképezi,  vízzel vagy  parfümmel locsolják meg a lányokat, asszonyokat.",
    explanationDE:
      "Der Brauch des Osterwassersprengens symbolisiert die Frühlingserneuerung, Reinigung und Fruchtbarkeit, Mädchen und Frauen werden mit Wasser oder Parfüm besprengt.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Melyik magyar ünnepet tartják augusztus 20-án?",
    questionDE: "Welcher ungarische Feiertag wird am 20. August begangen?",
    answers: [
      {
        answerHU:
          "Szent István király ünnepe, a magyar államalapítás és az új kenyér ünnepe.",
        answerDE:
          "Das Fest des Heiligen Stephan, das Fest der ungarischen Staatsgründung und des neuen Brotes.",
        isCorrect: true,
      },
      {
        answerHU:
          "Az 1848-49-es forradalom és szabadságharc kitörésének emléknapja, a nemzeti függetlenség napja.",
        answerDE:
          "Der Gedenktag des Ausbruchs der Revolution und des Freiheitskampfes von 1848-49, der Tag der nationalen Unabhängigkeit.",
        isCorrect: false,
      },
      {
        answerHU:
          "A keresztény egyházak által ünnepelt Mindenszentek napja, a halottak emléknapja.",
        answerDE:
          "Allerheiligen, der von den christlichen Kirchen gefeierte Tag, der Gedenktag der Toten.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Augusztus 20-án  Szent István napját ünnepeljük,  az államalapítás és az első magyar király, Szent István tiszteletére tartott  nemzeti ünnep,  búcsúval, tűzijátékkal.",
    explanationDE:
      "Am 20. August feiern wir den Tag des Heiligen Stephans, ein Nationalfeiertag zu Ehren der Staatsgründung und des ersten ungarischen Königs, des Heiligen Stephans, mit Prozessionen und Feuerwerk.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi jellemző a magyar húsvéti locsolkodásra?",
    questionDE:
      "Was ist typisch für das ungarische Osterbesprengen (locsolkodás)?",
    answers: [
      {
        answerHU:
          "Férfiak és fiúk kölnivel vagy illatos vízzel locsolják meg a nőket és lányokat, vers kíséretében.",
        answerDE:
          "Männer und Jungen besprengen Frauen und Mädchen mit Kölnisch Wasser oder parfümiertem Wasser, begleitet von einem Gedicht.",
        isCorrect: true,
      },
      {
        answerHU:
          "Fiatal lányok népviseletbe öltözve énekelnek és táncolnak az utcákon, köszöntve a tavaszt.",
        answerDE:
          "Junge Mädchen in Tracht singen und tanzen auf den Straßen und begrüßen den Frühling.",
        isCorrect: false,
      },
      {
        answerHU:
          "Tavaszi virágokból font koszorúkat dobnak a folyóba vagy patakba, a termékenység reményében.",
        answerDE:
          "Aus Frühlingsblumen geflochtene Kränze werden in den Fluss oder Bach geworfen, in der Hoffnung auf Fruchtbarkeit.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A magyar húsvéti locsolkodásra jellemző a  vízzel való locsolás,  versek mondása,  hímestojás ajándékozása,  a termékenység és tavasz  ünnepe.",
    explanationDE:
      "Das ungarische Osterwassersprengen ist gekennzeichnet durch das Wassersprengen, das Aufsagen von Gedichten und das Verschenken von Ostereiern, das Fest der Fruchtbarkeit und des Frühlings.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi történik a pünkösdi királyválasztás során?",
    questionDE: "Was geschieht bei der Wahl des Pfingstkönigs?",
    answers: [
      {
        answerHU:
          "Ügyességi versenyeken, lovasjátékokban választják ki a pünkösdi királyt, aki egy évig tiszteletet élvez.",
        answerDE:
          "Bei Geschicklichkeitswettbewerben und Reiterspielen wird der Pfingstkönig gewählt, der ein Jahr lang Ansehen genießt.",
        isCorrect: true,
      },
      {
        answerHU:
          "Egyházi szertartás keretében a falu vagy város vezetőjét szimbolikusan megkoronázzák.",
        answerDE:
          "Im Rahmen einer kirchlichen Zeremonie wird das Oberhaupt des Dorfes oder der Stadt symbolisch gekrönt.",
        isCorrect: false,
      },
      {
        answerHU:
          "A település legidősebb, legtiszteletreméltóbb férfiját választják meg pünkösdi királynak.",
        answerDE:
          "Der älteste und angesehenste Mann des Ortes wird zum Pfingstkönig gewählt.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A pünkösdi királyválasztás során  a legények ügyességi próbákon mérik össze erejüket,  a legügyesebbet  pünkösdi királlyá választják,  régi hagyomány,  közösségi ünnep.",
    explanationDE:
      "Bei der Pfingstkönigswahl messen die Burschen ihre Kräfte bei Geschicklichkeitsprüfungen, der Geschickteste wird zum Pfingstkönig gewählt, eine alte Tradition, ein Gemeindefest.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mikor tartják a Balaton-átúszást hagyományosan?",
    questionDE:
      "Wann findet traditionell das Balaton-Schwimmen (Überquerung) statt?",
    answers: [
      {
        answerHU: "Nyáron, általában júliusban",
        answerDE: "Im Sommer, meist im Juli",
        isCorrect: true,
      },
      {
        answerHU: "Télen, januárban",
        answerDE: "Im Winter, im Januar",
        isCorrect: false,
      },
      {
        answerHU: "Ősszel, októberben",
        answerDE: "Im Herbst, im Oktober",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Balaton-átúszást  hagyományosan nyáron,  júliusban rendezik meg,  egy  népszerű  tömegsportesemény,  Révfülöp és Balatonboglár között úsznak át a résztvevők.",
    explanationDE:
      "Das Plattensee-Durchschwimmen findet traditionell im Sommer, im Juli, statt, eine beliebte Breitensportveranstaltung, die Teilnehmer schwimmen zwischen Révfülöp und Balatonboglár durch.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Melyik táncforma jellemző a magyar népi kultúrára?",
    questionDE:
      "Welche Tanzform ist charakteristisch für die ungarische Volkskultur?",
    answers: [
      {
        answerHU:
          "A csárdás, egy páros tánc, amely lassú (lassan) és gyors (friss) részek váltakozásából áll.",
        answerDE:
          "Der Csárdás, ein Paartanz, der aus einem Wechsel von langsamen (lassan) und schnellen (friss) Teilen besteht.",
        isCorrect: true,
      },
      {
        answerHU:
          "Egy virtuóz, improvizatív szólótánc, amelyet férfiak adnak elő gyors forgásokkal és ugrásokkal.",
        answerDE:
          "Ein virtuoser, improvisierter Solotanz, der von Männern mit schnellen Drehungen und Sprüngen aufgeführt wird.",
        isCorrect: false,
      },
      {
        answerHU:
          "Egy lassú, körben járó tánc, amelyet párok kézenfogva, lépésről lépésre táncolnak.",
        answerDE:
          "Ein langsamer Kreistanz, der von Paaren Hand in Hand, Schritt für Schritt getanzt wird.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A csárdás  a magyar néptáncok legismertebb típusa,  páros tánc,  változatos ritmusú,  élénk és lassú részek váltakoznak benne,  nemzeti táncunk.",
    explanationDE:
      "Der Csárdás ist die bekannteste Art ungarischer Volkstänze, ein Paartanz mit abwechslungsreichem Rhythmus, in dem sich lebhafte und langsame Teile abwechseln, unser Nationaltanz.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Melyik magyar ünnep esik augusztus 20-ára?",
    questionDE: "Welcher ungarische Feiertag fällt auf den 20. August?",
    answers: [
      {
        answerHU: "Az államalapítás ünnepe (Szent István)",
        answerDE: "Das Fest der Staatsgründung (hl. Stephan)",
        isCorrect: true,
      },
      {
        answerHU: "A forradalom ünnepe (1848)",
        answerDE: "Das Fest der Revolution (1848)",
        isCorrect: false,
      },
      {
        answerHU: "A mindenszentek napja",
        answerDE: "Allerheiligen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Augusztus 20-a  Magyarország államalapításának ünnepe,  Szent István napja,  az államalapító király és  az ezeréves államiság  ünnepe,  ünnepi rendezvényekkel, tűzijátékkal.",
    explanationDE:
      "Der 20. August ist der Nationalfeiertag der Staatsgründung Ungarns, der Tag des Heiligen Stephans, das Fest des Staatsgründers und der tausendjährigen Staatlichkeit, mit festlichen Veranstaltungen und Feuerwerk.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit jelent a betlehemezés karácsonykor?",
    questionDE: "Was bedeutet das 'Betlehemezés' an Weihnachten?",
    answers: [
      {
        answerHU:
          "Pásztorjáték és énekes előadás, amely Jézus születésének történetét eleveníti fel.",
        answerDE:
          "Hirtenspiel und Gesangsdarbietung, die die Geschichte der Geburt Jesu nacherzählt.",
        isCorrect: true,
      },
      {
        answerHU:
          "Karácsonyi ételek megáldása a templomban, a bőséges ünnepi asztalért.",
        answerDE:
          "Segnung von Weihnachtsgerichten in der Kirche für einen reich gedeckten Festtagstisch.",
        isCorrect: false,
      },
      {
        answerHU:
          "Ajándékok cseréje a családtagok és barátok között, a szeretet kifejezésére.",
        answerDE:
          "Austausch von Geschenken zwischen Familienmitgliedern und Freunden, um Liebe auszudrücken.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A betlehemezés  karácsonykor  Jézus születését  jeleníti meg pásztorjátékkal és énekekkel,  színes  népszokás,  csoportok járják a házakat,  adományokat gyűjtenek.",
    explanationDE:
      "Das Bethlehemspiel zu Weihnachten stellt die Geburt Jesu mit Hirtenspiel und Gesängen dar, ein farbenprächtiger Volksbrauch, Gruppen ziehen von Haus zu Haus und sammeln Spenden.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Melyik népszokás során éneklik a 'Boldogasszony anyánk' kezdetű himnikus éneket?",
    questionDE:
      "Bei welchem Volksbrauch wird das hymnische Lied 'Boldogasszony anyánk' gesungen?",
    answers: [
      {
        answerHU: "Máriapócsi búcsún",
        answerDE: "Bei der Wallfahrt in Máriapócs",
        isCorrect: true,
      },
      {
        answerHU: "Busójáráson",
        answerDE: "Beim Busójárás",
        isCorrect: false,
      },
      {
        answerHU: "Szüreti bálon",
        answerDE: "Beim Weinleseball",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A  'Boldogasszony anyánk' kezdetű himnikus éneket  Máriapócson,  a híres  búcsújáró helyen éneklik,  a kegykép  csodás  könnyezése  óta zarándokhely.",
    explanationDE:
      "Das Hymnenlied 'Boldogasszony anyánk' (Unsere Liebe Frau, unsere Mutter) wird in Máriapócs, dem berühmten Wallfahrtsort, gesungen, seit dem wundersamen Weinen des Gnadenbildes ist es ein Wallfahrtsort.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Milyen szimbólumot látunk a 'magyar menyasszonyi fejkendőn'?",
    questionDE:
      "Welches Symbol findet man häufig auf dem ungarischen Brautschleier?",
    answers: [
      {
        answerHU: "Virágmotívumok, például rózsák.",
        answerDE: "Blumenmotive, zum Beispiel Rosen.",
        isCorrect: true,
      },
      {
        answerHU: "A magyar címert látjuk rajta.",
        answerDE: "Man sieht darauf das ungarische Wappen.",
        isCorrect: false,
      },
      {
        answerHU: "Nap és hold szimbólumai.",
        answerDE: "Sonnen- und Mondsymbole.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A magyar menyasszonyi fejkendőn  gyakran  virágmotívumokat és  gazdag hímzést látunk,  a  népművészet  szépségét tükrözi,  régi hagyomány.",
    explanationDE:
      "Auf dem ungarischen Brautschleier sehen wir oft Blumenmotive und reiche Stickereien, es spiegelt die Schönheit der Volkskunst wider, eine alte Tradition.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Hol tartják a híres 'Palóc búcsút'?",
    questionDE: "Wo findet die berühmte 'Palóc Wallfahrt' statt?",
    answers: [
      {
        answerHU: "Mátraverebély-Szentkúton",
        answerDE: "In Mátraverebély-Szentkút",
        isCorrect: true,
      },
      {
        answerHU: "Pannonhalmán",
        answerDE: "In Pannonhalma",
        isCorrect: false,
      },
      {
        answerHU: "Bakonybélen",
        answerDE: "Bakonybél",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A híres 'Palóc búcsút'  Szentkúton tartják,  a palócok  néprajzi csoportjának  fontos  vallási és kulturális  eseménye,  a Felföld  szívében található.",
    explanationDE:
      "Die berühmte 'Paloc-Wallfahrt' findet in Szentkút statt, ein wichtiges religiöses und kulturelles Ereignis der ethnografischen Gruppe der Paloczen, im Herzen des Oberlandes gelegen.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi az 'istvánczi' tánc szerepe a falusi lagzikban?",
    questionDE: "Welche Bedeutung hat der 'istvánczi' Tanz bei Dorfhochzeiten?",
    answers: [
      {
        answerHU:
          "Vőfély által vezetett menyasszonytánc, amely a menyasszony búcsúját jelképezi a szülői háztól.",
        answerDE:
          "Ein vom Brautführer (vőfély) geführter Brauttanz, der den Abschied der Braut vom Elternhaus symbolisiert.",
        isCorrect: true,
      },
      {
        answerHU:
          "Gyermekek előadásában bemutatott betlehemes játék, amely a karácsonyi ünnepkörhöz kapcsolódik.",
        answerDE:
          "Krippenspiel, aufgeführt von Kindern, das sich auf die Weihnachtszeit bezieht.",
        isCorrect: false,
      },
      {
        answerHU:
          "A mulatság elején járt csárdás, amely a vendégek felrázására és a jó hangulat megteremtésére szolgál.",
        answerDE:
          "Der anfängliche Csárdás zu Beginn der Unterhaltung, der dazu dient, die Gäste aufzuheitern und eine gute Stimmung zu erzeugen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az istvánczi tánc  a falusi lagzikban  a lakodalom  ünnepélyes  záró mozzanata,  a  menyasszony és  vőlegény  utolsó  közös tánca,  búcsú a vendégektől.",
    explanationDE:
      "Der Istvánc-Tanz in dörflichen Hochzeiten ist der feierliche Schlusspunkt der Hochzeit, der letzte gemeinsame Tanz von Braut und Bräutigam, der Abschied von den Gästen.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Melyik napon él a néphit a 'Gergely-járás' szokásával?",
    questionDE:
      "An welchem Tag lebt im Volksglauben der Brauch 'Gergely-járás'?",
    answers: [
      {
        answerHU: "Március 12. körül",
        answerDE: "Um den 12. März",
        isCorrect: true,
      },
      {
        answerHU: "Május 1-jén",
        answerDE: "Am 1. Mai",
        isCorrect: false,
      },
      {
        answerHU: "December 24-én",
        answerDE: "2025-12-24 00:00:00",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Gergely-járás  népszokása  március 12-én,  Gergely napján él,  régi  iskolai toborzó szokás volt,  diákok járták a falvakat,  énekkel  hívogatták a gyerekeket iskolába.",
    explanationDE:
      "Der Gergely-Umzug, ein Volksbrauch, findet am 12. März, dem Gregorius-Tag, statt, ein alter Schulanwerbungsbrauch, Schüler zogen durch die Dörfer und luden Kinder singend in die Schule ein.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit jelent a 'kőleves' népmesei motívum?",
    questionDE: "Was bedeutet das Märchenmotiv 'Steinsuppe'?",
    answers: [
      {
        answerHU:
          "Azt tanítja, hogy összefogással és leleményességgel a kevésből is lehet bőséges lakomát varázsolni.",
        answerDE:
          "Es lehrt, dass man durch Zusammenarbeit und Einfallsreichtum aus wenigem ein reichhaltiges Festmahl zaubern kann.",
        isCorrect: true,
      },
      {
        answerHU:
          "Egy furfangos vándorról szól, aki egy egyszerű trükkel ráveszi a fukar embereket, hogy megosszák vele az ételüket.",
        answerDE:
          "Es handelt von einem listigen Wanderer, der mit einem einfachen Trick geizige Menschen dazu bringt, ihr Essen mit ihm zu teilen.",
        isCorrect: false,
      },
      {
        answerHU:
          "Egy olyan helyzetet mutat be, ahol a látszólag értéktelen dolgok is fontossá válhatnak, ha nincs más lehetőség.",
        answerDE:
          "Es wird eine Situation dargestellt, in der scheinbar wertlose Dinge wichtig werden können, wenn es keine andere Möglichkeit gibt.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A 'kőleves' népmesei motívum  a  találékonyságot,  összefogást és  közösségi  erejét  szimbolizálja,  egy szegény ember  kőből  varázsol  levest,  megosztja másokkal.",
    explanationDE:
      "Das Volksmärchenmotiv der 'Steinsuppe' symbolisiert Einfallsreichtum, Zusammenhalt und Gemeinschaftskraft, ein armer Mensch zaubert aus einem Stein eine Suppe und teilt sie mit anderen.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Milyen népszokás a 'tavasz-hívogató' ének a falvakban?",
    questionDE:
      "Was ist der Brauch des 'Frühling-Herbeirufens' in den Dörfern?",
    answers: [
      {
        answerHU:
          "Fiatalok csoportja házról házra jár, tavaszköszöntő dalokat énekel, és adományokat gyűjt.",
        answerDE:
          "Eine Gruppe junger Leute zieht von Haus zu Haus, singt Frühlingslieder und sammelt Spenden.",
        isCorrect: true,
      },
      {
        answerHU:
          "A falu határában máglyát raknak, és a tűz körül táncolva űzik el a telet.",
        answerDE:
          "Am Dorfrand wird ein Scheiterhaufen errichtet und um das Feuer getanzt, um den Winter zu vertreiben.",
        isCorrect: false,
      },
      {
        answerHU:
          "Tavaszi virágokból koszorúkat fonnak, és azokat a lányok a hajukba tűzik, a fiúk pedig a kalapjukra.",
        answerDE:
          "Aus Frühlingsblumen werden Kränze geflochten, die Mädchen stecken sie ins Haar und die Jungen auf ihre Hüte.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A  'tavasz-hívogató' énekekkel  és  köszöntőkkel  a  falvakban  a  tavaszt ünneplik,  a  természet  ébredését,  a  jó termést  várják,  vidám  hangulatú  népszokás.",
    explanationDE:
      "Mit 'Frühlingslieder'-Liedern und -Grüßen feiern die Dörfer den Frühling, das Erwachen der Natur, die gute Ernte wird erwartet, ein fröhlicher Volksbrauch.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit neveznek 'kunhalomnak' az Alföldön?",
    questionDE: "Was wird in der Tiefebene 'Kunhalom' genannt?",
    answers: [
      {
        answerHU: "Ősi sírdombok a pusztán",
        answerDE: "Uralte Grabhügel in der Puszta ",
        isCorrect: true,
      },
      {
        answerHU: "Föld alatti csatornarendszer",
        answerDE: "Unterirdisches Kanalsystem",
        isCorrect: false,
      },
      {
        answerHU: "Természetes homokdűnék",
        answerDE: "Natürliche Sanddünen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kunhalmoknak az Alföld mesterséges, ősi kultúrák emlékét őrző földhalmait hívják. Tájképi jellegzetességek, régészeti lelőhelyek, messziről is feltűnő dombok.",
    explanationDE:
      "Als „Kunhalom“ bezeichnet man im Alföld künstliche Erdhügel, die alte Kulturen widerspiegeln. Sie sind landschaftstypisch, dienen als archäologische Stätten und sind weithin sichtbar.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi a 'barkó bábu' hagyománya a Palócföldön?",
    questionDE: "Was ist die Tradition der 'barkó bábu' in der Palócföld?",
    answers: [
      {
        answerHU: "Ruházott babát körbehordoznak, tavaszi énekekkel",
        answerDE:
          "Eine angekleidete Puppe wird mit Frühlingsliedern herumgetragen",
        isCorrect: true,
      },
      {
        answerHU: "Téli maszkokat faragnak a férfiak",
        answerDE: "Männer schnitzen Wintermasken",
        isCorrect: false,
      },
      {
        answerHU: "A betlehemes játékba beépített szereplő",
        answerDE: "Eine Figur, die in das Krippenspiel eingebaut ist",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Barkó bábuk rongyból készülnek a tavaszi ünnepkörben. A tél búcsúztatását és a tavasz köszöntését jelképezik, vidám, közösségi rítus keretében.",
    explanationDE:
      "Die Barkó-Puppen werden aus Stoffresten gefertigt und verkörpern das Ende des Winters sowie den Frühlingsbeginn. Ein fröhliches Brauchtum in der Palócföld-Gemeinschaft.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit jelképez az 'újasszony-fogadás' a lakodalom utáni héten?",
    questionDE:
      "Was symbolisiert das 'Empfangen der Neuvermählten' in der Woche nach der Hochzeit?",
    answers: [
      {
        answerHU: "A menyecske beilleszkedését az új családba",
        answerDE: "Die Eingliederung der jungen Ehefrau in die neue Familie",
        isCorrect: true,
      },
      {
        answerHU: "A férj elköszönését a régi barátoktól",
        answerDE: "Der Abschied des Ehemanns von alten Freunden",
        isCorrect: false,
      },
      {
        answerHU: "Gyászt a leánykori élete felett",
        answerDE: "Trauer um ihr Mädchenleben",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az újasszony-fogadás a lakodalom utáni héten a családba fogadást szimbolizálja. Az ifjú férj rokonai ünnepélyesen köszöntik az új asszonyt, erősítve a közösséget.",
    explanationDE:
      "Bei der „Neu-Ehefrau-Begrüßung“ wird die Braut eine Woche nach der Hochzeit in die Familie aufgenommen. Die Verwandten empfangen sie feierlich und festigen so die Gemeinschaft.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Milyen szerepe van a 'fonónak' a téli estéken falun?",
    questionDE: "Welche Rolle hat die 'Spinnstube' an Winterabenden im Dorf?",
    answers: [
      {
        answerHU: "Közösségi találkozóhely énekkel, meséléssel, udvarlással",
        answerDE:
          "Ein Treffpunkt mit Gesang, Geschichtenerzählen und Brautwerbung/Flirten",
        isCorrect: true,
      },
      {
        answerHU: "Férfiak kocsmai összejövetele borozgatással",
        answerDE: "Männertreffen in der Kneipe mit Wein",
        isCorrect: false,
      },
      {
        answerHU: "Gyerekek napközis foglalkozása",
        answerDE: "Ganztagesbetreuung für Kinder",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A fonó téli estéken a közös munka, éneklés, mesélés helyszíne volt a falvakban. Erősítette a közösségi köteléket, szórakozva tette kellemesebbé a hosszú estéket.",
    explanationDE:
      "Die „Fonó“ (Spinnstube) diente im Winter als Treffpunkt zum gemeinsamen Spinnen, Singen, Geschichtenerzählen. Sie förderte die Dorfgemeinschaft und vertrieb lange Abende.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Mit jelent a lencseevés hagyománya újév napján Magyarországon?",
    questionDE:
      "Was soll das Linsenessen am Neujahrstag in Ungarn symbolisieren?",
    answers: [
      {
        answerHU: "Pénzesügyi szerencse",
        answerDE: "Finanzielles Glück",
        isCorrect: true,
      },
      {
        answerHU: "Egészség megőrzése",
        answerDE: "Erhaltung der Gesundheit",
        isCorrect: false,
      },
      {
        answerHU: "Termékenység elősegítése",
        answerDE: "Förderung der Fruchtbarkeit",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Újévkor lencsét esznek a gazdagság és bőség reményében. A lencse az érmékre emlékeztet, fogyasztása szerencsét hoz, anyagi jólétet ígér az új esztendőre.",
    explanationDE:
      "Am Neujahrstag isst man Linsen als Symbol für Reichtum und Fülle. Die Form ähnelt Münzen",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Hogy nevezik magyarul a vízkereszt ünnepét január 6-án?",
    questionDE:
      "Wie nennt man in Ungarn den Tag der Heiligen Drei Könige (6. Januar)?",
    answers: [
      {
        answerHU: "Gyertyaszentelő",
        answerDE: "Maria Lichtmess",
        isCorrect: false,
      },
      {
        answerHU: "Vízkereszt",
        answerDE: "Dreikönigstag",
        isCorrect: true,
      },
      {
        answerHU: "Hamvazószerda",
        answerDE: "Aschermittwoch",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vízkeresztnek hívják január 6. ünnepét, amely lezárja a karácsonyi időszakot. Ekkor emlékeznek a napkeleti bölcsekre, s hagyományosan lebontják a karácsonyfát.",
    explanationDE:
      "Dieser Tag heißt „Vízkereszt“ und markiert das Ende der Weihnachtszeit. Man gedenkt der Heiligen Drei Könige und räumt traditionell den Weihnachtsbaum ab.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Melyik hagyományos húsvéti szokás része a színes tojásokkal feldíszített ág?",
    questionDE:
      "Welcher traditionelle Osterbrauch umfasst den mit bunten Eiern geschmückten Zweig?",
    answers: [
      {
        answerHU: "Kiszebáb-égetés szokása.",
        answerDE: "Kiszebáb-Verbrennen.",
        isCorrect: false,
      },
      {
        answerHU: "Húsvéti tojásfa állítása.",
        answerDE: "Aufstellen eines Oster-Eierbaums.",
        isCorrect: true,
      },
      {
        answerHU: "A Busójárás hagyománya.",
        answerDE: "Die Tradition des Busójárás.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A tojásfa vagy húsvéti fa, tavasz és újjászületés jelképe. Színes tojásokkal díszítik, a húsvéti örömöt és a termékenységet szimbolizálja az ünnep idején.",
    explanationDE:
      "Der „Osterstrauch“ wird mit bunten Eiern geschmückt und symbolisiert Frühling und Erneuerung. Die farbigen Eier stehen für Freude und Fruchtbarkeit zu Ostern.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Melyik karácsonyi szokás tartalmaz családi éneklést az ünnep estéjén?",
    questionDE:
      "Welche Tradition findet an Weihnachten statt, bei der Familien gemeinsam Weihnachtslieder singen?",
    answers: [
      {
        answerHU: "Ádám-Éva-napi éneklés.",
        answerDE: "Das Adam-und-Eva-Singen.",
        isCorrect: false,
      },
      {
        answerHU: "Szentesti közös éneklés.",
        answerDE: "Gemeinsames Singen am Heiligen Abend.",
        isCorrect: true,
      },
      {
        answerHU: "A Regölés éneklése.",
        answerDE: "Das Singen von Regölés.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szenteste közös családi éneklés a magyar karácsonyi hagyomány része. Ilyenkor a család karácsonyi dalokat énekel, meghitt, összetartó ünnepi hangulatban.",
    explanationDE:
      "An Heiligabend singt die Familie gemeinsam Weihnachtslieder. Dieser innige Brauch gehört zu den ungarischen Festtraditionen und unterstreicht das familiäre Beisammensein.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Milyen ágat állítanak vízbe december 4-én (Borbála-nap) hogy karácsonyra kivirágozzon?",
    questionDE:
      "Welchen Zweig stellt man am 4. Dezember (Borbála-Tag) ins Wasser, damit er zu Weihnachten blüht?",
    answers: [
      {
        answerHU: "Gyümölcsfaág",
        answerDE: "Obstbaumzweig",
        isCorrect: true,
      },
      {
        answerHU: "Tűlevelű ág",
        answerDE: "Ein Nadelzweig",
        isCorrect: false,
      },
      {
        answerHU: "Levendula ág",
        answerDE: "Lavendelzweig",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Borbála-ágat, többnyire gyümölcsfaágat, tesznek vízbe december 4-én. Ha karácsonyra kivirágzik, szerencsét jósol a következő évre, régi babonás hagyomány.",
    explanationDE:
      "Am Barbaratag (4. Dezember) stellt man einen Obstbaumzweig ins Wasser. Blüht er zu Weihnachten, verheißt das Glück fürs nächste Jahr – ein alter Volksglaube.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Hogy hívják magyarul a karácsonyi énekjárást december 24. előtt?",
    questionDE:
      "Wie nennt man in Ungarn das Volksliedsingen am Abend vor dem 24. Dezember?",
    answers: [
      {
        answerHU: "Betlehemjárás",
        answerDE: "Betlehemjárás",
        isCorrect: true,
      },
      {
        answerHU: "Virrasztás",
        answerDE: "Totenwache",
        isCorrect: false,
      },
      {
        answerHU: "Kántálás",
        answerDE: "Kantorengesang",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Betlehemjárásnak nevezik. Gyermekek vagy felnőttek házról házra járva betlehemes játékot adnak elő, Jézus születését énekelve hirdetik az ünnep közeledtét.",
    explanationDE:
      "Man nennt es „Betlehemjárás“: Kinder oder Erwachsene ziehen von Haus zu Haus, spielen die Weihnachtsgeschichte (Krippenspiel) und besingen Christi Geburt vor dem 24.12.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit helyeznek el november 2-án a sírokon?",
    questionDE:
      "Was wird traditionell am 2. November an den Gräbern der Verstorbenen aufgestellt?",
    answers: [
      {
        answerHU: "Műanyag bábuk",
        answerDE: "Kunststoffpuppen",
        isCorrect: false,
      },
      {
        answerHU: "Gyertyák és krizantémok",
        answerDE: "Kerzen und Chrysanthemen",
        isCorrect: true,
      },
      {
        answerHU: "Húsvéti tojások",
        answerDE: "Ostereier",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Halottak napján, november 2-án, virágokat és gyertyákat tesznek a sírokra. Ezzel emlékeznek és tisztelegnek az elhunytak előtt, csendes főhajtással.",
    explanationDE:
      "Am Allerseelentag legt man Blumen und zündet Kerzen auf Gräbern an. So gedenken die Ungarn feierlich ihrer Verstorbenen und erweisen ihnen stillen Respekt.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mi a „Mikulás” szokás lényege december 6-án?",
    questionDE: "Was ist der Sinn des Brauchs am Nikolaustag (6. Dezember)?",
    answers: [
      {
        answerHU: "Kiszehajtás",
        answerDE: "Kisze-Austreiben",
        isCorrect: false,
      },
      {
        answerHU: "Mikulás-hagyomány",
        answerDE: "Nikolaus-Tradition",
        isCorrect: true,
      },
      {
        answerHU: "Kalács-sütés",
        answerDE: "Kuchenbacken",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mikuláskor, december 6-án a jó gyerekek cipőjébe ajándék kerül. Előző este kiteszik a kitisztított csizmát, reggelre édesség és meglepetés várja őket.",
    explanationDE:
      "Zum Nikolaustag (6. Dezember) bekommen brave Kinder Geschenke in ihre geputzten Stiefel. Über Nacht legt der „Mikulás“ Süßigkeiten hinein – ein freudiger Brauch.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU:
      "Hogyan nevezik azt az ünnepet, amikor február 2-án gyertyát szentelnek?",
    questionDE:
      "Wie nennt man in Ungarn den Feiertag, bei dem am 2. Februar Kerzen gesegnet werden?",
    answers: [
      {
        answerHU: "Fényünnep",
        answerDE: "Lichtfest",
        isCorrect: false,
      },
      {
        answerHU: "Gyertyaszentelő",
        answerDE: "Mariä Lichtmess",
        isCorrect: true,
      },
      {
        answerHU: "Télbúcsúztató",
        answerDE: "Winteraustreibung",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ez Gyertyaszentelő Boldogasszony napja. A fény és a megtisztulás jelképe, a hosszabb nappalok kezdetét és a tél végét hirdeti a hagyomány szerint.",
    explanationDE:
      "Dieser Feiertag heißt „Mariä Lichtmess“ (Gyertyaszentelő Boldogasszony). Das Kerzenweihen symbolisiert Licht und Reinigung, weist auf das nahende Frühlingslicht hin.",
  },
  {
    category: "Traditionen",
    level: 1,
    questionHU: "Mit jelent a rizsszórás a magyar esküvőkön?",
    questionDE:
      "Was bedeutet das Streuen von Reis über das Brautpaar bei einer ungarischen Hochzeit?",
    answers: [
      {
        answerHU: "Jó termést biztosít",
        answerDE: "Sichert gute Ernte",
        isCorrect: false,
      },
      {
        answerHU: "Bőséget szimbolizál",
        answerDE: "Symbolisiert Fülle",
        isCorrect: true,
      },
      {
        answerHU: "Védelem gonosz szellemek ellen",
        answerDE: "Schutz vor bösen Geistern",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A rizsszórás a termékenység és a bőség jelképe. A friss házasokra szórt rizs gyermekáldást és gazdagságot kíván, szerencsés, hosszú életet szimbolizál.",
    explanationDE:
      "Das Bewerfen des Brautpaars mit Reis steht für Fruchtbarkeit und Wohlstand. Man wünscht so den Eheleuten Kindersegen und Glück für eine lange gemeinsame Zukunft.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik évben jött létre Budapest Buda",
    questionDE: "In welchem Jahr wurde Budapest aus Buda gegründet?",
    answers: [
      {
        answerHU: "1873",
        answerDE: "1873",
        isCorrect: true,
      },
      {
        answerHU: "1896",
        answerDE: "1896",
        isCorrect: false,
      },
      {
        answerHU: "1848",
        answerDE: "1848",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1873-ban egyesült Buda, Pest és Óbuda. Ezzel megszületett Budapest, az egységes főváros, ami gyorsan fejlődő, modern európai nagyvárossá vált.",
    explanationDE:
      "Budapest entstand 1873 durch den Zusammenschluss von Buda, Pest und Óbuda. So formte sich eine schnell wachsende Metropole, die moderne Hauptstadt Ungarns.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik városhoz közel található a Szigligeti vár?",
    questionDE: "In der Nähe welcher Stadt liegt die Burg von Szigliget?",
    answers: [
      {
        answerHU: "Tapolca",
        answerDE: "Tapolca",
        isCorrect: true,
      },
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: false,
      },
      {
        answerHU: "Baja",
        answerDE: "Baja",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Szigligeti vár a Balaton-felvidéken, Tapolca közelében áll. Vulkánikus hegyen épült, a Balatonra néző panorámával, kedvelt turistacélpont.",
    explanationDE:
      "Die Burg Szigliget liegt in der Balaton-Oberlandregion nahe Tapolca. Sie thront auf einem Vulkankegel mit Blick auf den Balaton und ist ein beliebtes Ausflugsziel.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik megyeszékhelyet nevezik 'a napfény városának'?",
    questionDE:
      "Welche Komitatshauptstadt wird 'Stadt des Sonnenscheins' genannt?",
    answers: [
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: true,
      },
      {
        answerHU: "Eger",
        answerDE: "Eger",
        isCorrect: false,
      },
      {
        answerHU: "Szombathely",
        answerDE: "Szombathely",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szegedet hívják így, mert az ország egyik legnaposabb városa. Mediterrán hangulatú Tisza-parti település, élénk kulturális élettel.",
    explanationDE:
      "Szeged wird „Stadt des Sonnenscheins“ genannt, da sie besonders viele Sonnenstunden hat. Die Tisza-Stadt strahlt ein mediterranes Flair und regen Kulturbetrieb aus.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik város a Duna–Tisza köze gazdasági központja?",
    questionDE:
      "Welche Stadt ist das wirtschaftliche Zentrum der Donau-Theiß-Ebene?",
    answers: [
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: true,
      },
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: false,
      },
      {
        answerHU: "Kalocsa",
        answerDE: "Kalocsa",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kecskemét e régió gazdasági-kulturális központja. Híres szecessziós épületeiről, barackpálinkájáról és élénk városi hangulatáról.",
    explanationDE:
      "Kecskemét ist das wirtschaftliche und kulturelle Zentrum zwischen Donau und Theiß. Bekannt für seine Jugendstilbauten, Aprikosenpálinka und pulsierendes Stadtleben.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik városrész fejlődött ki Óbudából 1873-as egyesüléskor?",
    questionDE: "Welche Stadtteil entstand aus Óbuda bei der Vereinigung 1873?",
    answers: [
      {
        answerHU: "Budapest III. kerülete",
        answerDE: "Der 3. Bezirk von Budapest",
        isCorrect: true,
      },
      {
        answerHU: "Budapest IV. kerülete",
        answerDE: "IV. Bezirk von Budapest",
        isCorrect: false,
      },
      {
        answerHU: "Budapest V. kerülete",
        answerDE: "Budapest, 5. Bezirk",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Óbuda Budapest történelmi része lett 1873-ban Buda és Pest mellett. Római kori emlékei és hangulatos utcái megőrizték régi karakterét.",
    explanationDE:
      "Óbuda wurde 1873 beim Zusammenschluss mit Buda und Pest Teil von Budapest. Es bewahrte sein historisches Flair mit römischen Funden und malerischen Gassen.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik városban tartják az évente megrendezett 'Savaria Karnevált'?",
    questionDE:
      "In welcher Stadt findet jährlich der 'Savaria Karneval' statt?",
    answers: [
      {
        answerHU: "Szombathelyen",
        answerDE: "In Szombathely",
        isCorrect: true,
      },
      {
        answerHU: "Székesfehérváron",
        answerDE: "In Székesfehérvár",
        isCorrect: false,
      },
      {
        answerHU: "Tatabányán",
        answerDE: "In Tatabánya",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szombathelyen rendezik a Savaria Karnevált, visszanyúlva az ókori római örökséghez. Színes történelmi fesztivál, felvonulásokkal.",
    explanationDE:
      "In Szombathely findet jährlich der „Savaria Karneval“ statt. Er belebt das antike römische Erbe der Region mit farbenfrohen Paraden und historischen Programmen.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Hol helyezkedik el Ópusztaszer, a Nemzeti Történeti Emlékpark?",
    questionDE: "Wo liegt Ópusztaszer, der Nationale Gedenkpark?",
    answers: [
      {
        answerHU: "A Dél-Alföldön, Szeged közelében",
        answerDE: "In der Südlichen Tiefebene, nahe Szeged",
        isCorrect: true,
      },
      {
        answerHU: "A Mátra hegyvidékén",
        answerDE: "Im Mátra-Gebirge",
        isCorrect: false,
      },
      {
        answerHU: "A Dunántúlon, Veszprém megye területén",
        answerDE: "In Transdanubien, im Komitat Veszprém",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ópusztaszer Csongrád-Csanád megyében található. Itt látható a Feszty-körkép, a honfoglalás monumentális ábrázolása történelmi emlékhelyen.",
    explanationDE:
      "Ópusztaszer liegt im Komitat Csongrád-Csanád. Dort kann man das monumentale „Feszty-Panorama“ zur ungarischen Landnahme bestaunen, ein nationales Denkmal.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik város a Szigetköz központja?",
    questionDE: "Welche Stadt ist das Zentrum der Szigetköz-Region?",
    answers: [
      {
        answerHU: "Mosonmagyaróvár",
        answerDE: "Mosonmagyaróvár",
        isCorrect: true,
      },
      {
        answerHU: "Szentgotthárd",
        answerDE: "Szentgotthárd",
        isCorrect: false,
      },
      {
        answerHU: "Szombathely",
        answerDE: "Szombathely",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mosonmagyaróvár a Szigetköz “kapuja”, festői Duna-mellékágakkal. Gyógyvízéről, történelmi óvárosáról és a természeti környezetéről híres város.",
    explanationDE:
      "Mosonmagyaróvár ist das „Tor zum Szigetköz“, geprägt von malerischen Donau-Nebenarmen. Bekannt für Thermalwasser, seine Altstadt und die reizvolle Flusslandschaft.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik folyó partján található Komárom?",
    questionDE: "An welchem Fluss liegt Komárom?",
    answers: [
      {
        answerHU: "A Duna partján",
        answerDE: "An der Donau",
        isCorrect: true,
      },
      {
        answerHU: "A Rába mentén",
        answerDE: "Entlang der Raab",
        isCorrect: false,
      },
      {
        answerHU: "A Dráva közelében",
        answerDE: "In der Nähe der Drau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Komárom a Duna partján fekszik, fele Szlovákiában, fele Magyarországon. A Duna itt határfolyó, elválasztja, de össze is köti a két városrészt.",
    explanationDE:
      "Komárom liegt an der Donau, zur Hälfte in der Slowakei, zur Hälfte in Ungarn. Der Fluss bildet dort die Grenze, verbindet die Stadtteile aber auch miteinander.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Hol található a Lillafüredi vízesés?",
    questionDE: "Wo befindet sich der Wasserfall von Lillafüred?",
    answers: [
      {
        answerHU: "A Bükk hegységben",
        answerDE: "Im Bükk-Gebirge",
        isCorrect: true,
      },
      {
        answerHU: "A Bakonyban",
        answerDE: "Im Bakony",
        isCorrect: false,
      },
      {
        answerHU: "A Börzsönyben",
        answerDE: "Im Börzsöny-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Lillafüreden, a Bükk hegységben, Miskolc közelében. Az ország egyik legmagasabb vízesése, erdős környezetben, népszerű kirándulóhely Észak-Magyarországon.",
    explanationDE:
      "Der Wasserfall von Lillafüred befindet sich im Bükk-Gebirge nahe Miskolc. Er zählt zu den höchsten Ungarns, umgeben von Wäldern und ist ein beliebtes Ausflugsziel.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik nagyváros ismert 'cifrapalotájáról' és barackpálinkájáról?",
    questionDE:
      "Welche Großstadt ist bekannt für ihren 'Cifrapalota' und ihren Aprikosenschnaps?",
    answers: [
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: true,
      },
      {
        answerHU: "Érd",
        answerDE: "Érd",
        isCorrect: false,
      },
      {
        answerHU: "Szolnok",
        answerDE: "Szolnok",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kecskemét híres szecessziós Cifrapalotájáról és barackpálinkájáról. Központi alföldi város, pezsgő kulturális és gazdasági élettel.",
    explanationDE:
      "Kecskemét ist bekannt für seinen Jugendstilbau „Cifrapalota“ und seine Aprikosenpálinka. Eine zentrale Großstadt in der Tiefebene mit regem Kultur- und Wirtschaftsleben.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik folyó torkollik a Dunába Budapestenél északról érkezve?",
    questionDE: "Welcher Fluss mündet nördlich von Budapest in die Donau?",
    answers: [
      {
        answerHU: "Garam",
        answerDE: "Gran",
        isCorrect: true,
      },
      {
        answerHU: "Tisza",
        answerDE: "Theiß",
        isCorrect: false,
      },
      {
        answerHU: "Rába",
        answerDE: "Raab",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Garam folyó északról érkezve ömlik a Dunába Budapest közelében. Szlovákiából indul, fontos vízfolyás, majd a Dunába torkollik.",
    explanationDE:
      "Der Fluss Garam (Hron) mündet nördlich von Budapest in die Donau. Er entspringt in der Slowakei und fließt dann in Ungarn in die Donau.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik várost nevezik 'Kazinczy városának', mivel ott élt a nyelvújító író?",
    questionDE:
      "Welche Stadt nennt man 'Stadt von Kazinczy', weil der Sprachreformer dort lebte?",
    answers: [
      {
        answerHU: "Sátoraljaújhely",
        answerDE: "Sátoraljaújhely",
        isCorrect: true,
      },
      {
        answerHU: "Miskolc",
        answerDE: "Miskolc",
        isCorrect: false,
      },
      {
        answerHU: "Balassagyarmat",
        answerDE: "Balassagyarmat",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sátoraljaújhelyt hívják így, mert Kazinczy Ferenc, a nyelvújítás vezéralakja hosszú ideig élt és alkotott e környéken.",
    explanationDE:
      "Sátoraljaújhely wird so genannt, da der Sprachreformer Ferenc Kazinczy dort lebte und wirkte. Er prägte die Modernisierung der ungarischen Sprache entscheidend.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik magyar folyó szeli át Kaposvárt?",
    questionDE: "Welcher ungarische Fluss durchquert Kaposvár?",
    answers: [
      {
        answerHU: "A Kapos",
        answerDE: "Die Kapos",
        isCorrect: true,
      },
      {
        answerHU: "A Rába",
        answerDE: "Die Raab",
        isCorrect: false,
      },
      {
        answerHU: "A Tisza",
        answerDE: "Die Theiß",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Kapos folyó szeli át Kaposvárt, innen kapta a város a nevét. Somogy megye központja, a folyó fontos szerepet játszik történetében.",
    explanationDE:
      "Der Fluss Kapos durchzieht Kaposvár und gab der Stadt ihren Namen. Sie ist Verwaltungssitz des Komitats Somogy, der Fluss prägte ihre Geschichte wesentlich.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik határfolyó folyik Magyarország déli szakaszán Horvátország felé?",
    questionDE: "Welcher Grenzfluss fließt im Süden Ungarns Richtung Kroatien?",
    answers: [
      {
        answerHU: "A Dráva",
        answerDE: "Die Drau",
        isCorrect: true,
      },
      {
        answerHU: "A Száva",
        answerDE: "Die Save",
        isCorrect: false,
      },
      {
        answerHU: "A Mura",
        answerDE: "Die Mur",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Dráva a magyar–horvát határ nagy részét képezi, Magyarország déli határán folyik. Festői völgyekkel kísért természeti érték.",
    explanationDE:
      "Die Drau bildet größtenteils die ungarisch-kroatische Grenze im Süden Ungarns. Sie fließt durch malerische Täler und ist ein ökologisch wertvolles Gewässer.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik városban található a 'Zagyva-parti Város'?",
    questionDE: "In welcher Stadt liegt das 'Ufergebiet der Zagyva\"?",
    answers: [
      {
        answerHU: "Jászberény",
        answerDE: "Jászberény",
        isCorrect: true,
      },
      {
        answerHU: "Gyöngyös",
        answerDE: "Gyöngyös",
        isCorrect: false,
      },
      {
        answerHU: "Hatvan",
        answerDE: "Hatvan",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Jászberény a “Zagyva-parti Város”, a Jászság központja. A Zagyva folyó határozza meg a tájat és a helyi életet Észak-Alföldön.",
    explanationDE:
      "Jászberény nennt man die „Stadt an der Zagyva“. Sie ist Zentrum der Jászság-Region. Der Fluss Zagyva prägt Landschaft und Alltagsleben in dieser Nordostebene.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik folyó völgyében fekszik Sárospatak városa?",
    questionDE: "In welchem Flusstal liegt die Stadt Sárospatak?",
    answers: [
      {
        answerHU: "A Bodrog völgyében",
        answerDE: "Im Tal des Bodrog",
        isCorrect: true,
      },
      {
        answerHU: "A Hernád völgyében",
        answerDE: "Im Hernád-Tal",
        isCorrect: false,
      },
      {
        answerHU: "A Tisza völgyében",
        answerDE: "Im Theißtal",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sárospatak a Bodrog völgyében található, híres a Rákóczi-váráról és kulturális örökségéről, Északkelet-Magyarország egyik gyöngyszeme.",
    explanationDE:
      "Sárospatak liegt im Tal des Bodrog, berühmt durch die Rákóczi-Burg und reiches kulturelles Erbe. Eine Perle Nordost-Ungarns mit historischer Bedeutung.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik megye területén fekszik Balassagyarmat?",
    questionDE: "In welchem Komitat liegt Balassagyarmat?",
    answers: [
      {
        answerHU: "Nógrád megyében",
        answerDE: "Im Komitat Nógrád",
        isCorrect: true,
      },
      {
        answerHU: "Heves megyében",
        answerDE: "Im Komitat Heves",
        isCorrect: false,
      },
      {
        answerHU: "Tolna megyében",
        answerDE: "Im Komitat Tolnau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Balassagyarmat Nógrád megyében található, a Palócföld kapujaként emlegetik. Hangulatos kisváros, a palóc kultúra központja.",
    explanationDE:
      "Balassagyarmat liegt im Komitat Nógrád in Nordungarn. Man nennt es das „Tor zur Palócföld“. Es ist ein idyllisches Städtchen und Zentrum der palócischen Kultur.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik város áll a Sajó és a Hernád folyók közelségében?",
    questionDE: "Welche Stadt liegt in der Nähe der Flüsse Sajó und Hernád?",
    answers: [
      {
        answerHU: "Miskolc",
        answerDE: "Miskolc",
        isCorrect: true,
      },
      {
        answerHU: "Kazincbarcika",
        answerDE: "Kazincbarcika",
        isCorrect: false,
      },
      {
        answerHU: "Eger",
        answerDE: "Eger",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Miskolc fekszik e két folyó térségében, Észak-Magyarországon. A Bükk kapuja, az ország harmadik legnagyobb városa, ipari és kulturális központ.",
    explanationDE:
      "Miskolc befindet sich im Einzugsgebiet von Sajó und Hernád, am Tor zum Bükk-Gebirge. Sie ist Ungarns drittgrößte Stadt und ein industrielles wie kulturelles Zentrum.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik dunai sziget található Esztergom és Komárom között?",
    questionDE: "Welche Donauinsel liegt zwischen Esztergom und Komárom?",
    answers: [
      {
        answerHU: "A Körtvélyesi-sziget",
        answerDE: "Die Körtvélyes-Insel",
        isCorrect: false,
      },
      {
        answerHU: "A Margit-sziget",
        answerDE: "Die Margareteninsel",
        isCorrect: false,
      },
      {
        answerHU: "A Szentendrei-sziget",
        answerDE: "Die St.-Andreas-Insel",
        isCorrect: true,
      },
    ],
    explanationHU:
      "A Szentendrei-sziget terül el a Duna Esztergom és Komárom közti szakaszán. Csendes, természeti értékekkel teli, kevésbé ismert része a Dunának.",
    explanationDE:
      "Die Szentendre-Insel liegt zwischen Esztergom und Komárom in der Donau. Ein ruhiges Areal mit großem Naturwert, abseits der großen Touristengebiete.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik városnak a jelképe a 'Fő téri Tűztorony'?",
    questionDE:
      "Welche Stadt hat den 'Feuerturm am Hauptplatz' als Wahrzeichen?",
    answers: [
      {
        answerHU: "Sopron",
        answerDE: "Ödenburg",
        isCorrect: true,
      },
      {
        answerHU: "Keszthely",
        answerDE: "Keszthely",
        isCorrect: false,
      },
      {
        answerHU: "Salgótarján",
        answerDE: "Salgótarján",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sopron jelképe a Fő téri Tűztorony. Történelmi óvárosának ikonikus épülete, kilátóként is működik, a város fontos nevezetessége.",
    explanationDE:
      "Das Wahrzeichen von Sopron ist der Feuerturm am Hauptplatz. Er überragt die Altstadt, dient als Aussichtsturm und zählt zu den wichtigsten Sehenswürdigkeiten.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik határmenti tó található Magyarország és Ausztria között?",
    questionDE:
      "Welcher Grenzsee liegt teils in Ungarn und teils in Österreich?",
    answers: [
      {
        answerHU: "Fertő tó",
        answerDE: "Neusiedler See",
        isCorrect: true,
      },
      {
        answerHU: "Velencei-tó",
        answerDE: "Velence-See",
        isCorrect: false,
      },
      {
        answerHU: "Kis-Balaton",
        answerDE: "der kleine Balaton",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Fertő tó fekszik a magyar–osztrák határon. Sztyepptó, egyedi madárvilággal, UNESCO világörökségi helyszín, Európa egyik legnagyobb ilyen tava.",
    explanationDE:
      "Der Neusiedler See liegt an der Grenze zu Österreich. Als Steppensee mit einzigartiger Vogelwelt ist er UNESCO-Welterbe und einer der größten Seen Europas.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Mi Magyarország negyedik legnagyobb városa?",
    questionDE: "Welche ist die viertgrößte Stadt Ungarns?",
    answers: [
      {
        answerHU: "Pécs (kulturális központ)",
        answerDE: "Pécs (Kulturzentrum)",
        isCorrect: false,
      },
      {
        answerHU: "Miskolc (ipari város)",
        answerDE: "Miskolc (Industriestadt)",
        isCorrect: true,
      },
      {
        answerHU: "Kecskemét (szecessziós város)",
        answerDE: "Kecskemét (Jugendstilstadt)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Debrecen a negyedik legnagyobb magyar város. Kelet-Magyarország központja, jelentős egyetemi, kulturális és gazdasági szereppel bír.",
    explanationDE:
      "Debrecen ist die viertgrößte Stadt Ungarns. Sie ist das Zentrum Ostungarns und hat eine bedeutende Uni, Kultur und Wirtschaft – eine lebhafte Metropole.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik város híres a Festetics-kastélyról a Balaton partján?",
    questionDE:
      "Welche Stadt am Balaton ist für das Schloss Festetics bekannt?",
    answers: [
      {
        answerHU: "Balatonfüred",
        answerDE: "Balatonfüred",
        isCorrect: false,
      },
      {
        answerHU: "Keszthely",
        answerDE: "Keszthely",
        isCorrect: true,
      },
      {
        answerHU: "Fonyód",
        answerDE: "Fonyód",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Keszthely városa büszkélkedik a barokk Festetics-kastéllyal. A Balaton partján található, a kastély jelentős kulturális és turisztikai célpont.",
    explanationDE:
      "Keszthely am Balaton ist berühmt für das barocke Schloss Festetics. Dieses prachtvolle Anwesen ist ein wichtiges Kultur- und Tourismusziel der Region.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik északi-parti Balaton-parti város híres a gyógy- és wellness-turizmusáról?",
    questionDE:
      "Welche Stadt am Nordufer des Balaton ist für seinen Kur,- und Wellnesstourismus bekannt?",
    answers: [
      {
        answerHU: "Zánka",
        answerDE: "Zánka",
        isCorrect: false,
      },
      {
        answerHU: "Balatonfüred",
        answerDE: "Balatonfüred",
        isCorrect: true,
      },
      {
        answerHU: "Révfülöp",
        answerDE: "Révfülöp",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Balatonfüred híres gyógyvizeiről és kúráiról. Az északi part elegáns fürdővárosa, kardiológiai központ is, wellness és pihenés kedvelt helyszíne.",
    explanationDE:
      "Balatonfüred ist bekannt für seine Heilquellen und Kuren. Es liegt am nördlichen Ufer des Balatons, gilt als Kur- und Wellnessstadt und besitzt eine Herzzentrum-Klinik.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Hogy hívják Magyarország nyugati részét, ahol például Vas és Zala megye található?",
    questionDE:
      "Wie heißt die Region Ungarns, die westlich der Donau liegt und Komitate wie Vas und Zala umfasst?",
    answers: [
      {
        answerHU: "Észak-Alföld",
        answerDE: "Nordliche Tiefebene",
        isCorrect: false,
      },
      {
        answerHU: "Nyugat-Dunántúl",
        answerDE: "West-Transdanubien",
        isCorrect: true,
      },
      {
        answerHU: "Közép-Dunántúl",
        answerDE: "Mittel-Transdanubien",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Nyugat-Dunántúlnak nevezik azt a régiót, ahol Vas és Zala megye is fekszik. Dombos, erdős vidék, ipari és turisztikai jelentősége egyaránt fontos.",
    explanationDE:
      "Diese Region im Westen Ungarns, zu der etwa die Komitate Vas und Zala zählen, heißt West-Transdanubien. Eine hügelige, waldreiche Gegend mit wirtschaftlichem und touristischem Wert.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Melyik város a legnagyobb település Szerbia határának közelében (Dél-Magyarországon)?",
    questionDE:
      "Wie heißt die größte Stadt in der Nähe der serbischen Grenze (in Süd-Ungarn)?",
    answers: [
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: false,
      },
      {
        answerHU: "Szeged",
        answerDE: "Szeged",
        isCorrect: true,
      },
      {
        answerHU: "Békéscsaba",
        answerDE: "Békéscsaba",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szeged a legnagyobb város a szerb határ közelében. Csongrád-Csanád megye székhelye, Tisza-parti kulturális és egyetemi központ.",
    explanationDE:
      "Szeged ist die größte Stadt nahe der serbischen Grenze im Süden Ungarns. Hauptstadt des Komitats Csongrád-Csanád, am Ufer der Theiß gelegen, Kultur- und Universitätszentrum.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU: "Melyik település híres a Bükfürdő nevű gyógyfürdőjéről?",
    questionDE:
      "Welche Stadt im Nordwesten Ungarns ist berühmt für ihr Thermalbad Bükfürdő?",
    answers: [
      {
        answerHU: "Sárvár",
        answerDE: "Sárvár",
        isCorrect: false,
      },
      {
        answerHU: "Bük",
        answerDE: "Bük",
        isCorrect: true,
      },
      {
        answerHU: "Mosonmagyaróvár",
        answerDE: "Mosonmagyaróvár",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bük település ad otthont a Bükfürdő gyógyfürdőnek. Európa-szerte ismert termálvízéről és wellness-szolgáltatásairól, keresett gyógyüdülőhely.",
    explanationDE:
      "Der Ort Bük ist berühmt für sein Heilbad Bükfürdő. Weit bekannt für sein Thermalwasser und vielfältige Wellness-Angebote, ein vielbesuchtes Kur- und Urlaubsziel.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Hogy nevezik a legnagyobb Duna-szigetet Magyarország területén?",
    questionDE: "Wie heißt die größte Insel der Donau auf ungarischem Gebiet?",
    answers: [
      {
        answerHU: "Szentendrei-sziget",
        answerDE: "Szentendre-Insel",
        isCorrect: false,
      },
      {
        answerHU: "Csepel-sziget",
        answerDE: "Csepel-Insel",
        isCorrect: true,
      },
      {
        answerHU: "Margit-sziget",
        answerDE: "Margareteninsel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Csepel-sziget a legnagyobb Duna-sziget az országban. Dél-Pestnél fekszik, több település található rajta, fontos természeti és gazdasági terület.",
    explanationDE:
      "Die Csepel-Insel ist die größte Donauinsel Ungarns. Sie erstreckt sich südlich von Budapest, beherbergt mehrere Ortschaften und ist sowohl landschaftlich als auch wirtschaftlich bedeutend.",
  },
  {
    category: "Geografie",
    level: 2,
    questionHU:
      "Mely hegység húzódik Magyarország nyugati határán Ausztria felé?",
    questionDE:
      "Wie heißt das Gebirge im Westen Ungarns, das an Österreich grenzt?",
    answers: [
      {
        answerHU: "Bakony",
        answerDE: "Bakony",
        isCorrect: false,
      },
      {
        answerHU: "Kőszegi-hegység",
        answerDE: "Kőszeger Gebirge",
        isCorrect: true,
      },
      {
        answerHU: "Vértes",
        answerDE: "Vértes-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Kőszegi-hegység található a nyugati határnál, az Alpok keleti nyúlványaként. Írott-kő a legmagasabb pontja, kedvelt túratérség.",
    explanationDE:
      "Das Kőszeg-Gebirge verläuft an der Westgrenze zu Österreich als östlicher Ausläufer der Alpen. Der Írott-kő ist mit 882 m der höchste Gipfel und beliebtes Wanderziel.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Mit eredményezett az 1867-es kiegyezés (Ausgleich) Magyarország számára?",
    questionDE: "Welche Folgen hatte der Ausgleich von 1867 für Ungarn?",
    answers: [
      {
        answerHU: "Teljes politikai függetlenség",
        answerDE: "Vollständige Unabhängigkeit",
        isCorrect: false,
      },
      {
        answerHU: "Kettős monarchia létrejötte",
        answerDE: "Entstehung der Doppelmonarchie",
        isCorrect: true,
      },
      {
        answerHU: "Porosz befolyás növekedése",
        answerDE: "Zunehmender preußischer Einfluss",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1867-es kiegyezés létrehozta az Osztrák–Magyar Monarchiát, Magyarország belső önkormányzatot nyert a Habsburg Birodalmon belül, dualista államformában.",
    explanationDE:
      "Der Ausgleich 1867 führte zur Doppelmonarchie Österreich-Ungarn. Ungarn erhielt eine eigene Regierung und Autonomie, blieb aber in gemeinsamen Angelegenheiten mit den Habsburgern verbunden.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik város volt a középkori Magyar Királyság koronázóvárosa?",
    questionDE:
      "Welche Stadt war Krönungsort des mittelalterlichen Königreichs Ungarn?",
    answers: [
      {
        answerHU: "Székesfehérvár",
        answerDE: "Stuhlweißenburg",
        isCorrect: true,
      },
      {
        answerHU: "Veszprém",
        answerDE: "Veszprém",
        isCorrect: false,
      },
      {
        answerHU: "Eger",
        answerDE: "Eger",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Székesfehérvár a koronázóváros, ahol több Árpád-házi királyt is megkoronáztak. Jelentős szerepet játszott a középkori magyar államiságban.",
    explanationDE:
      "Székesfehérvár war die Krönungsstadt des mittelalterlichen Ungarn. Dort wurden zahlreiche Könige der Árpáden-Dynastie gekrönt",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Melyik eseményhez köthető Batthyány Lajos kivégzése?",
    questionDE:
      "Welchem Ereignis ist die Hinrichtung von Lajos Batthyány zuzuordnen?",
    answers: [
      {
        answerHU: "1848-as forradalom",
        answerDE: "Revolution 1848",
        isCorrect: true,
      },
      {
        answerHU: "Rákóczi-felkelés",
        answerDE: "Rákóczi-Aufstand",
        isCorrect: false,
      },
      {
        answerHU: "Trianoni békeszerződés",
        answerDE: "Vertrag von Trianon",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1848–49-es szabadságharc leverése után végezték ki Batthyány Lajost, Magyarország első felelős miniszterelnökét, mártírja lett a forradalomnak.",
    explanationDE:
      "Lajos Batthyány wurde nach Niederschlagung der Revolution von 1848/49 hingerichtet. Er war der erste verantwortliche ungarische Ministerpräsident und wurde zum Märtyrer.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor zajlott a 'Dózsa-féle parasztfelkelés'?",
    questionDE: "Wann war der 'Dózsa-Bauernaufstand'?",
    answers: [
      {
        answerHU: "Reformáció korában (1525)",
        answerDE: "Zur Zeit der Reformation (1525)",
        isCorrect: false,
      },
      {
        answerHU: "Török hódítás idején (1514)",
        answerDE: "Zur Zeit der türkischen Eroberung (1514)",
        isCorrect: true,
      },
      {
        answerHU: "Felvilágosodás korszakában (1789)",
        answerDE: "Zeitalter der Aufklärung (1789)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1514-ben tört ki Dózsa György vezetésével. Véresen levert parasztlázadás volt a nemesség ellen, erősen meghatározta a kor társadalmi viszonyait.",
    explanationDE:
      "Der Bauernaufstand unter György Dózsa brach 1514 aus. Er richtete sich blutig gegen den Adel und beeinflusste die gesellschaftlichen Strukturen seiner Zeit maßgeblich.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Melyik uralkodó építtette ki a visegrádi királyi palotát?",
    questionDE:
      "Welcher Herrscher errichtete den königlichen Palast in Visegrád?",
    answers: [
      {
        answerHU: "I. Károly Róbert",
        answerDE: "Karl Robert I.",
        isCorrect: true,
      },
      {
        answerHU: "II. Ulászló",
        answerDE: "Vladislav II.",
        isCorrect: false,
      },
      {
        answerHU: "Rudolf császár",
        answerDE: "Kaiser Rudolf",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Károly Róbert, Anjou-házi uralkodó kezdte kiépíteni a 14. században. Visegrád fényűző királyi központ lett, a kor művészetének remeke.",
    explanationDE:
      "Károly Róbert aus dem Hause Anjou ließ im 14. Jh. die Königspalota in Visegrád ausbauen. So wurde sie zu einem prächtigen königlichen Zentrum und Kunstwerk der Epoche.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Hol mondták ki Magyarország függetlenségét 1849-ben?",
    questionDE: "Wo wurde 1849 Ungarns Unabhängigkeit ausgerufen?",
    answers: [
      {
        answerHU: "Debrecen városában.",
        answerDE: "In der Stadt Debrecen.",
        isCorrect: true,
      },
      {
        answerHU: "Pesten, a Múzeumnál.",
        answerDE: "In Pest, beim Museum.",
        isCorrect: false,
      },
      {
        answerHU: "Pozsony városában.",
        answerDE: "In Pressburg.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Debrecenben, a Nagytemplomban hirdették ki az 1849-es Függetlenségi Nyilatkozatot. Kossuth Lajos vezette, elszakadva a Habsburg-háztól.",
    explanationDE:
      "In Debrecen wurde 1849 die Unabhängigkeitserklärung verkündet. Unter Führung von Lajos Kossuth trennte man sich von den Habsburgern – ein entscheidender Freiheitsakt.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor jött létre a Magyar Tanácsköztársaság?",
    questionDE: "Wann entstand die Ungarische Räterepublik?",
    answers: [
      {
        answerHU: "1919-ben",
        answerDE: "1919",
        isCorrect: true,
      },
      {
        answerHU: "1945-ben",
        answerDE: "1945",
        isCorrect: false,
      },
      {
        answerHU: "1989-ben",
        answerDE: "1989",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1919-ben rövid ideig állt fenn. A forradalmi kormányzótanács Kun Béla vezetésével szocialista berendezkedést próbált megvalósítani, sikertelenül.",
    explanationDE:
      "Die Ungarische Räterepublik entstand 1919 und bestand nur kurz. Unter Béla Kun versuchte man, ein sozialistisches System zu etablieren, scheiterte aber rasch.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik városban kiáltották ki 1848-ban a forradalmi követeléseket?",
    questionDE:
      "In welcher Stadt wurden 1848 die revolutionären Forderungen ausgerufen?",
    answers: [
      {
        answerHU: "Pesten",
        answerDE: "In Pest",
        isCorrect: true,
      },
      {
        answerHU: "Zágrábban",
        answerDE: "In Zagreb",
        isCorrect: false,
      },
      {
        answerHU: "Bécsben",
        answerDE: "In Wien",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Pesten, március 15-én. A Pilvax kávéháztól induló tömeg Petőfi vezetésével hirdette ki a 12 pontot, elindítva a szabadságharcot.",
    explanationDE:
      "In Pest wurden am 15. März 1848 die revolutionären Forderungen laut. Vom Pilvax-Café aus verkündete Petőfi Sándor die 12 Punkte und löste so den Freiheitskampf aus.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik város volt az 1541-es török ostrom során elfoglalt magyar főváros?",
    questionDE:
      "Welche Stadt, ungarische Hauptstadt, wurde 1541 von den Osmanen erobert?",
    answers: [
      {
        answerHU: "Buda",
        answerDE: "Ofen (Buda)",
        isCorrect: true,
      },
      {
        answerHU: "Pest",
        answerDE: "Pest",
        isCorrect: false,
      },
      {
        answerHU: "Temesvár",
        answerDE: "Temeswar",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Buda volt akkor a főváros, 1541-ben csellel a törökök kezébe került. Ekkor kezdődött a török hódoltság korszaka.",
    explanationDE:
      "Buda war zu dieser Zeit Ungarns Hauptstadt. 1541 fiel sie durch eine List an die Osmanen. Damit begann die lange Epoche der türkischen Besetzung des Landes.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Melyik uralkodó híres 'türelmi rendeletéről' a 18. században?",
    questionDE:
      "Welcher Herrscher ist für sein 'Toleranzpatent' im 18. Jahrhundert bekannt?",
    answers: [
      {
        answerHU: "II. József",
        answerDE: "Joseph II.",
        isCorrect: true,
      },
      {
        answerHU: "III. Károly",
        answerDE: "Karl III.",
        isCorrect: false,
      },
      {
        answerHU: "Mária Terézia",
        answerDE: "Maria Theresia",
        isCorrect: false,
      },
    ],
    explanationHU:
      "II. József Habsburg uralkodó. 1781-ben vallási türelmet hirdetett, enyhítve a protestánsok és ortodoxok helyzetén, felvilágosult módon.",
    explanationDE:
      "Kaiser Joseph II. (Habsburg) ist für sein „Toleranzedikt“ von 1781 bekannt. Er ermöglichte Protestanten und Orthodoxen mehr Freiheiten, ein aufgeklärter Schritt seiner Regentschaft.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor kiáltották ki az önálló magyar köztársaságot először?",
    questionDE:
      "Wann wurde erstmals eine eigenständige Ungarische Republik ausgerufen?",
    answers: [
      {
        answerHU: "1918-ban (őszirózsás forradalom után)",
        answerDE: "1918 (nach der Asternrevolution)",
        isCorrect: true,
      },
      {
        answerHU: "1867-ben",
        answerDE: "1867",
        isCorrect: false,
      },
      {
        answerHU: "1949-ben",
        answerDE: "1949",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1918-ban, Károlyi Mihály vezetésével, a Monarchia összeomlása után. Rövid életű próbálkozás volt a királyság megszüntetésére.",
    explanationDE:
      "Erstmals wurde 1918 unter Mihály Károlyi, nach dem Zerfall der Monarchie, eine eigenständige Republik ausgerufen. Doch dieser Versuch währte nur kurz.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Melyik eseményhez kapcsolódik az Aradi vértanúk kivégzése?",
    questionDE:
      "Mit welchem Ereignis steht die Hinrichtung der Arader Blutzeugen in Verbindung?",
    answers: [
      {
        answerHU: "Az 1848–49-es szabadságharc leverésével",
        answerDE: "Mit der Niederschlagung des Freiheitskampfes 1848–49",
        isCorrect: true,
      },
      {
        answerHU: "A török hódoltság kezdetével",
        answerDE: "Mit Beginn der türkischen Herrschaft",
        isCorrect: false,
      },
      {
        answerHU: "A II. világháború befejezésével",
        answerDE: "Mit dem Ende des Zweiten Weltkriegs",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1848–49-es szabadságharc leverése után, 1849. október 6-án végezték ki Aradon a 13 tábornokot, nemzeti gyásznap lett.",
    explanationDE:
      "Die Hinrichtung der 13 Arader Märtyrer erfolgte nach Niederschlagung des Freiheitskampfs von 1848/49 am 6. Oktober 1849. Seither ist es ein nationaler Trauertag.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor zajlott a Tanácsköztársaság és ki vezette?",
    questionDE: "Wann fand die Räterepublik statt und wer führte sie?",
    answers: [
      {
        answerHU: "1919-ben, Kun Béla vezetésével",
        answerDE: "1919 unter der Führung von Béla Kun",
        isCorrect: true,
      },
      {
        answerHU: "1944-ben, Horthy Miklós vezetésével",
        answerDE: "1944, unter der Führung von Miklós Horthy",
        isCorrect: false,
      },
      {
        answerHU: "1956-ban, Nagy Imre kormánya alatt",
        answerDE: "1956, unter der Regierung von Imre Nagy",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1919-ben rövid ideig állt fenn, Kun Béla vezette Forradalmi Kormányzótanács élén. Szocialista államkísérlet volt, hamar összeomlott.",
    explanationDE:
      "Die Räterepublik bestand 1919 nur kurze Zeit, unter der Leitung von Béla Kun. Es war ein sozialistisches Staatsprojekt, das schnell zusammenbrach.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor zajlott le a tatárjárás Magyarországon?",
    questionDE: "Wann fand der Mongoleneinfall (Tatarensturm) in Ungarn statt?",
    answers: [
      {
        answerHU: "1241–1242-ben",
        answerDE: "1241–1242",
        isCorrect: true,
      },
      {
        answerHU: "1301–1308-ban",
        answerDE: "1301–1308",
        isCorrect: false,
      },
      {
        answerHU: "1396-ban",
        answerDE: "1396",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1241–42-ben pusztított a tatár invázió. Nagy veszteségeket okozott, lakosságcsökkenést és gazdasági súlyos károkat hagyva maga után.",
    explanationDE:
      "Die Mongoleninvasion (Tatarensturm) wütete 1241–42 in Ungarn. Sie brachte enorme Zerstörungen und Bevölkerungsverluste mit sich, die das Land schwer trafen.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mikor volt a 'török hódoltság' Magyarország nagy részén?",
    questionDE:
      "Wann bestand die 'Osmanische Herrschaft' über weite Teile Ungarns?",
    answers: [
      {
        answerHU: "1541–1686 között",
        answerDE: "1541–1686",
        isCorrect: true,
      },
      {
        answerHU: "1366–1396 között",
        answerDE: "Zwischen 1366 und 1396",
        isCorrect: false,
      },
      {
        answerHU: "1723–1780",
        answerDE: "1723–1780",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1541–1686 között. Buda elfoglalásától (1541) felszabadításáig (1686) tartott a középső területek török uralma.",
    explanationDE:
      "Die „Türkenherrschaft“ in weiten Teilen Ungarns dauerte von 1541 bis 1686. Zwischen der Eroberung Budas und seiner Rückeroberung standen die Zentralgebiete unter osmanischer Kontrolle.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Mikor kiáltották ki a Magyar Népköztársaságot, felváltva a királyságot?",
    questionDE:
      "Wann wurde die Ungarische Volksrepublik ausgerufen, anstelle der Monarchie?",
    answers: [
      {
        answerHU: "1946-ban",
        answerDE: "1946",
        isCorrect: true,
      },
      {
        answerHU: "1918-ban",
        answerDE: "1918",
        isCorrect: false,
      },
      {
        answerHU: "1956-ban",
        answerDE: "1956",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1949-ben rögzítették az alkotmányban a népköztársaságot. Korábban, 1946-ban már köztársaság lettünk, de 1949-től kommunista rendszer épült ki.",
    explanationDE:
      "Die Ungarische Volksrepublik wurde 1949 verkündet und ersetzte die Monarchie endgültig. Bereits 1946 war Ungarn Republik, doch ab 1949 begann das kommunistische Regime.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Melyik eseményhez köthető az 1051-es vértesi ütközet?",
    questionDE:
      "Mit welchem Ereignis ist das Gefecht von 1051 bei Vértes verbunden?",
    answers: [
      {
        answerHU: "III. Henrik hadjárata Magyarország ellen.",
        answerDE: "Der Feldzug Heinrich III. gegen Ungarn.",
        isCorrect: true,
      },
      {
        answerHU: "A tatárok betörése az országba.",
        answerDE: "Der Einfall der Tataren in das Land.",
        isCorrect: false,
      },
      {
        answerHU: "A törökök támadása.",
        answerDE: "Der Angriff der Türken.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "III. (Német) Henrik hadjáratához. A legenda szerint a menekülő sereg elhagyta páncéljait a Vértesben, ezért nevezik így a hegységet.",
    explanationDE:
      "Die Schlacht bei Vértes 1051 ist mit König Heinrich III. (in manchen Quellen II.) verbunden. Der Sage nach warfen die fliehenden Deutschen ihre Rüstungen weg, daher „Vértes“ (Panzer).",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik uralkodó alatt történt a tordai országgyűlés, amely a vallásszabadságot kihirdette?",
    questionDE:
      "Unter welchem Herrscher fand der Landtag von Torda statt, der die Religionsfreiheit proklamierte?",
    answers: [
      {
        answerHU: "János Zsigmond erdélyi fejedelem idején (1568)",
        answerDE: "Unter Fürst Johann Sigismund von Siebenbürgen (1568)",
        isCorrect: true,
      },
      {
        answerHU: "II. Rákóczi Ferenc idején",
        answerDE: "Zur Zeit von Franz Rákóczi II.",
        isCorrect: false,
      },
      {
        answerHU: "Mária Terézia uralkodása alatt",
        answerDE: "Unter der Herrschaft von Maria Theresia",
        isCorrect: false,
      },
    ],
    explanationHU:
      "János Zsigmond erdélyi fejedelem idején, 1568-ban. Az erdélyi országgyűlés Európában előremutató módon hirdetett vallástürelmet.",
    explanationDE:
      "Unter Fürst Johann Sigismund (János Zsigmond) verkündete der Landtag von Torda 1568 die Religionsfreiheit. Ein wegweisender Schritt für Toleranz in Europa.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik szerződést kötötték meg 1711-ben, lezárva a Rákóczi-szabadságharcot?",
    questionDE:
      "Welcher Vertrag wurde 1711 geschlossen, der den Rákóczi-Freiheitskampf beendete?",
    answers: [
      {
        answerHU: "A szatmári békét",
        answerDE: "Den Frieden von Sathmar",
        isCorrect: true,
      },
      {
        answerHU: "A speyeri egyezményt",
        answerDE: "Das Abkommen von Speyer",
        isCorrect: false,
      },
      {
        answerHU: "A karlócai békét",
        answerDE: "Der Friede von Karlowitz",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A szatmári békét írták alá 1711-ben, ezzel ért véget a kuruc szabadságharc. Kompromisszumos béke volt a Habsburgokkal.",
    explanationDE:
      "Der Friede von Sathmar (Szatmár) wurde 1711 geschlossen und beendete den Kuruzenaufstand unter Fürst Rákóczi. Ein Kompromissfrieden mit den Habsburgern.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Hogyan jellemezhető a 'Karlsbadi határozatok' hatása a magyar reformkorszakban?",
    questionDE:
      "Wie lässt sich die Auswirkung der 'Karslbadener Beschlüsse' in der ungarischen Reformzeit beschreiben?",
    answers: [
      {
        answerHU: "A szólásszabadság korlátozása és a cenzúra erősödése",
        answerDE: "Einschränkung der Redefreiheit und verstärkte Zensur",
        isCorrect: true,
      },
      {
        answerHU: "A jobbágyfelszabadítás bevezetése",
        answerDE: "Die Einführung der Bauernbefreiung",
        isCorrect: false,
      },
      {
        answerHU: "A vallásszabadság szélesítése",
        answerDE: "Ausweitung der Religionsfreiheit",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Gátlóak voltak a liberális kezdeményezésekre nézve (1819). Lassították a reformfolyamatokat, fékezve a szabad eszméket Európa-szerte, így nálunk is.",
    explanationDE:
      "Die Karlsbader Beschlüsse von 1819 behinderten liberale Bewegungen in ganz Europa. Auch in Ungarn bremsten sie den Reformprozess und hielten freiheitliche Ideen zurück.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Mit ért véget a 'nagy török háború' (1683–1699) a Habsburg Birodalom és a török Porta között?",
    questionDE:
      "Wodurch endete der 'Große Türkenkrieg' (1683–1699) zwischen dem Habsburgerreich und der türkischen Pforte?",
    answers: [
      {
        answerHU: "A karlócai békével (1699)",
        answerDE: "Durch den Frieden von Karlowitz (1699)",
        isCorrect: true,
      },
      {
        answerHU: "A drinápolyi békével (1568)",
        answerDE: "Mit dem Frieden von Adrianopel (1568)",
        isCorrect: false,
      },
      {
        answerHU: "A pozsareváci békével (1718)",
        answerDE: "Mit dem Frieden von Passarowitz (1718)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A karlócai békével 1699-ben. Ez a megállapodás nagy területeket szabadított fel a török uralom alól Magyarországon, véget vetve a hódoltságnak.",
    explanationDE:
      "Der Große Türkenkrieg (1683–1699) endete mit dem Frieden von Karlowitz 1699. Dadurch wurden weite Teile Ungarns von der osmanischen Besatzung befreit, die Türkenherrschaft endete.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Melyik évben említik először a magyar fejedelemséget írott források?",
    questionDE:
      'In welchem Jahr wurde das Fürstentum Ungarn erstmals in schriftlichen Quellen erwähnt?"',
    answers: [
      {
        answerHU: "860",
        answerDE: "860",
        isCorrect: false,
      },
      {
        answerHU: "896/900 körül",
        answerDE: "Um 896/900",
        isCorrect: true,
      },
      {
        answerHU: "1001",
        answerDE: "1001",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A honfoglalás korából, a 9–10. század fordulójáról. 896 körül említik a magyarokat és fejedelemségüket a Kárpát-medencében.",
    explanationDE:
      "Die ungarische Fürstenherrschaft wird erstmals um die Zeit der Landnahme (ab 896) in schriftlichen Quellen erwähnt, an der Wende vom 9. zum 10. Jahrhundert.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Kit neveznek sokszor a „magyar demokrácia atyjának” 1849 után?",
    questionDE:
      "Wer wurde nach 1849 oft als „Vater der ungarischen Demokratie“ bezeichnet?",
    answers: [
      {
        answerHU: "Deák Ferenc",
        answerDE: "Ferenc Deák",
        isCorrect: false,
      },
      {
        answerHU: "Kossuth Lajos",
        answerDE: "Lajos Kossuth",
        isCorrect: true,
      },
      {
        answerHU: "Széchenyi István",
        answerDE: "István Széchenyi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kossuth Lajost. Az 1848–49-es forradalom ikonikus vezetője, a modern magyar demokrácia szószólója és a függetlenség szimbóluma.",
    explanationDE:
      "Lajos Kossuth wird oft als „Vater der ungarischen Demokratie“ bezeichnet. Er war Anführer der Revolution 1848/49 und Symbolfigur des Freiheitsstrebens.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mi volt Magyarország szerepe a második világháborúban?",
    questionDE: "Welche Rolle spielte Ungarn im Zweiten Weltkrieg?",
    answers: [
      {
        answerHU: "Semleges államként megőrizte függetlenségét",
        answerDE: "Es blieb neutral und bewahrte seine Unabhängigkeit",
        isCorrect: false,
      },
      {
        answerHU:
          "Először Németország szövetségese volt, majd megszállták a németek",
        answerDE:
          "Zuerst war es ein Verbündeter Deutschlands, dann wurde es von den Deutschen besetzt.",
        isCorrect: true,
      },
      {
        answerHU: "Végig a Szovjetunió oldalán harcolt",
        answerDE: "Kämpfte die ganze Zeit an der Seite der Sowjetunion",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A tengelyhatalmak oldalán csatlakozott, 1944-ben német megszállás alá került. Tragikus végkifejlet, pusztulással és veszteségekkel járt.",
    explanationDE:
      "Ungarn schloss sich den Achsenmächten an und wurde 1944 von Deutschland besetzt. Dies endete tragisch mit Zerstörung und erheblichen Verlusten im Zweiten Weltkrieg.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU: "Mit nevezünk „harmadik magyar köztársaságnak”?",
    questionDE:
      "Welche Periode wird als ‚Dritte Ungarische Republik‘ bezeichnet?",
    answers: [
      {
        answerHU: "Az 1848-as forradalomból létrejött állam neve",
        answerDE: "Name des 1848 aus der Revolution entstandenen Staates",
        isCorrect: false,
      },
      {
        answerHU: "Az 1989 utáni demokratikus Magyarország",
        answerDE: "Das demokratische Ungarn nach 1989",
        isCorrect: true,
      },
      {
        answerHU: "Egy 1919-ben kikiáltott ideiglenes államforma",
        answerDE: "Eine 1919 ausgerufene provisorische Staatsform",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1989-ben kikiáltott demokratikus államforma. A kommunista rendszer bukása után született újjá a köztársaság, alkotmányos átalakulással.",
    explanationDE:
      "Als „Dritte Ungarische Republik“ gilt der 1989 ausgerufene demokratische Staat. Nach dem Sturz des kommunistischen Regimes begann die verfassungsmäßige Erneuerung.",
  },
  {
    category: "Geschichte",
    level: 2,
    questionHU:
      "Ki volt az utolsó kommunista vezető Magyarországon a rendszerváltás előtt?",
    questionDE:
      "Wer war der letzte kommunistische Führer in Ungarn vor dem Systemwechsel?",
    answers: [
      {
        answerHU: "Nagy Imre",
        answerDE: "Imre Nagy",
        isCorrect: false,
      },
      {
        answerHU: "Grósz Károly",
        answerDE: "Károly Grósz",
        isCorrect: true,
      },
      {
        answerHU: "Rákosi Mátyás",
        answerDE: "Mátyás Rákosi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Grósz Károly. Az MSZMP főtitkára volt a nyolcvanas évek végén, a rendszerváltást megelőzően, a párt utolsó vezető szakaszában.",
    explanationDE:
      "Károly Grósz war der letzte kommunistische Spitzenpolitiker vor der Wende. Ende der 1980er Jahre führte er als MSZMP-Generalsekretär das Regime in seine letzte Phase.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a fő összetevője a 'halászlé' nevű magyar levesnek?",
    questionDE: "Was ist die Hauptzutat der ungarischen Fischsuppe 'Halászlé'?",
    answers: [
      {
        answerHU: "Ponty (vagy más édesvízi hal).",
        answerDE: "Karpfen (oder ein anderer Süßwasserfisch).",
        isCorrect: true,
      },
      {
        answerHU: "Marhahúsból készül.",
        answerDE: "Es wird aus Rindfleisch gemacht.",
        isCorrect: false,
      },
      {
        answerHU: "Csirkehúsból.",
        answerDE: "Aus Hühnerfleisch.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ponty és fűszerpaprika, hagyma. A halászlé jellegzetes, paprikás alapú halleves, több halfajtából is készíthető, híres magyar specialitás.",
    explanationDE:
      "Die ungarische Fischsuppe „Halászlé“ besteht hauptsächlich aus Karpfen, Paprika und Zwiebeln. Sie ist ein würziges Nationalgericht und kann auch mit anderen Fischarten gekocht werden.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a 'pörkölt' és a 'paprikás' közötti fő különbség?",
    questionDE:
      "Worin liegt der Hauptunterschied zwischen 'pörkölt' und 'paprikás'?",
    answers: [
      {
        answerHU: "A paprikáshoz általában tejfölt is adnak",
        answerDE: "Zu 'Paprikás' wird meistens Sauerrahm (Tejföl) hinzugefügt.",
        isCorrect: true,
      },
      {
        answerHU: "A pörkölt mindig csirkéből készül",
        answerDE: "Pörkölt wird immer aus Hähnchen gemacht",
        isCorrect: false,
      },
      {
        answerHU: "A paprikás soha nem tartalmaz paprikát",
        answerDE: "Paprikás enthält nie Paprika",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A paprikásban tejföl is van, míg a pörköltben nincs. Mindkettő paprikás alapú húsétel, de a tejfölös behabarás különbözteti meg őket.",
    explanationDE:
      "Der Hauptunterschied ist, dass beim „Paprikás“ Sauerrahm eingearbeitet wird, beim „Pörkölt“ hingegen nicht. Beide sind paprika-basierte Fleischgerichte, doch die Sahne macht den Unterschied.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Melyik édességről híres Szamos cukrászda?",
    questionDE: "Für welche Süßigkeit ist die Szamos-Konditorei bekannt?",
    answers: [
      {
        answerHU: "Marcipán termékek",
        answerDE: "Marzipanprodukte",
        isCorrect: true,
      },
      {
        answerHU: "Dobos torta",
        answerDE: "Dobos-Torte",
        isCorrect: false,
      },
      {
        answerHU: "Kürtőskalács",
        answerDE: "Baumkuchen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A marcipán remekeiről. Kézműves marcipánspecialitásaik művészi kivitelezésűek, a Szamos név egybeforrt a minőségi marcipánnal Magyarországon.",
    explanationDE:
      "Das Szamos-Café ist berühmt für seine Marzipan-Kreationen. Diese handgefertigten Süßigkeiten sind künstlerisch gestaltet und haben den Namen Szamos legendär gemacht.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik magyar származású tudós ismerte el a dinamóelv megalkotását?",
    questionDE:
      "Welcher ungarischstämmige Wissenschaftler ist für das Dynamo-Prinzip bekannt?",
    answers: [
      {
        answerHU: "Jedlik Ányos",
        answerDE: "Ányos Jedlik",
        isCorrect: true,
      },
      {
        answerHU: "Kandó Kálmán",
        answerDE: "Kálmán Kandó",
        isCorrect: false,
      },
      {
        answerHU: "Neumann János",
        answerDE: "John von Neumann",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Jedlik Ányos, aki kísérleteivel bizonyította a dinamó elvét. Többek között villanymotor és dinamó feltalálásában is úttörő volt.",
    explanationDE:
      "Ányos Jedlik, ein ungarischer Wissenschaftler, bewies das Prinzip der Dynamomaschine. Er war Pionier für Elektromotor und Dynamo und trug maßgeblich zur Elektroentwicklung bei.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Hol született Kodály Zoltán, a híres zeneszerző és népzenekutató?",
    questionDE:
      "Wo wurde der berühmte Komponist und Volksliedforscher Zoltán Kodály geboren?",
    answers: [
      {
        answerHU: "Kecskeméten",
        answerDE: "In Kecskemét",
        isCorrect: true,
      },
      {
        answerHU: "Szegeden",
        answerDE: "In Szeged",
        isCorrect: false,
      },
      {
        answerHU: "Debrecenben",
        answerDE: "In Debrecen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kecskeméten. A magyar népzene gyűjtésében és a zenepedagógiában maradandót alkotott, világszerte elismert zeneszerző.",
    explanationDE:
      "Zoltán Kodály wurde in Kecskemét geboren. Er leistete Großes in der Erforschung der ungarischen Volksmusik und der Musikpädagogik",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Szent-Györgyi Albert és mivel vált híressé?",
    questionDE: "Wer war Albert Szent-Györgyi und womit wurde er berühmt?",
    answers: [
      {
        answerHU: "Biokémikus, a C-vitamin felfedezője",
        answerDE: "Biochemiker, Entdecker des Vitamin C",
        isCorrect: true,
      },
      {
        answerHU: "Zenész, aki a csárdást komponálta",
        answerDE: "Musiker, der den Czárdás komponierte",
        isCorrect: false,
      },
      {
        answerHU: "Festő, aki a Nemzeti Múzeumot díszítette",
        answerDE: "Maler, der das Nationalmuseum schmückte",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyar tudós, a C-vitamin felfedezéséért kapott Nobel-díjat. Biokémikusként a vitamin jelentőségét ismerte fel, forradalmasítva az orvostudományt.",
    explanationDE:
      "Albert Szent-Györgyi war ein ungarischer Biochemiker, der den Nobelpreis für die Entdeckung des Vitamin C erhielt. Er revolutionierte das Verständnis der Vitamine und Gesundheit.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Kinek a nevéhez fűződik a 'Fehérlófia' című népmesefeldolgozás?",
    questionDE: "Wer ist für die Märchenbearbeitung 'Fehérlófia' bekannt?",
    answers: [
      {
        answerHU: "Illyés Gyula",
        answerDE: "Gyula Illyés",
        isCorrect: true,
      },
      {
        answerHU: "Móra Ferenc",
        answerDE: "Ferenc Móra",
        isCorrect: false,
      },
      {
        answerHU: "Gárdonyi Géza",
        answerDE: "Géza Gárdonyi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Illyés Gyula író dolgozta át. Több népmesét is irodalmi formába öntött, megőrizve azok hiteles néphagyományát.",
    explanationDE:
      "Gyula Illyés war verantwortlich für die literarische Bearbeitung von „Fehérlófia“. Er adaptierte mehrere Volksmärchen, um die ungarische Tradition authentisch zu erhalten.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik államférfi volt a forradalmi kormányzó-elnök 1848–49-ben?",
    questionDE:
      "Welcher Staatsmann war der revolutionäre Gouverneur-Präsident 1848–49?",
    answers: [
      {
        answerHU: "Kossuth Lajos",
        answerDE: "Lajos Kossuth",
        isCorrect: true,
      },
      {
        answerHU: "Batthyány Lajos",
        answerDE: "Lajos Batthyány",
        isCorrect: false,
      },
      {
        answerHU: "Deák Ferenc",
        answerDE: "Ferenc Deák",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kossuth Lajos. A szabadságharc politikai vezéralakja, a forradalmi kormány kormányzó-elnöke, a nemzeti függetlenség hőse.",
    explanationDE:
      "Lajos Kossuth war 1848–49 als Gouverneur-Präsident Anführer der Revolution. Er steht für den Freiheitskampf und die Unabhängigkeitsbewegung Ungarns.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik írónőnek köszönhetjük a 'Pál utcai fiúk' németre való fordítását?",
    questionDE:
      "Welcher Autorin verdanken wir die deutsche Übersetzung von 'Die Jungen der Paulstraße'?",
    answers: [
      {
        answerHU: "Béres Katalin",
        answerDE: "Katalin Béres",
        isCorrect: true,
      },
      {
        answerHU: "Szabó Magda",
        answerDE: "Magda Szabó",
        isCorrect: false,
      },
      {
        answerHU: "Török Sophie",
        answerDE: "Sophie Török",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Eleonora Granger fordította németre Molnár Ferenc híres ifjúsági regényét, amely világszerte ismert és közkedvelt.",
    explanationDE:
      "Die deutsche Übersetzung des Jugendromans „Die Jungen der Paulstraße“ (Molnár Ferenc) stammt von Eleonora Granger. Das Buch ist international sehr bekannt und beliebt.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik fizikus kapcsolódik az atombomba kifejlesztéséhez az USA-ban?",
    questionDE:
      "Welcher ungarische Physiker war an der Entwicklung der Atombombe in den USA beteiligt?",
    answers: [
      {
        answerHU: "Teller Ede (Edward Teller)",
        answerDE: "Edward Teller (Ede Teller)",
        isCorrect: true,
      },
      {
        answerHU: "Wigner Jenő (Eugene Wigner)",
        answerDE: "Eugene Wigner",
        isCorrect: false,
      },
      {
        answerHU: "Kármán Tódor (Theodore von Kármán)",
        answerDE: "Tódor Kármán (Theodore von Kármán)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Teller Ede, magyar származású fizikus, a hidrogénbomba atyjaként is emlegetik, részt vett az amerikai nukleáris projektekben.",
    explanationDE:
      "Edward Teller, ein ungarischstämmiger Physiker, gilt als „Vater der Wasserstoffbombe“. Er war beim US-Atomprojekt beteiligt und prägte die Kernwaffenentwicklung wesentlich.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Miben alkotott kiemelkedőt Moholy-Nagy László?",
    questionDE: "Worin war László Moholy-Nagy herausragend?",
    answers: [
      {
        answerHU: "Fotográfia és a Bauhaus iskola.",
        answerDE: "Fotografie und das Bauhaus. ",
        isCorrect: true,
      },
      {
        answerHU: "Klasszikus zeneszerzés.",
        answerDE: "Klassische Komposition",
        isCorrect: false,
      },
      {
        answerHU: "Az atomfizika terén.",
        answerDE: "Im Bereich der Atomphysik.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A modern dizájn és a Bauhaus terén. Festő, fotóművész, tipográfus, újító szemléletével forradalmasította a vizuális művészeteket.",
    explanationDE:
      "László Moholy-Nagy wirkte bahnbrechend in Design und Bauhaus. Als Maler, Fotograf und Typograf prägte er die moderne Kunst und revolutionierte das visuelle Gestalten.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Melyik magyar származású színésznő vált híressé Hollywoodban?",
    questionDE:
      "Welche Schauspielerin ungarischer Herkunft wurde in Hollywood berühmt?",
    answers: [
      {
        answerHU: "Egy kilencszer házasodott díva",
        answerDE: "Eine neunmal verheiratete Diva",
        isCorrect: true,
      },
      {
        answerHU: "Egy Oscar-díjas drámai színésznő",
        answerDE: "Eine Oscar-prämierte dramatische Schauspielerin",
        isCorrect: false,
      },
      {
        answerHU: "Egy musical filmek sztárja",
        answerDE: "Ein Star aus Musicalfilmen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Gábor Zsa Zsa, aki fényűző életstílusával és filmszerepeivel ismertté vált. Hollywoodi karrierjével világszerte híressé lett.",
    explanationDE:
      "Zsa Zsa Gabor, eine ungarischstämmige Schauspielerin, erreichte durch ihren glamourösen Lebensstil und ihre Filmrollen in Hollywood weltweite Bekanntheit.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Gábor Dénes, és miért Nobel-díjas?",
    questionDE: "Wer war Dénes Gábor und warum erhielt er den Nobelpreis?",
    answers: [
      {
        answerHU: "A holográfia feltalálója",
        answerDE: "Der Erfinder der Holographie",
        isCorrect: true,
      },
      {
        answerHU: "A számítógép feltalálója",
        answerDE: "Der Erfinder des Computers",
        isCorrect: false,
      },
      {
        answerHU: "A telefonközpont megalkotója",
        answerDE: "Der Schöpfer der Telefonzentrale",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyar származású fizikus, a holográfia feltalálásáért kapott Nobel-díjat 1971-ben. Új távlatokat nyitott a 3D képalkotásban.",
    explanationDE:
      "Dennis Gabor (Gábor Dénes) war ungarisch-britischer Physiker, der 1971 für die Erfindung der Holographie den Nobelpreis erhielt. Er revolutionierte die dreidimensionale Bildtechnik.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik magyar festő volt híres a természetelvű tájképeiről, például az „Elválás” című képről?",
    questionDE:
      "Welcher ungarische Maler war für seine naturalistischen Landschaftsbilder bekannt, z. B. das Gemälde „Abschied“ (Elválás)?",
    answers: [
      {
        answerHU: "Munkácsy Mihály",
        answerDE: "Mihály Munkácsy",
        isCorrect: false,
      },
      {
        answerHU: "Szinyei Merse Pál",
        answerDE: "Pál Szinyei Merse",
        isCorrect: true,
      },
      {
        answerHU: "Paál László",
        answerDE: "László Paál",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szinyei Merse Pál, a plein air festészet hazai úttörője. Élénk színekkel és fényhatásokkal dolgozott.",
    explanationDE:
      "Pál Szinyei Merse war ein Pionier der Freilichtmalerei in Ungarn. Durch leuchtende Farben und Lichtwirkung sind Werke wie „Die Trennung“ (Elválás) bekannt.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Ki volt a híres magyar zongoraművész, György, aki virtuóz játékáról híres?",
    questionDE:
      "Welcher ungarische Pianist ist für sein virtuoses Spiel bekannt und trug den Vornamen György?",
    answers: [
      {
        answerHU: "Fischer Iván",
        answerDE: "Iván Fischer",
        isCorrect: false,
      },
      {
        answerHU: "Cziffra György",
        answerDE: "György Cziffra",
        isCorrect: true,
      },
      {
        answerHU: "Ránki Dezső",
        answerDE: "Dezső Ránki",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Cziffra György, világszerte elismert zongorista. Lenyűgöző technikájú, improvizatív zongorajátékával vált legendává.",
    explanationDE:
      "György Cziffra war ein renommierter ungarischer Pianist mit spektakulärer Technik und Improvisationskunst. Sein virtuoses Spiel machte ihn weltweit zur Legende.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Miklósa Erika?",
    questionDE: "Wer war Erika Miklósa?",
    answers: [
      {
        answerHU: "Egy magyar hegedűművész",
        answerDE: "Eine ungarische Geigerin",
        isCorrect: false,
      },
      {
        answerHU: "Egy világhírű koloratúrszoprán",
        answerDE: "Eine weltberühmte Koloratursopranistin",
        isCorrect: true,
      },
      {
        answerHU: "Egy szólista klarinétos",
        answerDE: "Ein Soloklarinettist",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Miklósa Erika magyar koloratúrszoprán, világhírű operaénekesnő. Rangos nemzetközi operaszínpadokon is rendszeresen fellépett.",
    explanationDE:
      "Erika Miklósa ist eine ungarische Koloratursopranistin von Weltrang. Sie trat auf renommierten Opernbühnen weltweit auf und genießt großes internationales Ansehen.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Melyik magyar matematikust tartják a gráfelmélet egyik úttörőjének?",
    questionDE: "Graphentheorie?",
    answers: [
      {
        answerHU: "Fejér Lipót",
        answerDE: "Lipót Fejér",
        isCorrect: false,
      },
      {
        answerHU: "Erdős Pál",
        answerDE: "Paul Erdős",
        isCorrect: true,
      },
      {
        answerHU: "Kármán Tódor",
        answerDE: "Theodor von Kármán",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Erdős Pált, a modern matematika egyik legtermékenyebb alakját. Számelméletben és kombinatorikában is óriási eredményeket ért el.",
    explanationDE:
      "Pál Erdős gilt als Wegbereiter der Graphentheorie und produktivster Mathematiker der Moderne. Er erzielte große Leistungen in Zahlentheorie und Kombinatorik.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki szerezte a „Psalmus Hungaricus” című művet?",
    questionDE:
      "Welcher ungarische Komponist schuf das Werk „Psalmus Hungaricus“?",
    answers: [
      {
        answerHU: "Dohnányi Ernő",
        answerDE: "Ernő Dohnányi",
        isCorrect: false,
      },
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: true,
      },
      {
        answerHU: "Ránki György",
        answerDE: "György Ránki",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kodály Zoltán komponálta ezt a nagyszabású kórusdarabot. Az egyik legjelentősebb magyar kórusmű, gyakran előadják nemzetközi szinten is.",
    explanationDE:
      "Zoltán Kodály schuf das monumentale Chorwerk „Psalmus Hungaricus“. Es zählt zu den bedeutendsten ungarischen Chorstücken und wird auch weltweit häufig aufgeführt.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Ki volt a híres magyar csellista, aki karmesterként is tevékenykedett és vezette a Liszt Akadémiát?",
    questionDE:
      "Wer war der ungarische Cellist, der auch als Dirigent wirkte und die Liszt-Akademie leitete?",
    answers: [
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: false,
      },
      {
        answerHU: "Starker János",
        answerDE: "János Starker",
        isCorrect: true,
      },
      {
        answerHU: "Solti György",
        answerDE: "Georg Solti",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Starker János világhírű csellóművész, karmester és pedagógus. A Liszt Ferenc Zeneművészeti Egyetemen is fontos szerepet vállalt.",
    explanationDE:
      "János Starker war ein ungarischer Star-Cellist, wirkte auch als Dirigent und lehrte an der Liszt-Musikhochschule. Er galt international als Cello-Virtuose.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Sigmund Freud közeli munkatársa?",
    questionDE: "Wer war ein enger Kollege Sigmund Freuds?",
    answers: [
      {
        answerHU: "József Attila, a költő",
        answerDE: "Attila József, der Dichter",
        isCorrect: false,
      },
      {
        answerHU: "Ferenczi Sándor, pszichoanalitikus",
        answerDE: "Sándor Ferenczi, Psychoanalytiker",
        isCorrect: true,
      },
      {
        answerHU: "Semmelweis Ignác, orvos",
        answerDE: "Ignaz Semmelweis, Arzt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ferenczi Sándor, kiemelkedő magyar pszichoanalitikus. Freud közvetlen társa volt a módszer kidolgozásában, a pszichoanalízis egyik úttörője.",
    explanationDE:
      "Sándor Ferenczi, ein bedeutender ungarischer Psychoanalytiker, arbeitete eng mit Sigmund Freud zusammen. Er zählt zu den Pionieren der Psychoanalyse.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Lechner Ödön a magyar építészetben?",
    questionDE: "Wer war Lechner Ödön in der ungarischen Architektur?",
    answers: [
      {
        answerHU: "Ybl Miklós",
        answerDE: "Miklós Ybl",
        isCorrect: false,
      },
      {
        answerHU: "Lechner Ödön",
        answerDE: "Ödön Lechner",
        isCorrect: true,
      },
      {
        answerHU: "Hauszmann Alajos",
        answerDE: "Alajos Hauszmann",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A magyar szecesszió mestere, egyedi, magyaros díszítésű épületeket tervezett. Lechner alkotásai a nemzeti stílust ötvözik a modern vonalakkal.",
    explanationDE:
      "Ödön Lechner war ein Hauptvertreter des ungarischen Jugendstils, mit unverwechselbaren Motiven im nationalen Stil. Seine Bauwerke verbinden Tradition mit moderner Formensprache.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Ki volt Neumann János és miért fontos az informatika történetében?",
    questionDE:
      "Wer war John von Neumann und warum ist er in der Informatik bedeutsam?",
    answers: [
      {
        answerHU: "Egy híres magyar költő volt.",
        answerDE: "Es handelt sich um einen berühmten ungarischen Dichter. ",
        isCorrect: false,
      },
      {
        answerHU: "Számítógépek elvi alapjait fektette le.",
        answerDE: "Er legte die theoretischen Grundlagen für Computer.",
        isCorrect: true,
      },
      {
        answerHU: "Középkori feltaláló.",
        answerDE: "Mittelalterlicher Erfinder.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyar–amerikai matematikus, ő fektette le a számítógépek elvi alapjait (Neumann-architektúra). A modern számítástechnika úttörője.",
    explanationDE:
      "John von Neumann, ein ungarisch-amerikanischer Mathematiker, begründete die „von-Neumann-Architektur“ für Computer. Er gilt als Wegbereiter moderner Informatik.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU: "Ki volt Várady Júlia?",
    questionDE: "Wer war Júlia Várady?",
    answers: [
      {
        answerHU: "Egy világhírű balerina",
        answerDE: "Eine weltberühmte Balletttänzerin",
        isCorrect: false,
      },
      {
        answerHU: "egy híres operaénekesnő",
        answerDE: "eine berühmte Opernsängerin",
        isCorrect: true,
      },
      {
        answerHU: "Egy rockénekesnő",
        answerDE: "Eine Rocksängerin",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Várady Júlia világhírű magyar szoprán, számos európai operaház színpadán lépett fel vezető szerepekben, emblematikus lírai koloratúrhanggal.",
    explanationDE:
      "Júlia Várady ist eine ungarische Sopranistin von Weltrang. Sie trat in vielen europäischen Opernhäusern auf, bekannt für ihr lyrisches Koloratur-Fach.",
  },
  {
    category: "Persönlichkeiten",
    level: 2,
    questionHU:
      "Hogy hívták a világhírű magyar fotóst, aki André Kertész néven vált ismertté?",
    questionDE:
      "Welcher ungarische Fotograf wurde unter dem Namen André Kertész weltberühmt?",
    answers: [
      {
        answerHU: "Brassaï (Halász Gyula)",
        answerDE: "Brassaï (Gyula Halász)",
        isCorrect: false,
      },
      {
        answerHU: "Kertész Andor (André Kertész)",
        answerDE: "André Kertész",
        isCorrect: true,
      },
      {
        answerHU: "Robert Capa (Friedmann Endre)",
        answerDE: "Robert Capa (Endre Friedmann)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kertész Andor volt az eredeti neve. Párizsban és New Yorkban is dolgozott, fotóművészete új távlatokat nyitott a modern fényképezésben.",
    explanationDE:
      "Sein bürgerlicher Name war Andor Kertész. Unter André Kertész erlangte er Weltruhm als Fotograf, arbeitete in Paris und New York und prägte die moderne Fotografie.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi a különlegessége a 'busójárás' ünnepnek Mohácson?",
    questionDE: "Was ist das Besondere am 'Busójárás'-Fest in Mohács?",
    answers: [
      {
        answerHU: "Húsvéti locsolkodás",
        answerDE: "Osterwasserbrauch",
        isCorrect: false,
      },
      {
        answerHU: "Farsangi maszkos felvonulás",
        answerDE: "Faschingsmaskenumzug",
        isCorrect: true,
      },
      {
        answerHU: "Téli népzenei fesztivál",
        answerDE: "Winterliches Volksmusikfestival",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Farsangi télűző népszokás, ahol maszkos busók hangos felvonulással űzik el a telet. Az UNESCO szellemi világörökség része.",
    explanationDE:
      "Das „Busójárás“ ist ein lautes Faschingsbrauchtum in Mohács. Maskierte „Busó“ vertreiben den Winter mit Umzügen. Dieses Ritual ist Teil des UNESCO-Weltkulturerbes.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Hol és hogyan ünneplik a legfontosabb magyar paprikafesztivált?",
    questionDE:
      "Wo und wie wird das wichtigste ungarische Paprikafestival gefeiert?",
    answers: [
      {
        answerHU: "Szegeden halfőző versenyekkel",
        answerDE: "In Szeged mit Fischkochwettbewerben",
        isCorrect: false,
      },
      {
        answerHU: "Kalocsán néptánccal és paprikás ételek bemutatásával",
        answerDE:
          "In Kalocsa mit Volkstanz und Präsentation von Paprikagerichten",
        isCorrect: true,
      },
      {
        answerHU: "Kecskeméten barackpálinka kóstolóval",
        answerDE: "In Kecskemét mit Aprikosenbrandweinprobe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kalocsán, szeptemberben. Bemutatják a paprikát minden formában, kulturális és gasztronómiai programokkal kiegészítve.",
    explanationDE:
      "In Kalocsa findet im September das wichtigste Paprikafestival statt. Mit Kultur- und Kochshows rund um die Paprika feiert man die zentrale Würze der ungarischen Küche.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi a 'busójárás' fő helyszíne?",
    questionDE: "Wo findet das 'Busójárás' hauptsächlich statt?",
    answers: [
      {
        answerHU: "Mohácson",
        answerDE: "In Mohács",
        isCorrect: true,
      },
      {
        answerHU: "Győrben",
        answerDE: "In Győr",
        isCorrect: false,
      },
      {
        answerHU: "Miskolcon",
        answerDE: "In Miskolc",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mohács, Baranya megyében. A busójárás farsangi mulatság, többnapos télűző fesztivál zajos maszkos felvonulással, nagy turistalátványosság.",
    explanationDE:
      "Hauptschauplatz ist Mohács in der Region Baranya. Das Busójárás-Fest ist ein mehrtägiges Karnevalstreiben mit Maskenumzug, ein bekannter Wintervertreib und Touristenmagnet.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi jellemző a Márton-napi lakomára?",
    questionDE: "Was kennzeichnet das Martinsfestessen in Ungarn?",
    answers: [
      {
        answerHU: "Ludat esznek és újbort kóstolnak",
        answerDE: "Man isst Gans und probiert Jungwein",
        isCorrect: true,
      },
      {
        answerHU: "Csak halételeket főznek",
        answerDE: "Es werden nur Fischgerichte gekocht",
        isCorrect: false,
      },
      {
        answerHU: "Sütemények készítése a családnak",
        answerDE: "Kuchenbacken für die Familie",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sültludat esznek és az újborral kóstolják. Úgy tartják, aki Márton-napkor libát fogyaszt, egész évben bőségben él, népszerű őszi étkezési szokás.",
    explanationDE:
      "Typisch zum Martinstag (11. November) ist Gänsebraten und der erste neue Wein. Man glaubt, wer Gans isst, erlebt ein Jahr voller Wohlstand. Ein beliebter Brauch im Herbst.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik esemény a 'szüreti felvonulás'?",
    questionDE: "Was ist der 'Szüreti felvonulás'?",
    answers: [
      {
        answerHU: "Szüret (szőlőszedés) utáni ünnepi menet",
        answerDE: "Festlicher Umzug nach der Weinlese",
        isCorrect: true,
      },
      {
        answerHU: "Húsvéti tojásgyűjtő körmenet",
        answerDE: "Prozession zur Ostereiersuche",
        isCorrect: false,
      },
      {
        answerHU: "Halászok indulója a Balatonon",
        answerDE: "Fischermarsch am Plattensee",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Őszi ünnep, amikor a sikeres szőlőszüretet kocsis, énekes, táncos felvonulással zárják. Vidám menet, gyakori a népviselet és a boros mulatság.",
    explanationDE:
      "Der Erntedankzug nach der Weinlese. Im Herbst zieht man mit festlich geschmückten Wagen, Musik und Volkstänzen durch den Ort. Es herrscht fröhliche Weinlaune und Traditionstracht.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik tájegységben népszerű a 'matyó hímzés'?",
    questionDE: "In welcher Region ist die 'Matyó-Stickerei' verbreitet?",
    answers: [
      {
        answerHU: "Mezőkövesd és környéke",
        answerDE: "Mezőkövesd und Umgebung",
        isCorrect: true,
      },
      {
        answerHU: "Sárköz",
        answerDE: "Sárköz",
        isCorrect: false,
      },
      {
        answerHU: "Őrség",
        answerDE: "Őrség",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Matyóföldön, Mezőkövesd környékén. Élénk, színes mintáiról ismert népművészet, viseleteken és textíliákon díszítőelemként használják.",
    explanationDE:
      "Im Gebiet Matyóföld um Mezőkövesd. Die „Matyó-Stickerei“ zeichnet sich durch leuchtende, bunte Muster aus, oft auf Trachten und Textilien – ein berühmtes Volkskunstmotiv.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik magyar népcsoport a legnagyobb ma Romániában?",
    questionDE:
      "Welche ungarische Volksgruppe ist die größte im heutigen Rumänien?",
    answers: [
      {
        answerHU: "A székelyek",
        answerDE: "Die Szekler",
        isCorrect: true,
      },
      {
        answerHU: "A csángók",
        answerDE: "Die Tschangos",
        isCorrect: false,
      },
      {
        answerHU: "A kunok",
        answerDE: "Die Kumanen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A székelyeké. Ők egy magyar közösség Erdélyben, gazdag folklórral, ősi hagyományokkal, összetartó identitással, meghatározzák a régió szellemét.",
    explanationDE:
      "Die Szekler sind eine ungarische Volksgruppe in Siebenbürgen. Mit reichen Bräuchen, alter Tradition und starker Zusammengehörigkeit prägen sie die Kultur der Region.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mikor ünneplik a Luca-napot, és mi a lényege?",
    questionDE: "Wann feiert man den 'Luca-Tag' und worum geht es?",
    answers: [
      {
        answerHU: "December 13-án, boszorkányűző és jósló szokásokkal",
        answerDE:
          "m 13. Dezember, mit hexenabwehrenden und wahrsagenden Bräuchen.",
        isCorrect: true,
      },
      {
        answerHU: "Március 15-én, forradalmi megemlékezésként",
        answerDE: "Am 15. März, als revolutionäres Gedenken",
        isCorrect: false,
      },
      {
        answerHU: "Áprilisban, húsvéti locsolásként",
        answerDE: "Im April, als Osterbesprengung",
        isCorrect: false,
      },
    ],
    explanationHU:
      "December 13-án, a téli sötétség és a fény váltásának misztikus ideje. Babonás szokások, gonoszűzés, termékenységvarázslás, lányjóslások köthetők hozzá.",
    explanationDE:
      "Am 13. Dezember feiert man den Luciatag, eine geheimnisvolle Zeit zwischen Dunkel und Licht. Aberglaube, Unheilabwehr, Fruchtbarkeitsriten und Mädchenorakel sind typisch.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Hol tartják a 'Szegedi Szabadtéri Játékokat', és mi ennek hagyománya?",
    questionDE:
      "Wo finden die 'Szegedi Freilichtspiele' statt und was ist deren Tradition?",
    answers: [
      {
        answerHU: "A Dóm téren, nyári színházi előadások",
        answerDE: "Auf dem Domplatz, Sommertheateraufführungen",
        isCorrect: true,
      },
      {
        answerHU: "A Városi Sportcsarnokban, téli néptáncverseny",
        answerDE: "In der Städtischen Sporthalle, Wintervolkstanzwettbewerb",
        isCorrect: false,
      },
      {
        answerHU: "A Tisza-parti kempingben, gasztronómiai fesztivál",
        answerDE: "Auf dem Campingplatz am Theiß-Ufer, Gastronomie-Festival",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szegeden, a Dóm téren. Nyári, monumentális szabadtéri előadások jellemzik, a Dóm impozáns kulisszája adja az egyedi hangulatot.",
    explanationDE:
      "In Szeged auf dem Domplatz finden die Open-Air-Spiele statt. Man präsentiert im Sommer große Freilichtaufführungen vor der Kathedrale, ein traditionsreiches Festival.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Hol tartják az alföldi 'száncsengős felvonulást' télen?",
    questionDE:
      "Wo findet in der Tiefebene der 'Schlitten-Glockenumzug' im Winter statt?",
    answers: [
      {
        answerHU: "Cserkeszőlő és környékén",
        answerDE: "Rund um Cserkeszőlő",
        isCorrect: true,
      },
      {
        answerHU: "Pécsváradon",
        answerDE: "In Pécsvárad",
        isCorrect: false,
      },
      {
        answerHU: "Pannonhalmán",
        answerDE: "Pannonhalma",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Falvakban, karácsonykor és újév környékén. Lovas szánok csengettyűi kísérik, ünnepi hangulatot teremtve, közösségi télköszöntő esemény.",
    explanationDE:
      "Im Winter in Dörfern der Alföld-Ebene, meist um Weihnachten und Neujahr. Pferdeschlitten mit Schellen ziehen durch den Ort, verbreiten Feststimmung und heißen den Winter willkommen.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik ünnepen sütnek hagyományosan 'újkenyeret'?",
    questionDE: "An welchem Fest wird traditionell das 'Neue Brot' gebacken?",
    answers: [
      {
        answerHU: "Augusztus 20-án, Szent István napján",
        answerDE: "Am 20. August, dem Stephanstag",
        isCorrect: true,
      },
      {
        answerHU: "Március 15-én, a forradalom ünnepén",
        answerDE: "Am 15. März, am Tag der Revolution",
        isCorrect: false,
      },
      {
        answerHU: "November 1-jén, mindenszentekkor",
        answerDE: "Am 1. November, Allerheiligen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Aratás után, augusztus 20. körül. Az új termésből készült kenyér a bőséget jelképezi, Szent István-naphoz és az államalapításhoz is kötődik.",
    explanationDE:
      "Traditionell um den 20. August zur Erntezeit. Das „Neue Brot“ aus frischem Getreide symbolisiert Überfluss und ist mit dem Tag des hl. Stephans und der Staatsgründung verknüpft.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Melyik fesztiválon láthatunk szürkemarha-hajtást és csikósbemutatót a Hortobágyon?",
    questionDE:
      "Auf welchem Fest kann man das Ungarische Steppenrind und Csikós-Reiter auf der Hortobágy sehen?",
    answers: [
      {
        answerHU: "A hídi vásáron nyáron",
        answerDE: "Auf dem Brückenmarkt im Sommer",
        isCorrect: true,
      },
      {
        answerHU: "A busójáráson tavasszal",
        answerDE: "Beim Busójárás im Frühling",
        isCorrect: false,
      },
      {
        answerHU: "A szüreti felvonuláson ősszel",
        answerDE: "Beim Ernteumzug im Herbst",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Hortobágyi Hídi Vásáron. Itt elevenedik meg a pásztorélet, a szürkemarha-gulyák és a híres csikósok lovas tudománya.",
    explanationDE:
      "Beim Hortobágyi Brückenmarkt. Hier erlebt man traditionelle Viehtriebe mit ungarischem Steppenrind und Csikós-Reitervorführungen – ein Einblick in die Hirtenkultur der Puszta.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi a 'tákolmányos csónakverseny' jellemzője?",
    questionDE: "Was kennzeichnet das 'selbstgezimmerte Bootrennen'?",
    answers: [
      {
        answerHU: "Házi készítésű csónakokkal versenyeznek.",
        answerDE: "Es werden Rennen mit selbstgebauten Booten veranstaltet.",
        isCorrect: true,
      },
      {
        answerHU: "Csak profi evezősök vehetnek részt.",
        answerDE: "Nur professionelle Ruderer dürfen teilnehmen.",
        isCorrect: false,
      },
      {
        answerHU: "Téli jégen tartják a versenyt.",
        answerDE: "Das Rennen wird auf Wintereis ausgetragen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ötletes, házi barkácscsónakokkal indulnak, melyeknek fenn kell maradniuk a vízen. Közösségi és humoros verseny, kreativitás és móka a lényeg.",
    explanationDE:
      "Bei diesem „selbstgebauten Bootsrennen“ starten Fantasieboote, die möglichst schwimmfähig sein müssen. Ein witziger Wettkampf, der Erfindungsreichtum und Spaß betont.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik ünnepen terjedt el a 'lucabúza' csíráztatás szokása?",
    questionDE:
      "An welchem Fest verbreitete sich der Brauch, 'Lucabúza' (Weizen) zu keimen?",
    answers: [
      {
        answerHU: "December 13-án, Luca napján",
        answerDE: "Am 13. Dezember, dem Lucatag",
        isCorrect: true,
      },
      {
        answerHU: "November 11-én, Márton napján",
        answerDE: "Am 11. November, am Martinstag",
        isCorrect: false,
      },
      {
        answerHU: "Húsvétvasárnap",
        answerDE: "Ostersonntag",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Luca-napon (dec. 13.). A zölden kicsírázott búza karácsonyra szimbolizálja a megújulást, a termékenységet és a reményt.",
    explanationDE:
      "Die Sitte, „Lucabúza“ (Weizensprossen) zu ziehen, ist an Luciatag (13. Dez.) verbreitet. Die grünen Sprösslinge stehen zu Weihnachten für Hoffnung und Fruchtbarkeit.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Melyik tájegységben szokás a 'mendikálás' karácsony előtt?",
    questionDE:
      "In welcher Region ist das 'mendikálás' Brauch vor Weihnachten?",
    answers: [
      {
        answerHU: "A Palócföldön",
        answerDE: "In der Palócföld",
        isCorrect: true,
      },
      {
        answerHU: "A Sárköz vidékén",
        answerDE: "In der Region Sárköz",
        isCorrect: false,
      },
      {
        answerHU: "A Drávaszögben",
        answerDE: "In der Drau-Ecke",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Észak-Magyarországon, főként Palócföldön. A gyerekek énekelve járnak házról házra, ajándékért, a karácsonyi várakozás vidám része.",
    explanationDE:
      "In Nordungarn, besonders in der Palócföld. Kinder singen von Haus zu Haus, sammeln kleine Geschenke. Ein fröhlicher Brauch in der Adventszeit.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Melyik fesztiválon mutatják be a 'Göcseji hímzés' és a 'tökös ételek' hagyományát?",
    questionDE:
      "Auf welchem Festival werden die 'Göcsej-Stickerei' und Kürbisgerichte präsentiert?",
    answers: [
      {
        answerHU: "A Göcseji Dödöllefesztiválon",
        answerDE: "Beim Göcsej-Dödölle-Festival",
        isCorrect: true,
      },
      {
        answerHU: "A Busójáráson",
        answerDE: "Beim Busójárás",
        isCorrect: false,
      },
      {
        answerHU: "A Mohácsi Sokac fesztiválon",
        answerDE: "Beim Sokac-Festival in Mohács",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Göcseji Domborművészeti Napokon, Zala megyében. Itt a helyi hímzés és tökös gasztronómia áll a középpontban.",
    explanationDE:
      "Beim Göcsej-Kunsthandwerksfestival in Komitat Zala. Dort präsentiert man die traditionelle Stickkunst „Göcseji hímzés“ und Kürbisgerichte als regionale Spezialitäten.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mit fejeznek ki a 'kalotaszegi legényes' tánc mozdulatai?",
    questionDE: "Was drücken die Bewegungen des 'Kalotaszegi Legényes' aus?",
    answers: [
      {
        answerHU: "Férfi virtus és egyéni improvizáció.",
        answerDE: "Männliche Virtuosität und individuelle Improvisation.",
        isCorrect: true,
      },
      {
        answerHU: "Női kecsesség és finomság.",
        answerDE: "Weibliche Anmut und Feinheit",
        isCorrect: false,
      },
      {
        answerHU: "Állatok mozgásának utánzása.",
        answerDE: "Nachahmung von Tierbewegungen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A férfierőt és virtust. Egy szólótánc, erős ritmusú lépésekkel, szökkenésekkel, hagyományos kalotaszegi viseletben.",
    explanationDE:
      "Der „Kalotaszegi Legényes“ zeigt Männlichkeit und Dynamik. Ein Solotanz mit kraftvollen Schritten und Sprüngen, getanzt in traditioneller Kalotaszeg-Tracht.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi a 'matyó lakodalmas' legfőbb jellegzetessége Mezőkövesden?",
    questionDE:
      "Was ist das wichtigste Merkmal der 'Matyó-Hochzeit' in Mezőkövesd?",
    answers: [
      {
        answerHU: "Gazdagon hímzett népviselet és a menetek tánccal kísérve",
        answerDE:
          "Reich bestickte Volkstrachten und von Tänzen begleitete Umzüge",
        isCorrect: true,
      },
      {
        answerHU: "Disznótor a szertartás közben",
        answerDE: "Hausschlachtung während der Zeremonie",
        isCorrect: false,
      },
      {
        answerHU: "Kizárólag kétnapos horgászverseny",
        answerDE: "Ausschließlich zweitägiges Angelturnier",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A rikító színű, hímzett matyó viselet. Díszes esküvői menetek, látványos népviseletek és gazdag motívumvilág jellemzi.",
    explanationDE:
      "Im „Matyó-Hochzeitsbrauchtum“ von Mezőkövesd sind die bunten, reich bestickten Trachten wesentlich. Farbprächtige Umzüge und detailreiche Muster prägen die Festlichkeit.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Melyik pünkösdi hagyomány része a 'lányköszöntés' a Felföldön?",
    questionDE:
      "Zu welchem Pfingstbrauch gehört das 'Begrüßen der Mädchen' in Oberungarn?",
    answers: [
      {
        answerHU: "Legények énekelnek házról házra járva.",
        answerDE: "Junge Burschen ziehen von Haus zu Haus und singen.",
        isCorrect: true,
      },
      {
        answerHU: "Tűzugrás a főtéren.",
        answerDE: "Feuersprung auf dem Hauptplatz.",
        isCorrect: false,
      },
      {
        answerHU: "Ostromlás a templomnál.",
        answerDE: "Belagerung an der Kirche.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A tavaszi szerelem és párválasztás hagyománya, pünkösdkor énekkel, virággal köszöntik a lányokat a legények, romantikus rituáléval.",
    explanationDE:
      "Das „Mädchenbegrüßen“ an Pfingsten im Oberland (Felföld) ist Brauch zur Frühlingsliebe. Burschen ehren die Mädchen singend und mit Blumen, ein romantisches Ritual.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Mi az 'öntözőhétfő' rituálé lényege a Palócföld bizonyos részein?",
    questionDE:
      "Worum geht es bei der Oster-Montagszeremonie 'öntözőhétfő' in Teilen der Palócföld?",
    answers: [
      {
        answerHU:
          "Általában vízzel vagy parfümmel locsolják a nőket, ajándékot kapnak",
        answerDE:
          "Meist werden die Frauen mit Wasser oder Parfüm bespritzt, sie erhalten ein Geschenk.",
        isCorrect: true,
      },
      {
        answerHU: "Csak gyertyafényes menetet tartanak a templomig",
        answerDE:
          "Es wird nur eine Prozession im Kerzenschein zur Kirche abgehalten.",
        isCorrect: false,
      },
      {
        answerHU: "Férfiak levágják a lányok hajtincseit",
        answerDE: "Männer schneiden Mädchen Haarsträhnen ab",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Húsvéthétfői locsolás. Víz vagy parfüm a lányokra, megújulás és termékenység jelképe, hagyományosan vidám közösségi szokás.",
    explanationDE:
      "Am Ostermontag „bespritzt“ man Mädchen mit Wasser oder Parfüm. Dieses uralte Fruchtbarkeits- und Erneuerungsritual ist in der Palócföld fröhlich und gemeinschaftsfördernd.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Miért nem esznek sokan baromfit újévkor a néphit szerint?",
    questionDE:
      "Was ist der Aberglaube, warum man am 1. Januar kein Geflügel isst?",
    answers: [
      {
        answerHU: "Mert a szárnyas madarak rossz hírt hoznak",
        answerDE: "Weil Geflügel Unglücksnachrichten bringt",
        isCorrect: false,
      },
      {
        answerHU: "Mert kikaparja a szerencsét",
        answerDE: "Weil es das Glück auskratzt",
        isCorrect: true,
      },
      {
        answerHU: "Mert túlságosan drága volt régen",
        answerDE: "Weil es früher zu teuer war",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Úgy tartják, a szárnyas elkaparja a szerencsét. Helyette disznóhúst esznek, ami kitúrja a szerencsét, bőséget ígér az új évben.",
    explanationDE:
      "Man glaubt, Geflügel „scharrt das Glück weg“. Daher isst man zu Neujahr eher Schwein, das „wühlt das Glück herauf“, was für Wohlstand und gute Aussichten stehen soll.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi az a „leányvárás” az adventi időszakban?",
    questionDE:
      "Wie heißt der ungarische Brauch, bei dem Mädchen in der Adventszeit einen „Mädchenabend“ abhalten?",
    answers: [
      {
        answerHU: "Legényugratás",
        answerDE: "Burschenscherz",
        isCorrect: false,
      },
      {
        answerHU: "Leányvárás",
        answerDE: "Mädchenwerbung",
        isCorrect: true,
      },
      {
        answerHU: "Betlehemes játék",
        answerDE: "Krippenspiel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Adventkor a lányok összegyűlnek jóslásokkal, gyertyafénnyel várva jövendőbelijüket. Csendes, babonás légkörű összejövetel a téli estéken.",
    explanationDE:
      "Während des Advents treffen sich Mädchen bei Kerzenschein, um mithilfe von Orakeln ihren künftigen Ehemann zu erwarten. Ein besinnliches, abergläubisches Zusammenkommen.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Mi a szerepe a „Maschka” nevű figurának a dél-magyarországi karneválokon?",
    questionDE:
      "Welche Rolle spielt die „Maschka“ bei Karnevalsfeiern in Südungarn?",
    answers: [
      {
        answerHU: "Zenés műsort ad elő.",
        answerDE: "Sie führt ein Musikprogramm auf.",
        isCorrect: false,
      },
      {
        answerHU: "Ijesztő maszkkal szórakoztat.",
        answerDE: "Unterhält mit einer gruseligen Maske.",
        isCorrect: true,
      },
      {
        answerHU: "Édességet osztogat.",
        answerDE: "Süßigkeiten verteilen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bohókás, néha ijesztő maszkos alak a télűzés és bolondozás jegyében. Tréfákat űz, színes, vidám karneváli hangulatot teremt.",
    explanationDE:
      "Die „Maschka“-Figur steht für närrisches Treiben und Winteraustreibung in Südungarn. Mitunter unheimliche Masken sorgen für Schabernack und ausgelassene Karnevalsstimmung.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Milyen táncokat járnak nyugati magyarországi esküvőkön?",
    questionDE:
      "Welche Art von Tänzen sind bei Hochzeiten in Westungarn besonders verbreitet?",
    answers: [
      {
        answerHU: "Balett-tánc",
        answerDE: "Ballett",
        isCorrect: false,
      },
      {
        answerHU: "Népies csárdás és verbunk",
        answerDE: "Volkstümlicher Czárdás und Verbunk",
        isCorrect: true,
      },
      {
        answerHU: "Hip-hop",
        answerDE: "Hip-Hop",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hagyományosan csárdást és verbunkos elemeket. Élénk ritmusú páros és csoportos táncok, a néptánchagyomány meghatározói az esküvőkön.",
    explanationDE:
      "Bei westungarischen Hochzeiten tanzt man häufig Csárdás und Verbunkos. Diese lebhaften Paar- und Gruppentänze sind fester Bestandteil der traditionellen Hochzeitsfeier.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Milyen jelentőséggel bír a Tokaji Borfesztivál a régió számára?",
    questionDE:
      "Welche Bedeutung hat das „Tokaji Weinfestival“ für die Region?",
    answers: [
      {
        answerHU: "Főként söröket mutatnak be",
        answerDE: "Es werden hauptsächlich Biere präsentiert.",
        isCorrect: false,
      },
      {
        answerHU: "A híres bortermelés ünnepe",
        answerDE: "Das Fest des berühmten Weinbaus",
        isCorrect: true,
      },
      {
        answerHU: "Egy hagyományos néptáncverseny áll a középpontban",
        answerDE: "Im Mittelpunkt steht ein traditioneller Volkstanzwettbewerb",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Előmozdítja a Tokaji borok hírnevét, turistákat vonz, fellendíti a helyi gazdaságot. A borkultúra és aszúk népszerűsítését szolgálja.",
    explanationDE:
      "Das Tokajer Weinfestival fördert den Ruf des Tokajer Weins, zieht Touristen an und stärkt die regionale Wirtschaft. Es dient der Präsentation der Weinkultur und des Aszú.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Mi történik a „kisböjt” idején Húsvét előtt?",
    questionDE:
      "Was geschieht beim „kisböjt“ (kleine Fastenzeit) in der Vorosterzeit?",
    answers: [
      {
        answerHU: "Farsangi mulatságokat tartanak",
        answerDE: "Man feiert ausgelassen Karneval",
        isCorrect: false,
      },
      {
        answerHU: "Bizonyos ételekről való lemondás, böjtölés",
        answerDE: "Verzicht auf bestimmte Speisen, Fasten",
        isCorrect: true,
      },
      {
        answerHU: "Nagy lakomákat rendeznek minden nap",
        answerDE: "Jeden Tag werden große Feste veranstaltet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Böjtölnek, imádkoznak, lelki felkészülést végeznek. Sokan lemondanak a húsról vagy más ételekről, hogy lélekben készüljenek a húsvéti ünnepre.",
    explanationDE:
      "In der Fastenzeit („kleiner Fastenzeit“) vor Ostern üben Gläubige Verzicht, beten und bereiten sich seelisch auf Ostern vor. Manche verzichten auf Fleisch oder bestimmte Speisen.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Milyen célból égetnek gyógynövényeket Szent Iván éjjelén?",
    questionDE:
      "Welcher Brauch beinhaltet das Verbrennen von Kräutern in der Johannisnacht ?",
    answers: [
      {
        answerHU: "Méheket vonzanak oda.",
        answerDE: "Sie locken Bienen an.",
        isCorrect: false,
      },
      {
        answerHU: "Tisztítás és termékenység.",
        answerDE: "Reinigung und Fruchtbarkeit",
        isCorrect: true,
      },
      {
        answerHU: "Madarakat riasztanak el.",
        answerDE: "Vögel verscheuchen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tisztító és termékenységi okból. A Szent Iván-éji tűznél a gyógynövények füstje szerencsét hoz és megújulást, a sötétből kilépő fény ünnepe.",
    explanationDE:
      "In der Johannisnacht verbrennt man Kräuter zur Reinigung und Fruchtbarkeitsförderung. Der duftende Rauch soll Glück bringen",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Hogy nevezik a vőlegény segítőit a hagyományos magyar lakodalmakban?",
    questionDE:
      "Wie nennt man in Ungarn die Burschen, die bei traditionellen Hochzeiten als Assistenten des Bräutigams agieren?",
    answers: [
      {
        answerHU: "Násznép",
        answerDE: "Hochzeitsgäste",
        isCorrect: false,
      },
      {
        answerHU: "Vőfélyek",
        answerDE: "Hochzeitsbitter",
        isCorrect: true,
      },
      {
        answerHU: "Körmenet",
        answerDE: "Prozession",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vőfélyek. Verssel, tréfával, szervezői feladatokkal kísérik a vőlegényt és szórakoztatják a násznépet, fontos ceremóniamesterek.",
    explanationDE:
      "Die männlichen Helfer des Bräutigams heißen „Vőfély“. Sie begleiten mit Versen und Humor durch die Hochzeit, organisieren und unterhalten als Zeremonienmeister die Gäste.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU: "Milyen népviselet jellemző Hollókő környékén?",
    questionDE:
      "Welche traditionelle Kleidertracht findet man oft im Gebiet um Hollókő?",
    answers: [
      {
        answerHU: "Matyó viselet",
        answerDE: "Matyó-Tracht",
        isCorrect: false,
      },
      {
        answerHU: "Palóc népviselet",
        answerDE: "Palóc-Tracht",
        isCorrect: true,
      },
      {
        answerHU: "Kalocsai hímzéses ruha",
        answerDE: "Tracht mit Kalocsa-Stickerei",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A palóc viselet: színes, dúsan hímzett ruhadarabok, fodrok. Világhírű hagyományos öltözet, amelyet gyakran népi ünnepeken viselnek.",
    explanationDE:
      "In der Umgebung von Hollókő trägt man die palócische Tracht. Bunte, reich bestickte Kleidungsstücke mit Rüschen, weltweit bekannt als traditioneller Folklore-Look.",
  },
  {
    category: "Traditionen",
    level: 2,
    questionHU:
      "Mi a hagyományos farsangi közösségi ünnep neve, amikor először táncolnak az évben?",
    questionDE:
      "Wie heißt das Faschingsvolksfest, bei dem der erste Tanz des Jahres stattfindet?",
    answers: [
      {
        answerHU: "Kukoricafesztivál",
        answerDE: "Maisfestival",
        isCorrect: false,
      },
      {
        answerHU: "Farsangi bál vagy farsang",
        answerDE: "Faschingsball oder Fasching",
        isCorrect: true,
      },
      {
        answerHU: "Aratóbál",
        answerDE: "Ernteball",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Farsangvasárnap vagy “farsang farka”. Ekkor tartják a tél végi mulatságok első nagy táncát, vidám karneváli hangulattal.",
    explanationDE:
      "„Farsangvasárnap“ (Sonntag der Faschingszeit) oder „farsang farka“ heißt das Fest, bei dem man erstmals im Jahr ausgiebig tanzt. Es herrscht bunte, karnevaleske Stimmung.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Magyarország melyik égtáj felé terjeszkedett leginkább a történelem során?",
    questionDE:
      "In welche Himmelsrichtung hat sich Ungarn historisch betrachtet am stärksten ausgedehnt?",
    answers: [
      {
        answerHU: "Nyugatra (Ausztria felé)",
        answerDE: "Nach Westen (Richtung Österreich)",
        isCorrect: false,
      },
      {
        answerHU: "Keletre (Erdély és még tovább)",
        answerDE: "Nach Osten (Siebenbürgen und noch weiter)",
        isCorrect: true,
      },
      {
        answerHU: "Délre (a Balkán irányában)",
        answerDE: "Nach Süden (Richtung Balkan)",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Főként kelet felé, Erdély irányába. Hosszú ideig Erdély volt a Magyar Királyság része, fontos stratégiai és kulturális területként.",
    explanationDE:
      "Historisch dehnte sich Ungarn vorwiegend ostwärts nach Siebenbürgen aus. Dieses Gebiet war lange Teil des Königreichs und hatte strategische wie kulturelle Bedeutung.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik város hívható „a kálvinista Róma”?",
    questionDE: "Welche Stadt wird „das calvinistische Rom“ genannt?",
    answers: [
      {
        answerHU: "Debrecen",
        answerDE: "Debrecen",
        isCorrect: true,
      },
      {
        answerHU: "Sopron",
        answerDE: "Sopron",
        isCorrect: false,
      },
      {
        answerHU: "Zalaegerszeg",
        answerDE: "Zalaegerszeg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Debrecen. A református egyház központja, a Nagytemplom jelképezi a protestáns tradíciót, meghatározó kálvinista hagyományokkal.",
    explanationDE:
      "Debrecen nennt man das „calvinistische Rom“. Die Stadt ist Zentrum der reformierten Kirche, der Große Tempel ist ihr Wahrzeichen. Starke calvinistische Tradition prägt sie.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik tájegység része a Badacsony?",
    questionDE: "Zu welcher Landschaftsregion gehört Badacsony?",
    answers: [
      {
        answerHU: "A Balaton-felvidékhez",
        answerDE: "Zur Balaton-Oberland-Region",
        isCorrect: true,
      },
      {
        answerHU: "A Mecsekhez",
        answerDE: "Zum Mecsek",
        isCorrect: false,
      },
      {
        answerHU: "A Mátrához",
        answerDE: "Zum Mátra-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Balaton-felvidéké. A vulkanikus tanúhegy szőlőiről és boráról ismert, jellegzetes, meredek oldalú, kedvelt kirándulóhely az északi parton.",
    explanationDE:
      "Er gehört zum Balaton-Oberland. Der Vulkanberg Badacsony ist berühmt für Weinanbau und seine steilen Hänge. Ein beliebtes Ausflugsziel am Nordufer des Plattensees.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik magyar tó Magyarország második legnagyobb tava a Balaton után?",
    questionDE: "Welcher See ist Ungarns zweitgrößter nach dem Balaton?",
    answers: [
      {
        answerHU: "A Tisza-tó",
        answerDE: "Der Theiß-See",
        isCorrect: true,
      },
      {
        answerHU: "A Velencei-tó",
        answerDE: "Zum Velencei-See",
        isCorrect: false,
      },
      {
        answerHU: "A Fertő-tó",
        answerDE: "Der Neusiedler See",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Tisza-tó. Mesterségesen kialakított víztározó, de jelentős természetvédelmi terület gazdag madárvilággal és turisztikai lehetőségekkel.",
    explanationDE:
      "Der Theiß-See (Tisza-tó) ist nach dem Balaton der zweitgrößte See Ungarns. Ein künstliches Gewässer, doch ein bedeutendes Naturschutzgebiet mit reicher Vogelwelt und Tourismus.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik város áll az Alföld közepén és országos mezőgazdasági központ?",
    questionDE:
      "Welche Stadt liegt in der Mitte der Tiefebene und ist ein landwirtschaftliches Zentrum?",
    answers: [
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: true,
      },
      {
        answerHU: "Sopron",
        answerDE: "Sopron",
        isCorrect: false,
      },
      {
        answerHU: "Zalaegerszeg",
        answerDE: "Zalaegerszeg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kecskemét. A baracktermesztés és a mezőgazdasági feldolgozóipar központja az Alföld szívében, erős gazdasági szereppel.",
    explanationDE:
      "Kecskemét liegt im Zentrum der Tiefebene und ist ein wichtiges Agrar- und Verarbeitungszentrum. Berühmt für Aprikosenanbau und eine lebendige Wirtschaft.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik hegységben található az Istállós-kő barlang?",
    questionDE: "In welchem Gebirge liegt die Istállós-kő-Höhle?",
    answers: [
      {
        answerHU: "A Bükk hegységben",
        answerDE: "Im Bükk-Gebirge",
        isCorrect: true,
      },
      {
        answerHU: "A Zempléni-hegységben",
        answerDE: "Im Zemplén-Gebirge",
        isCorrect: false,
      },
      {
        answerHU: "A Pilis-hegységben",
        answerDE: "Im Pilisgebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Bükk hegységben, Északkelet-Magyarországon. Őskori leletek kerültek elő, a korai ember nyomait őrzi, népszerű kirándulóhely.",
    explanationDE:
      "Die Istállós-kő-Höhle liegt im Bükk-Gebirge im Nordosten Ungarns. Dort fand man prähistorische Funde",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik folyó vágja ketté a Dunántúli-középhegységet?",
    questionDE: "Welcher Fluss teilt das Transdanubische Mittelgebirge?",
    answers: [
      {
        answerHU: "A Duna",
        answerDE: "Die Donau",
        isCorrect: true,
      },
      {
        answerHU: "A Rába",
        answerDE: "Zur Raab",
        isCorrect: false,
      },
      {
        answerHU: "A Sió",
        answerDE: "Die Sió",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Duna maga. A Gerecse és a Visegrádi-hegység között is határvonalat képez, festői völgyet létrehozva, meghatározó földrajzi tényező.",
    explanationDE:
      "Die Donau selbst durchschneidet das Transdanubische Mittelgebirge. Zwischen Gerecse und Visegráder Gebirge bildet sie ein malerisches Tal und eine natürliche Grenze.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Hol található a Kis-Balaton, és mi a jelentősége?",
    questionDE: "Wo liegt der Kleine Balaton und was ist seine Bedeutung?",
    answers: [
      {
        answerHU: "A Balaton nyugati részén, madárrezervátumként fontos",
        answerDE: "Im Westteil des Balaton, bedeutendes Vogelschutzgebiet",
        isCorrect: true,
      },
      {
        answerHU: "A Balaton keleti medencéjében, fürdőhelyként",
        answerDE: "Im östlichen Becken des Plattensees, als Badeort",
        isCorrect: false,
      },
      {
        answerHU: "A Balaton déli partján, halászati hagyományairól ismert",
        answerDE:
          "Am Südufer des Plattensees, bekannt für seine Fischereitraditionen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Balaton nyugati csücskében, Zala megyében. Madárparadicsom, fontos természetvédelmi terület, a Balaton vízrendszerének része.",
    explanationDE:
      "Der Kleine Balaton liegt am westlichen Ende des Plattensees im Komitat Zala. Er ist ein Vogelparadies, ökologisch bedeutsam und Teil des Balaton-Wassersystems.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik város híres 'főtér' rekonstrukciójáról, amely európai díjat nyert?",
    questionDE:
      "Welche Stadt ist bekannt für die Renovierung ihres Hauptplatzes, die einen europäischen Preis gewann?",
    answers: [
      {
        answerHU: "Kecskemét",
        answerDE: "Kecskemét",
        isCorrect: true,
      },
      {
        answerHU: "Kaposvár",
        answerDE: "Kaposvár",
        isCorrect: false,
      },
      {
        answerHU: "Zalaegerszeg",
        answerDE: "Zalaegerszeg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kecskemét főtere. Új arculatú, modernizált közösségi tér, amely esztétikus megoldásaiért elismerést kapott Európában.",
    explanationDE:
      "Der Hauptplatz von Kecskemét wurde umfassend modernisiert und erhielt eine europäische Auszeichnung für seine gelungene, ästhetische Neugestaltung als öffentlicher Raum.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik magyarországi folyón találhatók a 'Körösök'?",
    questionDE: "An welchem Fluss findet man die 'Körös'?",
    answers: [
      {
        answerHU: "A Tisza vízrendszerében",
        answerDE: "Im Einzugsgebiet der Theiß",
        isCorrect: true,
      },
      {
        answerHU: "A Dráva vízrendszerében",
        answerDE: "Im Drau-Flusssystem",
        isCorrect: false,
      },
      {
        answerHU: "A Rába vízrendszerébe",
        answerDE: "In das Flusssystem der Raab",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kelet-Magyarországon, a Tisza mellékfolyói. Sebes-Körös, Fehér-Körös és társaik szabályozott vízfolyások, az Alföld keleti részén.",
    explanationDE:
      "Die „Körös“-Flüsse liegen in Ostungarn und sind Nebenflüsse der Theiß (Tisza). Sebes-Körös oder Fehér-Körös gehören dazu, sie sind regulierte Flüsse in der östlichen Tiefebene.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik hegység része a Pilsentelep és a Nagy-Gete?",
    questionDE: "Zu welchem Gebirge gehören Pilsentelep und Nagy-Gete?",
    answers: [
      {
        answerHU: "A Gerecse hegységhez",
        answerDE: "Zum Gerecse-Gebirge",
        isCorrect: true,
      },
      {
        answerHU: "A Mátrához",
        answerDE: "Zur Mátra",
        isCorrect: false,
      },
      {
        answerHU: "A Vérteshez",
        answerDE: "Zum Vértes-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Gerecse hegység nyugati részéhez tartoznak. Komárom-Esztergom megyében, kedvelt kirándulóhely, változatos domborzattal.",
    explanationDE:
      "Pilsentelep und der Berg Nagy-Gete zählen zum westlichen Teil des Gerecse-Gebirges. Es liegt im Komitat Komárom-Esztergom und ist ein beliebtes Ausflugsziel mit abwechslungsreichem Relief.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik régió nevezetes 'borvidéke' az Egri csillagok kapcsán is?",
    questionDE:
      "Welche Region ist bekannt für ihr Weinbaugebiet, auch im Zusammenhang mit 'Egri csillagok'?",
    answers: [
      {
        answerHU: "Eger és környéke",
        answerDE: "Eger und Umgebung",
        isCorrect: true,
      },
      {
        answerHU: "Villány",
        answerDE: "Villány",
        isCorrect: false,
      },
      {
        answerHU: "Tokaj",
        answerDE: "Tokaj",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Eger és környéke. Itt született az Egri Bikavér, a vörösborok jelképe. Történelmi város, hangulatos pincészetekkel.",
    explanationDE:
      "Die Region um Eger ist für ihren Wein berühmt, verbunden mit dem Roman „Sterne von Eger“. Dort entstand der „Egri Bikavér“ (Stierblut), ein charakteristischer ungarischer Rotwein.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik hegycsoport része a Zempléni-hegység?",
    questionDE: "Zu welcher Gebirgsgruppe gehört das Zemplén-Gebirge?",
    answers: [
      {
        answerHU: "Az Északi-középhegység része.",
        answerDE: "Es ist Teil des Nördlichen Mittelgebirges.",
        isCorrect: true,
      },
      {
        answerHU: "Dunántúli-középhegység.",
        answerDE: "Mitteltransdanubisches Gebirge",
        isCorrect: false,
      },
      {
        answerHU: "A Bükk-hegység része.",
        answerDE: "Teil des Bükk-Gebirges.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az Északi-középhegység keleti láncához tartozik. Erdőkkel borított vulkanikus terület, a Tokaji borvidék egy része is itt fekszik.",
    explanationDE:
      "Das Zemplén-Gebirge gehört zum östlichen Teil des Nordungarischen Mittelgebirges. Vulkanisch und stark bewaldet, beherbergt es auch Teile des Tokajer Weinanbaugebiets.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik város áll a dombok között, 'a mecseki főváros' néven is említik?",
    questionDE:
      "Welche Stadt liegt zwischen Hügeln und wird 'Hauptstadt des Mecsek' genannt?",
    answers: [
      {
        answerHU: "Pécs",
        answerDE: "Fünfkirchen",
        isCorrect: true,
      },
      {
        answerHU: "Szekszárd",
        answerDE: "Szekszárd",
        isCorrect: false,
      },
      {
        answerHU: "Szigetvár",
        answerDE: "Szigetvár",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Pécs, a Mecsek lábánál fekvő kulturális központ. Történelmi múlt, mediterrán hangulat, “mecseki fővárosként” is ismert.",
    explanationDE:
      "Pécs liegt inmitten von Hügeln am Fuß des Mecsek-Gebirges. Ein kulturelles Zentrum mit mediterranem Flair und reich an Geschichte, daher auch „Hauptstadt des Mecsek“.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik magyar település adta nevét egy világhírű borvidéknek?",
    questionDE:
      "Welcher ungarische Ort gab einem weltberühmten Weinbaugebiet seinen Namen?",
    answers: [
      {
        answerHU: "Egy folyók találkozásánál fekvő város",
        answerDE: "Eine Stadt am Zusammenfluss zweier Flüsse",
        isCorrect: true,
      },
      {
        answerHU: "Egy bortermelő település",
        answerDE: "Eine Weinbaugemeinde",
        isCorrect: false,
      },
      {
        answerHU: "Egy történelmi borváros",
        answerDE: "Eine historische Weinstadt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tokaj. Világhírű aszúborairól ismert, UNESCO világörökségi terület, a Tokaji borvidék édes nedűje messze földön híres.",
    explanationDE:
      "Die Stadt Tokaj gab dem weltberühmten Weingebiet ihren Namen. Berühmt für den Aszú-Süßwein, ist es UNESCO-Welterbe und international hochgeschätzt.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik híres szurdokvölgy található a Bakony hegységben?",
    questionDE: "Welche berühmte Schlucht liegt im Bakony-Gebirge?",
    answers: [
      {
        answerHU: "A Római fürdő szurdokvölgye.",
        answerDE: "Die Schlucht des Römerbades.",
        isCorrect: true,
      },
      {
        answerHU: "A Fenyővölgyi szurdok.",
        answerDE: "Die Fenyővölgyi-Schlucht",
        isCorrect: false,
      },
      {
        answerHU: "A Vért-szurdok.",
        answerDE: "Die Vértes-Schlucht.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Római fürdő a Cuha-völgyben. Látványos vízesések, sziklafalak, kedvelt kirándulóhely a Bakony természeti kincsei között.",
    explanationDE:
      "Die Schlucht „Római fürdő“ liegt im Cuha-Tal des Bakony-Gebirges. Spektakuläre Wasserfälle, Felsen und ein beliebter Ort für Wanderer in der naturnahen Landschaft.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik városban található a Világörökség részeként számon tartott ókeresztény sírkamra?",
    questionDE:
      "In welcher Stadt befindet sich die frühchristliche Grabkammer, die zum UNESCO-Welterbe zählt?",
    answers: [
      {
        answerHU: "Pécsett",
        answerDE: "In Pécs",
        isCorrect: true,
      },
      {
        answerHU: "Egerben",
        answerDE: "In Eger",
        isCorrect: false,
      },
      {
        answerHU: "Debrecenben",
        answerDE: "In Debrecen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Pécsett találjuk az ókeresztény sírkamrákat. A 4. századból származó leletek, a város római kori örökségének részei.",
    explanationDE:
      "In Pécs befindet sich die frühchristliche Nekropole (4. Jh.), die zum UNESCO-Welterbe gehört. Sie illustriert das römische Erbe der Stadt.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik dombság része a Villányi-hegység?",
    questionDE: "Zu welchem Hügelland gehört das Villány-Gebirge?",
    answers: [
      {
        answerHU: "A Baranyai-dombság része",
        answerDE: "Es ist Teil des Baranya-Hügellands",
        isCorrect: true,
      },
      {
        answerHU: "A Somogyi-dombsághoz tartozik",
        answerDE: "Gehört zum Komitat Somogy",
        isCorrect: false,
      },
      {
        answerHU: "A Keleti-Mecsek folytatása",
        answerDE: "Die Fortsetzung des Östlichen Mecsek",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Baranyai-dombság déli része, Villányi-dombság néven. Híres a villányi vörösborokról, gazdag borkultúrával és mediterrán jellegű klímával.",
    explanationDE:
      "Das Villány-Gebirge bildet den südlichen Teil des Baranya-Hügellands (Villányer Hügel). Bekannt für Rotweine und mediterranes Klima, ist es ein Zentrum der Weinbaukultur.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Hol ered a Zagyva folyó, amely Szolnoknál torkollik a Tiszába?",
    questionDE:
      "Wo entspringt der Fluss Zagyva, der bei Szolnok in die Theiß mündet?",
    answers: [
      {
        answerHU: "A Mátra hegységben",
        answerDE: "Im Mátra-Gebirge",
        isCorrect: true,
      },
      {
        answerHU: "A Bakonyban",
        answerDE: "Im Bakony",
        isCorrect: false,
      },
      {
        answerHU: "A Börzsönyben",
        answerDE: "Im Börzsöny-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Mátra hegységben ered, 179 km hosszú. Szolnoknál ömlik a Tiszába, meghatározva az észak-magyarországi völgyek vízrendszerét.",
    explanationDE:
      "Der Fluss Zagyva entspringt im Mátra-Gebirge und mündet bei Szolnok in die Theiß. Er ist 179 km lang und prägt das Wassersystem Nordostungarns.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Hol találjuk a Tési-fennsíkot, mely a szélmalmairól ismert?",
    questionDE: "Wo liegt das Tési-Plateau, bekannt für seine Windmühlen?",
    answers: [
      {
        answerHU: "A Bakony északi részén",
        answerDE: "Im nördlichen Bakony",
        isCorrect: true,
      },
      {
        answerHU: "A Mecsek déli lábánál",
        answerDE: "Am Südhang des Mecsek",
        isCorrect: false,
      },
      {
        answerHU: "A Börzsönyben",
        answerDE: "Im Börzsöny-Gebirge",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Bakony keleti részén, Tés településnél. A magasfekvésű, szeles vidéken megmaradt szélmalmok ma turisztikai látványosságok.",
    explanationDE:
      "Das Tési-Plateau liegt im östlichen Bakony-Gebirge, bei der Gemeinde Tés. Dank der windigen Lage finden sich dort historische Windmühlen, heute eine Touristenattraktion.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik városban magasodik a Kőszegi-hegység legmagasabb pontja, az Írott-kő?",
    questionDE:
      "In welcher Stadt befindet sich der höchste Gipfel des Kőszeg-Gebirges, der Írott-kő?",
    answers: [
      {
        answerHU: "Kőszeg mellett",
        answerDE: "Bei Kőszeg",
        isCorrect: true,
      },
      {
        answerHU: "Sopron városában",
        answerDE: "In der Stadt Sopron",
        isCorrect: false,
      },
      {
        answerHU: "Vasvár közelében",
        answerDE: "In der Nähe von Vasvár",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kőszeg közelében emelkedik az Írott-kő (882 m). A magyar-osztrák határon álló kilátó kedvelt túracélpont.",
    explanationDE:
      "Bei der Stadt Kőszeg erhebt sich der Írott-kő (882 m), die höchste Stelle des Kőszeg-Gebirges. Die Aussichtswarte an der ungarisch-österreichischen Grenze ist ein beliebtes Ziel.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik város alatt húzódnak legendás pincerendszerek: 'cellar labyrinth'?",
    questionDE:
      'Unter welcher Stadt erstreckt sich ein legendäres Weinkellerlabyrinth, das "cellar Labyrinth"?',
    answers: [
      {
        answerHU: "Budafok (Budapest XXII. kerülete).",
        answerDE: "Budafok (Budapest, XXII. Bezirk)",
        isCorrect: true,
      },
      {
        answerHU: "Pécs belvárosa alatt.",
        answerDE: "Unter der Innenstadt von Pécs.",
        isCorrect: false,
      },
      {
        answerHU: "Győr belvárosa alatt.",
        answerDE: "Unterhalb der Innenstadt von Győr.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budafok alatt találhatók a kiterjedt pincerendszerek. Borászatáról híres, a labirintusszerű járatok a bortermelésnek kedveznek.",
    explanationDE:
      "Unter Budafok erstrecken sich weitläufige Weinkeller-Labyrinthe. Der Stadtteil ist bekannt für Weinproduktion",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik dombságban található a Zselici Tájvédelmi Körzet?",
    questionDE:
      "In welchem Hügelland liegt das Landschaftsschutzgebiet Zselic?",
    answers: [
      {
        answerHU: "A Somogyi-dombságban",
        answerDE: "Im Hügelland Somogy",
        isCorrect: true,
      },
      {
        answerHU: "A Kapos-dombságban",
        answerDE: "Im Kapos-Hügelland",
        isCorrect: false,
      },
      {
        answerHU: "A Veszprém-dombságban",
        answerDE: "Im Veszprémer Hügelland",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Zselicben, Somogy megyében. Erdei, dombos vidék, sötét égbolt rezervátummal, csendes természeti környezet, védett terület.",
    explanationDE:
      "Im Zselic-Hügelland (Komitat Somogy) liegt das Zselic-Landschutzgebiet. Eine sanft hügelige Waldregion mit „Dark Sky Park“",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik településen rendezik meg a híres Művészetek Völgyét?",
    questionDE:
      "In welchem Ort findet das berühmte 'Tal der Künste'-Festival statt?",
    answers: [
      {
        answerHU: "Kapolcson",
        answerDE: "In Kapolcs",
        isCorrect: true,
      },
      {
        answerHU: "Keszthelyen",
        answerDE: "In Keszthely",
        isCorrect: false,
      },
      {
        answerHU: "Sopronban",
        answerDE: "In Ödenburg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kapolcson és környékén, a Balaton-felvidéken. Magyarország egyik legnagyobb összművészeti fesztiválja, gazdag programkínálattal.",
    explanationDE:
      "Das „Tal der Künste“ findet in Kapolcs und Umgebung (Balaton-Oberland) statt. Eines der größten ungarischen Kunstfestivals mit umfangreichem Veranstaltungsangebot.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik városban működik a híres 'Bárány uszoda' és termálfürdő, közel a Bükkhöz?",
    questionDE:
      "In welcher Stadt gibt es das berühmte 'Bárány-Bad' und Thermalbad nahe dem Bükk?",
    answers: [
      {
        answerHU: "Egerben",
        answerDE: "In Eger",
        isCorrect: true,
      },
      {
        answerHU: "Miskolcon",
        answerDE: "In Miskolc",
        isCorrect: false,
      },
      {
        answerHU: "Salgótarjánon",
        answerDE: "In Salgótarján",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Egerben. Gyógyvizeiről és barokk városközpontjáról ismert, a Bükk hegység közelében kedvelt turisztikai célpont.",
    explanationDE:
      "In Eger findet man das bekannte „Bárány-Bad“ und Thermalquellen, nah am Bükk-Gebirge. Die Stadt ist berühmt für ihr Barockzentrum, Heilbäder und Weinkultur.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik Magyarország legnagyobb nemzeti parkja?",
    questionDE: "Welcher ist der größte Nationalpark in Ungarn?",
    answers: [
      {
        answerHU: "Kiskunsági Nemzeti Park",
        answerDE: "Nationalpark Kiskunság",
        isCorrect: false,
      },
      {
        answerHU: "Hortobágyi Nemzeti Park",
        answerDE: "Nationalpark Hortobágy",
        isCorrect: true,
      },
      {
        answerHU: "Duna–Dráva Nemzeti Park",
        answerDE: "Nationalpark Donau-Drau",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Hortobágyi Nemzeti Park. 800 km² felett, pusztai tájjal, jellegzetes pásztorkultúrával és gazdag madárvilággal, UNESCO világörökség.",
    explanationDE:
      "Der Nationalpark Hortobágy ist mit über 800 km² der größte in Ungarn. Er umfasst die Puszta mit Hirtenkultur, reicher Vogelwelt und ist UNESCO-Welterbe.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU: "Melyik félszigeten található bencés apátság a Balatonon?",
    questionDE:
      "Wie heißt die Halbinsel im Balaton, auf der sich eine Benediktinerabtei befindet?",
    answers: [
      {
        answerHU: "Szántód",
        answerDE: "Szántód",
        isCorrect: false,
      },
      {
        answerHU: "Tihany",
        answerDE: "Tihany",
        isCorrect: true,
      },
      {
        answerHU: "Badacsony",
        answerDE: "Badacsony",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Tihanyi-félszigeten. A Tihanyi Bencés Apátság történelmi és vallási központ a tó északi partján, festői környezetben.",
    explanationDE:
      "Auf der Halbinsel Tihany. Das Benediktinerkloster Tihany ist ein historisch-religiöses Zentrum am Nordufer des Balaton mit beeindruckender Aussicht.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik folyó képezi részben a határt Magyarország és Szlovénia között?",
    questionDE:
      "Welcher Fluss bildet die Grenze zwischen Ungarn und Slowenien?",
    answers: [
      {
        answerHU: "Dráva",
        answerDE: "Drau",
        isCorrect: false,
      },
      {
        answerHU: "Mura",
        answerDE: "Mur",
        isCorrect: true,
      },
      {
        answerHU: "Sava",
        answerDE: "Save",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Mura folyó. Részben határfolyóként szolgál, a Muravidéknél. Természeti szépségei és ártéri területei fontosak.",
    explanationDE:
      "Die Mur bildet teilweise die Grenze zwischen Ungarn und Slowenien. Sie durchzieht das Murgebiet mit geschützten Auen und ist ökologisch besonders wertvoll.",
  },
  {
    category: "Geografie",
    level: 3,
    questionHU:
      "Melyik északnyugat-magyarországi város híres a Gránit Gyógyfürdőről és a szlovén határ közelségéről?",
    questionDE:
      "Welche ungarische Stadt ist für die „Gránit-Therme“ bekannt und liegt unweit der slowenischen Grenze?",
    answers: [
      {
        answerHU: "Szentgotthárd",
        answerDE: "Szentgotthárd",
        isCorrect: false,
      },
      {
        answerHU: "Zalakaros",
        answerDE: "Zalakaros",
        isCorrect: true,
      },
      {
        answerHU: "Lenti",
        answerDE: "Lenti",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Zalakaros. Gyógy- és élményfürdője, termálvíze miatt keresett, a szlovén határnál található csendes fürdőváros.",
    explanationDE:
      "Zalakaros liegt im Nordwesten Ungarns nahe der slowenischen Grenze. Berühmt für sein Thermalbad „Granit“ und ein beliebtes Erholungs- und Gesundheitszentrum.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Hogyan érintette Magyarországot az 1867-es kiegyezés?",
    questionDE: "Wie beeinflusste der Ausgleich von 1867 Ungarn?",
    answers: [
      {
        answerHU: "Része lett az Osztrák–Magyar Monarchiának",
        answerDE: "Es wurde Teil der Österreichisch-Ungarischen Monarchie",
        isCorrect: true,
      },
      {
        answerHU: "Teljes függetlenséget kapott",
        answerDE: "Erlangte volle Unabhängigkeit",
        isCorrect: false,
      },
      {
        answerHU: "A Habsburgok lemondtak a trónról",
        answerDE: "Die Habsburger verzichteten auf den Thron",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kialakult a dualista Osztrák–Magyar Monarchia. Magyarország önkormányzatot nyert, saját kormánnyal, de közös hadügy, külügy és pénzügy maradt.",
    explanationDE:
      "Das Jahr 1867 brachte den Ausgleich: Die Doppelmonarchie Österreich-Ungarn entstand. Ungarn erhielt eine eigene Regierung, bestimmte Bereiche blieben jedoch gemeinsam.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Melyik évben történt az 'Ősiségi törvény' eltörlése?",
    questionDE: "In welchem Jahr wurde das Gesetz der Ahnenrechte aufgehoben?",
    answers: [
      {
        answerHU: "1848-ban",
        answerDE: "1848",
        isCorrect: true,
      },
      {
        answerHU: "1701-ben",
        answerDE: "1701",
        isCorrect: false,
      },
      {
        answerHU: "1920-ban",
        answerDE: "1920",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1848-ban, az áprilisi törvények részeként. Ezzel a feudális birtokrendszer korlátozása megszűnt, jelentős polgári átalakulás kezdődött.",
    explanationDE:
      "Die Aufhebung des „Aviticitätsgesetzes“ erfolgte 1848 mit den Apriler Gesetzen. Damit endete die feudale Erbregelung für Adelshöfe",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Mikor került sor a 'felszabadító háborúkra' a török kiűzése érdekében?",
    questionDE:
      "Wann fanden die 'Befreiungskriege' zur Vertreibung der Türken statt?",
    answers: [
      {
        answerHU: "1683–1699 között",
        answerDE: "1683–1699",
        isCorrect: true,
      },
      {
        answerHU: "1521–1526 között",
        answerDE: "Zwischen 1521 und 1526",
        isCorrect: false,
      },
      {
        answerHU: "1735–1740 között",
        answerDE: "Zwischen 1735 und 1740",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A 17. század végén (1683–1699). A Habsburgok által vezetett hadak 1686-ban visszafoglalták Budát, majd a karlócai békéig küzdöttek.",
    explanationDE:
      "Die Türkenbefreiungskriege fanden Ende des 17. Jh. (1683–1699) statt. 1686 eroberten habsburgische Truppen Buda zurück, bis zum Frieden von Karlowitz 1699 dauerte der Kampf.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik szervezet jött létre 1867-ben az Osztrák–Magyar Monarchia közös ügyeinek irányítására?",
    questionDE:
      "Welche Einrichtung wurde 1867 für die gemeinsamen Angelegenheiten der Österreichisch-Ungarischen Monarchie geschaffen?",
    answers: [
      {
        answerHU: "Közös Minisztériumok (külügy, hadügy, pénzügy)",
        answerDE: "Gemeinsame Ministerien (Außen-, Kriegs-, Finanzministerium)",
        isCorrect: true,
      },
      {
        answerHU: "Az Erdélyi Fejedelmi Tanács",
        answerDE: "Der Fürstenrat von Siebenbürgen",
        isCorrect: false,
      },
      {
        answerHU: "A Magyar Nemzeti Tanács",
        answerDE: "Der Ungarische Nationalrat",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Közös minisztériumok (külügy, hadügy, pénzügy). A dualista rendszerben ezeket mindkét állam részéről irányították.",
    explanationDE:
      "Gemeinsame Ministerien (Außen-, Kriegs- und Finanzministerium) wurden 1867 gegründet. Im dualistischen System leiteten sie die gemeinsamen Angelegenheiten beider Reichsteile.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Mikor történt a 'Dreher-féle sörgyár' alapítása, és miért jelentős?",
    questionDE:
      "Wann wurde die 'Dreher-Brauerei' gegründet und warum ist sie bedeutend?",
    answers: [
      {
        answerHU: "19. század közepén, meghonosította a bécsi típusú sört",
        answerDE:
          "Mitte des 19. Jahrhunderts führte er die Wiener Biersorte ein.",
        isCorrect: true,
      },
      {
        answerHU: "1780-ban, Magyarország első sörgyára",
        answerDE: "1780, Ungarns erste Brauerei",
        isCorrect: false,
      },
      {
        answerHU: "1925-ben, a kommunista tervgazdaság részeként",
        answerDE: "1925, als Teil der kommunistischen Planwirtschaft",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1862-ben, Kőbányán. Dreher Antal bevezette az alsóerjesztésű, világos sör technológiáját, ami forradalmasította a magyar sörkultúrát.",
    explanationDE:
      "Die Dreher-Brauerei wurde 1862 in Kőbánya gegründet. Antal Dreher führte das untergärige, helle Bier ein und revolutionierte damit das ungarische Brauwesen nachhaltig.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Melyik törvény biztosította a jobbágyfelszabadítást 1848-ban?",
    questionDE: "Welches Gesetz gewährleistete die Bauernbefreiung 1848?",
    answers: [
      {
        answerHU: "Az áprilisi törvények része volt",
        answerDE: "Es war ein Teil der Aprilgesetze",
        isCorrect: true,
      },
      {
        answerHU: "A Pragmatica Sanctio",
        answerDE: "Die Pragmatische Sanktion",
        isCorrect: false,
      },
      {
        answerHU: "A Szent Korona-törvény",
        answerDE: "Das Gesetz der Heiligen Krone",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az 1848-as áprilisi törvények. Megszüntették a feudális terheket és a jobbágyviszonyt, elindítva a polgári átalakulást.",
    explanationDE:
      "Die „Apriler Gesetze“ von 1848 schafften die Feudallasten und die Leibeigenschaft ab. Damit begann der bürgerliche Wandel im Königreich Ungarn.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Mi volt a 'királyi Magyarország' a 16–17. században?",
    questionDE: "Was war das 'königliche Ungarn' im 16.–17. Jahrhundert?",
    answers: [
      {
        answerHU: "A Habsburgok által uralt terület.",
        answerDE: "Das von den Habsburgern beherrschte Gebiet.",
        isCorrect: true,
      },
      {
        answerHU: "Egy független állam volt.",
        answerDE: "Es war ein unabhängiger Staat.",
        isCorrect: false,
      },
      {
        answerHU: "Török vazallus állam.",
        answerDE: "Türkischer Vasallenstaat.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A török elfoglalás után megmaradt nyugati-északnyugati terület, Habsburg uralom alatt. Központja Pozsony, a Habsburgok mint magyar királyok kormányozták.",
    explanationDE:
      "„Königliches Ungarn“ bezeichnet die westlichen und nördlichen Gebiete, die nach der osmanischen Eroberung übrigblieben. Unter habsburgischer Herrschaft, Zentrum war Pressburg.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Ki írta alá a 'kiegyezési törvényt' 1867-ben Magyarország részéről?",
    questionDE:
      "Wer unterzeichnete 1867 das 'Ausgleichsgesetz' auf ungarischer Seite?",
    answers: [
      {
        answerHU: "Deák Ferenc",
        answerDE: "Ferenc Deák",
        isCorrect: true,
      },
      {
        answerHU: "Széchenyi István",
        answerDE: "István Széchenyi",
        isCorrect: false,
      },
      {
        answerHU: "Kossuth Lajos",
        answerDE: "Lajos Kossuth",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Deák Ferenc kezdeményezte és szorgalmazta a kiegyezést. A “haza bölcse” volt a fő motor, létrehozva a dualista monarchiát.",
    explanationDE:
      "Ferenc Deák, „der Weise der Nation“, war der ungarische Hauptarchitekt des Ausgleichs von 1867. Er vertrat Ungarn bei den Verhandlungen und ermöglichte die Doppelmonarchie.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Kinek uralkodása alatt épült ki a visegrádi királyi palota fényűzőbb formája a 14. században?",
    questionDE:
      "Unter wessen Herrschaft wurde der Königspalast in Visegrád im 14. Jh. prachtvoll ausgebaut?",
    answers: [
      {
        answerHU: "Nagy Lajos király",
        answerDE: "König Ludwig der Große",
        isCorrect: true,
      },
      {
        answerHU: "II. Ulászló",
        answerDE: "Vladislav II.",
        isCorrect: false,
      },
      {
        answerHU: "Hunyadi Mátyás",
        answerDE: "Matthias Corvinus",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Nagy Lajos alatt. Tovább bővítette Károly Róbert művét, Visegrád európai szintű pompás udvari központ lett.",
    explanationDE:
      "Unter König Ludwig dem Großen (Nagy Lajos) wurde die königliche Residenz in Visegrád im 14. Jh. noch prächtiger ausgebaut und zu einem europäischen Glanzpunkt erhoben.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Melyik királyunk idején történt a nikápolyi csata (1396)?",
    questionDE:
      "Unter welchem König fand die Schlacht bei Nikopolis (1396) statt?",
    answers: [
      {
        answerHU: "Luxemburgi Zsigmond",
        answerDE: "Sigismund von Luxemburg",
        isCorrect: true,
      },
      {
        answerHU: "I. Károly Róbert",
        answerDE: "Karl Robert I.",
        isCorrect: false,
      },
      {
        answerHU: "II. András",
        answerDE: "Andreas II.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Zsigmond uralkodása alatt. A keresztesek törökök elleni nagy veresége, mely meghatározta Magyarország későbbi helyzetét.",
    explanationDE:
      "Unter König Sigismund fand 1396 die Schlacht bei Nikopolis statt. Der Kreuzzug gegen die Osmanen endete in einer schweren Niederlage und prägte Ungarns Entwicklung.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Hol ütötték aranyból a híres magyar pénzt, a 'forintot', Károly Róbert idején?",
    questionDE:
      "Wo prägte man die berühmte ungarische Goldmünze 'Forint' unter Karl Robert?",
    answers: [
      {
        answerHU: "Aranybányás helyek közelében, pl. Körmöcbánya",
        answerDE: "In der Nähe von Goldminen, z. B. Kremnitz (Körmöcbánya)",
        isCorrect: true,
      },
      {
        answerHU: "Bécsben",
        answerDE: "In Wien",
        isCorrect: false,
      },
      {
        answerHU: "Konstantinápolyban",
        answerDE: "In Konstantinopel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Körmöcbányán. A firenzei mintára bevezetett aranyforintot itt verték, stabil pénzt biztosítva a gazdaság fellendítéséhez.",
    explanationDE:
      "In Körmöcbánya (Kremnica) schlug man zur Zeit König Karls Roberts den Goldforint nach florentinischem Vorbild. Damit etablierte er eine stabile Währung für die Wirtschaft.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Ki volt az 1848–49-es forradalom egyik fő hadvezére, akit később Aradon kivégeztek?",
    questionDE:
      "Wer war einer der Hauptgeneräle der Revolution 1848–49, der später in Arad hingerichtet wurde?",
    answers: [
      {
        answerHU: "Damjanich János",
        answerDE: "János Damjanich",
        isCorrect: true,
      },
      {
        answerHU: "Görgey Artúr",
        answerDE: "Artúr Görgey",
        isCorrect: false,
      },
      {
        answerHU: "Wesselényi Miklós",
        answerDE: "Miklós Wesselényi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Damjanich János, az aradi vértanúk egyike. Tehetséges, bátor honvédtábornok, mártírhalált halt a szabadságharcban.",
    explanationDE:
      "János Damjanich war einer der wichtigsten Generäle im Freiheitskampf 1848/49 und gehörte zu den Arader Märtyrern. Er war ein mutiger Befehlshaber und starb den Märtyrertod.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Ki készítette az első magyarországi nyelvtani összefoglalót nyomtatásban a 16. században?",
    questionDE:
      "Wer verfasste die erste ungarische Grammatik in gedruckter Form im 16. Jahrhundert?",
    answers: [
      {
        answerHU: "Sylvester János",
        answerDE: "János Sylvester",
        isCorrect: true,
      },
      {
        answerHU: "Apáczai Csere János",
        answerDE: "János Apáczai Csere",
        isCorrect: false,
      },
      {
        answerHU: "Pázmány Péter",
        answerDE: "Péter Pázmány",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sylvester János, aki Sárváron adta ki „Grammatica Hungarolatina” című művét, mérföldkövet rakva a nyelvtudományba.",
    explanationDE:
      "János Sylvester veröffentlichte im 16. Jh. in Sárvár die „Grammatica Hungarolatina“. Sie gilt als erste gedruckte ungarische Grammatik und Meilenstein der Sprachwissenschaft.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik király tette Esztergomot érseki központtá a 10-11. század fordulóján?",
    questionDE:
      "Welcher König machte Esztergom an der Wende vom 10. zum 11. Jahrhundert zum Erzbischofssitz?",
    answers: [
      {
        answerHU: "Szent István",
        answerDE: "Stephan der Heilige",
        isCorrect: true,
      },
      {
        answerHU: "I. András",
        answerDE: "Andreas I.",
        isCorrect: false,
      },
      {
        answerHU: "Szent László",
        answerDE: "Heiliger Ladislaus",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szent István, aki az egyházszervezetet is kiépítette. Esztergom lett a magyar kereszténység központja és koronázóhelye.",
    explanationDE:
      "König Stephan der Heilige (Szent István) machte Esztergom um die Jahrtausendwende zum Erzbischofssitz. Diese Stadt wurde Zentrum des ungarischen Christentums und Krönungsort.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Mikor alakult meg a Magyar Tudományos Akadémia (MTA) elődje, a 'Magyar Tudós Társaság'?",
    questionDE:
      "Wann entstand der Vorläufer der Ungarischen Akademie der Wissenschaften, die 'Ungarische Gelehrten-Gesellschaft'?",
    answers: [
      {
        answerHU: "1830-ben Széchenyi István felajánlásával",
        answerDE: "1830 durch eine Stiftung von István Széchenyi",
        isCorrect: true,
      },
      {
        answerHU: "1848-ban Kossuth törvényével",
        answerDE: "1848 mit dem Gesetz von Kossuth",
        isCorrect: false,
      },
      {
        answerHU: "1867-ben a kiegyezés után",
        answerDE: "1867 nach dem Ausgleich",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1830-ban, Széchenyi István felajánlásával. A magyar tudomány fejlődésének szervezett háttérintézménye lett.",
    explanationDE:
      "Die Vorgängerinstitution der Ungarischen Akademie der Wissenschaften, die „Magyar Tudós Társaság“, wurde 1830 durch die Stiftung von István Széchenyi gegründet.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik uralkodóépítette a Budai Várat gótikus stílusban a 14-15. században?",
    questionDE:
      "Welcher Herrscher baute die Burg von Buda im gotischen Stil im 14.-15. Jahrhundert aus?",
    answers: [
      {
        answerHU: "Zsigmond király (Luxemburgi)",
        answerDE: "König Sigismund (von Luxemburg)",
        isCorrect: true,
      },
      {
        answerHU: "Mátyás király",
        answerDE: "König Matthias",
        isCorrect: false,
      },
      {
        answerHU: "Nagy Lajos",
        answerDE: "Ludwig der Große",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Zsigmond király. Nagyszabású építkezései révén Buda Európa egyik fényes királyi központja lett gótikus palotákkal.",
    explanationDE:
      "König Sigismund ließ die Burg in Buda im 14./15. Jh. im gotischen Stil ausbauen. Unter seiner Herrschaft entwickelte sich Buda zu einem glanzvollen königlichen Zentrum Europas.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Mi volt az 1351-es Aranybulla megújításának fő tartalma?",
    questionDE:
      "Was war der Hauptinhalt der Erneuerung der Goldenen Bulle von 1351?",
    answers: [
      {
        answerHU: "Az ősiség törvénye megerősítése",
        answerDE: "Bestätigung des Gesetzes der Avitizität/Ahnenerbes",
        isCorrect: true,
      },
      {
        answerHU: "A jobbágyfelszabadítás kihirdetése",
        answerDE: "Die Verkündung der Bauernbefreiung",
        isCorrect: false,
      },
      {
        answerHU: "Az uralkodó lemondása a királyi címről",
        answerDE: "Der Verzicht des Herrschers auf den Königstitel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az ősiség törvénye. A nemesi birtok csak családon belül öröklődhetett, ezzel stabilizálva a feudális birtokrendszert évszázadokra.",
    explanationDE:
      "Wichtigstes Element der Erneuerung der Goldenen Bulle 1351 war das Gesetz der „Aviticitas“ (Ōsiség). Adelsgüter durften nur innerhalb der Familie vererbt werden.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Kinek a nevéhez köthető a 'jobbágyrendelet' Magyarországon, mely enyhítette a jobbágyok terheit a 18. században?",
    questionDE:
      "Wessen Name ist in Ungarn mit dem 'Leibeigenenpatent' verbunden, das im 18. Jh. die Lasten der Bauern linderte?",
    answers: [
      {
        answerHU: "II. József császáréhoz",
        answerDE: "Dem Kaiser Joseph II.",
        isCorrect: true,
      },
      {
        answerHU: "III. Károly királyéhoz",
        answerDE: "Zu König Karl III.",
        isCorrect: false,
      },
      {
        answerHU: "V. Ferdinándéhoz",
        answerDE: "An Ferdinand V.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "II. József. Rendelkezésével korlátozta a földesúri hatalmat, könnyítve a jobbágyok helyzetét, követve a felvilágosult abszolutizmus elveit.",
    explanationDE:
      "Kaiser Joseph II. führte in Ungarn das „Leibeigenenedikt“ ein. Es beschränkte die Macht der Grundherren und erleichterte die Lage der Bauern, im Sinne des aufgeklärten Absolutismus.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik világháború idején történt a 'limanowai csata', ahol magyar huszárok is harcoltak?",
    questionDE:
      "In welchem Weltkrieg fand die 'Schlacht bei Limanowa' statt, an der auch ungarische Husaren teilnahmen?",
    answers: [
      {
        answerHU: "Az I. világháborúban (1914)",
        answerDE: "Im Ersten Weltkrieg (1914)",
        isCorrect: true,
      },
      {
        answerHU: "A II. világháborúban (1942)",
        answerDE: "Im Zweiten Weltkrieg (1942)",
        isCorrect: false,
      },
      {
        answerHU: "Az 1848–49-es forradalom idején",
        answerDE: "Während der Revolution von 1848/49",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az első világháborúban, 1914-ben. Az oroszok ellen aratott fontos győzelem a keleti fronton, magyar huszárok hősiességével.",
    explanationDE:
      "Die Schlacht bei Limanowa fand 1914 im Ersten Weltkrieg statt. Ungarische Husaren kämpften dort erfolgreich gegen die Russen an der Ostfront und errangen einen Sieg.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik esemény után vesztette el Magyarország az államiságát a Habsburg Monarchia részeként 1526-tól?",
    questionDE:
      "Nach welchem Ereignis verlor Ungarn ab 1526 seine Staatlichkeit als Teil der Habsburgermonarchie?",
    answers: [
      {
        answerHU: "A mohácsi vész",
        answerDE: "Die Schlacht von Mohács",
        isCorrect: true,
      },
      {
        answerHU: "A nikápolyi csata",
        answerDE: "Die Schlacht von Nikopol",
        isCorrect: false,
      },
      {
        answerHU: "A kiegyezés",
        answerDE: "Der Ausgleich",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A mohácsi csata (1526) után. II. Lajos király halála nyomán Magyarország a Habsburg-dinasztia uralma alá került.",
    explanationDE:
      "Nach der Schlacht bei Mohács (1526) und dem Tod König Ludwigs II. geriet Ungarn unter die Habsburger Herrschaft. Damit verlor das Land faktisch seine Eigenstaatlichkeit.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Melyik városban alakult meg a 'tanácsköztársaság' központja 1919-ben rövid időre?",
    questionDE:
      "In welcher Stadt entstand 1919 für kurze Zeit das Zentrum der 'Räterepublik'?",
    answers: [
      {
        answerHU: "Budapesten",
        answerDE: "In Budapest",
        isCorrect: true,
      },
      {
        answerHU: "Debrecenben",
        answerDE: "In Debrecen",
        isCorrect: false,
      },
      {
        answerHU: "Kolozsváron",
        answerDE: "Klausenburg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Budapesten. Kun Béla vezetésével itt működött a forradalmi kormányzótanács, rövid életű kommunista államhatalom volt.",
    explanationDE:
      "In Budapest entstand 1919 kurzzeitig der Mittelpunkt der ungarischen Räterepublik. Unter Béla Kun regierte dort ein revolutionärer Rat, allerdings nur von kurzer Dauer.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Mikor hirdették ki az 'áprilisi törvényeket' a reformkorban?",
    questionDE:
      "Wann wurden die 'Aprilgesetze' in der ungarischen Reformzeit verkündet?",
    answers: [
      {
        answerHU: "1848 áprilisában",
        answerDE: "Im April 1848",
        isCorrect: true,
      },
      {
        answerHU: "1830-ban",
        answerDE: "1830",
        isCorrect: false,
      },
      {
        answerHU: "1849 márciusában",
        answerDE: "März 1849",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1848 márciusában. A polgári átalakulás alapköveit fektették le, modernizálták az államot és a társadalmat.",
    explanationDE:
      "Die „Apriler Gesetze“ wurden im März 1848 verkündet und legten die Grundlage für den bürgerlichen Wandel. Sie modernisierten Staat und Gesellschaft in Ungarn.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Miben volt jelentős Mária Terézia Magyarország számára?",
    questionDE: "Welche Bedeutung hatte Maria Theresia für Ungarn?",
    answers: [
      {
        answerHU: "Megfosztotta a nemességet minden jogától",
        answerDE: "Sie beraubte den Adel aller Rechte",
        isCorrect: false,
      },
      {
        answerHU:
          "Megerősítette a nemesi kiváltságokat és az ország integritását",
        answerDE:
          "Er stärkte die Adelsprivilegien und die Integrität des Landes",
        isCorrect: true,
      },
      {
        answerHU: "Teljesen betiltotta a magyar nyelvet",
        answerDE: "Er verbot die ungarische Sprache vollständig",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Felvilágosult reformokat hozott, de a rendi jogokat is megtartotta. Összességében fejlesztette az oktatást, gazdaságot, pragmatikus uralkodó volt.",
    explanationDE:
      "Maria Theresia war eine aufgeklärte Herrscherin, die Ungarn Reformen brachte, aber den Ständen Kompromisse ließ. Sie förderte Bildung und Wirtschaft, agierte pragmatisch.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Hogyan hatott a francia forradalom a magyar nemességre?",
    questionDE:
      "Wie wirkte sich die Französische Revolution auf die ungarische Adelsgesellschaft aus?",
    answers: [
      {
        answerHU: "Megszüntette a nemességet",
        answerDE: "Sie schaffte den Adel ab",
        isCorrect: false,
      },
      {
        answerHU: "Szabadelvű és reform-irányzatokat indított el",
        answerDE: "Er initiierte liberale und reformorientierte Bewegungen",
        isCorrect: true,
      },
      {
        answerHU: "Teljesen elzárkóztak az új eszmék elől",
        answerDE: "Sie verschlossen sich neuen Ideen völlig",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kettős hatás: a liberális réteg inspirációt merített, míg a konzervatív nemesek féltek a forradalmi eszméktől. Megosztotta a reformtörekvéseket.",
    explanationDE:
      "Die Französische Revolution beeinflusste die ungarische Aristokratie zweifach: Liberale ließen sich inspirieren, Konservative fürchteten sich. So spaltete sie die Reformbewegung.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU: "Mit szabályozott a „Lex Apponyi” (1907) Magyarországon?",
    questionDE: "Was regelte das sogenannte „Lex Apponyi“ (1907) in Ungarn?",
    answers: [
      {
        answerHU: "A választójog kiterjesztését",
        answerDE: "Die Ausweitung des Wahlrechts",
        isCorrect: false,
      },
      {
        answerHU: "Az iskolák nyelvhasználatát, a magyar nyelv erősítését",
        answerDE:
          "Die Sprachverwendung in Schulen, die Stärkung der ungarischen Sprache",
        isCorrect: true,
      },
      {
        answerHU: "A nyugdíjrendszer bevezetését",
        answerDE: "Die Einführung des Rentensystems",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A nemzetiségi iskolákat, kötelezővé téve a magyar nyelv oktatását. A magyarosítás része volt, erősítve a magyar nyelv dominanciáját.",
    explanationDE:
      "Das „Lex Apponyi“ (1907) regelte die Volksschulen, besonders für Minderheiten. Es verpflichtete diese Schulen zum Ungarisch-Unterricht und diente der „Magyarisierung“.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Milyen reformokhoz kapcsolódik Pozsgay Imre neve a ’80-as években?",
    questionDE:
      "Mit welchen Reformen der 80'er verbindet man den Namen Imre Pozsgay ?",
    answers: [
      {
        answerHU: "Az állami tulajdon teljes megszüntetését",
        answerDE: "Die vollständige Abschaffung des Staatseigentums",
        isCorrect: false,
      },
      {
        answerHU: "A politikai nyitást és a többpártrendszer előkészítését",
        answerDE:
          "Die politische Öffnung und die Vorbereitung des Mehrparteiensystems",
        isCorrect: true,
      },
      {
        answerHU: "A királyság visszaállítását",
        answerDE: "Die Wiederherstellung des Königreichs",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Kádár-rendszer reformszárnyának tagja, támogatta a politikai-gazdasági változásokat. Fontos volt a rendszerváltás előkészítésében.",
    explanationDE:
      "Imre Pozsgay gehörte in den 80ern zum Reformflügel der Kádár-Ära. Er förderte politische und wirtschaftliche Veränderungen und spielte eine Schlüsselrolle bei der Wende.",
  },
  {
    category: "Geschichte",
    level: 3,
    questionHU:
      "Mit rögzített az 1947-es párizsi békeszerződés Magyarország számára?",
    questionDE:
      "Was wurde durch den Vertrag von Paris 1947 für Ungarn festgelegt?",
    answers: [
      {
        answerHU: "Az Osztrák–Magyar Monarchia visszaállítását",
        answerDE:
          "Die Wiederherstellung der Österreichisch-Ungarischen Monarchie",
        isCorrect: false,
      },
      {
        answerHU: "A háború utáni határokat és jóvátételeket",
        answerDE: "Die Nachkriegsgrenzen und Reparationen",
        isCorrect: true,
      },
      {
        answerHU: "A teljes függetlenséget az összes szomszédtól",
        answerDE: "Die völlige Unabhängigkeit von allen Nachbarn",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Területi helyzetet közel a trianoni határokhoz, hadseregkorlátozást és jóvátételt a második világháború után, nehéz feltételekkel.",
    explanationDE:
      "Der Pariser Friedensvertrag von 1947 bestätigte Ungarns Grenzen ähnlich wie 1920 (Trianon), auferlegte Militärbeschränkungen und Reparationen. Es waren harte Bedingungen nach dem Krieg.",
  },
  {
    category: "Kulinarik",
    level: 3,
    questionHU: "Milyen étel a 'palacsinta' Magyarországon?",
    questionDE: "Was für ein Gericht ist 'Palacsinta' in Ungarn?",
    answers: [
      {
        answerHU: "Vékony tésztájú, serpenyőben sütött édesség",
        answerDE: "Eine Süßspeise aus dünnem Teig, in der Pfanne gebacken ",
        isCorrect: true,
      },
      {
        answerHU: "Kenyérlángos a kemencében",
        answerDE: "Kenyérlángos im Ofen",
        isCorrect: false,
      },
      {
        answerHU: "Húsos pite, réteges tésztával",
        answerDE: "Fleischpastete mit Blätterteig",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vékony, serpenyőben sült tészta, édes vagy sós töltelékkel. Lekvárral, túróval, kakaóval népszerű, a magyar konyha egyik kedvelt desszertje.",
    explanationDE:
      "Ungarische „Palacsinta“ sind dünne, in der Pfanne gebackene Pfannkuchen. Sie werden süß oder salzig gefüllt, oft mit Marmelade oder Quark – ein beliebtes Dessert.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Melyik magyar festőt nevezik a 'napfény szerelmesének'?",
    questionDE: "Welchen ungarischen Maler nennt man 'Sonnenschein-Liebhaber'?",
    answers: [
      {
        answerHU: "Csontváry Kosztka Tivadar",
        answerDE: "Tivadar Csontváry Kosztka",
        isCorrect: true,
      },
      {
        answerHU: "Munkácsy Mihály",
        answerDE: "Mihály Munkácsy",
        isCorrect: false,
      },
      {
        answerHU: "Rippl-Rónai József",
        answerDE: "József Rippl-Rónai",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Csontváry Kosztka Tivadar. Különleges fénykezelés, élénk színek jellemzik festményeit, misztikus látásmódja kiemeli a magyar festők sorából.",
    explanationDE:
      "Tivadar Csontváry Kosztka wird als „Liebhaber des Sonnenlichts“ bezeichnet. Seine Gemälde bestechen durch intensive Farb- und Lichtführung, sein Stil wirkt mystisch und einzigartig.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Ki volt Déry Tibor, és melyik műve vált híressé?",
    questionDE: "Wer war Tibor Déry und welches seiner Werke wurde berühmt?",
    answers: [
      {
        answerHU: "Író, a 'Niki – egy kutya története' szerzője",
        answerDE:
          "Ein Schriftsteller, Autor von 'Niki – Die Geschichte eines Hundes'",
        isCorrect: true,
      },
      {
        answerHU: "Színész, a Nemzeti Színház tagja",
        answerDE: "Schauspieler, Mitglied des Nationaltheaters",
        isCorrect: false,
      },
      {
        answerHU: "Költő, aki 1956-os verseket írt",
        answerDE: "Dichter, der Gedichte von 1956 schrieb",
        isCorrect: false,
      },
    ],
    explanationHU:
      '20. századi magyar író, legismertebb regénye a "Befejezetlen mondat". Művei a társadalmi viszonyokat és az emberi lélek mélyét kutatják.',
    explanationDE:
      "Tibor Déry war ein ungarischer Schriftsteller des 20. Jh. Sein bekanntester Roman ist „Der unvollendete Satz“. Er analysiert Gesellschaft und menschliche Psyche mit Tiefgang.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Mikor született Márai Sándor, és mi a híres regénye?",
    questionDE:
      "Wann wurde Sándor Márai geboren und welches ist sein berühmter Roman?",
    answers: [
      {
        answerHU: "1900-ban, 'A gyertyák csonkig égnek'",
        answerDE: "1900 'Die Kerzen brennen bis zum Stumpf'",
        isCorrect: true,
      },
      {
        answerHU: "1880-ban, 'Az arany ember'",
        answerDE: "1880, 'Der Goldmensch'",
        isCorrect: false,
      },
      {
        answerHU: "1923-ban, 'A Pendragon legenda'",
        answerDE: "1923, 'Das Geheimnis der Pendragon'",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1900-ban. Leghíresebb műve a „Gyertyák csonkig égnek”, amely a barátság, a nosztalgia és az elmúlás kérdéseit boncolgatja.",
    explanationDE:
      "Sándor Márai wurde 1900 geboren. Sein bekanntester Roman heißt „Die Glut“ (Gyertyák csonkig égnek). Er thematisiert Freundschaft, Sehnsucht und Vergänglichkeit.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Mely magyar tudós kapott Nobel-díjat a szénhidrát-anyagcsere kutatásáért?",
    questionDE:
      "Welcher ungarische Wissenschaftler erhielt den Nobelpreis für Forschung zum Kohlenhydratstoffwechsel?",
    answers: [
      {
        answerHU: "Szent-Györgyi Albert",
        answerDE: "Albert Szent-Györgyi",
        isCorrect: true,
      },
      {
        answerHU: "Hevesy György",
        answerDE: "Georg von Hevesy",
        isCorrect: false,
      },
      {
        answerHU: "Kertész Imre",
        answerDE: "Imre Kertész",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szent-Györgyi Albert is jelentős eredményeket ért el a szénhidrát-anyagcsere terén, a C-vitamin felfedezéséért kapott Nobel-díjat.",
    explanationDE:
      "Albert Szent-Györgyi erhielt den Nobelpreis für seine Forschungen am Kohlehydratstoffwechsel und die Entdeckung des Vitamin C. Er veränderte die Biochemie grundlegend.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Kik voltak a 'marslakók' a tudománytörténetben?",
    questionDE:
      "Wer waren die sogenannten 'Marsmenschen' in der WissenschaftsGeschichte?",
    answers: [
      {
        answerHU: "Magyar származású tudósok, akik külföldön dolgoztak",
        answerDE:
          "Wissenschaftler ungarischer Herkunft, die im Ausland arbeiteten",
        isCorrect: true,
      },
      {
        answerHU: "Orosz rakétamérnökök a Szputnyik-programban",
        answerDE: "Russische Raketeningenieure im Sputnik-Programm",
        isCorrect: false,
      },
      {
        answerHU: "Német atomfizikusok Heisenberg vezetésével",
        answerDE: "Deutsche Atomphysiker unter der Führung von Heisenberg",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Magyar származású fizikusok, matematikusok (pl. Wigner, Teller, Neumann) az USA-ban. Zseniális elméjük miatt tréfásan “marslakóknak” hívták őket.",
    explanationDE:
      "Die „Marsmenschen“ waren ungarischstämmige Wissenschaftler in den USA (etwa Wigner, Teller, Neumann). Wegen ihres genialen Geistes wurden sie scherzhaft „Martians“ genannt.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Miért nevezetes Faludy György a 20. századi magyar irodalomban?",
    questionDE:
      "Weshalb ist György Faludy in der ungarischen Literatur des 20. Jh. bedeutend?",
    answers: [
      {
        answerHU: "Költő és műfordító, aki számos politikai üldöztetést átélt",
        answerDE:
          "Ein Dichter und Übersetzer, der zahlreiche politische Verfolgungen erlebte",
        isCorrect: true,
      },
      {
        answerHU: "Színműíró, a Nemzeti Színház igazgatója",
        answerDE: "Dramatiker, Direktor des Nationaltheaters",
        isCorrect: false,
      },
      {
        answerHU: "Gyermekkönyvek írója a Kádár-korszakban",
        answerDE: "Kinderbuchautor in der Kádár-Ära",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Költő, műfordító, emigráns író. A diktatúrákat bíráló versei és a szabadságvágy hatják át műveit, ikonikus alakja a magyar irodalomnak.",
    explanationDE:
      "György Faludy war Dichter, Übersetzer und Exilschriftsteller. Sein Werk, geprägt vom Freiheitsstreben, kritisiert Diktaturen",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Melyik híres magyar orvos végezte el az első sikeres magyar szívtranszplantációt?",
    questionDE:
      "Welcher berühmte ungarische Arzt führte die erste erfolgreiche Herztransplantation in Ungarn durch?",
    answers: [
      {
        answerHU: "Szabó Zoltán",
        answerDE: "Zoltán Szabó",
        isCorrect: true,
      },
      {
        answerHU: "Balassa János",
        answerDE: "János Balassa",
        isCorrect: false,
      },
      {
        answerHU: "Semmelweis Ignác",
        answerDE: "Ignaz Semmelweis",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Dr. Szabó Zoltán 1992-ben, Pécsett. Ezzel mérföldkőhöz érkezett a magyar orvostudomány a szívsebészet terén.",
    explanationDE:
      "Dr. Zoltán Szabó führte 1992 in Pécs die erste erfolgreiche Herztransplantation Ungarns durch – ein Meilenstein der ungarischen Herzchirurgie.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Hol született Ligeti György zeneszerző, és miért világhírű?",
    questionDE:
      "Wo wurde der Komponist György Ligeti geboren, und warum ist er weltbekannt?",
    answers: [
      {
        answerHU: "Dicsőszentmártonban, az avantgárd zene kiemelkedő alakja",
        answerDE:
          "In Diciosânmartin, er ist eine herausragende Figur der Avantgardemusik",
        isCorrect: true,
      },
      {
        answerHU: "Kolozsváron, híres operaénekesként",
        answerDE: "In Klausenburg, als berühmter Opernsänger",
        isCorrect: false,
      },
      {
        answerHU: "Pécsett, könnyűzenei slágerekkel",
        answerDE: "In Pécs, mit Schlagern der Popmusik",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Dicsőszentmártonban (Erdély). A 20. századi avantgárd zene egyik legnagyobb alakja, kísérletező modern műveit világszerte elismerik.",
    explanationDE:
      "György Ligeti wurde in Diciosânmartin (Siebenbürgen) geboren. Er gilt als führender Avantgarde-Komponist des 20. Jh., dessen experimentelle Werke internationale Anerkennung fanden.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Melyik matematikus nevéhez fűződik a 'felsőbbfokú geometria' úttörő munkája?",
    questionDE:
      "Welcher Mathematiker wird mit der Pionierarbeit in der 'höheren Geometrie' in Verbindung gebracht?",
    answers: [
      {
        answerHU: "Bolyai János",
        answerDE: "János Bolyai",
        isCorrect: true,
      },
      {
        answerHU: "Vázsonyi Vilmos",
        answerDE: "Vilmos Vázsonyi",
        isCorrect: false,
      },
      {
        answerHU: "Riesz Frigyes",
        answerDE: "Frigyes Riesz",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bolyai János. A nemeuklideszi geometria alapjait rakta le, párhuzamosan Lobacsevszkijjel, forradalmi újítást hozva.",
    explanationDE:
      "János Bolyai gilt mit Lobatschewski als Begründer der nichteuklidischen Geometrie („höherge Stufe der Geometrie“). Seine Ideen revolutionierten die mathematische Raumvorstellung.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Melyik tevékenységéről ismert Szilárd Leó a nukleáris kutatások terén?",
    questionDE: "Wofür ist Leó Szilárd in der Nuklearforschung bekannt?",
    answers: [
      {
        answerHU: "A láncreakció elméleti megalapozásáért",
        answerDE: "Für die theoretische Grundlegung der Kernkettenreaktion",
        isCorrect: true,
      },
      {
        answerHU: "A röntgenkészülék feltalálásáért",
        answerDE: "Für die Erfindung des Röntgengeräts",
        isCorrect: false,
      },
      {
        answerHU: "A hidrogénbomba egyedüli megalkotásáért",
        answerDE: "Für die alleinige Entwicklung der Wasserstoffbombe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A nukleáris láncreakció elméletének kidolgozója, részt vett az atombomba fejlesztésében, később etikai aggályokat hangoztatott.",
    explanationDE:
      "Leó Szilárd entwickelte das Konzept der nuklearen Kettenreaktion, war Mitinitiator der Atombombe, äußerte später jedoch Bedenken wegen der ethischen Konsequenzen.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Ki volt a 'Csitári hegyek alatt' gyűjtője, híres népzenekutató?",
    questionDE:
      "Wer war der berühmte Volksliedforscher, der 'Csitári hegyek alatt' sammelte?",
    answers: [
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: true,
      },
      {
        answerHU: "Bartók Béla",
        answerDE: "Béla Bartók",
        isCorrect: false,
      },
      {
        answerHU: "Lajtha László",
        answerDE: "László Lajtha",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kodály Zoltán. Felvidéki gyűjtései során jegyezte le ezt a dalt is, úttörő volt a magyar népzene kutatásában és megőrzésében.",
    explanationDE:
      "Zoltán Kodály sammelte das Lied „Unter den Csitárer Bergen“. Er war ein führender Ethno-Musikforscher und prägte die Erhaltung der ungarischen Volksmusik maßgebend.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Mely költő írta a 'Muszáj Herkules' című verset?",
    questionDE: "Welcher Dichter schrieb das Gedicht 'Muszáj Herkules'?",
    answers: [
      {
        answerHU: "József Attila",
        answerDE: "Attila József",
        isCorrect: true,
      },
      {
        answerHU: "Ady Endre",
        answerDE: "Endre Ady",
        isCorrect: false,
      },
      {
        answerHU: "Weöres Sándor",
        answerDE: "Sándor Weöres",
        isCorrect: false,
      },
    ],
    explanationHU:
      "József Attila. Társadalmi kritikát, ironikus hangot megütve írta, a 20. századi magyar költészet egyik kiemelkedő alakja.",
    explanationDE:
      "Attila József verfasste „Muszáj Herkules“. Das Gedicht hat einen satirisch-kritischen Ton",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Milyen tudományágban alkotott maradandót Hevesy György?",
    questionDE: "In welchem Fach hinterließ George de Hevesy bleibende Spuren?",
    answers: [
      {
        answerHU: "Radioaktív nyomjelzés a kémiában.",
        answerDE: "Radioaktive Markierung in der Chemie.",
        isCorrect: true,
      },
      {
        answerHU: "Az asztrofizikában.",
        answerDE: "In der Astrophysik.",
        isCorrect: false,
      },
      {
        answerHU: "A szociológiában.",
        answerDE: "In der Soziologie.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A kémia területén, a radioaktív izotópok nyomjelző módszerének feltalálása révén. Munkájáért Nobel-díjjal is elismerték.",
    explanationDE:
      "György Hevesy wirkte in der Chemie bahnbrechend, indem er die Methode der radioaktiven Markierung erfand. Dafür erhielt er den Nobelpreis und revolutionierte die Forschung.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Melyik kutató dolgozott ki elméletet a 'szódavíz' gyártásra?",
    questionDE:
      "Welcher Forscher entwickelte eine Theorie zur Herstellung von 'Sodawasser'?",
    answers: [
      {
        answerHU: "Jedlik Ányos",
        answerDE: "Ányos Jedlik",
        isCorrect: true,
      },
      {
        answerHU: "Eötvös Loránd",
        answerDE: "Loránd Eötvös",
        isCorrect: false,
      },
      {
        answerHU: "Wigner Jenő",
        answerDE: "Eugene Wigner",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Jedlik Ányos. A dinamó mellett a szódavíz ipari előállítását is megoldotta, jelentős feltalálói tevékenységet folytatott.",
    explanationDE:
      "Ányos Jedlik entwickelte neben dem Dynamoprinzip auch eine Methode für die industrielle Sodawasserproduktion. Er war ein vielseitiger ungarischer Erfinder.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Ki volt Táncsics Mihály, és mi köthető a 1848-as forradalomhoz?",
    questionDE:
      "Wer war Mihály Táncsics, und was verbindet ihn mit der Revolution von 1848?",
    answers: [
      {
        answerHU:
          "Radikális író, a forradalmárok szabadították ki a börtönből.",
        answerDE:
          "Ein radikaler Schriftsteller, der von den Revolutionären aus dem Gefängnis befreit wurde.",
        isCorrect: true,
      },
      {
        answerHU: "Hadvezér a szabadságharc idején.",
        answerDE: "Feldherr während des Freiheitskampfes.",
        isCorrect: false,
      },
      {
        answerHU: "Építész, a Lánchíd tervezője.",
        answerDE: "Architekt, der Planer der Kettenbrücke.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Radikális író, akit a pesti forradalmárok engedtek ki a börtönből 1848. március 15-én. Szabadon bocsátása jelkép lett.",
    explanationDE:
      "Mihály Táncsics war ein radikaler Schriftsteller, den die Revolutionäre am 15. März 1848 aus dem Gefängnis befreiten. Seine Freilassung wurde zum Symbol der Freiheit.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Miben jelentős Szakcsi Lakatos Béla a kortárs magyar zenében?",
    questionDE:
      "Worin ist Béla Szakcsi Lakatos in der zeitgenössischen ungarischen Musik bedeutend?",
    answers: [
      {
        answerHU: "A jazz és a cigányzene ötvözésében",
        answerDE: "Durch die Verbindung von Jazz und Zigeunermusik",
        isCorrect: true,
      },
      {
        answerHU: "Operettkomponálásban",
        answerDE: "In der Operettenkomposition",
        isCorrect: false,
      },
      {
        answerHU: "Népzenei táncházas mozgalomban",
        answerDE: "In der Tanzhausbewegung der Volksmusik",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A jazz egyik hazai úttörője. Világszinten elismert jazz-zongorista, improvizatív stílusa és zeneszerzői munkája kiemelkedő.",
    explanationDE:
      "Béla Szakcsi Lakatos ist ein Pionier des Jazz in Ungarn. Als weltbekannter Jazzpianist und Komponist überzeugt er mit originellem Improvisationsstil und musikalischer Innovation.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Melyik alkalommal játszott döntő szerepet Nagy Imre a politikában?",
    questionDE:
      "Wann spielte Imre Nagy eine entscheidende Rolle in der Politik?",
    answers: [
      {
        answerHU: "1956-os forradalom miniszterelnökeként",
        answerDE: "Als Ministerpräsident während der Revolution 1956",
        isCorrect: true,
      },
      {
        answerHU: "1919-es Tanácsköztársaság vezetőjeként",
        answerDE: "Als Führer der Ungarischen Räterepublik von 1919",
        isCorrect: false,
      },
      {
        answerHU: "1848-as kormány élén",
        answerDE: "An der Spitze der Regierung von 1848",
        isCorrect: false,
      },
    ],
    explanationHU:
      "1956-os forradalom idején, mint miniszterelnök. Reformokat ígért, de kivégezték, mártírja lett a forradalmi küzdelemnek.",
    explanationDE:
      "Imre Nagy spielte während der Revolution 1956 als Ministerpräsident eine Schlüsselrolle. Obwohl er Reformen versprach, wurde er hingerichtet und zum Märtyrer.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Miért tekintik Ybl Miklóst az egyik legnagyobb magyar építésznek?",
    questionDE:
      "Warum gilt Miklós Ybl als einer der größten ungarischen Architekten?",
    answers: [
      {
        answerHU: "Operaház, Bazilika bővítése és sok más.",
        answerDE: "Opernhaus, Erweiterung der Basilika und vieles mehr.",
        isCorrect: true,
      },
      {
        answerHU: "Ő építette a Parlament épületét.",
        answerDE: "Er baute das Parlamentsgebäude.",
        isCorrect: false,
      },
      {
        answerHU: "Népi kunyhókat tervezett.",
        answerDE: "Er entwarf volkstümliche Hütten.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mert historizáló stílusban világszínvonalú épületeket alkotott. Számos budapesti épület fűződik nevéhez, időtálló remekműveket hagyott hátra.",
    explanationDE:
      "Miklós Ybl gilt als einer der bedeutendsten ungarischen Architekten. Im Historismus schuf er etliche herausragende Bauten in Budapest und hinterließ bleibende Meisterwerke.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Miben tűnt ki Károly Simonyi, akit néha az 'elektrotechnika apostolának' is neveznek?",
    questionDE:
      "Worin ragte Károly Simonyi heraus, der teils 'Apostel der Elektrotechnik' genannt wird?",
    answers: [
      {
        answerHU: "Az elektromágneses mérések fejlesztésében",
        answerDE: "In der Entwicklung elektromagnetischer Messmethoden",
        isCorrect: true,
      },
      {
        answerHU: "A modern atomerőművek tervezésében",
        answerDE: "Bei der Konstruktion moderner Kernkraftwerke",
        isCorrect: false,
      },
      {
        answerHU: "Csak a telefonközpontok számítógépesítésében",
        answerDE: "Nur bei der Computerisierung von Telefonzentralen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Elektromosságtanban és oktatásban. Népszerű könyvekkel hozta közel a fizikát és elektrotechnikát, nagy hatású pedagógus volt.",
    explanationDE:
      "Károly Simonyi zeichnete sich in Elektrotechnik und Didaktik aus. Mit populären Büchern brachte er Physik und Elektrotechnik näher und wurde zum „Apostel“ der Wissenschaft.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Ki szerezte a híres „Román népi táncok” (Román táncok) című művet?",
    questionDE: "Wer komponierte die bekannten „Rumänischen Volkstänze“?",
    answers: [
      {
        answerHU: "Liszt Ferenc",
        answerDE: "Franz Liszt",
        isCorrect: false,
      },
      {
        answerHU: "Bartók Béla",
        answerDE: "Béla Bartók",
        isCorrect: true,
      },
      {
        answerHU: "Kodály Zoltán",
        answerDE: "Zoltán Kodály",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bartók Béla. Az erdélyi román dallamokból merített, a népzene és a klasszikus megközelítés határán alkotta meg e darabokat.",
    explanationDE:
      "Béla Bartók komponierte die „Rumänischen Volkstänze“, inspiriert von den Volksmelodien in Siebenbürgen. Er verband authentisches Volksgut mit klassischer Musikhaltung.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU: "Ki írta az „Aranysárkány” (Der goldene Drache) című regényt?",
    questionDE: "Wer schrieb den Roman „Aranysárkány“ (Der goldene Drache)?",
    answers: [
      {
        answerHU: "Gárdonyi Géza",
        answerDE: "Géza Gárdonyi",
        isCorrect: false,
      },
      {
        answerHU: "Kosztolányi Dezső",
        answerDE: "Dezső Kosztolányi",
        isCorrect: true,
      },
      {
        answerHU: "Móricz Zsigmond",
        answerDE: "Zsigmond Móricz",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kosztolányi Dezső. Pszichológiai mélységű prózája a hétköznapok drámáit tárja elénk, a magyar irodalom egyik kiemelkedő szerzője.",
    explanationDE:
      "Dezső Kosztolányi schrieb den Roman „Der Goldene Drache“ (Aranysárkány). Mit psychologischer Tiefe schildert er Alltagsdramen und zählt zu den Großen der ungarischen Literatur.",
  },
  {
    category: "Persönlichkeiten",
    level: 3,
    questionHU:
      "Melyik magyar szerző kapott Kossuth-díjat 2002-ben, és híres posztmodern regényeiről?",
    questionDE:
      "Welcher ungarische Autor ist bekannt für seine oft postmodernen Romane und erhielt 2002 den Kossuth-Preis?",
    answers: [
      {
        answerHU: "Moldova György",
        answerDE: "György Moldova",
        isCorrect: false,
      },
      {
        answerHU: "Esterházy Péter",
        answerDE: "Péter Esterházy",
        isCorrect: true,
      },
      {
        answerHU: "Sánta Ferenc",
        answerDE: "Ferenc Sánta",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Esterházy Péter. Stílusával, nyelvjátékával és intertextualitásával a kortárs irodalom egyik újító alakja.",
    explanationDE:
      "Péter Esterházy erhielt 2002 den Kossuth-Preis. Er ist bekannt für seine postmodernen Romane, in denen er Sprache, Stil und Intertextualität auf innovative Weise einsetzt.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi jellemzi a 'kiszebáb-égetés' hagyományát farsang idején?",
    questionDE:
      "Was charakterisiert die Tradition des 'Kiszebáb-Verbrennens' zur Faschingszeit?",
    answers: [
      {
        answerHU: "Téli szellemek elűzésére",
        answerDE: "Das Vertreiben von Wintergeistern",
        isCorrect: false,
      },
      {
        answerHU: "Farsangi szórakozás végének jelzése",
        answerDE: "Zeichen für das Ende des Faschingstreibens",
        isCorrect: true,
      },
      {
        answerHU: "Újévi jóslások gyakorlása",
        answerDE: "Neujahrsvorhersagen üben",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Télűző, gonoszűző rítus. A kiszebábut elégetik, ezzel jelképesen megszabadulnak a hidegtől és a rossz szellemektől, várva a tavaszt.",
    explanationDE:
      "Das Verbrennen der „Kiszebáb“ ist ein Faschingsbrauch zur Winter- und Dämonenvertreibung. Indem man die Strohpuppe verbrennt, vertreibt man symbolisch Kälte und Unheil.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Melyik magyar népszokás kapcsolódik a 'kiszebáb-égetéshez'?",
    questionDE:
      "Zu welchem ungarischen Brauch gehört das 'Kiszebáb-Verbrennen'?",
    answers: [
      {
        answerHU: "Húsvéti locsolás",
        answerDE: "Osterbesprengen",
        isCorrect: false,
      },
      {
        answerHU: "Farsangi búcsúztatás",
        answerDE: "Faschingsausklang",
        isCorrect: true,
      },
      {
        answerHU: "Mária zarándoklat",
        answerDE: "Marienwallfahrt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A farsangi télbúcsúztató szertartás. A bábu elégetése zajkeltéssel és vidám mulatsággal párosul a böjt előtti időszakban.",
    explanationDE:
      "Diese Tradition gehört zum Faschingsfest, wenn man den Winter austreibt. Die Kiszepuppe wird verbrannt, begleitet von lautem Lärm und Fest, bevor die Fastenzeit beginnt.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi a 'Doromb'?",
    questionDE: "Was ist das 'Doromb'?",
    answers: [
      {
        answerHU: "Fúvós hangszer",
        answerDE: "Blasinstrument",
        isCorrect: false,
      },
      {
        answerHU: "Pengetős szájharmonika",
        answerDE: "Zupfende Mundharmonika",
        isCorrect: true,
      },
      {
        answerHU: "Ütőhangszer",
        answerDE: "Schlaginstrument",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kisméretű fém szájpengető hangszer, főleg palóc területeken ismert. Szájban tartva pengetik, jellegzetes vibráló hangot ad a népi zenében.",
    explanationDE:
      "Die „Doromb“ ist ein kleines, metallisches Maultrommel-Instrument, vor allem in der Palócföld verbreitet. Man hält es an die Lippen und erzeugt vibrierende Töne.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi történik a 'Regölés' szokás során?",
    questionDE: "Was geschieht beim Brauch des 'Regölés'?",
    answers: [
      {
        answerHU: "Man beginnt eine 2-wöchige Winterphase",
        answerDE: "2 hetes téli szakasz kezdődött",
        isCorrect: false,
      },
      {
        answerHU: "Házról házra járás jókívánságokkal",
        answerDE: "Von Haus zu Haus gehen mit guten Wünschen",
        isCorrect: true,
      },
      {
        answerHU: "Jézus születésének előkészülete",
        answerDE: "Vorbereitung auf die Geburt Jesu",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Karácsony előtt fiúk házról házra járnak énekelve, termékenységet, bőséget kívánva. Karácsony előtti héten éneklő fiatalok, adományokért cserébe.",
    explanationDE:
      "Beim „Regölés“ ziehen Jungen vor Weihnachten singend von Haus zu Haus und wünschen Fruchtbarkeit und Wohlstand. Sie erhalten Spenden",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Milyen népszokás része a 'lakodalmi vőfély'?",
    questionDE: "Zu welchem Brauch gehört der 'Lakodalmi vőfély'?",
    answers: [
      {
        answerHU: "Temetési szertartások",
        answerDE: "Beerdigungsriten",
        isCorrect: false,
      },
      {
        answerHU: "Esküvői ceremóniák",
        answerDE: "Hochzeitszeremonien",
        isCorrect: true,
      },
      {
        answerHU: "Aratási ünnepségek",
        answerDE: "Erntefeiern",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A hagyományos magyar esküvő egyik kulcsszereplője. Tréfás rigmusokkal, játékokkal irányítja a lagzit, a vőlegény kísérője és ceremóniamestere.",
    explanationDE:
      "Der „Vőfély“ gehört zum ungarischen Hochzeitsbrauchtum. Mit lustigen Versen und Spielen lenkt er das Fest, begleitet den Bräutigam und fungiert als Zeremonienmeister.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mit ünnepelnek a János-napi borszenteléskor?",
    questionDE: "Was wird beim 'János-napi borszentelés' gefeiert?",
    answers: [
      {
        answerHU: "Új termés megáldása",
        answerDE: "Segnung der neuen Ernte",
        isCorrect: false,
      },
      {
        answerHU: "Borászati év kezdete",
        answerDE: "Beginn des Weinbaujahres",
        isCorrect: true,
      },
      {
        answerHU: "Téli napforduló",
        answerDE: "Wintersonnenwende",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A friss bor megáldását, főleg június 24-én. Egyházi és népi szertartás, mely a jó termést és minőségi borokat kívánja Szent János napján.",
    explanationDE:
      "Am Johannistag (24. Juni) wird junger Wein gesegnet. Dieses kirchlich-volkstümliche Ritual soll eine gute Ernte erbitten und den Wein segnen, symbolisch für Qualität und Fülle.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi jellemzi a 'Dőzsölés' szokást húshagyókeddkor?",
    questionDE: "Was ist typisch für das 'Dőzsölés' am Faschingsdienstag?",
    answers: [
      {
        answerHU: "Lakoma, gazdag ételekkel a böjt előtt",
        answerDE: "Ein Festmahl mit reichhaltigem Essen vor der Fastenzeit",
        isCorrect: true,
      },
      {
        answerHU: "Csendes virrasztás a templomban",
        answerDE: "Stille Totenwache in der Kirche",
        isCorrect: false,
      },
      {
        answerHU: "Közös fafaragás",
        answerDE: "Gemeinsames Holzschnitzen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bőséges lakomával búcsúznak a farsangtól. A böjt előtti utolsó napon még gazdag ételeket fogyasztanak, mulatságokkal kísérve.",
    explanationDE:
      "Am Faschingsdienstag wird noch einmal opulent geschmaust („dőzsölés“), bevor die Fastenzeit beginnt. Ein ausgelassener Brauch, um den Karneval üppig zu verabschieden.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Melyik ünnephez köthető a 'tikverőzés' hagyománya?",
    questionDE: "Mit welchem Fest ist der Brauch 'tikverőzés' verbunden?",
    answers: [
      {
        answerHU: "Farsanghoz, főleg húshagyókeddhez",
        answerDE: "Zum Karneval, vor allem Faschingsdienstag",
        isCorrect: true,
      },
      {
        answerHU: "Pünköshöz",
        answerDE: "Zu Pfingsten",
        isCorrect: false,
      },
      {
        answerHU: "Halottak napjához",
        answerDE: "Zum Totensonntag",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Farsanghoz és télűzéshez. Zajkeltéssel, maszkokkal ijesztik el a hideget, vidám, néhol félelmetes felvonulás keretében.",
    explanationDE:
      "Das „Tikverőzés“ gehört zum Fasching und symbolischen Winteraustreiben. Mit Lärm und Masken vertreibt man die Kälte, ein teils schauriges, teils fröhliches Spektakel.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Milyen rituáléval készülnek a magyar népi 'tollfosztás' estéin?",
    questionDE:
      "Welche Zeremonie begleitet die ungarische Volkstradition des 'Tollfosztás'?",
    answers: [
      {
        answerHU: "Közös éneklés, mesemondás",
        answerDE: "Gemeinsames Singen, Geschichtenerzählen",
        isCorrect: true,
      },
      {
        answerHU: "Búzából kenyérsütés",
        answerDE: "Brotbacken aus Weizen",
        isCorrect: false,
      },
      {
        answerHU: "Bikaáldozat",
        answerDE: "Stieropfer",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Téli összejövetel munka és szórakozás jegyében. Asszonyok, lányok közösen fosztják a tollat, mesélnek, énekelnek, közösségi élményt teremtve.",
    explanationDE:
      "Beim „Federnrupfen“ treffen sich Frauen abends im Winter. Sie arbeiten gemeinsam, erzählen Geschichten und singen. Diese gesellige Tätigkeit stärkt die Dorfgemeinschaft.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Melyik hagyományos ünnep kapcsolódik a 'zöldágjáráshoz'?",
    questionDE:
      "Welches traditionelle Fest ist mit dem 'Durchs-Grün-Ziehen' verbunden?",
    answers: [
      {
        answerHU: "Pünkösdhöz vagy tavaszi ünnepekhez",
        answerDE: "Mit Pfingsten oder Frühlingsfesten",
        isCorrect: true,
      },
      {
        answerHU: "Szent István-naphoz",
        answerDE: "Zum St.-Stephans-Tag",
        isCorrect: false,
      },
      {
        answerHU: "Szüreti felvonuláshoz",
        answerDE: "Zum Ernteumzug",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A pünkösdi szertartásokhoz. Zöld ágakkal, zenével, énekkel járják a falut, a termékenység és az újjászületés szimbólumaként.",
    explanationDE:
      "Das „Zöldágjárás“ (Grünzweiggehen) ist ein Pfingstbrauch. Junge Leute tanzen mit grünen Zweigen durch das Dorf, als Symbol für Fruchtbarkeit und Erneuerung.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Miben különbözik a 'Sárközi viselet' más tájegységek ruháitól?",
    questionDE:
      "Worin unterscheidet sich die 'Sárközi Tracht' von anderen Regionskleidungen?",
    answers: [
      {
        answerHU: "Rendkívül gazdag, színes hímzés és rakott szoknyák",
        answerDE: "Äußerst reiche, farbenfrohe Stickereien und Faltenröcke",
        isCorrect: true,
      },
      {
        answerHU: "Főleg fekete-fehér színvilág",
        answerDE: "Hauptsächlich Schwarz-Weiß-Farbwelt",
        isCorrect: false,
      },
      {
        answerHU: "Csak férfiak hordják",
        answerDE: "Nur von Männern getragen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Dús hímzés, élénk színek, gyöngyökkel díszítve. A Sárköz különlegesen gazdag motívumvilágú, rendkívül látványos népviselete.",
    explanationDE:
      "Die „Sárköz-Tracht“ ist überreich bestickt, farbenfroh und oft mit Perlen geschmückt. Sie sticht unter den ungarischen Volkstrachten durch ihre opulente Verzierung hervor.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Melyik ünnephez kapcsolódik a 'görhönyfesztivál' Szabolcsban?",
    questionDE:
      "Welchem Fest ist das 'Görhöny-Festival' in Szabolcs zugeordnet?",
    answers: [
      {
        answerHU: "A betakarítási időszakhoz (őszi mulatság)",
        answerDE: "Der Erntezeit (herbstliche Feier)",
        isCorrect: true,
      },
      {
        answerHU: "A karácsony előtti időszakhoz",
        answerDE: "Zur Vorweihnachtszeit",
        isCorrect: false,
      },
      {
        answerHU: "Húsvéti locsolkodáshoz",
        answerDE: "Zum Osterbesprengen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Nem kimondottan egy adott ünnep, hanem a krumpliból készült görhöny étel ünnepe. Szabolcsban rendeznek kóstolóval összekötött fesztivált.",
    explanationDE:
      "Es bezieht sich nicht auf einen speziellen Festtag, sondern feiert das traditionelle Kartoffelgericht „görhöny“. In Szabolcs wird dazu ein Verköstigungsfestival veranstaltet.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi történik a 'bőgőtemetés' népszokás során?",
    questionDE: "Was geschieht beim Volksbrauch 'bőgőtemetés'?",
    answers: [
      {
        answerHU: "Farsang végén a nagybőgőt jelképesen eltemetik",
        answerDE:
          "Am Ende der Faschingszeit wird der Kontrabass symbolisch beerdigt",
        isCorrect: true,
      },
      {
        answerHU: "Húsvétkor a harangot elásva locsolnak",
        answerDE: "Zu Ostern wird mit vergrabener Glocke besprengt",
        isCorrect: false,
      },
      {
        answerHU: "Karácsonykor ajándékos ládát temetnek el",
        answerDE: "Zu Weihnachten wird eine Geschenkebox vergraben",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A farsang végén tréfás szertartással “eltemetik” a bőgőt. A mulatság lezárása, búcsú a zenés mulatozástól, majd következik a böjti idő.",
    explanationDE:
      "Beim „bőgőtemetés“ am Ende des Faschings wird symbolisch der Kontrabass beerdigt. Eine spaßige Zeremonie, die das ausgelassene Musizieren verabschiedet, bevor die Fastenzeit beginnt.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mit csinálnak a mohácsi 'bölcsőtáncoltatás' keretében?",
    questionDE: "Was geschieht beim mohácsi Brauch des 'Bölcsőtáncoltatás'?",
    answers: [
      {
        answerHU: "Kisbabát ringatnak népdalokkal kísérve",
        answerDE: "Ein Baby wird unter Begleitung von Volksliedern gewiegt.",
        isCorrect: true,
      },
      {
        answerHU: "Farsangi maszkokat készítenek",
        answerDE: "Sie machen Karnevalsmasken",
        isCorrect: false,
      },
      {
        answerHU: "Húsvéti locsolást tartanak",
        answerDE: "Osterbesprengen findet statt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A gyermek születését ünneplik, a bölcsőt körbetáncolják. Szerencsét, áldást kívánnak az újszülöttnek, családi örömöt fejezve ki.",
    explanationDE:
      "Bei der „bölcsőtáncoltatás“ in Mohács tanzt man um die Wiege, um die Geburt eines Kindes zu feiern. Man wünscht Glück und Segen, ein Brauch voller familiärer Freude.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Milyen étellel kapcsolatos ünnep a 'dödöllefesztivál'?",
    questionDE:
      "Mit welchem Essen zusammenhängendes Fest ist das 'Dödölle-Festival'?",
    answers: [
      {
        answerHU: "Burgonyás étel, dödölle kóstoló",
        answerDE: "Ein Kartoffelgericht, bei dem 'Dödölle' verkostet wird",
        isCorrect: true,
      },
      {
        answerHU: "Birsalma kompót főző fesztivál",
        answerDE: "Quittenkompott-Kochfestival",
        isCorrect: false,
      },
      {
        answerHU: "Libamáj kóstoló",
        answerDE: "Gänseleberverkostung",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A dödöllével. Burgonya-liszt alapú zalai étel, fesztiválon kóstolják különféle változatait, helyi gasztronómiai hagyományt őrizve.",
    explanationDE:
      "Dieses Fest feiert die Speise „Dödölle“, ein regionales Kartoffel-Mehl-Gericht aus Zala. Man probiert dort vielfältige Variationen und wahrt altes kulinarisches Erbe.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi a 'fülöpölés' húsvéti népszokása?",
    questionDE: "Was ist der Osterbrauch 'fülöpölés'?",
    answers: [
      {
        answerHU: "Reggel zajkeltéssel ébresztik a falut, locsolni hívnak",
        answerDE:
          "Morgens wird das Dorf mit Lärm geweckt, um zum Osterbesprengen einzuladen",
        isCorrect: true,
      },
      {
        answerHU: "Gyümölcsfákra szalagokat kötnek",
        answerDE: "Sie binden Bänder an Obstbäume",
        isCorrect: false,
      },
      {
        answerHU: "Kacsákat engednek szabadon a folyóban",
        answerDE: "Enten werden im Fluss freigelassen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hangos, lármás húsvéti szokás, a legények zajt csapva hívják fel magukra a figyelmet. A locsolkodás előtti mulatság része.",
    explanationDE:
      "Das „Fülöpölés“ ist ein lauter Osterbrauch, bei dem Burschen mit Lärm durch den Ort ziehen, um auf sich aufmerksam zu machen, kurz vor dem traditionellen „Begießen“ (Locsolás).",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Melyik tájegységben terjedt el a 'kőttes tészta' húsvéti ajándékként?",
    questionDE:
      "In welcher Region verbreitete sich der 'kőttes tészta' als Ostergeschenk?",
    answers: [
      {
        answerHU: "Az Őrségben",
        answerDE: "In der Őrség",
        isCorrect: true,
      },
      {
        answerHU: "A Székelyföldön",
        answerDE: "Im Szeklerland",
        isCorrect: false,
      },
      {
        answerHU: "A Hajdúságban",
        answerDE: "In der Hajdúság",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Az Őrségben. Kelt, édes “kőttes” tésztát sütnek, gyakran ajándékba adják a locsolásért cserébe, helyi hagyomány.",
    explanationDE:
      "In der Region Őrség ist es Brauch, „kőttes tészta“ (ein süßes Hefeteiggebäck) an Ostern zu backen und es den Wassersprengern (Locsolók) als Geschenk zu geben.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Melyik táncstílus jellemzi a 'kalocsai pingált' motívumokkal díszített népviseletet?",
    questionDE:
      "Welcher Tanzstil charakterisiert die Volkstracht mit 'kalocsai bemalter' Mustern?",
    answers: [
      {
        answerHU: "A csárdás és ugrós táncok",
        answerDE: "Csárdás und Springtänze",
        isCorrect: true,
      },
      {
        answerHU: "Legényes tánc",
        answerDE: "Legényes-Tanz",
        isCorrect: false,
      },
      {
        answerHU: "Rumba átdolgozás",
        answerDE: "Rumba-Bearbeitung",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Élénk, színes néptáncok (pl. kalocsai tánc), amelyek harmonizálnak a pingált hímzések vidám, gazdag színvilágával.",
    explanationDE:
      "Lebhafte ungarische Volkstänze, besonders der „Kalocsa-Tanz“, begleiten die kunterbunt bestickte Tracht. Die peppigen Farben harmonieren mit der dynamischen Tanzbewegung.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Mikor esedékes a 'barkóság vendégül látása' Rimócon, és miért?",
    questionDE:
      "Wann findet das 'Empfangen der Barkóság' in Rimóc statt und wozu?",
    answers: [
      {
        answerHU: "Farsangkor, a szomszédos falvak fiataljai mulatnak együtt",
        answerDE:
          "Während des Faschings feiern die jungen Leute aus den Nachbardörfern gemeinsam.",
        isCorrect: true,
      },
      {
        answerHU: "Pünkösdkor, a házaknál lánykéréssel",
        answerDE: "Zu Pfingsten, Hausbesuche mit Heiratsanträgen",
        isCorrect: false,
      },
      {
        answerHU: "Karácsony előtt, a betlehemessel",
        answerDE: "Vor Weihnachten, mit dem Krippenspiel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Farsang idején. A rimóci farsang része, mikor a “barkók” vendégeskednek, erősítve a palóc kulturális kapcsolatokat.",
    explanationDE:
      "Zur Faschingszeit in Rimóc. Dann werden die „Barkó“ feierlich empfangen – ein Brauch zur Stärkung der palózischen Kulturbeziehungen während des Karnevals.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mi történik a 'komatál' átadásakor?",
    questionDE: "Was geschieht bei der Übergabe des 'komatál'?",
    answers: [
      {
        answerHU: "Ételküldés, a barátság jelképeként.",
        answerDE: "Das Senden von Speisen als Symbol der Freundschaft.",
        isCorrect: true,
      },
      {
        answerHU: "Terményeket adnak a templom részére.",
        answerDE: "Sie geben Feldfrüchte für die Kirche.",
        isCorrect: false,
      },
      {
        answerHU: "Újszülött gyermeket mutatnak be.",
        answerDE: "Ein neugeborenes Kind wird vorgestellt.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Étellel teli tálat ajándékoznak a “komának” vagy barátnak, a közösségi kötelékek erősítésére. Általában ünnepi alkalomhoz kapcsolódik.",
    explanationDE:
      "Beim „Komatál“ schenkt man eine Schüssel mit Speisen an einen Taufpaten oder Freund. Es fördert den Gemeinschaftssinn und geschieht oft zu festlichen Anlässen.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Mely ünnephez fűződik a 'borszentelés' hagyománya a Dunántúlon?",
    questionDE:
      "Mit welchem Fest ist der Brauch des 'Weinsegnens' im Transdanubien verbunden?",
    answers: [
      {
        answerHU: "Szent Vince nap (január 22.)",
        answerDE: "Am Vincetag (22. Januar)",
        isCorrect: true,
      },
      {
        answerHU: "Szent Márton nap (november 11.)",
        answerDE: "Martinstag (11. November)",
        isCorrect: false,
      },
      {
        answerHU: "Pünkösdhétfő",
        answerDE: "Pfingstmontag",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szent Márton (nov. 11.) vagy Szent Vince (jan. 22.) napjához. A bor megáldása, a jó termés és minőségi bor reményére.",
    explanationDE:
      "Dieser Brauch des „Weinsegnens“ wird in Westungarn am Martinstag (11.11.) oder am Vinzenztag (22.1.) begangen. Man bittet um reichen Ertrag und Qualität für den Wein.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Mit űzik el a 'kiszézést' az Alföldön?",
    questionDE: "Was wird durch das 'Kiszézés' in der Tiefebene verjagt?",
    answers: [
      {
        answerHU: "Egy szalmabáb égetésével, hogy elűzzék a telet",
        answerDE:
          "Mit Verbrennung einer Strohpuppe, um den Winter zu vertreiben.",
        isCorrect: true,
      },
      {
        answerHU: "Vízbe dobják a sós lisztet",
        answerDE: "Sie werfen das gesalzene Mehl ins Wasser",
        isCorrect: false,
      },
      {
        answerHU: "Férfiak kardokkal masíroznak",
        answerDE: "Männer marschieren mit Schwertern",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A telet. A kiszebáb-égetés során a rossz dolgoktól is megszabadulnak, élénk zajkeltéssel várják a tavasz beköszöntét, vidám, farsangi szertartás.",
    explanationDE:
      "Man vertreibt den Winter („kiszézés“) in der Alföld, indem man eine Strohpuppe verbrennt und lauten Lärm macht. So feiert man eine fröhliche Faschingszeremonie zur Frühlingsankunft.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Melyik magyarországi népszokás kapcsolódik a csónakban való 'gyertyás ringatáshoz' a folyókon?",
    questionDE:
      "Welcher ungarische Volksbrauch ist mit dem 'Kerzenschaukeln' in Booten auf Flüssen verbunden?",
    answers: [
      {
        answerHU: "Az ún. vízi betlehemezés adventkor",
        answerDE: "Das sogenannte Wasserkrippenspiel im Advent",
        isCorrect: true,
      },
      {
        answerHU: "A szenteltvíz merítés húsvétkor",
        answerDE: "Schöpfen von Weihwasser zu Ostern",
        isCorrect: false,
      },
      {
        answerHU: "A 'pásztorjárás' pünkösd idején",
        answerDE: "Das 'Hirtenlaufen' zu Pfingsten",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bizonyos adventi betlehemezéseknél. Gyertyával kivilágított csónakok ringanak a vízen, hangulatos, ritkább szokás.",
    explanationDE:
      "Bei manchen Adventskrippenspielen fährt man in Kerzenbooten auf dem Fluss. Dieser feierliche Brauch schafft eine stimmungsvolle Adventsatmosphäre, ist aber eher selten.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Mit jelképez a 'táncos komámasszony búcsúja' a lakodalom végén?",
    questionDE:
      "Was symbolisiert der Abschied der tanzenden Komámasszony am Ende der Hochzeit?",
    answers: [
      {
        answerHU: "A menyasszony elköszönését a leányélettől",
        answerDE: "Den Abschied der Braut vom Junggesellinnenleben",
        isCorrect: true,
      },
      {
        answerHU: "A férj családjának beköltözését",
        answerDE: "Den Einzug der Familie des Ehemanns",
        isCorrect: false,
      },
      {
        answerHU: "A húsvéti időszak lezárását",
        answerDE: "Der Abschluss der Osterzeit",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A menyegző mulatság hivatalos lezárását. A komámasszony búcsúja a vidám tánc végső akkordja, a lakodalom végeztét jelöli.",
    explanationDE:
      "Damit wird das Hochzeitsfest förmlich beendet. Der Abschied der „Tanz-Komámasszony“ markiert den letzten Tanz und signalisiert das Ende der Hochzeitsfeier.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Miből áll a 'konkolybálás' régi falusi mulatság a Dunántúlon?",
    questionDE:
      "Worin besteht das alte Dorffest 'Konkolybálás' in Transdanubien?",
    answers: [
      {
        answerHU: "A legények éjjel konkolyt szórnak a lányos házak udvarára",
        answerDE:
          "Die Burschen streuen nachts Lolchsamen in die Höfe von Häusern, in denen Mädchen wohnen.",
        isCorrect: true,
      },
      {
        answerHU: "Lánykérés a kocsmában éjfélkor",
        answerDE: "Heiratsantrag in der Kneipe um Mitternacht",
        isCorrect: false,
      },
      {
        answerHU: "Hatalmas bográcsozás a főtéren",
        answerDE: "Riesen-Kesselgulasch auf dem Hauptplatz",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tréfás bosszantás a lányos házzal szemben farsang idején. A legények eltorlaszolják a kaput, vicces rendbontással búcsúznak a farsangtól.",
    explanationDE:
      "Diese alte Dorfsitte im Transdanubien umfasst scherzhafte Streiche gegen Häuser mit Töchtern. Die Burschen verbarrikadieren oft das Tor, ein neckischer Faschingsspaß.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Melyik szokást őrzik a 'Juhászéj' rendezvényen az Alföldön?",
    questionDE:
      "Welchen Brauch bewahrt man bei der 'Hirtennacht' in der Tiefebene?",
    answers: [
      {
        answerHU: "A juhászok tavaszi számadását és éjszakai őrködését",
        answerDE:
          "Den Frühjahrsabschluss der Schäfer und ihre nächtliche Wache",
        isCorrect: true,
      },
      {
        answerHU: "A halászok téli hálófoltozását",
        answerDE: "Die winterliche Netzreparatur der Fischer",
        isCorrect: false,
      },
      {
        answerHU: "A szénégetők éves nyereségosztását",
        answerDE: "Die jährliche Gewinnbeteiligung der Köhler",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A hagyományos pásztoréletet. A juhászkultúra bemutatása, éjszakai mulatságok és bemutatók keltik életre az alföldi pásztorhagyományt.",
    explanationDE:
      "Bei der „Juhászéj“ (Hirtennacht) feiert man die traditionelle Schäferkultur der Tiefebene. Nachtfeste und Vorführungen präsentieren das Lebensgefühl und Brauchtum der Hirten.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Milyen szerepet tölt be a 'rekecsini duda' a moldvai csángó hagyományban?",
    questionDE:
      "Welche Rolle spielt der 'rekecsini duda' in der Tradition der Moldauer Tschango?",
    answers: [
      {
        answerHU: "Zenekíséret táncokhoz és énekekhez",
        answerDE: "Musikalische Begleitung für Tänze und Lieder",
        isCorrect: true,
      },
      {
        answerHU: "Vízben halriasztásra használják",
        answerDE: "Im Wasser zur Fischscheuche verwendet",
        isCorrect: false,
      },
      {
        answerHU: "Csak temetéseken fújják",
        answerDE: "Man spielt sie nur bei Beerdigungen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hagyományos dudahangszer, kíséri a táncokat és szertartásokat. Egyedi hangzása kiemelkedő a csángó népzenében.",
    explanationDE:
      "Der „Rekecsin-Dudelsack“ ist im csángóischen Brauchtum bedeutsam. Er begleitet Tänze und Riten und besticht mit seinem unverwechselbaren Klang in der moldauischen Volksmusik.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU: "Miben áll az 'összetáncolás' szokása a Sárközben?",
    questionDE: "Worin besteht der Brauch des 'Zusammentanzens' im Sárköz?",
    answers: [
      {
        answerHU: "A fiatal párok nyilvánosan táncolnak, jelezve eljegyzésüket",
        answerDE:
          "Junge Paare tanzen öffentlich, um ihre Verlobung bekannt zu machen.",
        isCorrect: true,
      },
      {
        answerHU: "Gyászjelentést olvasnak fel tánc közben",
        answerDE: "Sie lesen eine Todesanzeige während des Tanzens vor",
        isCorrect: false,
      },
      {
        answerHU: "A gyerekeket avatják be a felnőttbálba",
        answerDE: "Die Kinder werden in den Erwachsenenball eingeführt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Fiatalok táncával indul a párválasztás. A sárközi összetáncolás jelzi a közeledést, a közösségben hivatalossá téve a kapcsolatot.",
    explanationDE:
      "Die Sitte des „Zusammentanzens“ in der Sárköz-Region dient der Partnerfindung. Junge Leute tanzen öffentlich, um ihre Verbindung zu bekunden und in die Gemeinschaft einzutreten.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Milyen rítust tartanak a 'Nádasdi évbúcsúztató' keretében az Őrségben?",
    questionDE:
      "Welche Zeremonie findet beim 'Nádasdi Jahresabschied' in der Őrség statt?",
    answers: [
      {
        answerHU: "Fáklyás felvonulást és éjszakai éneklést szilveszterkor",
        answerDE: "Einen Fackelumzug und nächtliches Singen an Silvester",
        isCorrect: true,
      },
      {
        answerHU: "Pásztortűz rakást húsvétkor",
        answerDE: "Hirtenfeuer zu Ostern anzünden",
        isCorrect: false,
      },
      {
        answerHU: "Babonás gyümölcsfa-ültetést pünkösdkor",
        answerDE: "Abergläubische Obstbaumpflanzung zu Pfingsten",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hagyományos, ünnepi összejövetelt az óév lezárására. Népszokásokkal köszönnek el az esztendőtől, vidám és közösségépítő formában.",
    explanationDE:
      "Bei der „Nádasd-Jahresverabschiedung“ in der Őrség begeht man einen folkloristischen Brauch zum Ende des alten Jahres. Eine fröhliche, gemeinschaftsstärkende Tradition.",
  },
  {
    category: "Traditionen",
    level: 3,
    questionHU:
      "Hol és mikor gyakorolják a 'rongyosbál' nevű jelmezes mulatságot?",
    questionDE:
      "Wo und wann wird der sogenannte 'Rongyosbál' (Fetzenball) gefeiert?",
    answers: [
      {
        answerHU: "A farsang vége felé, főleg a Bakony falvaiban",
        answerDE: "Gegen Ende des Faschings, vor allem in Dörfern des Bakony",
        isCorrect: true,
      },
      {
        answerHU: "Karácsony második napján, a Mátrában",
        answerDE: "Am zweiten Weihnachtsfeiertag, im Mátra-Gebirge",
        isCorrect: false,
      },
      {
        answerHU: "Húsvét kedden, a Balaton-parton",
        answerDE: "Osterdienstag, am Plattenseeufer",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Farsang végén. Régi, szakadt ruhákban mulatnak, tréfásan búcsúzva a téltől. Falvakban és kisebb városokban él a hagyomány.",
    explanationDE:
      "Der „Rongyosbál“ (Fetzenball) findet am Ende der Faschingszeit statt. Die Leute feiern in alten, abgetragenen Kleidern als vergnüglichen Abschied vom Winter, vor allem in Dörfern.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a 'Tarhonya'?",
    questionDE: "Was ist 'Tarhonya'?",
    answers: [
      {
        answerHU: "Rizs helyettesítője",
        answerDE: "Reisersatz",
        isCorrect: false,
      },
      {
        answerHU: "Kis granulált tészta",
        answerDE: "Kleine granulierte Pasta",
        isCorrect: true,
      },
      {
        answerHU: "Kukoricadara",
        answerDE: "Maisgrieß",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Durvára tört, szárított tésztaféle, gyakori magyar köret. Pirítással is készítik, számos pörkölthöz, egytálételhez kiváló, hagyományos alapanyag.",
    explanationDE:
      "„Tarhonya“ ist eine grobkörnige Nudelform, oft angebraten und als traditionelle Beilage zu Pörkölt oder Eintopf. Sie ist weit verbreitet in der ungarischen Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a 'puliszka' és melyik területen népszerű?",
    questionDE: "Was ist 'Puliska' und in welcher Region ist es beliebt?",
    answers: [
      {
        answerHU: "Búzakása Nyugat-Magyarországon",
        answerDE: "Weizenbrei in Westungarn",
        isCorrect: false,
      },
      {
        answerHU: "Kukoricadara, Erdélyben.",
        answerDE: "Maisgrieß in Siebenbürgen",
        isCorrect: true,
      },
      {
        answerHU: "Árpakása a Dunántúlon",
        answerDE: "Gerstenbrei in Transdanubien",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kukoricadarából készült kása, főként Erdélyben. Hasonlít a román mămăligára, sósan vagy édesen is fogyasztják, erdélyi konyha alapfogása.",
    explanationDE:
      "„Puliszka“ ist ein Maisbrei, besonders in Siebenbürgen verbreitet. Ähnlich der rumänischen Mămăligă, wird er sowohl süß als auch herzhaft in der dortigen Küche zubereitet.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a jellegzetes körete a 'Brassói aprópecsenyének'?",
    questionDE: "Welche typische Beilage hat die 'Brassói aprópecsenye'?",
    answers: [
      {
        answerHU: "Stefánia rizs",
        answerDE: "Stefania-Reis",
        isCorrect: false,
      },
      {
        answerHU: "Ropogós krumplikockák",
        answerDE: "Knusprige Kartoffelwürfel",
        isCorrect: true,
      },
      {
        answerHU: "Zöldborsófőzelék",
        answerDE: "Grüne Erbsensuppe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Fokhagymás-sült krumpli kockák. A fűszeres sertéshús mellé ez a ropogós krumpli adja a jellegzetes ízhatást, hagyományos fogásként.",
    explanationDE:
      "Typische Beilage der „Brassói aprópecsenye“ sind in Knoblauch gebratene Kartoffelwürfel. Sie ergänzen das würzige Schweinefleisch zu einem klassisch-ungarischen Gericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik híres borvidékéről ismert a 'Tokaji aszú'?",
    questionDE: "Für welches Weinbaugebiet ist der 'Tokaji Aszú' berühmt?",
    answers: [
      {
        answerHU: "Villányi borvidék",
        answerDE: "Weinregion Villány",
        isCorrect: false,
      },
      {
        answerHU: "Tokaj-Hegyalja",
        answerDE: "Tokaj-Hegyalja",
        isCorrect: true,
      },
      {
        answerHU: "Badacsonyi borvidék",
        answerDE: "Weinregion Badacsony",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Természetesen a Tokaji borvidékről. Világhírű desszertbor, „a borok királya, királyok bora” néven is emlegetik, édesség és savharmónia jellemzi.",
    explanationDE:
      "Der „Tokajer Aszú“ kommt aus dem gleichnamigen Weingebiet. Ein weltberühmter Süßwein, genannt „König der Weine, Wein der Könige“, mit ausgewogener Süße und Säure.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a különlegessége a 'törkölypálinkának'?",
    questionDE: "Was ist das Besondere am 'Törkölypálinka'?",
    answers: [
      {
        answerHU: "Szőlőtörkölyből készült párlat",
        answerDE: "Ein aus Weintrester gebrannter Schnaps",
        isCorrect: true,
      },
      {
        answerHU: "Málnaárnyalatú ízvilág",
        answerDE: "Himbeerfarbenes Geschmacksprofil",
        isCorrect: false,
      },
      {
        answerHU: "Kizárólag császárral készítik",
        answerDE: "Wird ausschließlich mit Kaisergranat zubereitet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szőlőtörkölyből készül, erős és aromás párlat. A bortermelés melléktermékét használja fel, fontos része a magyar pálinkakultúrának.",
    explanationDE:
      "Der „Törkölypálinka“ entsteht aus Trester (Weinpressrückständen) und ist ein kräftig-aromatischer Brand. Er nutzt die Nebenprodukte der Weinherstellung, ein wichtiger Bestandteil der ungarischen Pálinka-Tradition.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Miben rejlik a 'csabai kolbász' különlegessége?",
    questionDE: "Worin liegt die Besonderheit der 'Csabai Kolbász'?",
    answers: [
      {
        answerHU: "Extra füstölt ízvilág",
        answerDE: "Intensiver Rauchgeschmack",
        isCorrect: false,
      },
      {
        answerHU: "Egyedi fűszerkeverék és EU védjegy",
        answerDE: "Einzigartige Gewürzmischung und EU-Schutzzeichen",
        isCorrect: true,
      },
      {
        answerHU: "Csak sertéshúsból készül",
        answerDE: "Wird nur aus Schweinefleisch zubereitet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Fűszeres, paprikás kolbász, Békéscsabáról. Védett eredetű termék, erős ízét a fokhagyma, kömény és a minőségi alapanyagok adják.",
    explanationDE:
      "Die „Csabai Kolbász“ stammt aus Békéscsaba. Sie ist papriziert, würzig, von geschützter Herkunft und erhält ihren kräftigen Geschmack durch Knoblauch, Kümmel und hochwertige Zutaten.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Mi a 'töltött káposzta' erdélyi változatának fő jellegzetessége?",
    questionDE:
      "Was ist das Hauptmerkmal der Siebenbürger Variante von 'Töltött káposzta'?",
    answers: [
      {
        answerHU: "Savanyú káposzta, füstölt hússal ízesítve.",
        answerDE: "Sauerkraut, mit geräuchertem Fleisch verfeinert.",
        isCorrect: true,
      },
      {
        answerHU: "Édes káposztából, cukorral.",
        answerDE: "Aus süßem Kohl, mit Zucker.",
        isCorrect: false,
      },
      {
        answerHU: "Kizárólag halhússal töltve.",
        answerDE: "Ausschließlich mit Fischfleisch gefüllt.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Füstölt hús és tejföl is kerül bele. Savanyú káposzta leveleiben hústöltelék, tejföllel tálalva, erdélyi ízekkel gazdagítva.",
    explanationDE:
      "Die Siebenbürger (Erdélyer) Variante des gefüllten Krauts enthält geräuchertes Fleisch und oft Sauerrahm. Sauerkrautblätter mit Fleischfüllung, ein typisches erdélyisches Aroma.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Hogyan fogyasztják tradicionálisan a 'fröccsöt'?",
    questionDE: "Wie trinkt man den 'Fröccs' traditionell?",
    answers: [
      {
        answerHU: "Bor és szódavíz keveréke különféle arányokban",
        answerDE:
          "Wein mit Sodawasser in unterschiedlichen Mischungsverhältnissen",
        isCorrect: true,
      },
      {
        answerHU: "Kávé és pálinka összeöntve",
        answerDE: "Kaffee und Schnaps zusammengegossen",
        isCorrect: false,
      },
      {
        answerHU: "Sör és limonádé vegyítve",
        answerDE: "Biermischung mit Limonade",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bor és szódavíz keverékeként. Arányuk változó, de mindig frissítő ital, nyáron különösen népszerű, hagyományos magyar “spritzer”.",
    explanationDE:
      "Traditionell wird „Fröccs“ aus Wein und Sodawasser gemischt. Die Mischverhältnisse variieren, doch ist es ein erfrischendes Sommergetränk und eine typische ungarische Spezialität.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik híres édességet készítik 'Dobos C. József' receptje alapján?",
    questionDE:
      "Welches berühmte Dessert wird nach dem Rezept von 'Dobos C. József' hergestellt?",
    answers: [
      {
        answerHU: "Dobos torta",
        answerDE: "Dobos-Torte",
        isCorrect: true,
      },
      {
        answerHU: "Rákóczi túrós",
        answerDE: "Rákóczi-Quarkauflauf",
        isCorrect: false,
      },
      {
        answerHU: "Somlói galuska",
        answerDE: "Schomlauer Nockerln",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Dobos tortát. Többrétegű piskóta csokoládékrémmel, karamellbevonattal a tetején, 1884-ben vált cukrászati különlegessé.",
    explanationDE:
      "Die „Dobos-Torte“ basiert auf dem Rezept von József C. Dobos: Mehrschichtige Biskuitböden mit Schokoladencreme und karamellisierter Zuckerglasur obendrauf, 1884 kreiert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Milyen formában kerül a tányérra a 'Stefánia vagdalt'?",
    questionDE: "In welcher Form wird 'Stefánia vagdalt' serviert?",
    answers: [
      {
        answerHU: "Tojással töltött fasírtként",
        answerDE: "Als mit Eiern gefüllter Hackbraten",
        isCorrect: true,
      },
      {
        answerHU: "Leveles tésztába csomagolt húsroládként",
        answerDE: "Als Fleischroulade in Blätterteig eingewickelt",
        isCorrect: false,
      },
      {
        answerHU: "Csak halból készített pástétomként",
        answerDE: "Nur als Fischpastete zubereitet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Szeletelve, közepén főtt tojás látszik. Fasírozott szerű, de a tojással egyedi látvány és íz, melegen és hidegen is tálalható.",
    explanationDE:
      "Die „Stefánia-Faschierte Rolle“ wird in Scheiben serviert, mit gekochtem Ei in der Mitte. Warm oder kalt verzehrbar, optisch reizvoll, ähnlich einem Hackbraten mit Überraschung.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a fő alapja a 'pacalpörköltnek'?",
    questionDE: "Was ist die Hauptzutat des 'Pacalpörkölt'?",
    answers: [
      {
        answerHU: "Marha gyomor (pacal) paprikásan főzve",
        answerDE: "Rindermagen (Kutteln) in Paprika gekocht",
        isCorrect: true,
      },
      {
        answerHU: "Csirkeszív, csirkemáj",
        answerDE: "Hähnchenherz, Hähnchenleber",
        isCorrect: false,
      },
      {
        answerHU: "Kagylóhús zöldségekkel",
        answerDE: "Muschelfleisch mit Gemüse",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A pacal (marhabendő). Hosszan főzik paprikás raguval, karakteres ízű különlegesség, a magyar konyha pikáns, hagyományos étele.",
    explanationDE:
      "Hauptzutat des „Pacalpörkölt“ ist Kutteln (Rindermagen). Langsam in Paprikasauce gegart, würzig und typisch für die ungarische Küche, ein kräftiges Traditionsgericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mivel töltik leggyakrabban a magyar palacsintát?",
    questionDE:
      "Was ist die typische Füllung für ungarische „Palacsinta“ (Pfannkuchen)?",
    answers: [
      {
        answerHU: "Darált hús",
        answerDE: "Hackfleisch",
        isCorrect: false,
      },
      {
        answerHU: "Édes túró vagy lekvár",
        answerDE: "Süßer Quark oder Marmelade",
        isCorrect: true,
      },
      {
        answerHU: "Pikáns mustár",
        answerDE: "Pikanter Senf",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Lekvárral vagy túróval. Ezek a legismertebb töltelékek, de sok variáció létezik, édesen és sósan is készíthető, kedvelt desszert.",
    explanationDE:
      "Am häufigsten füllt man ungarische Pfannkuchen mit Marmelade oder Quark. Es gibt viele Varianten, ob süß oder herzhaft, doch diese Füllungen sind besonders populär.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi az a „körözött”?",
    questionDE: "Was ist das „körözött”?",
    answers: [
      {
        answerHU: "Édes lekvár",
        answerDE: "Süße Konfitüre/Marmelade",
        isCorrect: false,
      },
      {
        answerHU: "Körözött, túrós-paprikás kence",
        answerDE: "Körözött, Quark-Paprika-Aufstrich",
        isCorrect: true,
      },
      {
        answerHU: "Csokoládépuding",
        answerDE: "Schokoladenpudding",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Túróból, vajból, fűszerpaprikából és hagymából készült krém. Kenyérre kenik, hideg ételként fogyasztják, jellegzetes paprikás ízzel.",
    explanationDE:
      "„Körözött“ ist ein Aufstrich aus Quark, Butter, Paprikapulver und Zwiebel. Man genießt ihn kalt auf Brot – typisch ungarisch mit Paprikanote.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik összetevő jellemző az „Esterházy-tortára”?",
    questionDE: "Welche Zutat ist für „Esterházy-Torte“ typisch?",
    answers: [
      {
        answerHU: "Pisztácia és habcsók",
        answerDE: "Pistazien und Baiser",
        isCorrect: false,
      },
      {
        answerHU: "Dió és jellegzetes cukormáz",
        answerDE: "Walnuss und charakteristische Glasur",
        isCorrect: true,
      },
      {
        answerHU: "Kókuszreszelék és kakaópor",
        answerDE: "Kokosraspeln und Kakaopulver",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Diós lapok és jellegzetes pókhálós cukormáz. Krémes rétegekkel készül, elegáns megjelenésű, népszerű magyar tortaspecialitás.",
    explanationDE:
      "Kennzeichnend für die Esterházy-Torte sind dünne Nussbiskuitschichten und die typische Zuckerglasur mit Spinnennetzmuster. Ein edler, beliebter Klassiker der ungarischen Konditorei.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a „Bácskai rizses hús” különlegessége?",
    questionDE: "Was ist das Besondere an „Bácskai rizses hús“?",
    answers: [
      {
        answerHU: "Édességként fogyasztják",
        answerDE: "Es wird als Dessert serviert",
        isCorrect: false,
      },
      {
        answerHU: "Paprikás rizses egytál, füstölt szalonnával",
        answerDE: "Paprikareis-Eintopf, mit geräuchertem Speck",
        isCorrect: true,
      },
      {
        answerHU: "Kizárólag halból készül",
        answerDE: "Wird ausschließlich aus Fisch zubereitet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Paprikás, hagymás alapon készült rizses és húsos egytálétel. A Bácskából ered, gazdag, fűszeres fogás, kolbásszal vagy szalonnával is készítik.",
    explanationDE:
      "Das „Bácskai rizses hús“ ist ein eintopfartiges Reis-Fleisch-Gericht in Paprika-Zwiebel-Basis. Es stammt aus der Region Batschka, ist würzig und kann mit Speck oder Wurst verfeinert werden.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen tésztaételről van szó, amit olajban sütnek, majd fokhagymával megkennek?",
    questionDE:
      "Wie nennt man den dünnen Teig, der in Öl ausgebacken und oft mit Knoblauch bestrichen wird?",
    answers: [
      {
        answerHU: "Lepény",
        answerDE: "Fladenbrot",
        isCorrect: false,
      },
      {
        answerHU: "Lángos",
        answerDE: "Lángos",
        isCorrect: true,
      },
      {
        answerHU: "Körözött",
        answerDE: "Liptauer Käse",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A lángosról. Kelt tésztát forró olajban sütnek, általában fokhagymával, tejföllel, sajttal fogyasztják, közkedvelt street food.",
    explanationDE:
      "Das ist der „Lángos“. Ein Hefeteig, in heißem Öl ausgebacken, traditionell mit Knoblauch, Sauerrahm und Käse bestrichen – ein beliebtes ungarisches Streetfood.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Miből készül a „grízgaluska-leves”?",
    questionDE: "Woraus besteht „Grízgaluska-Leves“?",
    answers: [
      {
        answerHU: "Almából és fahéjból készül.",
        answerDE: "Sie wird aus Äpfeln und Zimt gemacht.",
        isCorrect: false,
      },
      {
        answerHU: "Búzadara és húsleves az alapja.",
        answerDE: "Grieß und Fleischsuppe sind die Basis.",
        isCorrect: true,
      },
      {
        answerHU: "Csokoládéból és tejszínből.",
        answerDE: "Aus Schokolade und Sahne.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A grízgaluskát tojás és búzadara keverékéből formálják, levesben főzik meg. Lágy, levegős galuskák, gyakran húslevesben tálalják.",
    explanationDE:
      "Die „Grießnockerlsuppe“ verwendet Nockerl aus Ei und Grieß, die in Brühe gegart werden. Sie sind weich und locker, oft serviert in einer klaren Fleischsuppe.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik desszert az „aranygaluska”?",
    questionDE: "Welche Süßspeise nennt man „Aranygaluska“?",
    answers: [
      {
        answerHU: "Egy kockás piskóta kakaóval",
        answerDE: "Ein würfelförmiger Schokobiskuit",
        isCorrect: false,
      },
      {
        answerHU: "Édes kelt tésztagolyók dióval, vaníliasodóval",
        answerDE: "Süße Hefeteigkugeln mit Walnuss, Vanillesauce",
        isCorrect: true,
      },
      {
        answerHU: "Mézeskalács díszekkel",
        answerDE: "Lebkuchendekoration",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kelt tésztából golyókat sütnek dióval rétegezve, vaníliasodóval öntik le. Édes, foszlós, különleges, gyakran ünnepi alkalmakkor készül.",
    explanationDE:
      "„Aranygaluska“ besteht aus Hefeteigbällchen, geschichtet mit Nüssen und serviert mit Vanillesoße. Ein süßes, weiches Dessert, oft zu festlichen Anlässen zubereitet.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik magyar fogás ismert „paprikás rizses hús” néven, ami a Batschka-vidékről ered?",
    questionDE:
      "Welche Speise ist unter dem Namen ‚paprikás rizses hús‘ bekannt und stammt aus der Batschka-Region?",
    answers: [
      {
        answerHU: "Halászlé halfilékkel",
        answerDE: "Fischsuppe mit Filets",
        isCorrect: false,
      },
      {
        answerHU: "Paprikás rizses egytálétel",
        answerDE: "Paprikareis-Eintopfgericht",
        isCorrect: true,
      },
      {
        answerHU: "Édes rétes fahéjjal",
        answerDE: "Süßer Strudel mit Zimt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A bácskai rizses hús. Paprikás alap, rizs és fűszeres húskockák szalonnával, a Bácska öröksége a magyar konyhában.",
    explanationDE:
      "Das „Bácskai rizses hús“ ist jenes „paprikás Reisfleisch“ aus der Batschka. Reis, gewürzte Fleischwürfel und Speck in Paprikabasis, ein Erbe der ungarischen Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Miből készül a Jókai bableves, és milyen különlegesség fűzi a nevét ehhez az ételhez?",
    questionDE:
      "Woraus wird der Jókai-Bohneneintopf zubereitet und was macht ihn besonders, dass er nach Jókai benannt wurde?",
    answers: [
      {
        answerHU: "Fehérbab, füstölt hús és hagyományos fűszeres alaplé",
        answerDE:
          "Weiße Bohnen, geräuchertes Fleisch und traditionelle gewürzte Brühe",
        isCorrect: true,
      },
      {
        answerHU: "Fehérbab, friss sertéshús és zöldséges alaplé",
        answerDE: "Weiße Bohnen, frisches Schweinefleisch und Gemüsebrühe",
        isCorrect: false,
      },
      {
        answerHU: "Vörösbab, füstölt hús és paradicsomalapú lé",
        answerDE: "Rote Bohnen, geräuchertes Fleisch und tomatenbasierte Brühe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Bab, füstölt hús, zöldségek. Jókai Mór kedvelte, róla nevezték el ezt a tartalmas, paprikás, tejfölös leveskülönlegességet.",
    explanationDE:
      "Der „Jókai-Bohneneintopf“ enthält Bohnen, geräuchertes Fleisch und Gemüse. Benannt nach dem Schriftsteller Mór Jókai, der diesen würzigen, paprikanotenreichen Rahmeintopf schätzte.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Milyen töltelékek jellemzőek a hagyományos magyar rétesre?",
    questionDE:
      "Welche Füllungen sind typisch für den traditionellen ungarischen Strudel?",
    answers: [
      {
        answerHU: "Alma, túró, dió és mák",
        answerDE: "Apfel, Quark, Walnüsse und Mohn",
        isCorrect: true,
      },
      {
        answerHU: "Körte, dió és fahéjas krém",
        answerDE: "Birne, Walnuss und Zimtcreme",
        isCorrect: false,
      },
      {
        answerHU: "Szilva, meggy és vaníliás puding",
        answerDE: "Pflaume, Sauerkirsche und Vanillepudding",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Alma, túró, mák, dió. Vékony nyújtott tésztába töltik, feltekerik és ropogósra sütik, sok változatban készítik ünnepekre is.",
    explanationDE:
      "Bei traditionellem ungarischem Strudel (Rétes) sind Apfel, Quark, Mohn, Nuss gängig. Man füllt sie in dünn ausgezogenen Teig, rollt ihn auf und backt ihn knusprig, meist auch zu Festen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyek a legismertebb magyar paprikafajták, és miben különböznek?",
    questionDE:
      "Welche sind die bekanntesten ungarischen Paprikasorten und worin unterscheiden sie sich?",
    answers: [
      {
        answerHU:
          "Édes és csípős paprika – intenzitásukban és hőmérsékletbeli különbségekben",
        answerDE:
          "Süße und scharfe Paprika – sie unterscheiden sich in Intensität und Schärfegrad.",
        isCorrect: true,
      },
      {
        answerHU:
          "Füstölt paprika és édes paprika – a feldolgozás módja alapján",
        answerDE:
          "Geräucherter Paprika und süßer Paprika – je nach Verarbeitungsmethode",
        isCorrect: false,
      },
      {
        answerHU: "Piros és zöld paprika – az érési fokuktól függően",
        answerDE: "Rote und grüne Paprika – je nach Reifegrad",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Édes és csípős változatok. Íz és erősség terén különböznek, a hazai konyha alapfűszerei, színük, formájuk is eltérő lehet.",
    explanationDE:
      "Bekannt sind die süßen und scharfen Paprikavarianten. Sie unterscheiden sich im Schärfegrad und Geschmack, sind Grundgewürze in Ungarn. Auch Farbe und Form variieren.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen eljárással készítik el a húsos lecsót a hagyományos magyar recept szerint?",
    questionDE:
      "Welches Verfahren wird zur Zubereitung des fleischhaltigen Lecsó nach traditionellem Rezept angewendet?",
    answers: [
      {
        answerHU:
          "Hagyományos főzés és párolás során a hús és zöldségek együtt érnek össze",
        answerDE:
          "Beim traditionellen Kochen und Dünsten verbinden sich Fleisch und Gemüse",
        isCorrect: true,
      },
      {
        answerHU:
          "Először a húst külön megsütik, majd a zöldségeket külön főzik és végül összekeverik",
        answerDE:
          "Zuerst wird das Fleisch separat gebraten, dann wird das Gemüse separat gekocht und schließlich zusammengeführt",
        isCorrect: false,
      },
      {
        answerHU:
          "A húsos lecsót grillezéssel készítik, majd friss zöldségekkel tálalják",
        answerDE:
          "Das Fleischlecsó wird gegrillt und dann mit frischem Gemüse serviert",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A paprikát, paradicsomot és húst lassan párolják, így az ízek jól összeérnek. Paprikás-hagymás alapon kezdik, majd készre főzik.",
    explanationDE:
      "Bei klassischem ungarischem „Lecsó“ werden Paprika, Tomaten und Fleisch in einer würzigen Zwiebel-Paprika-Basis langsam gedünstet, damit sich die Aromen gut verbinden.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen különbségek vannak a városi és vidéki magyar konyha elkészítési módszereiben?",
    questionDE:
      "Welche Unterschiede gibt es in den Zubereitungsmethoden der städtischen und ländlichen ungarischen Küche?",
    answers: [
      {
        answerHU:
          "A vidéki konyha továbbra is hagyományos, kézműves módszereket alkalmaz, míg a városi modern technikákat integrál",
        answerDE:
          "Die ländliche Küche verwendet weiterhin traditionelle, handwerkliche Methoden, während die städtische Küche moderne Techniken integriert",
        isCorrect: true,
      },
      {
        answerHU:
          "Mindkét területen egyre inkább modern technikák terjednek el, bár a vidéki receptek alapjai változatlanok",
        answerDE:
          "In beiden Bereichen setzen sich zunehmend moderne Techniken durch, obwohl die Grundlagen der ländlichen Rezepte unverändert bleiben",
        isCorrect: false,
      },
      {
        answerHU:
          "A városi konyha kizárólag nemzetközi recepteket alkalmaz, míg a vidéki csak hagyományos ételeket készít",
        answerDE:
          "Die städtische Küche verwendet ausschließlich internationale Rezepte, während die ländliche nur traditionelle Gerichte zubereitet",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A vidéki inkább hagyományos, egyszerűbb eszközökkel és régi technikákkal, a városi konyha új, innovatívabb megoldásokat is használ.",
    explanationDE:
      "Auf dem Land kocht man oft traditioneller und einfacher, mit altbewährten Techniken. In der Stadt fließen moderne, kreative Methoden ein, was zu innovativen Gerichten führt.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen szerepet játszanak az erdélyi receptek a magyar gasztronómiai örökségben?",
    questionDE:
      "Welche Rolle spielen die erdélyi Rezepte im ungarischen gastronomischen Erbe?",
    answers: [
      {
        answerHU:
          "Gazdagítják a konyha palettáját történelmi és kulturális értékükkel",
        answerDE:
          "Sie bereichern die Palette der Küche mit ihrem historischen und kulturellen Wert.",
        isCorrect: true,
      },
      {
        answerHU:
          "Bár fontosak, manapság ritkán alkalmazzák őket a modern éttermekben",
        answerDE:
          "Obwohl wichtig, werden sie heutzutage in modernen Restaurants selten verwendet",
        isCorrect: false,
      },
      {
        answerHU:
          "Elsősorban enyhébb ízviláguk miatt kevésbé kedveltek a fűszeres ételek szerelmesei körében",
        answerDE:
          "Sind aufgrund ihres milderen Geschmacks bei Liebhabern von scharf gewürzten Speisen weniger beliebt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Gazdagítják az ízvilágot, sajátos elkészítési módokkal és fűszerezéssel. Erdélyi hagyományok fontos réteget adnak a magyar konyhának.",
    explanationDE:
      "Sie bereichern das Geschmacksrepertoire durch besondere Zubereitung und Würzung. Die siebenbürgische Küche bildet einen unverzichtbaren Teil des ungarischen Kulinarikerbes.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan hat a modern séfek kreativitása a hagyományos magyar receptek átalakítására?",
    questionDE:
      "Wie beeinflusst die Kreativität moderner Köche die Transformation traditioneller ungarischer Rezepte?",
    answers: [
      {
        answerHU:
          "Új technikák és fúziós elemek integrálása a hagyományos receptekbe",
        answerDE:
          "Integration neuer Techniken und Fusions-Elemente in traditionelle Rezepte",
        isCorrect: true,
      },
      {
        answerHU:
          "Főként a tálalásban hoznak modern elemeket, az alaprecept érintetlen marad",
        answerDE:
          "Hauptsächlich in der Präsentation werden moderne Elemente eingebracht, das Grundrezept bleibt unberührt",
        isCorrect: false,
      },
      {
        answerHU:
          "Külföldi konyhatechnológiák alkalmazása miatt az eredeti magyar ízek háttérbe szorulnak",
        answerDE:
          "Durch die Anwendung ausländischer Küchentechnologien treten die ursprünglichen ungarischen Aromen in den Hintergrund",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Új, innovatív elemeket visznek bele, de megőrzik a lényeges ízeket. Új technikák és tálalás, mégis tiszteletben tartva a tradíciókat.",
    explanationDE:
      "Moderne Köche fügen kreative Ideen hinzu, ohne den Kern der Gerichte zu verändern. So entstehen neue Techniken und Präsentationen im Geist der traditionellen Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Hogyan épül fel egy tipikus magyar ünnepi étkezés?",
    questionDE: "Wie ist ein typisches ungarisches Festmahl aufgebaut?",
    answers: [
      {
        answerHU:
          "Többfogásos menü előételből, főételből és desszertből, hagyományos fogásokkal",
        answerDE:
          "Mehrgängiges Menü aus Vorspeise, Hauptgericht und Dessert mit traditionellen Gerichten",
        isCorrect: true,
      },
      {
        answerHU: "Egyszerűbb étlap, amely főként csak a főételekre koncentrál",
        answerDE:
          "Einfachere Speisekarte, die sich hauptsächlich nur auf die Hauptgerichte konzentriert",
        isCorrect: false,
      },
      {
        answerHU:
          "Modern, fúziós stílusú tálalás, melyben a hagyományos elemek keverednek a kortárs konyhával",
        answerDE:
          "Moderne Fusion-Stil-Präsentation, bei der sich traditionelle Elemente mit der zeitgenössischen Küche vermischen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Leves, főétel, desszert, néha előétel. Több fogás, bőséges, a magyar konyha hagyományos ízeit, alapanyagait mutatja be, gyakran családi körben.",
    explanationDE:
      "Ein festliches ungarisches Menü besteht meist aus Vorspeise, Suppe, Hauptgericht und Dessert. Es ist reichhaltig und präsentiert die typischen Geschmackswelten und Zutaten der ungarischen Küche.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mikor fogyasztanak hagyományosan 'kalácsot'?",
    questionDE: "Wann isst man traditionell 'Kalács'?",
    answers: [
      {
        answerHU: "Minden vasárnapi misén",
        answerDE: "Bei sonntäglichen Messen",
        isCorrect: false,
      },
      {
        answerHU: "Ünnepi alkalmakkor (húsvét, karácsony)",
        answerDE: "Zu festlichen Anlässen (Ostern, Weihnachten)",
        isCorrect: true,
      },
      {
        answerHU: "Csak téli hónapokban",
        answerDE: "Nur in den Wintermonaten",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ünnepekkor: húsvét, karácsony, esküvők. Édes, fonott kelt tészta, ezeknek az alkalmaknak fontos része, jelképezve a bőséget és az ünnepi hangulatot.",
    explanationDE:
      "Typischerweise zu Festen wie Ostern, Weihnachten oder Hochzeiten. Das süße Hefezopfgebäck symbolisiert Fülle und Feierlichkeit – ein unverzichtbarer Bestandteil des Festtisches.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU:
      "Melyik édességnek része a csokoládébevonat és a vajas piskóta karamellizált cukorral?",
    questionDE: "Welches Dessert hat Schokoglasur und karamellisierten Zucker?",
    answers: [
      {
        answerHU: "Esterházy torta",
        answerDE: "Esterházy-Torte",
        isCorrect: false,
      },
      {
        answerHU: "Dobos torta",
        answerDE: "Dobos-Torte",
        isCorrect: true,
      },
      {
        answerHU: "Rigó Jancsi",
        answerDE: "Rigó Jancsi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Dobos tortának. Jellegzetes karamellréteg zárja le a piskóta és krém rétegeket, klasszikus magyar torta.",
    explanationDE:
      "Das trifft auf die „Dobos-Torte“ zu. Ihre Schichten aus Biskuit und Schoko-Buttercreme werden oben mit einer harten Karamellschicht überzogen – ein ungarischer Kuchenklassiker.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU:
      "Melyik étel készül 'erdei gombákból' és tejföllel, hagyományosan?",
    questionDE: "Welches Gericht wird mit Waldpilzen und Sauerrahm zubereitet?",
    answers: [
      {
        answerHU: "Gombapörkölt",
        answerDE: "Pilzgulasch/Pilz-Pörkölt",
        isCorrect: false,
      },
      {
        answerHU: "Gombapaprikás",
        answerDE: "Pilzpaprikasch",
        isCorrect: true,
      },
      {
        answerHU: "Gombaleves",
        answerDE: "Pilzsuppe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tejfölös gombapaprikás vagy gombaragu. Erdőben gyűjtött gombából, paprikás alappal főzve, tejföllel lágyítva, népszerű gombás fogás.",
    explanationDE:
      "Ein „Pilz-Paprikasch“ mit Sauerrahm. Aus Waldpilzen auf Paprikabasis geköchelt und mit Rahm verfeinert, ein beliebtes traditionelles Pilzgericht in Ungarn.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Hogyan készül a 'zserbó' sütemény?",
    questionDE: "Wie wird der Kuchen 'Zserbó' (Gerbeaud) zubereitet?",
    answers: [
      {
        answerHU: "Mákos-diós töltelékkel",
        answerDE: "Mit Mohn-Nuss-Füllung",
        isCorrect: false,
      },
      {
        answerHU: "Lekváros-mandulás rétegekkel",
        answerDE: "Mit Marmeladen-Mandel-Schichten",
        isCorrect: true,
      },
      {
        answerHU: "Túrós-vaníliás krémekkel",
        answerDE: "Mit Quark-Vanille-Cremes",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vékony tésztalapok dióval és baracklekvárral töltve, csokimázzal a tetején. Többrétegű, édes és ropogós, ünnepi desszertként igen kedvelt.",
    explanationDE:
      "„Zserbó“ besteht aus mehreren dünnen Teigschichten mit Nuss und Aprikosenmarmelade, darüber Schokoladenguss. Ein mehrschichtiges, süß-knuspriges Gebäck, oft festlich serviert.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Melyik desszert a 'Rákóczi túrós'?",
    questionDE: "Welches Dessert ist 'Rákóczi túrós'?",
    answers: [
      {
        answerHU: "Túrós rétes almával",
        answerDE: "Topfenstrudel mit Äpfeln",
        isCorrect: false,
      },
      {
        answerHU: "Túrós habos piskóta",
        answerDE: "Quark-Schaumbiskuit",
        isCorrect: true,
      },
      {
        answerHU: "Túrós gombóc fahéjjal",
        answerDE: "Quarkknödel mit Zimt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Réteges, túrós pite habcsókkal a tetején. Alul omlós tészta, középen édes túró, felül tojáshab, könnyed, frissítő édesség.",
    explanationDE:
      "Der „Rákóczi túrós“ ist ein Schichtkuchen aus Mürbeteig, Quarkfüllung und einem Baiser-Topping. Eine leichte, angenehm süße Spezialität der ungarischen Konditorei.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a 'kocsonya' alapanyaga, és melyik évszakban kedvelt?",
    questionDE: "Was ist die Basis für 'Kocsonya' und wann ist es beliebt?",
    answers: [
      {
        answerHU: "Disznó lábszár téli időszakban",
        answerDE: "Schweinshaxe in der Winterzeit",
        isCorrect: true,
      },
      {
        answerHU: "Marhalábszín nyári hónapokban",
        answerDE: "Rindfleisch aus der Keule in den Sommermonaten",
        isCorrect: false,
      },
      {
        answerHU: "Csirkecomb tavasszal",
        answerDE: "Hähnchenkeule im Frühling",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Disznóhús, bőr és csont. Hosszas főzés után hidegen kocsonyásodik. Télen fogyasztják leginkább, hagyományos, zselés állagú étel.",
    explanationDE:
      "„Kocsonya“ basiert auf Schweinefleisch, Schwarte und Knochen. Es wird lange gekocht und erkaltet geliert. Vor allem im Winter beliebt als deftige, geleeartige Speise.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Milyen bortípus az 'Egri Bikavér'?",
    questionDE: "Welche Art Wein ist der 'Egri Bikavér'?",
    answers: [
      {
        answerHU: "Fehérbor Muscat Lunel fajtából",
        answerDE: "Weißwein aus Muskateller",
        isCorrect: false,
      },
      {
        answerHU: "Vörösbor házasított szőlőfajtákból",
        answerDE: "Rotwein aus vermählten Rebsorten",
        isCorrect: true,
      },
      {
        answerHU: "Rozébor Kadarka fajtából",
        answerDE: "Roséwein aus Kadarka-Trauben",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vörös házasítás, legalább 4 szőlőfajtából. Erőteljes, fűszeres íz, Eger város jelképes bora, a magyar vörösbor-örökség része.",
    explanationDE:
      "Der „Egri Bikavér“ (Erlauer Stierblut) ist eine Rotwein-Cuvée aus mindestens vier Rebsorten. Ein kräftiges, würziges Aushängeschild Egers und Teil des ungarischen Rotweinerbes.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a 'Somlói galuska' lényegi összetevője?",
    questionDE: "Welches ist die Hauptkomponente der 'Somlói galuska'?",
    answers: [
      {
        answerHU: "Egyféle piskóta és vaníliaöntet",
        answerDE: "Eine Art Biskuit mit Vanillesoße",
        isCorrect: false,
      },
      {
        answerHU: "Háromféle piskóta, rumos szörp és tejszín",
        answerDE: "Dreierlei Biskuit, Rumsirup und Sahne",
        isCorrect: true,
      },
      {
        answerHU: "Mákos-diós töltelék karamell öntettel",
        answerDE: "Mohn-Nuss-Füllung mit Karamellsauce",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Többrétegű piskóta, csokoládéöntet, rum, tejszínhab. Gazdag, édes desszert, magyar cukrászdák egyik elterjedt kínálata.",
    explanationDE:
      "Die „Somlói Galuska“ besteht im Wesentlichen aus mehreren Biskuitschichten, Rum, Schokoladensauce und Schlagsahne. Ein üppiges, süßes Dessert, weit verbreitet in ungarischen Konditoreien.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Melyik tájegység specialitása a 'birkapörkölt'?",
    questionDE: "In welcher Region ist das 'Birkapörkölt' eine Spezialität?",
    answers: [
      {
        answerHU: "Hortobágyi puszta",
        answerDE: "Hortobágyer Steppe",
        isCorrect: false,
      },
      {
        answerHU: "Nagykunsági alföld",
        answerDE: "Große Kumanische Tiefebene",
        isCorrect: true,
      },
      {
        answerHU: "Balaton-felvidék",
        answerDE: "Balaton-Oberland",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Nagykunságban elterjedt pásztorétel. Birkahúsból készül, gyakran szabadtűzön, gazdag fűszerezéssel, hagyományos alföldi fogás.",
    explanationDE:
      "Das „Birkapörkölt“ stammt aus der Region Nagykunság. Ein Hirtenessen vom Lammfleisch, oft über offenem Feuer gekocht, kräftig gewürzt, typisch für die ungarische Tiefebene.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU:
      "Miért nevezik 'királyi szakácsnak' Gundelt a magyar konyhában?",
    questionDE: "Wieso wird Gundel als „Königskoch“ bezeichnet?",
    answers: [
      {
        answerHU: "A magyar konyha nemzetköziesítéséért",
        answerDE: "Wegen der Internationalisierung der ungarischen Küche",
        isCorrect: true,
      },
      {
        answerHU: "IV. Károly személyes szakácsaként",
        answerDE: "Als persönlicher Koch von Karl IV.",
        isCorrect: false,
      },
      {
        answerHU: "Francia receptek másolásáért",
        answerDE: "Für das Kopieren französischer Rezepte",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Mert Gundel Károly magas szintre emelte a magyar gasztronómiát. Étterme világhírű, számos klasszikus recept fűződik a nevéhez.",
    explanationDE:
      "Man nennt Károly Gundel den „königlichen Koch“, da er die ungarische Gastronomie veredelte und sein Restaurant weltbekannt machte. Viele klassische Rezepte stammen von ihm.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU:
      "Melyik ételhez kötődik a 'római tálban' való sütés hagyománya?",
    questionDE: "Mit welchem Gericht ist das Backen im Römertopf verbunden?",
    answers: [
      {
        answerHU: "Erdélyi rakott káposzta",
        answerDE: "Siebenbürgischer Schichtkohl",
        isCorrect: true,
      },
      {
        answerHU: "Halászlé",
        answerDE: "Fischsuppe",
        isCorrect: false,
      },
      {
        answerHU: "Gulyásleves",
        answerDE: "Gulaschsuppe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Általában húsos-zöldséges ételekhez. A római tál lassú sütéssel megőrzi az aromákat, szaftos végeredményt ad, egészségesebb eljárás.",
    explanationDE:
      "Die Tradition des Garens im Römertopf bezieht sich meist auf Fleisch-Gemüse-Gerichte. Das langsame Schmoren bewahrt Geschmack, macht sie saftig und gilt als gesunde Methode.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mi a 'derelye' vagy 'barátfüle' lényege?",
    questionDE: "Worin besteht der 'Derelye' oder 'Barátfüle'?",
    answers: [
      {
        answerHU: "Sós túróval töltött tészta",
        answerDE: "Teigtaschen mit salziger Quarkfüllung",
        isCorrect: false,
      },
      {
        answerHU: "Édes lekvárral töltött tészta",
        answerDE: "Mit süßer Marmelade gefüllter Teig",
        isCorrect: true,
      },
      {
        answerHU: "Húsos töltelék párolt zöldségekkel",
        answerDE: "Fleischfüllung mit gedünstetem Gemüse",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Krumplis tésztába töltött édes töltelék, forró vízben főzve, morzsába forgatva. Gyakran lekvárral vagy túróval készül, közkedvelt desszert.",
    explanationDE:
      "„Derelye/Barátfüle“ sind Teigtaschen aus Kartoffelteig mit süßer Füllung, in heißem Wasser gekocht und in Semmelbröseln gewälzt, oft mit Marmelade oder Quark. Ein beliebtes Dessert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik desszert készül gyakran meggyel és kakaós piskótával?",
    questionDE:
      "Welches Dessert wird oft mit Sauerkirschen und Schokobiskuit zubereitet?",
    answers: [
      {
        answerHU: "Fekete-erdő torta magyar változata",
        answerDE: "Ungarische Variante der Schwarzwälder Kirschtorte",
        isCorrect: true,
      },
      {
        answerHU: "Zserbó sárgabarackkal",
        answerDE: "Gerbeaud mit Aprikose",
        isCorrect: false,
      },
      {
        answerHU: "Rákóczi túrós",
        answerDE: "Quarkauflauf nach Rákóczi",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Fekete-erdő torta magyar változata, meggyes-kakaós piskótatorta tejszínnel. Könnyed, ízletes sütemény nyáron is.",
    explanationDE:
      "Eine ungarische Variation der Schwarzwälder Kirschtorte mit Sauerkirschen und Kakaobiskuit, getoppt mit Schlagsahne. Ein leichter, köstlicher Kuchen, besonders im Sommer beliebt.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik magyar leves készül gyakran babbal és füstölt hússal, és egy híres íróról kapta a nevét?",
    questionDE:
      "Welche Suppe wird in Ungarn oft mit Bohnen und Räucherfleisch zubereitet und ist nach einem berühmten Schriftsteller benannt?",
    answers: [
      {
        answerHU: "Babgulyás",
        answerDE: "Bohnengulyás",
        isCorrect: false,
      },
      {
        answerHU: "Jókai-bableves",
        answerDE: "Jókai-Bohnensuppe",
        isCorrect: true,
      },
      {
        answerHU: "Gulyásleves",
        answerDE: "Gulaschsuppe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Jókai bableves. Babos-füstölt húsos leves, Jókai Mór kedvelte, róla nevezték el, klasszikus magyar fogás.",
    explanationDE:
      "Die „Jókai-Bohnensuppe“ besteht hauptsächlich aus Bohnen und geräuchertem Fleisch. Sie wurde nach dem Schriftsteller Mór Jókai benannt, der diese kräftige Suppe schätzte.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mik azok a „pogácsák” a magyar konyhában?",
    questionDE: "Was sind „Pogácsa“ in der ungarischen Küche?",
    answers: [
      {
        answerHU: "Édes habcsók",
        answerDE: "süße Schaumküsse",
        isCorrect: false,
      },
      {
        answerHU: "Sós, kerek péksütemények",
        answerDE: "Salzige, runde Backwaren",
        isCorrect: true,
      },
      {
        answerHU: "Szárított gyümölcsök",
        answerDE: "Getrocknete Früchte",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sós kelt tésztából készült apró péksütemények. Több fajtája van (tepertős, sajtos), gyakran fogyasztják borhoz, levesekhez vagy magában is.",
    explanationDE:
      "„Pogácsa“ sind kleine salzige Hefeteiggebäckstücke. Es gibt Variationen mit Speck- oder Käsegeschmack, oft als Beilage zu Wein oder Suppe gegessen oder einfach zwischendurch.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi a „juhtúrós sztrapacska”?",
    questionDE: "Was ist „Juhtúrós sztrapacska“?",
    answers: [
      {
        answerHU: "Édes sütemény mazsolával",
        answerDE: "Ein süßes Gebäck mit Rosinen",
        isCorrect: false,
      },
      {
        answerHU: "Galuskaféle juhtúróval és szalonnával",
        answerDE: "Galuschka-Art mit Schafskäse und Speck",
        isCorrect: true,
      },
      {
        answerHU: "Savanyú káposzta pirított hagymával",
        answerDE: "Sauerkraut mit gerösteten Zwiebeln",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Krumplis tészta juhtúróval és pirított szalonnával. Szlovák eredetű étel, a magyar konyhában is népszerű, laktató, karakteres ízű fogás.",
    explanationDE:
      "„Juhtúrós sztrapacska“ ist ein Kartoffelteiggericht mit Schafskäse und geröstetem Speck. Ursprünglich slowakisch, aber auch in Ungarn sehr beliebt – deftig und charaktervoll.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik péksüteményfélét szolgálnak fel gyakran levesekhez, és kisméretű párnácskára emlékeztet?",
    questionDE:
      "Wie heißt das Gebäck, das in Ungarn oft zu Suppen serviert wird und kleinen Kissen ähnelt?",
    answers: [
      {
        answerHU: "Kifli",
        answerDE: "Hörnchen/Kipferl",
        isCorrect: true,
      },
      {
        answerHU: "Kenyérlángos",
        answerDE: "Kenyérlángos",
        isCorrect: false,
      },
      {
        answerHU: "Túrós batyu",
        answerDE: "Quarktasche",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A kiflit. Íves formájú, ropogós héjú, puha belsejű péksütemény, sós és édes változatban is elterjedt.",
    explanationDE:
      "Das Hörnchen („kifli“) ist ein kleines, bogenförmiges Gebäck mit knuspriger Kruste und weichem Kern. Oft zu Suppe gereicht, in salziger oder süßer Ausführung erhältlich.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi jellemző a „tepertőre” a magyar konyhában?",
    questionDE: "Was ist charakteristisch für ungarischen „Tepertő“?",
    answers: [
      {
        answerHU: "Édes sütemény",
        answerDE: "Süßes Gebäck",
        isCorrect: false,
      },
      {
        answerHU: "Ropogósra sütött szalonnadarabkák",
        answerDE: "Knusprig gebratene Speckwürfel",
        isCorrect: true,
      },
      {
        answerHU: "Csípős kolbász",
        answerDE: "Scharfe Wurst",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Sertészsírból kisütött ropogós darabok (töpörtyű). Zsíros, sós, gyakran fogyasztják kenyérrel, hagymával, népszerű paraszti étel.",
    explanationDE:
      "„Tepertő“ (Grieben) sind knusprig ausgebratene Stücke aus Schweinefett. Herzhaft und salzig, isst man sie oft mit Brot und Zwiebeln – ein traditionelles ungarisches Bauernessen.",
  },
  {
    category: "Kulinarik",
    level: 2,
    questionHU: "Mit nevezünk „főzeléknek” a magyar konyhában?",
    questionDE: "Was verbirgt sich hinter dem ungarischen Begriff „Főzelék“?",
    answers: [
      {
        answerHU: "Gyümölcsökből készült befőtt.",
        answerDE: "Eingemachtes Obst.",
        isCorrect: false,
      },
      {
        answerHU: "Sűrített zöldségétel, mint például a borsófőzelék.",
        answerDE: "Eingedicktes Gemüsegericht, wie z.B. Erbsenpüree.",
        isCorrect: true,
      },
      {
        answerHU: "Olajban sült tésztaféle.",
        answerDE: "Frittiertes Gebäck.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Közepesen sűrű, zöldségalapú ételt, melyet gyakran rántással vagy habarással készítenek. Feltéttel tálalják, kedvelt ebédfogás.",
    explanationDE:
      "„Főzelék“ ist ein sämiges Gemüsegericht mit Einbrenn oder Legierung, oft als dickflüssige Suppe/Beilage serviert. Man isst es mit verschiedenen Einlagen und es ist sehr verbreitet.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik a híres „túrós, rumos, csokoládés palacsinta”, amit Gundel Károly receptje tett világhírűvé?",
    questionDE:
      "Welches Gericht ist der berühmte „túrós, rumos, csokoládés palacsinta“, den Károly Gundel weltberühmt machte?",
    answers: [
      {
        answerHU: "Kakaós palacsinta",
        answerDE: "Kakao-Palatschinken / -Pfannkuchen",
        isCorrect: false,
      },
      {
        answerHU: "Gundel-palacsinta",
        answerDE: "Gundel-Palatschinken",
        isCorrect: true,
      },
      {
        answerHU: "Rakott palacsinta",
        answerDE: "Gefüllte Palatschinken",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Gundel-palacsinta. Diós-rumos töltelékkel, csokiöntettel. A Gundel étterem specialitása, itthon és külföldön is nagyra értékelik.",
    explanationDE:
      "Die „Gundel-Palatschinke“ ist ein Crêpe mit einer Rum-Nuss-Füllung und Schokoladensoße. Eine Spezialität aus dem Gundel-Restaurant, international hochgeschätzt.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen alapanyagokból készül a tradicionális túrós csusza, és melyik lépései teszik igazán egyedivé ezt az ételt?",
    questionDE:
      "Aus welchen Zutaten wird das traditionelle Túrós Csusza zubereitet und welche Zubereitungsschritte machen es wirklich einzigartig?",
    answers: [
      {
        answerHU: "Csusza tészta, túró, szalonna, tejföllel tálalva",
        answerDE: "Nudeln, Quark, Speck, serviert mit Sauerrahm",
        isCorrect: true,
      },
      {
        answerHU: "Csusza tészta, túró, és pirított hagyma, tejföllel tálalva",
        answerDE:
          "Csusza-Nudeln, Quark und geröstete Zwiebeln, mit Sauerrahm serviert",
        isCorrect: false,
      },
      {
        answerHU: "Csusza tészta, túró, és kolbász, tejföl nélkül",
        answerDE: "Csusza-Nudeln, Quark und Wurst, ohne Sauerrahm",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Friss csuszatészta, túró, tejföl, szalonna. A ropogós pirított szalonna és a lágy túró-tejföl kontrasztja adja az egyediséget.",
    explanationDE:
      "„Túrós csusza“ wird aus frischer Csusza-Nudel, Quark, Sauerrahm und Speck hergestellt. Der Kontrast aus knusprigem Speck und cremigem Quark-Rahm macht das Gericht besonders.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan készül a Székelykáposzta, és miben különbözik a töltött káposztától?",
    questionDE:
      "Wie wird Székelykáposzta zubereitet und worin unterscheidet es sich von gefülltem Kohl?",
    answers: [
      {
        answerHU: "Savanyú káposzta, hús és paprikás fűszerek",
        answerDE: "Sauerkraut, Fleisch und Paprika-Gewürzmischung",
        isCorrect: true,
      },
      {
        answerHU: "Friss káposzta levelekben töltött darált hús és rizs",
        answerDE: "Frischer Kohl, gefüllt mit Hackfleisch und Reis",
        isCorrect: false,
      },
      {
        answerHU:
          "Savanyú káposzta füstölt hússal és enyhén paradicsomos öntettel",
        answerDE:
          "Sauerkraut mit geräuchertem Fleisch und einer leichten Tomatensauce",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Savanyú káposztát és fűszeres húst főznek együtt, nincs káposztalevélbe töltött gombóc. Tartalmas, savanykás, de nem töltött fogás.",
    explanationDE:
      "Beim „Székelykáposzta“ schmort man Sauerkraut mit gewürztem Fleisch. Anders als bei gefülltem Kraut gibt es keine Rouladen. Ein gehaltvolles, säuerliches Schmorgericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen húsfajtát használnak leggyakrabban a csirke paprikás elkészítéséhez?",
    questionDE:
      "Welche Fleischsorte wird am häufigsten für die Zubereitung von Csirke Paprikás verwendet?",
    answers: [
      {
        answerHU: "Csirkehús paprikás szószban",
        answerDE: "Hühnerfleisch in Paprikasoße",
        isCorrect: true,
      },
      {
        answerHU: "Sertéshús, enyhébb fűszerezéssel",
        answerDE: "Schweinefleisch, mit milderer Würzung",
        isCorrect: false,
      },
      {
        answerHU: "Marhahús, hosszú főzéssel és intenzív paprikával",
        answerDE: "Rindfleisch, lange gekocht und mit intensivem Paprika",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Csirkehúst, ahogy a nevében is szerepel. Paprikás alapon főzik, tejföllel lágyítva, a magyar konyha alapfogásai közé tartozik.",
    explanationDE:
      "Beim „Paprikás csirke“ verwendet man meist Huhn, wie der Name sagt. In einer Paprika-Grundsoße gegart und mit Sauerrahm verfeinert – ein Grundpfeiler der ungarischen Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan zajlik a hagyományos pálinkafőzés folyamata, és mely gyümölcsök a leggyakoribbak?",
    questionDE:
      "Wie verläuft der traditionelle Pálinka-Herstellungsprozess und welche Früchte werden am häufigsten verwendet?",
    answers: [
      {
        answerHU:
          "Erjesztés és desztilláció, leggyakrabban szilva és barack felhasználásával",
        answerDE: "Gärung und Destillation, meist mit Pflaumen und Pfirsichen",
        isCorrect: true,
      },
      {
        answerHU:
          "Erjesztés és desztilláció, ahol alma és körte is előfordulhat",
        answerDE:
          "Gärung und Destillation, wobei auch Apfel und Birne vorkommen können",
        isCorrect: false,
      },
      {
        answerHU: "Erjesztés és lepárlás, általában szőlőből készítve",
        answerDE:
          "Fermentierung und Destillation, meist aus Trauben hergestellt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Erjesztés és kétszeri lepárlás. Leggyakrabban szilva és barack a fő alapanyag, ezekből készül a legismertebb pálinka.",
    explanationDE:
      "Traditionell gärt man Früchte und brennt sie zweimal. Pflaumen und Aprikosen sind am häufigsten, sie ergeben die bekanntesten Pálinkasorten. Ein wichtiges Nationalgetränk.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Miből készül a hagyományos magyar paraszti kenyér, és miért tartják alapvetőnek a vidéki konyhában?",
    questionDE:
      "Woraus wird das traditionelle ungarische Bauernbrot hergestellt und warum gilt es als grundlegend in der Landküche?",
    answers: [
      {
        answerHU: "Teljes kiőrlésű gabonából, mert tápláló és karakteres ízű",
        answerDE:
          "Aus Vollkorngetreide, weil es nahrhaft ist und einen charakteristischen Geschmack hat.",
        isCorrect: true,
      },
      {
        answerHU:
          "Elsősorban fehér lisztből, ami könnyedebb, de kevésbé rostos",
        answerDE:
          "Hauptsächlich aus Weißmehl, das leichter, aber weniger ballaststoffreich ist",
        isCorrect: false,
      },
      {
        answerHU:
          "Vegyes gabonákból, például rozs és árpa keverékéből, ami markánsabb ízt ad",
        answerDE:
          "Aus gemischten Getreidesorten, z. B. einer Mischung aus Roggen und Gerste, was einen kräftigeren Geschmack verleiht",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Teljes kiőrlésű gabonából, kovászos eljárással. Hosszú ideig eltartható, laktató és autentikus, ezért vidéken kulcsfontosságú alapétel.",
    explanationDE:
      "Das traditionelle Bauernbrot wird aus Vollkorngetreide und Sauerteig gebacken. Es ist lange haltbar und nahrhaft, weshalb es im ländlichen Bereich grundlegend ist.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Miben különbözik a kézműves alapanyagok használata a nagyüzemi termékektől a magyar konyhában?",
    questionDE:
      "Worin unterscheiden sich handwerkliche Zutaten von industriell hergestellten Produkten in der ungarischen Küche?",
    answers: [
      {
        answerHU:
          "Frissesség, természetes összetevők és hagyományos előállítás jellemzi a kézműves termékeket",
        answerDE:
          "Frische, natürliche Zutaten und traditionelle Herstellung zeichnen handwerkliche Produkte aus",
        isCorrect: true,
      },
      {
        answerHU:
          "Ipari termékek esetében az összetevők gyakran standardizáltak, bár a minőségellenőrzés magas",
        answerDE:
          "Bei Industrieprodukten sind die Zutaten oft standardisiert, obwohl die Qualitätskontrolle hoch ist",
        isCorrect: false,
      },
      {
        answerHU:
          "Mindkét típus hasonló alapanyagokat használ, így lényegében nincs különbség az ízben",
        answerDE:
          "Beide Typen verwenden ähnliche Zutaten, daher gibt es im Wesentlichen keinen Geschmacksunterschied",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A kézműves friss, egyedi, ízletes, a nagyüzemi pedig gyakran egyen-homogén minőségű. Kézművesnél erősebb a hagyományos jelleg és íz.",
    explanationDE:
      "Handwerkliche Zutaten sind meist frischer, charakteristischer und traditionell produziert. Industrielle Ware ist oft einheitlich und standardisiert – mit weniger spezifischem Aroma.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Miért tartják a magyar szakácsok a friss, helyi alapanyagokat alapvetőnek az ételek elkészítésében?",
    questionDE:
      "Warum halten ungarische Köche frische, regionale Zutaten für essentiell bei der Zubereitung von Gerichten?",
    answers: [
      {
        answerHU:
          "Mert a természetes íz és minőség érdekében elengedhetetlenek",
        answerDE:
          "Weil sie für den natürlichen Geschmack und die hohe Qualität unerlässlich sind.",
        isCorrect: true,
      },
      {
        answerHU:
          "Mert a helyi alapanyagok gyakran drágábbak, így az étterem imázsát is erősítik",
        answerDE:
          "Weil lokale Zutaten oft teurer sind und so das Image des Restaurants stärken",
        isCorrect: false,
      },
      {
        answerHU:
          "Mert a helyi beszerzés csupán modern marketingfogás, a hagyományos receptekben nincs szerepe",
        answerDE:
          "Weil die lokale Beschaffung nur ein modernes Marketinginstrument ist, spielt sie in traditionellen Rezepten keine Rolle",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Megőrzik az autentikus ízeket, támogatják a szezonális főzést. A minőség és a hagyomány találkozik a helyi termékekben.",
    explanationDE:
      "Weil sie den ursprünglichen Geschmack erhalten und saisonales Kochen fördern. Qualität und Tradition vereinen sich in lokalen Produkten – eine Grundidee der ungarischen Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan jelennek meg a családi hagyományok a magyar házias ételek elkészítésében?",
    questionDE:
      "Wie spiegeln sich familiäre Traditionen in der Zubereitung ungarischer Hausmannskost wieder?",
    answers: [
      {
        answerHU:
          "Receptörök generációról generációra öröklődnek, meghatározva az elkészítés módját",
        answerDE:
          "Die Rezepte werden von Generation zu Generation weitergegeben und prägen die Art der Zubereitung.",
        isCorrect: true,
      },
      {
        answerHU:
          "A modern konyhában gyakran modernizálják a családi recepteket, így csak részben maradnak meg a hagyományok",
        answerDE:
          "In der modernen Küche werden Familienrezepte oft modernisiert, sodass Traditionen nur teilweise erhalten bleiben",
        isCorrect: false,
      },
      {
        answerHU:
          "Ipari szabványok alapján készülnek, így nincs jelentős családi hatás",
        answerDE:
          "Werden nach Industriestandards hergestellt, daher gibt es keinen signifikanten familiären Einfluss",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Receptek és technikák generációról generációra öröklődnek. Az anyák, nagymamák átadják a tapasztalatot, így maradnak fenn a régi ízek.",
    explanationDE:
      "Familienrezepte und -techniken werden von Generation zu Generation weitergegeben. Mütter und Großmütter geben ihr Wissen weiter und bewahren so die traditionellen Geschmäcker.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyek a legismertebb magyar kolbászfajták, és miben különböznek egymástól?",
    questionDE:
      "Welche sind die bekanntesten ungarischen Wurstsorten und worin unterscheiden sie sich?",
    answers: [
      {
        answerHU:
          "Csabai és Debreceni kolbász – a hagyományos fűszerezés és ízprofiljuk különbözik",
        answerDE:
          "Csabai und Debreceni Wurst – ihre traditionelle Würzung und ihr Geschmacksprofil unterscheiden sich.",
        isCorrect: true,
      },
      {
        answerHU:
          "Bécsi és frankfurti kolbász – bár hasonló alapanyagokból készülnek, fűszerük eltér",
        answerDE:
          "Wiener und Frankfurter Würstchen – obwohl sie aus ähnlichen Zutaten hergestellt werden, unterscheiden sie sich in ihren Gewürzen",
        isCorrect: false,
      },
      {
        answerHU:
          "Magyar és olasz kolbász – elkészítési módjuk és fűszerezésük jelentősen különbözik",
        answerDE:
          "Ungarische und italienische Wurst – ihre Zubereitung und Würzung unterscheiden sich erheblich",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A csabai és a debreceni. Fűszerösszetételben, erősségben és formában térnek el, mindkettő jellegzetes magyar kolbász-örökség.",
    explanationDE:
      "Die bekanntesten ungarischen Wurstsorten sind „Csabai“ und „Debreceni“. Sie unterscheiden sich in Gewürzmischung, Schärfe und Form, sind jedoch beides typisch ungarische Spezialitäten.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen szerepet játszik a gasztronómiai turizmus a magyar ételek népszerűsítésében?",
    questionDE:
      "Welche Rolle spielt der gastronomische Tourismus bei der Popularisierung ungarischer Speisen?",
    answers: [
      {
        answerHU:
          "A gasztronómiai turizmus révén a hagyományos fogások széles körben ismertté válnak, vonzó élményt kínálva a látogatóknak",
        answerDE:
          "Durch den gastronomischen Tourismus werden traditionelle Gerichte weithin bekannt und bieten Besuchern ein attraktives Erlebnis.",
        isCorrect: true,
      },
      {
        answerHU:
          "A turizmus főként a modern, fúziós ételekre épít, kevésbé hangsúlyozva a hagyományos recepteket",
        answerDE:
          "Der Tourismus setzt hauptsächlich auf moderne, Fusionsküche und betont weniger traditionelle Rezepte",
        isCorrect: false,
      },
      {
        answerHU:
          "A gasztronómiai turizmus inkább a helyi italokra, például borokra és pálinkára koncentrál, nem pedig az ételekre",
        answerDE:
          "Der gastronomische Tourismus konzentriert sich eher auf lokale Getränke wie Weine und Pálinka als auf Speisen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Külföldi és hazai turisták fedezik fel a helyi specialitásokat, növelve a magyar konyha hírnevét és gazdasági bevételeit.",
    explanationDE:
      "Der kulinarische Tourismus fördert die Bekanntheit ungarischer Gerichte. Gäste aus dem In- und Ausland entdecken heimische Spezialitäten und steigern so den Ruf und Umsatz der Küche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik magyar leves készül főleg savanyú káposztával és hússal?",
    questionDE:
      "Welche ungarische Suppe wird hauptsächlich mit Sauerkraut und Fleisch gekocht?",
    answers: [
      {
        answerHU: "Korhelyleves",
        answerDE: "Korhelyleves (Katersuppe)",
        isCorrect: true,
      },
      {
        answerHU: "Gulyásleves",
        answerDE: "Gulaschsuppe",
        isCorrect: false,
      },
      {
        answerHU: "Gyümölcsleves",
        answerDE: "Obstsuppe",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A korhelyleves. Savanyú, fűszeres, gyakran másnaposság elleni csodaként is emlegetik, legfőbb alapja a káposzta és a füstölt hús.",
    explanationDE:
      "„Korhelyleves“ ist eine säuerlich-würzige Suppe aus Sauerkraut und Fleisch, oft auch mit Räucherware. Sie gilt als Katerkur und ist ein beliebtes Wohlfühlgericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Milyen fogás a 'töltött paprika'?",
    questionDE: "Was für ein Gericht ist 'töltött paprika'?",
    answers: [
      {
        answerHU: "Rizzsel és hússal töltött paprikák paradicsomszószban",
        answerDE:
          "Mit Reis und Fleisch gefüllte Paprikaschoten in Tomatensauce",
        isCorrect: true,
      },
      {
        answerHU: "Kenyérrel és sajttal töltött paprikák",
        answerDE: "Mit Brot und Käse gefüllte Paprika",
        isCorrect: false,
      },
      {
        answerHU: "Halpörkölt, paprikával fűszerezve",
        answerDE: "Fischpörkölt, mit Paprika gewürzt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Paprikába töltött húsos-rizses keverék, paradicsomos mártásban főzve. Különösen nyáron népszerű, édeskés-savanykás ízvilággal.",
    explanationDE:
      "Gefüllte Paprika („töltött paprika“) mit Fleisch-Reis-Füllung, in Tomatensauce gegart. Ein typisches Sommergericht mit süß-säuerlichen Noten und sehr verbreitet in Ungarn.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik fűszer adja a legjellegzetesebb ízt a 'gulyásnak'?",
    questionDE:
      "Welches Gewürz verleiht dem 'Gulyás' den typischsten Geschmack?",
    answers: [
      {
        answerHU: "A fűszerpaprika",
        answerDE: "Paprikapulver",
        isCorrect: true,
      },
      {
        answerHU: "A koriander",
        answerDE: "Der Koriander",
        isCorrect: false,
      },
      {
        answerHU: "A szegfűszeg",
        answerDE: "Die Gewürznelke",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A fűszerpaprika. Ez határozza meg a színét és ízét, mellé hagyma, kömény és zöldségek kerülnek, a gulyás a magyar konyha ikonja.",
    explanationDE:
      "Das wichtigste Gewürz im Gulyás ist Paprikapulver. Es verleiht Farbe und Geschmack, ergänzt durch Zwiebeln, Kümmel und Gemüse. Gulyás ist ein ungarisches Nationalgericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik fogás a 'tojásos nokedli' és hogyan fogyasztják?",
    questionDE: "Was ist 'tojásos nokedli' und wie wird es gegessen?",
    answers: [
      {
        answerHU: "Galuska tojással összesütve, gyakran salátával",
        answerDE:
          "Nockerl/Spätzle, mit Ei vermengt und angebraten, oft mit Salat",
        isCorrect: true,
      },
      {
        answerHU: "Tojáskrémmel töltött rétes",
        answerDE: "Mit Eiercreme gefüllter Strudel",
        isCorrect: false,
      },
      {
        answerHU: "Rántott sajttal rétegezett köret",
        answerDE: "Überbackene Beilage mit Käse",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Könnyű, friss nokedlit kevernek tojással. Általában ecetes fejes salátával eszik, egyszerű, de kedvelt tavaszi-nyári étel.",
    explanationDE:
      "„Tojásos nokedli“ sind frisch zubereitete Spätzle, gemischt mit Eiern. Meistens isst man sie mit Kopfsalat in Essig-Dressing. Ein einfaches, sehr beliebtes Frühlings- oder Sommeressen.",
  },
  {
    category: "Kulinarik",
    level: 3,
    questionHU: "Melyik fogást nevezik 'rakott krumplinak'?",
    questionDE: "Welches Gericht heißt 'Rakott krumpli'?",
    answers: [
      {
        answerHU: "Rétegezett burgonya kolbásszal, tojással és tejföllel.",
        answerDE: "Geschichtete Kartoffeln mit Wurst, Eiern und Sauerrahm.",
        isCorrect: true,
      },
      {
        answerHU: "Töltött paprika rizzsel.",
        answerDE: "Gefüllte Paprika mit Reis.",
        isCorrect: false,
      },
      {
        answerHU: "Paprikás csirke rizzsel.",
        answerDE: "Paprikahähnchen mit Reis.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tepsiben rétegezett főtt krumpli, tojás, kolbász, tejföl, sült formában. Laktató egytálétel, otthonos ízvilággal.",
    explanationDE:
      "„Rakott krumpli“ ist ein Auflauf aus gekochten Kartoffeln, Eiern, Wurst und Sauerrahm, geschichtet und im Ofen überbacken. Ein sättigendes, bodenständiges Gericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Hogyan készül a 'kürtőskalács'?",
    questionDE: "Wie wird der 'Kürtőskalács' zubereitet?",
    answers: [
      {
        answerHU: "Hengeres kelt tésztát faszén fölött sütnek, cukormázzal",
        answerDE:
          "Ein zylindrischer Hefeteig wird über Kohle gebacken und karamellisiert",
        isCorrect: true,
      },
      {
        answerHU: "Leveles tésztából, túróval töltve",
        answerDE: "Aus Blätterteig, mit Quark gefüllt",
        isCorrect: false,
      },
      {
        answerHU: "Olajban sütik, mint a fánkot",
        answerDE: "Wird in Öl frittiert, wie Krapfen",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Kelt tésztát hengerre tekernek, faszén felett forgatva karamellizálódik. Cukor, fahéj vagy dió kerül a külső rétegre, erdélyi különlegességként ismerik.",
    explanationDE:
      "Der „Kürtőskalács“ (Baumstriezel) wird aus Hefeteig zylinderförmig auf ein Rundholz gewickelt, über Holzkohle gedreht und karamellisiert. Typisch sind Zucker, Zimt oder Nüsse.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan készül a 'szilvás gombóc', és mely tájegységen népszerű?",
    questionDE:
      "Wie werden 'Szilvás gombóc' gemacht und in welcher Region sind sie beliebt?",
    answers: [
      {
        answerHU:
          "Burgonyás tésztába csomagolt szilvával, főleg Észak-Magyarországon",
        answerDE:
          "Mit in Kartoffelteig gewickelten/gehüllten Pflaumen, vor allem in Nordungarn",
        isCorrect: true,
      },
      {
        answerHU: "Leveles tésztába rejtett körte, Alföldön",
        answerDE: "In Blätterteig versteckte Birne, in der Tiefebene",
        isCorrect: false,
      },
      {
        answerHU: "Rizses bevonatú barackgombóc, Dél-Dunántúlon",
        answerDE: "Aprikosenknödel mit Reisüberzug, Südtransdanubien",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Krumplis tésztába szilvát csomagolnak, megfőzik, morzsában forgatják. A Dunántúlon különösen kedvelt, édes főétel vagy desszert.",
    explanationDE:
      "„Szilvás gombóc“ sind Kartoffelteigknödel mit Pflaumen gefüllt, in heißem Wasser gekocht und in Semmelbröseln gewälzt. Besonders im Transdanubien gängig, als süße Hauptspeise oder Dessert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik vidéken jellemző a 'libamáj' és miért?",
    questionDE: "In welcher Region ist 'Gänseleber' typisch und warum?",
    answers: [
      {
        answerHU:
          "A Hortobágy környékén, mert nagy hagyománya van a libatenyésztésnek",
        answerDE:
          "In der Hortobágy-Gegend, weil dort die Gänsezucht eine lange Tradition hat",
        isCorrect: true,
      },
      {
        answerHU: "A Mecsekben, mert sok a szelídgesztenye",
        answerDE: "Im Mecsek, weil es viele Edelkastanien gibt",
        isCorrect: false,
      },
      {
        answerHU: "A Kisalföldön, mert halastavak vannak",
        answerDE:
          "In der Kleinen Ungarischen Tiefebene, weil es Fischteiche gibt",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Országszerte ismert, de főleg Kelet-Magyarországon. A magyar libamáj világhírű, kiváló minőségű, exportcikk, a gasztronómiában luxuscsemege.",
    explanationDE:
      "Gänseleber („libamáj“) ist landesweit bekannt, besonders jedoch in Ostungarn verbreitet. Ungarn exportiert diese Delikatesse weltweit, sie gilt als hochwertige Spezialität in der Gourmetküche.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik étel kapcsolódik Gundel Károly nevéhez?",
    questionDE: "Welches Gericht ist mit Károly Gundel verknüpft?",
    answers: [
      {
        answerHU: "A Gundel palacsinta",
        answerDE: "Die Gundel-Palatschinke",
        isCorrect: true,
      },
      {
        answerHU: "A Rákóczi túrós",
        answerDE: "Der Rákóczi-Quarkauflauf",
        isCorrect: false,
      },
      {
        answerHU: "A Somlói galuska",
        answerDE: "Schomlauer Nockerln",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Gundel-palacsinta. Rumos-diós töltelék, csokoládéöntet, a Gundel étteremből terjedt el, a magyar desszertek koronázatlan királya.",
    explanationDE:
      "Das „Gundel-Palatschinken“ Rezept stammt von Károly Gundel. Mit rumiger Nussfüllung und Schokosoße, wurde es im Gundel-Restaurant populär und gilt als Klassiker der ungarischen Nachspeisen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik ital eredete köthető 'Zwack József' nevéhez?",
    questionDE: "Welches Getränk geht auf 'Zwack József' zurück?",
    answers: [
      {
        answerHU: "Unicum likőr",
        answerDE: "Der Unicum-Likör",
        isCorrect: true,
      },
      {
        answerHU: "Tokaji Aszú",
        answerDE: "Tokajer Aszu",
        isCorrect: false,
      },
      {
        answerHU: "Mátra bor",
        answerDE: "Mátra-Wein",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A Zwack Unicum. Gyógynövénylikőr, jellegzetes kesernyés ízzel, tradicionális magyar ital, a Zwack család öröksége.",
    explanationDE:
      "Der Kräuterlikör „Unicum“ geht auf József Zwack zurück. Er hat einen charakteristisch bitteren Geschmack und ist ein traditionsreiches Getränk, ein Markenzeichen der Familie Zwack.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Melyik ételt emlegetik 'kecskeméti barackos' néven?",
    questionDE: "Welches Gericht wird als 'Kecskeméti barackos' bezeichnet?",
    answers: [
      {
        answerHU: "Pálinkában párolt barackkal készült sertésétel",
        answerDE: "Ein Schweinegericht mit in Pálinka geschmorten Aprikosen",
        isCorrect: true,
      },
      {
        answerHU: "Barackmagos sütemény tejszínnel",
        answerDE: "Aprikosenkernkuchen mit Sahne",
        isCorrect: false,
      },
      {
        answerHU: "Cukrozott barack befőtt túróval",
        answerDE: "Gezuckerte Aprikosenkompott mit Quark",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A barackpálinkát. Kecskeméten honos a híres kajszibarack-pálinka, gyümölcsös ízével a magyar pálinkák egyik csúcsa.",
    explanationDE:
      "Die Aprikosenpálinka (Barackpálinka) aus Kecskemét wird so genannt. Diese Gegend ist bekannt für ihre Marillen, und die dortige Spirituose zählt zu den Spitzenbrands Ungarns.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik magyar édesség készül több réteg mákos, diós, almás, és néha szilvás töltelékkel?",
    questionDE:
      "Welches ungarische Dessert wird in mehreren Schichten mit Füllungen aus Mohn, Nüssen, Äpfeln und gelegentlich auch Pflaumen zubereitet?",
    answers: [
      {
        answerHU: "Bejgli",
        answerDE: "Bejgli",
        isCorrect: false,
      },
      {
        answerHU: "Flódni",
        answerDE: "Flódni",
        isCorrect: true,
      },
      {
        answerHU: "Zserbó szelet",
        answerDE: "Gerbeaud-Schnitte",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A flódni. Zsidó–magyar eredetű, réteges sütemény, gazdag és sokféle töltelékkel, ünnepi alkalmak dísze.",
    explanationDE:
      "Das „Flódni“ ist ein schichtweises Gebäck jüdisch-ungarischen Ursprungs mit Lagen aus Mohn, Nuss, Apfel und teils Pflaumenmus. Ein festliches, sehr reichhaltiges Dessert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Melyik étel készül savanyú káposztával, szalonnával és néha libahússal bizonyos régiókban?",
    questionDE:
      "Welches Gericht wird mit Sauerkraut, Speck und Gänsefleisch in manchen Regionen zubereitet?",
    answers: [
      {
        answerHU: "Töltött paprika",
        answerDE: "Gefüllte Paprika",
        isCorrect: false,
      },
      {
        answerHU: "Székelykáposzta",
        answerDE: "Székelyer Kraut",
        isCorrect: true,
      },
      {
        answerHU: "Rakott krumpli",
        answerDE: "Kartoffelauflauf",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A székelykáposzta. Savanykás, pörköltes alapú, helyenként szalonnával, libával dúsítva, régiós változatokkal.",
    explanationDE:
      "Das „Székelykáposzta“ basiert auf Sauerkraut und Schmorsoße. Mit Speck und gelegentlich Gänsefleisch in manchen Regionen. Ein herzhaft-säuerliches Eintopfgericht.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Mi az a „Gundel-palacsinta”?",
    questionDE: "Was ist „Gundel-Palacsinta“?",
    answers: [
      {
        answerHU: "Egy csípős paprikakrém",
        answerDE: "Eine scharfe Paprikacreme",
        isCorrect: false,
      },
      {
        answerHU: "Diós-rumos palacsinta csokoládéöntettel",
        answerDE: "Walnuss-Rum-Palatschinken mit Schokoladensoße",
        isCorrect: true,
      },
      {
        answerHU: "Túrós-mazsolás rétes",
        answerDE: "Quark-Rosinen-Strudel",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Diós-rumos töltelékkel és csokoládéöntettel készített palacsinta. Gundel Károly specialitása, itthon és külföldön is nagyra értékelik.",
    explanationDE:
      "Die „Gundel-Palatschinke“ ist ein Crêpe mit Rum-Nuss-Füllung und Schokosoße. Károly Gundel machte sie berühmt",
  },
  {
    category: "Kulinarik",
    level: 3,
    questionHU: "Mi a „slambuc” a Hortobágyi pusztán?",
    questionDE: "Was ist das Gericht „slambuc“ in der Hortobágy-Puszta?",
    answers: [
      {
        answerHU: "Édes túrós palacsinta lenne.",
        answerDE: "Es wäre eine süße Quark-Palatschinke.",
        isCorrect: false,
      },
      {
        answerHU: "Krumplis tészta, szalonna és hagyma keveréke.",
        answerDE: "Kartoffelteig, Speck- und Zwiebelmischung.",
        isCorrect: true,
      },
      {
        answerHU: "Tejberizs mazsolával.",
        answerDE: "Milchreis mit Rosinen.",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Krumpli, tészta és szalonna bográcsban főzve. Pásztorétel, egyszerű, mégis tartalmas, hagyományos alföldi recept szabad tűzön.",
    explanationDE:
      "„Slambuc“ ist ein Hirtenessen der Hortobágy-Puszta aus Kartoffeln, Nudeln und Speck im Kessel gekocht. Rustikal, aber nahrhaft, ein typisches Gericht am offenen Feuer.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogy nevezik Magyarországon a vastag kenyérszeletet, amit zsírral és hagymával esznek?",
    questionDE:
      "Wie nennt man in Ungarn die dick geschnittenen Brotscheiben, die mit Speckfett und Zwiebeln belegt werden?",
    answers: [
      {
        answerHU: "Édes bundás kenyér",
        answerDE: "Ein Schweinegericht mit in Pálinka geschmorten Aprikosen",
        isCorrect: false,
      },
      {
        answerHU: "Zsíros kenyér",
        answerDE: "Fettbemmchen",
        isCorrect: true,
      },
      {
        answerHU: "Pogácsa",
        answerDE: "Pogatsche",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Zsíros kenyérnek. Paraszti eredetű, filléres finomság, gyakran sóval, hagymával fogyasztják, laktató alapétel.",
    explanationDE:
      "In Ungarn nennt man es „Zsíros kenyér“: Eine dicke Brotscheibe mit Schmalz bestrichen, dazu Zwiebeln und Salz. Ein bäuerliches, einfaches und sättigendes Essen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Mi az a mákos guba, és mely ünnepi alkalommal készítik leggyakrabban?",
    questionDE:
      "Was ist Mákos Guba und zu welchem festlichen Anlass wird es am häufigsten zubereitet?",
    answers: [
      {
        answerHU:
          "Kenyér alapú desszert mákkal, dióval és tejföllel, hagyományosan karácsonykor",
        answerDE:
          "Ein Dessert auf Brotbasis mit Mohn, Nüssen und Sauerrahm, traditionell zu Weihnachten",
        isCorrect: true,
      },
      {
        answerHU:
          "Kenyér alapú desszert mákkal és aszalt gyümölcsökkel, elsősorban téli ünnepekre",
        answerDE:
          "Dessert auf Brotbasis mit Mohn und Trockenfrüchten, vor allem für Winterfeste",
        isCorrect: false,
      },
      {
        answerHU:
          "Piskótából készült, mákos töltelékkel rétesszerű édesség, melyet nem kötnek szigorúan ünnepi alkalomhoz",
        answerDE:
          "Biskuitgebäck mit Mohnfüllung, strudelartiges Dessert, das nicht streng an festliche Anlässe gebunden ist",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tejbe áztatott kiflit mákkal rétegeznek, gyakran vaníliasodóval. Leginkább karácsonykor fogyasztják, édes, kiadós desszert.",
    explanationDE:
      "„Mákos guba“ besteht aus in Milch getunkten Hörnchen, Schichten von Mohn und oft Vanillesauce. Zur Weihnachtszeit besonders beliebt, ein süßes, sättigendes Dessert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Miért vált a paprika a magyar konyha egyik legfontosabb fűszerévé?",
    questionDE:
      "Warum wurde Paprika zu einem der wichtigsten Gewürze der ungarischen Küche?",
    answers: [
      {
        answerHU: "Mert gazdag ízt és élénk színt kölcsönöz az ételeknek",
        answerDE:
          "Weil es den Gerichten einen reichen Geschmack und eine lebendige Farbe verleiht",
        isCorrect: true,
      },
      {
        answerHU:
          "Mert antioxidáns tartalma hozzájárul az ételek tartósságához",
        answerDE:
          "Weil sein Antioxidantiengehalt zur Haltbarkeit der Speisen beiträgt",
        isCorrect: false,
      },
      {
        answerHU: "Mert csupán dekoratív, nem pedig ízesítő szerepe van",
        answerDE: "Weil es nur dekorativ und nicht geschmacksgebend ist",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Ízt és színt ad, jellegzetes karaktert kölcsönöz az ételeknek. A magyar gasztronómia szimbólumává vált, szinte minden pörköltalapban megtalálható.",
    explanationDE:
      "Paprika verleiht Farbe und Geschmack, prägt die unverwechselbare Note vieler Gerichte. Er ist zum Symbol der ungarischen Küche geworden und steckt fast in jeder „Pörkölt“-Basis.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Milyen szerepet tölt be a tejföl a magyar konyhában?",
    questionDE: "Welche Rolle spielt Sauerrahm in der ungarischen Küche?",
    answers: [
      {
        answerHU: "Gazdagítja az ízeket és selymessé teszi az ételeket",
        answerDE:
          "Es bereichert den Geschmack und macht die Speisen sämig/cremig.",
        isCorrect: true,
      },
      {
        answerHU: "Elsősorban a textúrát javítja, de az ízre kevésbé hat",
        answerDE:
          "Es verbessert hauptsächlich die Textur, beeinflusst aber den Geschmack weniger",
        isCorrect: false,
      },
      {
        answerHU: "Csak dekoratív szerepet tölt be, nem pedig ízesítő",
        answerDE:
          "Spielt nur eine dekorative Rolle, nicht aber geschmacksgebend",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Lágyítja, sűríti, krémesíti az ételeket. Számos fogásba, levesbe, paprikásba kerül, a gazdag, harmonikus magyar ízvilág kulcsa.",
    explanationDE:
      "Sauerrahm ist ein Schlüsselelement: Er mildert, bindet und verleiht Cremigkeit. Er kommt in vielen Gerichten, Suppen und „Paprikás“ zum Einsatz und sorgt für den typischen runden Geschmack.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen lépésekből áll a hagyományos magyar rántott hús elkészítése?",
    questionDE:
      "Aus welchen Schritten besteht die Zubereitung des traditionellen ungarischen panierten Fleisches?",
    answers: [
      {
        answerHU: "Liszt, tojás, zsemlemorzsa – majd forró olajban sütés",
        answerDE: "Mehl, Ei, Semmelbrösel – dann in heißem Öl ausbacken",
        isCorrect: true,
      },
      {
        answerHU: "Először sütőben készítik, majd serpenyőben véglegesítik",
        answerDE:
          "Zuerst im Ofen zubereitet, dann in der Pfanne fertiggestellt",
        isCorrect: false,
      },
      {
        answerHU: "Hús előfőzése, majd grillezése és végső panírozása",
        answerDE: "Fleisch vorkochen, dann grillen und abschließend panieren",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Hármas panírozás (liszt, tojás, morzsa), majd bő forró olajban kisütés. Így lesz kívül ropogós, belül szaftos, klasszikus fogás.",
    explanationDE:
      "Für das traditionelle ungarische Schnitzel wendet man das Fleisch in Mehl, Ei und Semmelbröseln (Dreierpanade) und brät es in heißem Öl. Außen knusprig, innen saftig.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Hogyan alakult át a magyar ételkészítés a XX. század során?",
    questionDE:
      "Wie hat sich die ungarische Kochkunst im 20. Jahrhundert verändert?",
    answers: [
      {
        answerHU:
          "Modern technikák és globalizáció révén új alapanyagok és ízek jelentek meg",
        answerDE:
          "Durch moderne Techniken und Globalisierung traten neue Zutaten und Geschmacksrichtungen hervor",
        isCorrect: true,
      },
      {
        answerHU:
          "Főként a konzerv és fagyasztott termékek elterjedése hozott változást, bár a hagyományos módszerek fennmaradtak",
        answerDE:
          "Hauptsächlich die Verbreitung von Konserven und Tiefkühlprodukten hat Veränderungen gebracht, obwohl traditionelle Methoden erhalten geblieben sind",
        isCorrect: false,
      },
      {
        answerHU:
          "Az ételkészítés lényegében változatlan maradt, csupán a tálalás modernizálódott",
        answerDE:
          "Die Zubereitung der Speisen ist im Wesentlichen unverändert geblieben, nur die Präsentation wurde modernisiert",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A technológiai fejlődés és a globalizáció hatására új alapanyagok, új eljárások érkeztek, de a tradicionális receptek is fennmaradtak.",
    explanationDE:
      "Im 20. Jh. änderte sich das ungarische Kochen durch Technologiefortschritt und Globalisierung. Neue Zutaten und Methoden kamen auf, doch blieben traditionelle Rezepte lebendig.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Hogyan készül a tarhonya, amelyet tejföllel és sült hagymával tálalnak?",
    questionDE:
      "Wie wird Tarhonya zubereitet, das mit Sauerrahm und gebratenen Zwiebeln serviert wird?",
    answers: [
      {
        answerHU:
          "Főtt tarhonya, melyet sült hagyománnyal és tejföllel tálalnak",
        answerDE:
          "Gekochter Tarhonya, serviert mit gebratenen Zwiebeln und Sauerrahm",
        isCorrect: true,
      },
      {
        answerHU:
          "Tarhonya, amit közvetlenül a serpenyőben pirítanak és zöldségekkel kevernek",
        answerDE:
          "Tarhonya, die direkt in der Pfanne angeröstet und mit Gemüse vermischt wird",
        isCorrect: false,
      },
      {
        answerHU:
          "Tarhonya, amit tojással és vajjal készítenek, hasonlóan a nokedlivel",
        answerDE:
          "Tarhonya, das mit Ei und Butter zubereitet wird, ähnlich wie Spätzle",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Vízben főzik vagy pirítják, majd a végén tejfölt és pirított hagymát adnak hozzá. Egyszerű, finom köret pörköltek mellé.",
    explanationDE:
      "Man kocht oder röstet die körnige Tarhonya, zum Schluss kommt Sauerrahm und geröstete Zwiebeln dazu. Eine einfache, schmackhafte Beilage etwa zu Pörkölt.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU: "Hogyan épül fel egy tipikus hagyományos magyar éttermi menü?",
    questionDE:
      "Wie ist ein typisches traditionelles ungarisches Restaurantmenü aufgebaut?",
    answers: [
      {
        answerHU:
          "Előétel, főétel és desszert, melyek hagyományos fogásokból állnak",
        answerDE:
          "Vorspeise, Hauptgericht und Dessert, die aus traditionellen Gerichten bestehen.",
        isCorrect: true,
      },
      {
        answerHU: "Könnyű snackek és saláták dominálnak a menüben",
        answerDE: "Leichte Snacks und Salate dominieren auf der Speisekarte",
        isCorrect: false,
      },
      {
        answerHU:
          "Csak főételeket kínálnak, a desszertet a vendégek saját választása szerint pótolják",
        answerDE:
          "Bieten nur Hauptgerichte an, das Dessert ergänzen die Gäste nach eigener Wahl",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Előétel (pl. hideg), leves, főétel körettel, végül desszert. Átfogóan mutatja be a magyar konyha ízeit, bőséges többfogásos formában.",
    explanationDE:
      "Ein klassisches ungarisches Menü besteht aus Vorspeise (z. B. Kaltgericht), Suppe, Hauptspeise mit Beilage und Dessert. So werden die landestypischen Geschmacksrichtungen reichhaltig präsentiert.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen egészségügyi előnyökkel járhat a hagyományos magyar ételek mérsékelt fogyasztása?",
    questionDE:
      "Welche gesundheitlichen Vorteile kann der moderate Verzehr traditioneller ungarischer Speisen bieten?",
    answers: [
      {
        answerHU:
          "Gazdag vitaminokban, ásványi anyagokban és antioxidánsokban, elősegítve az egészséges működést",
        answerDE:
          "Reich an Vitaminen, Mineralstoffen und Antioxidantien, was zu einer gesunden Körperfunktion beiträgt",
        isCorrect: true,
      },
      {
        answerHU:
          "Alacsony zsírtartalmuk miatt kalóriaszegények, de tápanyagban kevésbé gazdagok",
        answerDE:
          "Aufgrund ihres geringen Fettgehalts sind sie kalorienarm, aber weniger reich an Nährstoffen",
        isCorrect: false,
      },
      {
        answerHU:
          "Mivel minden összetevő természetes eredetű, az étel fogyasztása önmagában egészséges",
        answerDE:
          "Da alle Zutaten natürlichen Ursprungs sind, ist der Verzehr des Gerichts an sich gesund",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Tápláló, vitaminokban gazdag, de fontos a zsíros fogásoknál a mértékletesség. Mérsékelt fogyasztás hozzájárulhat a kiegyensúlyozott étrendhez.",
    explanationDE:
      "In Maßen genossen bieten traditionelle ungarische Gerichte Nährstoffe und Vitamine. Dennoch sind viele Speisen recht gehaltvoll, weshalb Mäßigung für eine ausgewogene Ernährung ratsam ist.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Milyen praktikákat javasolnak a magyar szakácsok az otthoni ételek autentikus fűszerezéséhez?",
    questionDE:
      "Welche Tipps geben ungarische Köche für eine authentische Würzung von Gerichten zu Hause?",
    answers: [
      {
        answerHU:
          "Friss fűszerek, különösen pirospaprika használata az autentikus íz eléréséhez",
        answerDE:
          "Verwendung frischer Gewürze, insbesondere von Paprikapulver, für einen authentischen Geschmack.",
        isCorrect: true,
      },
      {
        answerHU:
          "Előre kevert, bevált fűszerkeverékek alkalmazása a gyors és egyszerű főzés érdekében",
        answerDE:
          "Verwendung von vorgemischten, bewährten Gewürzmischungen für schnelles und einfaches Kochen",
        isCorrect: false,
      },
      {
        answerHU:
          "Főként szárított fűszerek használata, mert azok hosszabb ideig megőrzik az aromájukat",
        answerDE:
          "Hauptsächlich die Verwendung von getrockneten Gewürzen, da diese ihr Aroma länger bewahren",
        isCorrect: false,
      },
    ],
    explanationHU:
      "Friss, hagyományos fűszerek (paprika, hagyma, kömény, majoránna) használatát. A minőség és a tradíció őrzése az alap.",
    explanationDE:
      "Ungarische Köche empfehlen frische, typische Gewürze wie Paprika, Zwiebeln, Kümmel, Majoran. Entscheidend sind Qualität und die Bewahrung der Traditionsaromen.",
  },
  {
    category: "Kulinarik",
    level: 1,
    questionHU:
      "Mi a legfőbb különbség a klasszikus magyar levesek és az új, fúziós konyhából származó levesvariációk között?",
    questionDE:
      "Was ist der Hauptunterschied zwischen klassischen ungarischen Suppen und den neuen Fusions-Suppenvarianten?",
    answers: [
      {
        answerHU:
          "A hagyományos levesek egyszerű alapanyagokra épülnek, míg a fúziós levesek innovatív összetevőket is tartalmaznak",
        answerDE:
          "Traditionelle Suppen basieren auf einfachen Zutaten, während Fusions-Suppen auch innovative Zutaten enthalten",
        isCorrect: true,
      },
      {
        answerHU:
          "Mindkét típus alapvetően ugyanazokat az összetevőket használja, de a fúziós levesek modern tálalással térnek el",
        answerDE:
          "Beide Arten verwenden im Wesentlichen die gleichen Zutaten, aber Fusionssuppen unterscheiden sich durch eine moderne Präsentation",
        isCorrect: false,
      },
      {
        answerHU:
          "A fúziós levesek mindig hidegek, míg a klasszikusok forróak maradnak",
        answerDE:
          "Fusionssuppen sind immer kalt, während klassische Suppen heiß bleiben",
        isCorrect: false,
      },
    ],
    explanationHU:
      "A klasszikusak hagyományos alapanyagokra és technikákra épülnek, míg a fúziós levesek modern, váratlan ízpárokkal kísérleteznek.",
    explanationDE:
      "Die klassischen ungarischen Suppen setzen auf traditionelle Zutaten und Methoden, während Fusionsvarianten moderne, teils überraschende Geschmacksverbindungen versuchen.",
  },
];
