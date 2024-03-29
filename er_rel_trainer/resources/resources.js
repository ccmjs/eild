/**
 *----------------------------------------------------- DEPRECATED -----------------------------------------------------
 *
 * @overview data-based resources of ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./../er_rel_trainer/resources/styles.css",
/*
    "data": {
      "store": [ "ccm.store", { "name": "test", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test"
    },
*/
    "default.notation": "uml",
    "html.1": "./../er_rel_trainer/resources/templates.mjs",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
//  "number": 2,
    "onfinish": { "log": true, "restart": true, "store": false },
    "phrases": {
      "1624959358294X7172577865522314": {
        "key": "1624959358294X7172577865522314",
        "text": "Ein Kontinent besteht aus mehreren Staaten. Es gibt allerdings auch Staaten, die auf mehreren Kontinenten liegen.",
        "relationship": [
          "Kontinent",
          "besteht aus",
          "Staat"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Ein Staat kann auf einem aber auch auf mehreren Kontinenten liegen (z.B. die Türkei).",
          "Ein Kontinent besteht aus mindestens einem bis hin zu mehreren Staaten."
        ]
      },
      "1624959358294X16048675422216885": {
        "key": "1624959358294X16048675422216885",
        "text": "Ein Dirigent dirigiert ein Orchester und ein Orchester hat genau einen Dirigenten.",
        "relationship": [
          "Dirigent",
          "dirigiert",
          "Orchester"
        ],
        "solution": [
          "1",
          "1"
        ],
        "comment": [
          "Ein Orchester wird von genau einem Dirigenten dirigiert.",
          "Ein Dirigent dirigiert genau ein Orchester (gleichzeitig)."
        ]
      },
      "1624959358294X720369118676552": {
        "key": "1624959358294X720369118676552",
        "text": "Eine Stadt kann eine Hauptstadt sein und jeder Staat hat eine Hauptstadt.",
        "relationship": [
          "Stadt",
          "hauptstadt von",
          "Staat"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Ein Staat hat genau eine Hauptstadt. ",
          "\"Eine Stadt kann maximal Hauptstadt von einem Staat sein. Eine Stadt muss aber natürlich nicht Hauptstadt sein, daher \"\"bedingt\"\".\""
        ]
      },
      "1624959358294X23682960023712551": {
        "key": "1624959358294X23682960023712551",
        "text": "Ein Musiker spielt ein oder mehrere Instrumente und ein Instrument kann von einem oder mehreren Musikern gespielt werden.",
        "relationship": [
          "Musiker",
          "spielt",
          "Instrument"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "Es kann (alte) Instrumente geben, die von keinem mehr beherrscht werden. Manche Instrumente werden von vielen Musikern gespielt. ",
          "Ein Musiker spielt mindestens ein Instrument. Es gibt auch Musiker, die mehrere Instrumente beherrschen."
        ]
      },
      "1624959358294X27757892188295563": {
        "key": "1624959358294X27757892188295563",
        "text": "Ein Komponist komponiert mehrere Musikstücke und ein Musikstück hat genau einen Komponisten.",
        "relationship": [
          "Komponist",
          "komponiert",
          "Musikstück"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Musikstück wird von genau einem Komponisten komponiert. (Es gibt natürlich auch Musikstücke von mehreren Komponisten, aber dies ist bei der Phrase nicht gemeint.)",
          "Ein Komponist hat mindestens ein Musikstück komponiert. Er kann aber auch schon mehrere Musikstücke komponiert haben."
        ]
      },
      "1624959358294X9335427979588089": {
        "key": "1624959358294X9335427979588089",
        "text": "Jeder Mensch spricht eine oder mehrere Sprachen. Es gibt aber auch sogenannte \"tote\" Sprachen, die nicht mehr gesprochen werden.",
        "relationship": [
          "Mensch",
          "spricht",
          "Sprache"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "\"Es existieren Sprachen, die nicht mehr gesprochen werden, daher die \"\"bedingte\"\" Kardinalität. Manche Sprachen werden von vielen Menschen gesprochen.\"",
          "Ein Mensch spricht mindestens eine Sprache (Muttersprache). Es gibt aber auch Menschen, die mehrere Sprachen sprechen können."
        ]
      },
      "1624959358294X5092935765033262": {
        "key": "1624959358294X5092935765033262",
        "text": "Ein Mitarbeiter gehört einer oder auch mehreren Abteilungen an und eine Abteilung besteht aus mehreren Mitarbeitern.",
        "relationship": [
          "Mitarbeiter",
          "gehört an",
          "Abteilung"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Eine Abteilung hat mindestens einen Mitarbeiter. Es können auch mehrere Mitarbeiter zu einer Abteilung gehören.",
          "Ein Mitbarbeiter gehört in jedem Fall zu einer Abteilung. Er kann aber auch mehreren Abteilungen zugeordnet sein."
        ]
      },
      "1624959358294X6245964707195735": {
        "key": "1624959358294X6245964707195735",
        "text": "Ein Kunde bestellt einen oder mehrere Artikel und ein Artikel kann von mehreren Kunden bestellt werden. Zu Werbezwecken sind auch Adressen von Personen erfasst, die noch nichts gekauft haben.",
        "relationship": [
          "Kunde ",
          "bestellt",
          "Artikel"
        ],
        "solution": [
          "cn",
          "cn"
        ],
        "comment": [
          "Ein Artikel wird von keinem, einen oder mehreren Kunden bestellt.",
          "\"Ein Kunde bestellt einen oder mehrere Artikel. Da zu Werbezwecken auch Kunden erfasst werden, die noch keinen Artikel bestellt haben, ist die Kardinalität \"\"bedingt\"\". Es kann somit also Kunden geben, die noch nichts bestellt haben.\""
        ]
      },
      "1624959358294X5147925160379316": {
        "key": "1624959358294X5147925160379316",
        "text": "Jedem Mitarbeiter ist ein Arbeitsplatz zugewiesen. Aufgrund von Teilzeitarbeit kann ein Arbeitsplatz von einem oder auch von mehreren Mitarbeitern genutzt werden.",
        "relationship": [
          "Mitarbeiter",
          "bekommt zugewiesen",
          "Arbeitsplatz"
        ],
        "solution": [
          "cn",
          "1"
        ],
        "comment": [
          "Ein Arbeitsplatz wird von keinem, einen oder auch von mehreren Mitarbeitern genutzt.",
          "Einem Mitarbeiter wird genau ein Arbeitsplatz zugewiesen."
        ]
      },
      "1624959358294X6694492955247533": {
        "key": "1624959358294X6694492955247533",
        "text": "Um auf Teilzeitbeschäftigung flexibel reagieren zu können, sind einem Mitarbeiter mehrere mögliche Arbeitsplätze zugewiesen und ein Arbeitsplatz kann entsprechend von mehreren Mitarbeitern genutzt. ",
        "relationship": [
          "Mitarbeiter",
          "bekommt zugewiesen",
          "Arbeitsplatz"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "Ein Arbeitsplatz wird von keinem, einen oder auch von mehreren Mitarbeitern genutzt.",
          "Einem Mitarbeiter werden genau ein oder mehrere Arbeitsplätze zugewiesen."
        ]
      },
      "1624959358294X12635600983182527": {
        "key": "1624959358294X12635600983182527",
        "text": "Studenten können sich für einen Studiengang einschreiben. Studiengangwechsel sind nicht möglich. Es kann vorkommen, dass sich für einen Studiengang noch niemand eingeschrieben hat.",
        "relationship": [
          "Student",
          "ist eingeschrieben in",
          "Studiengang"
        ],
        "solution": [
          "cn",
          "1"
        ],
        "comment": [
          "Ein Studiengang hat keinen, einen oder mehrere Studenten.",
          "Da keine Studiengangwechsel erlaubt sind ist jeder Student immer in genau einem Studiengang eingeschrieben."
        ]
      },
      "1624959358294X7034523781274555": {
        "key": "1624959358294X7034523781274555",
        "text": "Studenten können sich für einen Studiengang einschreiben. Studiengangwechsel sind möglich. Es kann vorkommen, dass sich für einen Studiengang noch niemand eingeschrieben hat.",
        "relationship": [
          "Student",
          "ist eingeschrieben in",
          "Studiengang"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "Ein Studiengang hat keinen, einen oder mehrere Studenten.",
          "Da Studiengangswechsel erlaubt sind ist jeder Student in einem oder auch mehreren Studiengängen eingeschrieben."
        ]
      },
      "1624959358294X2355920858720082": {
        "key": "1624959358294X2355920858720082",
        "text": "Ein Student kann eine oder mehrere Klausuren in einer Prüfungsphase schreiben. Eine Klausur kann von einem oder mehreren Studenten geschrieben werden. ",
        "relationship": [
          "Student",
          "schreibt",
          "Klausur"
        ],
        "solution": [
          "cn",
          "cn"
        ],
        "comment": [
          "Eine Klausur muss nicht geschrieben werden, wenn sich z.B. kein Student dafür anmeldet oder die Angemeldeten nicht erscheinen. Eine Klausur wird also von keinem, einen oder mehreren Studenten geschrieben.",
          "Ein Student schreibt in einer Prüfungsphase keine, eine oder mehrere Klausuren."
        ]
      },
      "1624959358294X4273073548664623": {
        "key": "1624959358294X4273073548664623",
        "text": "Ein Verein hat einen Präsidenten. Ein Präsident kann auch in mehreren verschiedenen Vereinen Präsident sein.",
        "relationship": [
          "Verein",
          "hat",
          "Präsident"
        ],
        "solution": [
          "n",
          "1"
        ],
        "comment": [
          "Ein Vereinspräsident ist der Präsident von genau einem oder mehreren Vereinen.",
          "Ein Verein hat genau einen Präsidenten."
        ]
      },
      "1624959358294X01736823718572622": {
        "key": "1624959358294X01736823718572622",
        "text": "Ein Verein hat mehrere Mitglieder und ein Mitglied ist Mitglied in mindestens einem Verein.",
        "relationship": [
          "Verein",
          "hat",
          "Mitglied"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Ein Vereinsmitglied ist Mitglied in genau einem oder mehreren Vereinen.",
          "Ein Verein hat genau ein oder mehrere Mitglieder."
        ]
      },
      "1624959358294X06259649669001344": {
        "key": "1624959358294X06259649669001344",
        "text": "Ein Vereinsmitglied zahlt jedes Jahr seinen Beitrag. Wenn ein Mitglied neu angemeldet ist, wird der erste Beitrag erst nach drei Monaten eingezogen. Ein gezahlter Beitrag kann eindeutig einem Vereinsmitglied zugeordnet werden.",
        "relationship": [
          "Mitglied",
          "zahlt",
          "Beitrag"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Ein Beitrag wird von genau einem Vereinsmitglied gezahlt.",
          "Ein Vereinsmitglied hat bisher keinen (erste 3 Monate), einen oder (jährlich) mehrere Beiträge gezahlt."
        ]
      },
      "1624959358294X060454858026093294": {
        "key": "1624959358294X060454858026093294",
        "text": "Ein Vereinsmitglied zahlt jedes Jahr seinen Beitrag. Ein Mitglied wird erst erfaßt, wenn sein erster Beitrag gezahlt ist. Ein gezahlter Beitrag kann eindeutig einem Vereinsmitglied zugeordnet werden.",
        "relationship": [
          "Mitglied",
          "zahlt",
          "Beitrag"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Beitrag wird von genau einem Vereinsmitglied gezahlt.",
          "Ein Vereinsmitglied hat genau einen oder bereits (jährlich) mehrere Beiträge gezahlt."
        ]
      },
      "1624959358294X510902478223473": {
        "key": "1624959358294X510902478223473",
        "text": "Ein Vereinsmitglied bekommt immer die Vereinszeitung zugestellt. Weitere Fachgruppen-Zeitschriften können nach Wunsch bestellt werden. Es werden nur Zeitschriften gedruckt, die auch Abnehmer haben. ",
        "relationship": [
          "Mitglied",
          "zugestellt",
          "Zeitung"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Eine Zeitung wird von einem oder mehreren Vereinsmitgliedern bestellt.",
          "Ein Vereinsmitglied bekommt genau eine (Vereinszeitung) oder mehrere Zeitungen zugestellt."
        ]
      },
      "1624959358294X8998666312228858": {
        "key": "1624959358294X8998666312228858",
        "text": "Ein Vereinsmitglied kann Fachgruppen-Zeitschriften nach Wunsch bestellen. Es werden nur Zeitschriften gedruckt, die auch Abnehmer haben. ",
        "relationship": [
          "Mitglied",
          "bestellt",
          "Zeitung"
        ],
        "solution": [
          "n",
          "cn"
        ],
        "comment": [
          "Eine Zeitung wird von einem oder mehreren Vereinsmitgliedern bestellt.",
          "Ein Vereinsmitglied bekommt keine, eine oder mehrere Zeitungen zugestellt."
        ]
      },
      "1624959358294X2633434720289771": {
        "key": "1624959358294X2633434720289771",
        "text": "Rechnungen werden unterteilt in den sog. Rechnungskopf mit Kunde, Datum, etc. und die Rechnungspositionen mit Artikel, Menge, Preis. Es kann keine Position ohne Kopf geben und umgekehrt.",
        "relationship": [
          "Rechnungskopf",
          "gehört zu",
          "Rechnungsposition"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Eine Rechungsposition hat genau einen Rechnungskopf.",
          "Ein Rechnungskopf gehört zu einer oder mehreren Rechnungspositionen."
        ]
      },
      "1624959358294X08818038722800337": {
        "key": "1624959358294X08818038722800337",
        "text": "Es werden Angebote geschrieben, für die dann ggf. ein Kunde einen Auftrag erteilt. Da es inhaltliche Anpassungen geben kann, wird der Auftrag auf der Basis des Angebots separat gespeichert.",
        "relationship": [
          "Angebot",
          "Kunde erteilt",
          "Auftrag"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Ein von einem Kunden erteilter Auftrag gehört zu genau einem Angebot.",
          "Zu einem Angebot gibt es keinen oder genau einen von einem Kunden erteilten Auftrag."
        ]
      },
      "1624959358294X0700775701702081": {
        "key": "1624959358294X0700775701702081",
        "text": "Kunden, die ihre Rechnung nicht innerhalb von 4 Wochen bezahlen, werden abgemahnt. Es gibt maximal 4 Mahnstufen.",
        "relationship": [
          "Rechnung",
          "wird abgemahnt",
          "Mahnung"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Zu einer Mahnung gehört genau eine Rechnung.",
          "Zu einer Rechnung gibt es keine, eine oder mehrere (maximal 4) Mahnungen."
        ]
      },
      "1624959358294X8394801400323784": {
        "key": "1624959358294X8394801400323784",
        "text": "Ein Haus kann einen Aufzug haben und ein Aufzug gehört immer zu genau einem Haus.",
        "relationship": [
          "Haus",
          "hat",
          "Aufzug"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Ein Aufzug gehört zu genau einem Haus.",
          "Ein Haus hat einen oder keinen Aufzug, wenn es z.B. nur Treppen oder nur ein Geschoß (Bungalow) gibt."
        ]
      },
      "1624959358294X24458384212239093": {
        "key": "1624959358294X24458384212239093",
        "text": "Ein Haus hat ein Dach und ein Dach gehört immer zu genau einem Haus.",
        "relationship": [
          "Haus ",
          "hat",
          "Dach"
        ],
        "solution": [
          "1",
          "1"
        ],
        "comment": [
          "Ein Dach gehört zu genau einem Haus. ",
          "Ein Haus hat genau ein Dach."
        ]
      },
      "1624959358294X5465313660027862": {
        "key": "1624959358294X5465313660027862",
        "text": "Ein Haus hat einen oder mehrere Eigentümer und einem Eigentümer gehört mindestens ein Haus.",
        "relationship": [
          "Haus",
          "hat",
          "Eigentümer"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Ein Eigentümer hat genau ein oder mehrere Häuser.",
          "Ein Haus hat genau einen oder mehrere Eigentümer."
        ]
      },
      "1624959358294X7074942590742499": {
        "key": "1624959358294X7074942590742499",
        "text": "Ein Patient hat einen oder keinen Blinddarm und ein Blinddarm gehört immer zu genau einem Patienten.",
        "relationship": [
          "Patient",
          "hat",
          "Blinddarm"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Ein Blinddarm gehört genau zu einem Patienten.",
          "Ein Patient hat genau einen oder keinen Blinddarm (wenn er bereits entfernt wurde)."
        ]
      },
      "1624959358294X8429765595254981": {
        "key": "1624959358294X8429765595254981",
        "text": "Ein Schüler besucht genau eine Klasse und eine Klasse hat mehrere Schüler. Es gibt keine Klasse ohne Schüler.",
        "relationship": [
          "Schüler",
          "besucht",
          "Klasse"
        ],
        "solution": [
          "n",
          "1"
        ],
        "comment": [
          "Ein Klasse hat mindestens einen Schüler.",
          "Ein Schüler gehört genau zu einer Klasse."
        ]
      },
      "1624959358294X9656131965481025": {
        "key": "1624959358294X9656131965481025",
        "text": "Zu einem rechten Schuh gehört genau ein linker Schuh und umgekehrt.",
        "relationship": [
          "Rechter Schuh",
          "gehört zu",
          "Linker Schuh"
        ],
        "solution": [
          "1",
          "1"
        ],
        "comment": [
          "Zu einem linken Schuh gehört genau ein rechter Schuh. ",
          "Zu einem rechten Schuh gehört genau ein linker Schuh. "
        ]
      },
      "1624959358294X12850427632402783": {
        "key": "1624959358294X12850427632402783",
        "text": "Ein Mitarbeiter hat mehrere Fähigkeiten, wobei einige Mitarbeiter auch gänzlich unbegabt sind. Es gibt auch Fähigkeiten die niemand beherrscht.",
        "relationship": [
          "Mitarbeiter",
          "besitzt",
          "Fähigkeiten"
        ],
        "solution": [
          "cn",
          "cn"
        ],
        "comment": [
          "Eine Fähigkeit wird von keinem, einem oder mehreren Mitarbeitern beherrscht.",
          "Ein Mitarbeiter beherrscht keine, eine oder mehrere Fähigkeiten."
        ]
      },
      "1624959358294X7481647023525262": {
        "key": "1624959358294X7481647023525262",
        "text": "Ein Mensch kann keine, eine oder mehrere Staatsangehörigkeiten haben. Es gibt keine Staatsangehörigkeit die kein einziger Mensch besitzt.",
        "relationship": [
          "Mensch",
          "hat",
          "Staatsangehörigkeit"
        ],
        "solution": [
          "n",
          "cn"
        ],
        "comment": [
          "Einer Staatsangehörigkeit gehören ein oder mehrere Menschen an.",
          "Ein Mensch hat keine, eine oder mehrere Staatsangehörigkeiten."
        ]
      },
      "1624959358294X18592020169700274": {
        "key": "1624959358294X18592020169700274",
        "text": "Eine Person kann Mitglied in einer Partei sein, aber nicht mehreren Parteien angehören. Es gibt keine Partei ohne Mitglieder.",
        "relationship": [
          "Person",
          "gehört zu",
          "Partei"
        ],
        "solution": [
          "n",
          "c"
        ],
        "comment": [
          "Eine Partei hat ein oder mehrere Mitglieder.",
          "Eine Person gehört zu keiner oder genau einer Partei."
        ]
      },
      "1624959358294X5352188465687782": {
        "key": "1624959358294X5352188465687782",
        "text": "Eine Stadt kann mehrere Bahnhöfe haben und ein Bahnhof gehört immer zu genau einer Stadt.",
        "relationship": [
          "Stadt",
          "hat",
          "Bahnhof"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Ein Bahnhof gehört zu genau einer Stadt. ",
          "Eine Stadt hat genau einen, keinen oder mehrere Bahnhöfe."
        ]
      },
      "1624959358294X2408947475332257": {
        "key": "1624959358294X2408947475332257",
        "text": "Ein Mitarbeiter hat höchstens einen PC und ein PC ist genau einem Mitarbeiter zugeordnet.",
        "relationship": [
          "Mitarbeiter",
          "hat",
          "PC"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Ein PC ist immer genau einem Mitarbeiter fest zugeordnet.",
          "Ein Mitarbeiter hat keinen oder genau einen PC."
        ]
      },
      "1624959358294X7221353112015212": {
        "key": "1624959358294X7221353112015212",
        "text": "Eine Abteilung hat mehrere Mitarbeiter und ein Mitarbeiter gehört genau einer Abteilung an.",
        "relationship": [
          "Abteilung",
          "hat",
          "Mitarbeiter"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Mitarbeiter gehört genau zu einer Abteilung. Er kann nicht mehreren Abteilungen zugeordnet sein.",
          "Eine Abteilung hat einen oder mehrere Mitarbeiter."
        ]
      },
      "1624959358294X7729252877920147": {
        "key": "1624959358294X7729252877920147",
        "text": "Ein Mitarbeiter kann an mehreren Projekten beteiligt sein und an einem Projekt sind ein oder mehrere Mitarbeiter beteiligt.",
        "relationship": [
          "Mitarbeiter",
          "ist beteiligt an",
          "Projekt"
        ],
        "solution": [
          "n",
          "cn"
        ],
        "comment": [
          "Ein Projekt hat einen oder mehrere Mitarbeiter.",
          "Ein Mitarbeiter ist an keinem, einen oder mehreren Projekten beteiligt."
        ]
      },
      "1624959358294X618479238515959": {
        "key": "1624959358294X618479238515959",
        "text": "Eine Student besucht mehrere Lehrveranstaltungen und eine Lehrveranstaltung findet nur dann statt, wenn es Teilnehmer gibt. ",
        "relationship": [
          "Student",
          "besucht",
          "Lehrveranstaltung"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Eine Lehrveranstaltung wird von einem oder mehreren Studenten besucht.",
          "Ein Student besucht eine oder mehrere Lehrveranstaltungen."
        ]
      },
      "1624959358294X7380527143757363": {
        "key": "1624959358294X7380527143757363",
        "text": "Ein Kind hat einen Vater und ein Vater hat mindestens ein Kind.",
        "relationship": [
          "Vater",
          "hat",
          "Kind"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Kind hat genau einen Vater.",
          "Ein Vater hat ein oder mehrere Kinder."
        ]
      },
      "1624959358294X19231058080725427": {
        "key": "1624959358294X19231058080725427",
        "text": "Eine Fachhochschule besteht aus mehreren Fakultäten und eine Fakultät gehört immer zu genau einer Fachhochschule.",
        "relationship": [
          "Fachhochschule",
          "besteht aus",
          "Fakultät"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Eine Fakultät befindet sich an genau einer Fachhochschule.",
          "Eine Fachhochschule besteht aus einer oder mehreren Fakultäten."
        ]
      },
      "1624959358294X2642055518972384": {
        "key": "1624959358294X2642055518972384",
        "text": "Ein Haus hat mehrere Räume und ein Raum gehört immer genau zu einem Haus.",
        "relationship": [
          "Haus",
          "hat",
          "Räume"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Raum befindet sich in genau einem Haus.",
          "Ein Haus hat einen oder mehrere Räume."
        ]
      },
      "1624959358294X5274608086877992": {
        "key": "1624959358294X5274608086877992",
        "text": "Ein Buch hat einen oder mehrere Autoren und jeder Autor hat ein oder mehrere Bücher geschrieben.",
        "relationship": [
          "Buch",
          "hat",
          "Autor"
        ],
        "solution": [
          "n",
          "n"
        ],
        "comment": [
          "Ein Autor hat mindestens ein Buch geschrieben, sonst ist er kein Autor. Häufig schreiben Autoren mehrere Bücher.",
          "Ein Buch hat mindestens einen Autor. "
        ]
      },
      "1624959358294X15068946881846834": {
        "key": "1624959358294X15068946881846834",
        "text": "Eine Mutter hat ein oder mehrere Kinder und ein Kind hat genau eine Mutter. ",
        "relationship": [
          "Mutter",
          "hat",
          "Kind"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Ein Kind hat genau eine Mutter.",
          "Eine Mutter hat mindestens eins bis hin zu mehreren Kindern."
        ]
      },
      "1624959358294X4607380425559544": {
        "key": "1624959358294X4607380425559544",
        "text": "In einem Haus können Junggesellen wohnen und jeder Junggeselle wohnt in genau einem Haus.",
        "relationship": [
          "Haus",
          "wohnt",
          "Junggeselle"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Ein Junggeselle wohnt in genau in einem Haus.",
          "\"In einem Haus müssen keine Junggesellen wohnen (\"\"bedingt\"\"). Es können aber auch ein bis hin zu mehreren Junggesellen in einem Haus wohnen.\""
        ]
      },
      "1624959358294X0224320100956803": {
        "key": "1624959358294X0224320100956803",
        "text": "Eine Stadt hat genau einen Oberbürgermeister und ein Oberbürgermeister regiert genau eine Stadt.",
        "relationship": [
          "Stadt",
          "regiert",
          "Oberbürgermeister"
        ],
        "solution": [
          "1",
          "1"
        ],
        "comment": [
          "",
          ""
        ]
      },
      "1624959358294X06531600698556783": {
        "key": "1624959358294X06531600698556783",
        "text": "Eine Stadt hat mehrere Kirchen und eine Kirche gehört immer zu genau einer Stadt.",
        "relationship": [
          "Stadt",
          "hat",
          "Kirche"
        ],
        "solution": [
          "1",
          "n"
        ],
        "comment": [
          "Eine Kirche steht genau in einer Stadt.",
          "Eine Stadt hat eine oder mehrere Kirchen."
        ]
      },
      "1624959358294X554309796952366": {
        "key": "1624959358294X554309796952366",
        "text": "Eine Stadt hat höchstens eine U-Bahn und eine U-Bahn gehört zur Stadt in der sie startet. ",
        "relationship": [
          "Stadt",
          "hat",
          "U-Bahn"
        ],
        "solution": [
          "1",
          "c"
        ],
        "comment": [
          "Eine U-Bahn gehört zu genau einer Stadt.",
          "Eine Stadt hat keine oder genau eine U-Bahn."
        ]
      },
      "1624959358294X34839853850889524": {
        "key": "1624959358294X34839853850889524",
        "text": "Eine Stadt kann mehrere U-Bahnhofstationen haben und eine U-Bahnhofstation gehört immer zu genau einer Stadt.",
        "relationship": [
          "Stadt",
          "hat",
          "U-Bahnhofstation"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Eine U-Bahnstation liegt genau in einer Stadt.",
          "Eine Stadt hat keine, eine oder mehrere U-Bahnhofstationen."
        ]
      },
      "1624959358294X8391677875177956": {
        "key": "1624959358294X8391677875177956",
        "text": "Eine Stadt liegt an einem, keinem oder mehreren Flüssen, die wiederum eine, mehrere oder keine Städte durchfließen.",
        "relationship": [
          "Stadt",
          "liegt an",
          "Fluß"
        ],
        "solution": [
          "cn",
          "cn"
        ],
        "comment": [
          "\"Ein Fluss muss nicht durch eine Stadt fließen (\"\"bedingt\"\"). Es gibt Flüsse, die direkt durch mehrere Städte fließen, wie z.B. der Rhein.\"",
          "\"Eine Stadt muss keinen Fluss haben (\"\"bedingt\"\"). Es gibt auch Städte durch die mehrere Flüsse fließen (z.B. München).\""
        ]
      },
      "1624959358294X9715164301985477": {
        "key": "1624959358294X9715164301985477",
        "text": "Ein Rezept hat mehrere Zutaten und eine Zutat kann zu einem oder mehreren Rezepten gehören.",
        "relationship": [
          "Rezept",
          "hat",
          "Zutat"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "Eine Zutat gehört zu keinem, einem oder mehreren Rezepten.",
          "Ein Rezept hat eine oder mehrere Zutaten."
        ]
      },
      "1624959358294X2671565311078872": {
        "key": "1624959358294X2671565311078872",
        "text": "Ein Planet kann Monde haben die ihn umkreisen und ein Mond umkreist immer genau einen Planeten.",
        "relationship": [
          "Planet",
          "hat",
          "Mond"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Ein Mond umkreist genau einen Planeten.",
          "Ein Planet hat keinen, einen oder mehrere Monde."
        ]
      },
      "1624959358294X8722300993307823": {
        "key": "1624959358294X8722300993307823",
        "text": "Ein Komponist kann eine oder mehrere Opern komponieren und eine Oper hat mindestens einen oder mehrere Komponisten.",
        "relationship": [
          "Komponist",
          "komponiert",
          "Oper"
        ],
        "solution": [
          "n",
          "cn"
        ],
        "comment": [
          "Eine Oper hat einen oder mehrere Komponisten. ",
          "Ein Komponist hat keine, eine oder mehrere Opern komponiert."
        ]
      },
      "1624959358294X9385992788709343": {
        "key": "1624959358294X9385992788709343",
        "text": "Ein Orchester besteht aus mehreren Musikern und ein Musiker kann zu einem oder mehreren Orchestern gehören.",
        "relationship": [
          "Orchester",
          "besteht aus",
          "Musiker"
        ],
        "solution": [
          "cn",
          "n"
        ],
        "comment": [
          "Ein Musiker gehört zu keinem, einem oder mehreren Orchestern.",
          "Ein Orchester besteht immer aus mehreren Musikern."
        ]
      },
      "1624959358294X21526111294451478": {
        "key": "1624959358294X21526111294451478",
        "text": "Zu einer Weinsorte können mehrere Flaschen im Keller liegen und eine Weinflasche gehört genau zu einer Weinsorte, bis auf die selbstgebrauten Flaschen, die zu keiner Sorte gehören.",
        "relationship": [
          "Weinsorte",
          "gehört zu",
          "Weinflasche"
        ],
        "solution": [
          "c",
          "cn"
        ],
        "comment": [
          "Eine Weinflasche gehört zu keiner (selbstgebraut) oder genau einer Weinsorte.",
          "Zu einer Weinsorte liegen keine, eine oder mehrere Weinflaschen im Keller."
        ]
      },
      "1624959358294X9287389715080185": {
        "key": "1624959358294X9287389715080185",
        "text": "Ein Staat besteht aus keinem, einem oder mehreren Bundesländern und ein Bundesland gehört immer zu genau einem Staat.",
        "relationship": [
          "Staat",
          "besteht aus",
          "Bundesland"
        ],
        "solution": [
          "1",
          "cn"
        ],
        "comment": [
          "Ein Bundesland gehört zu genau einem Staat. ",
          "Ein Staat kann kein bis hin zu mehreren Bundesländern haben."
        ]
      }
    },
    "shuffle": true
  },

  "demo": {}

};
