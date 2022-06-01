/**
 * @overview data-based resources of ccmjs-based web component for training relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * default notations data
 * @type {Object.<string,Object>}
 */
export const notations = {
  "abrial": {
    "key": "abrial",
    "title": "Abrial",
    "centered": true,
    "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht."
  },
  "arrow": {
    "key": "arrow",
    "title": "Pfeilnotation",
    "swap": true,
    "left": "mirrored"
  },
  "chen": {
    "key": "chen",
    "title": "Chen",
    "swap": true,
    "centered": true,
    "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
  },
  "crow": {
    "key": "crow",
    "title": "Krähenfuß",
    "swap": true,
    "left": "mirrored"
  },
  "mc": {
    "key": "mc",
    "swap": true,
    "title": "MC"
  },
  "uml": {
    "key": "uml",
    "swap": true,
    "title": "UML"
  }
};

/**
 * default phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Im Krankenhaus gibt es zu jedem Patienten eine Patientenakte.",
    "entities": [ "Patient", "Patientenakte" ],
    "relation": "hat",
    "solution": [ "1", "1" ],
    "comments": [
      "Zu jedem Patienten gibt es genau eine Patientenakte.",
      "Zu jeder Patientenakte gibt es genau einen Patienten."
    ]
  },
  {
    "text": "Im Chemielabor werden die Atomkerne von Atomen untersucht.",
    "entities": [ "Atom", "Atomkern" ],
    "relation": "hat",
    "solution": [ "1", "1" ],
    "comments": [
      "Jedes Atom hat genau einen Atomkern.",
      "Jeder Atomkern gehört zu genau einem Atom."
    ]
  },
  {
    "text": "Auf einer Konferenz sollen die Teilnehmer die Möglichkeit haben beim Einlass ein Namensschild zu bekommen.",
    "entities": [ "Namensschild", "Teilnehmer" ],
    "relation": "gehört zu",
    "solution": [ "1", "c" ],
    "comments": [
      "Jedes Namensschild gehört zu genau einem Teilnehmer.",
      "Ein Teilnehmer hat ein oder kein Namensschild."
    ]
  },
  {
    "text": "Bei einer Verkehrssimulation soll ein Fahrzeug auch einen Anhänger haben können.",
    "entities": [ "Anhänger", "Fahrzeug" ],
    "relation": "gehört zu",
    "solution": [ "1", "c" ],
    "comments": [
      "Ein Anhänger gehört zu genau einem Fahrzeug.",
      "Ein Fahrzeug hat einen oder keinen Anhänger."
    ]
  },
  {
    "text": "Für eine Stadtverwaltung soll es möglich sein auch eventuelle Bahnhöfe einer Stadt zu erfassen.",
    "entities": [ "Bahnhof", "Stadt" ],
    "relation": "gehört zu",
    "solution": [ "1", "cn" ],
    "comments": [
      "Ein Bahnhof gehört zu genau einer Stadt.",
      "Eine Stadt hat keinen, einen oder mehrere Bahnhöfe."
    ]
  },
  {
    "text": "Ein Hausbesitzer möchte erfassen, wer gerade in seinen beiden Häusern wohnt.",
    "entities": [ "Bewohner", "Haus" ],
    "relation": "wohnt in",
    "solution": [ "1", "cn" ],
    "comments": [
      "Ein Bewohner wohnt in genau einem Haus.",
      "Ein Haus hat momentan keinen, einen oder mehrere Bewohner."
    ]
  },
  {
    "text": "Das Vereinswesen in Deutschland möchte eine Liste aller Vereine verwalten. Zu jedem Verein soll auch eine Kontaktperson eingetragen sein, wobei manche Vereine die gleiche Kontaktperson angeben.",
    "entities": [ "Verein", "Kontaktperson" ],
    "relation": "hat",
    "solution": [ "1", "n" ],
    "comments": [
      "Ein Verein hat genau eine Kontaktperson.",
      "Eine Kontaktperson wird bei einem oder mehreren Vereine als Kontakt angegeben."
    ]
  },
  {
    "text": "Ein Radiosender für klassische Musik möchte eine Datensammlung von Musikstücken aufbauen, wobei für jedes Musikstück auch Hintergrundinformationen zum Komponisten abrufbar sein sollen.",
    "entities": [ "Musikstück", "Komponist" ],
    "relation": "hat",
    "solution": [ "1", "n" ],
    "comments": [
      "Ein Musikstück hat genau einen Komponisten.",
      "Ein Komponist hat ein oder mehrere Musikstücke aus der Datensammlung komponiert."
    ]
  },
  {
    "text": "Eine Mensa möchte ihren Bestand an Töpfen (inkl. Pfannen) nachhalten, um schneller festzustellen, ob etwas fehlt und nachgekauft werden muss. Die Deckel sollen separat erfasst werden, da diese auch einzeln nachbestellbar sind. Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "entities": [ "Topf", "Deckel" ],
    "relation": "hat",
    "solution": [ "c", "1" ],
    "comments": [
      "Ein Topf hat einen oder keinen Deckel.",
      "Ein Deckel gehört zu genau einem Topf."
    ]
  },
  {
    "text": "Bei der Bauplanung eines Mehrfamilienhauses soll für einen entsprechenden Aufpreis auch ein Fahrstuhl möglich sein.",
    "entities": [ "Haus", "Aufzug" ],
    "relation": "hat",
    "solution": [ "c", "1" ],
    "comments": [
      "Ein Haus hat einen oder keinen Aufzug.",
      "Ein Aufzug gehört zu genau einem Haus."
    ]
  },
  {
    "text": "In einem Verkehrsplan kann zwischen zwei Haltestellen eine Verbindung bestehen.",
    "entities": [ "Haltestelle 1", "Haltestelle 2" ],
    "relation": "verbunden",
    "solution": [ "c", "c" ],
    "comments": [
      "Zwischen Haltestelle 1 und Haltestelle 2 gibt es eine oder keine Verbindung.",
      "Zwischen Haltestelle 2 und Haltestelle 1 gibt es eine oder keine Verbindung."
    ]
  },
  {
    "text": "Bei einer polizeilichen Ermittlung muss vermerkt werden können, ob zwei verdächtige Personen miteinander in Beziehung stehen.",
    "entities": [ "Person A", "Person B" ],
    "relation": "steht in Beziehung mit",
    "solution": [ "c", "c" ],
    "comments": [
      "Person A steht mit Person B entweder in Beziehung oder nicht.",
      "Person B steht mit Person A entweder in Beziehung oder nicht."
    ]
  },
  {
    "text": "Bei einem Winzer gehört eine Weinflasche zu einer Weinsorte oder ist selbstgebraut.",
    "entities": [ "Weinflasche", "Weinsorte" ],
    "relation": "gehört zu",
    "solution": [ "c", "cn" ],
    "comments": [
      "Eine Weinflasche gehört zu einer oder keiner Weinsorte.",
      "Von einer Weinsorte hat der Winzer keine, eine oder mehrere Weinflaschen."
    ]
  },
  {
    "text": "Bei der Insektenforschung soll festgehalten werden, ob die Insekten im Labor Flügel haben oder nicht.",
    "entities": [ "Insekt", "Flügel" ],
    "relation": "hat",
    "solution": [ "c", "cn" ],
    "comments": [
      "Ein Insekt hat entweder Flügel oder keine Flügel.",
      "Im Labor gibt es kein, ein oder mehrere Insekten mit Flügeln."
    ]
  },
  {
    "text": "Der Staat möchte transparent machen, welcher Bürger welcher Partei angehört.",
    "entities": [ "Bürger", "Partei" ],
    "relation": "ist Mitglied in",
    "solution": [ "c", "n" ],
    "comments": [
      "Ein Bürger ist Mitglied in einer oder keiner Partei.",
      "Eine Partei hat eine Mindestzahl an Mitgliedern."
    ]
  },
  {
    "text": "Die Deutsche Post möchte bei der teilautomatisierten Briefverarbeitung den Absender eines Briefs erfassen.",
    "entities": [ "Brief", "Absender" ],
    "relation": "enthält",
    "solution": [ "c", "n" ],
    "comments": [
      "Ein Brief enthält entweder einen oder keinen Absender.",
      "Ein Absender ist auf einem oder mehreren Briefen notiert."
    ]
  },
  {
    "text": "Bei einer Weltraumsimulation kann ein Planet Monde haben, die ihn umkreisen.",
    "entities": [ "Planet", "Mond" ],
    "relation": "hat",
    "solution": [ "cn", "1" ],
    "comments": [
      "Ein Planet hat keinen, einen oder mehrere Monde.",
      "Ein Mond gehört zu genau einem Planeten."
    ]
  },
  {
    "text": "Der öffentliche Dienst möchte seine aktuell an Firmen vergebenen Aufträge verwalten.",
    "entities": [ "Firma", "Auftrag" ],
    "relation": "hat",
    "solution": [ "cn", "1" ],
    "comments": [
      "Eine Firma hat aktuell keinen, einen oder mehrere Aufträge.",
      "Ein vergebener Auftrag gehört zu genau einer Firma."
    ]
  },
  {
    "text": "In einem Point-and-Click-Adventure soll die Spielfigur ein Inventar für gesammelte Gegenstände haben.",
    "entities": [ "Inventar", "Gegenstand" ],
    "relation": "enthält",
    "solution": [ "cn", "c" ],
    "comments": [
      "Im Inventar sind kein, ein oder mehrere Gegenstände enthalten.",
      "Ein Gegenstand ist im Inventar enthalten oder nicht."
    ]
  },
  {
    "text": "In einem Projektmanagement-Tool sollen Aufgaben einem Mitarbeiter hauptverantwortlich zugewiesen werden können.",
    "entities": [ "Mitarbeiter", "Aufgabe" ],
    "relation": "ist zuständig für",
    "solution": [ "cn", "c" ],
    "comments": [
      "Ein Mitarbeiter ist zuständig für keine, eine, oder mehrere Aufgaben.",
      "Eine Aufgabe ist einem oder keinem Mitarbeiter zugewiesen."
    ]
  },
  {
    "text": "Bei einem Onlinehändler sollen Kunden Produkte bestellen und sich vorab schon Registrieren können.",
    "entities": [ "Kunde", "Produkt" ],
    "relation": "bestellt",
    "solution": [ "cn", "cn" ],
    "comments": [
      "Ein Kunde hat kein, ein oder mehrere Produkte bestellt.",
      "Ein Produkt wurde von keinem, einem oder mehreren Kunden bestellt."
    ]
  },
  {
    "text": "Im neuen Gesundheitszentrum soll am Ende jedes Kurses jeder Teilnehmer eine Teilnahmebescheinigung erhalten.",
    "entities": [ "Teilnehmer", "Bescheinigung" ],
    "relation": "erhalten",
    "solution": [ "cn", "cn" ],
    "comments": [
      "Ein Teilnehmer hat bisher keine, eine oder mehrere Teilnahmebescheinigungen erhalten.",
      "Eine Bescheinigung wurde entweder noch gar nicht, einmal oder bereits mehrmals an Teilnehmer ausgestellt."
    ]
  },
  {
    "text": "Studenten besuchen Lehrveranstaltungen, in denen sie vom Professor am Ende geprüft werden. Manche Studenten brechen das Studium vorzeitig ab und manche Professoren sind nur forschend tätig.",
    "entities": [ "Student", "Professor", "Lehrveranstaltung" ],
    "relation": "prüft",
    "solution": [ "cn", "cn", "cn" ],
    "comments": [
      "Ein Student wird in mehreren Lehrveranstaltungen vom jeweiligen Professoren geprüft oder in gar keiner (hat sich nie für eine Prüfung angemeldet).",
      "Ein Professor prüft Studenten in mehreren Lehrveranstaltungen oder in gar keiner (nur forschend tätig).",
      "In einer Lehrveranstaltung wird mindestens ein Student vom Professor geprüft, allerdings erst am Ende des Semesters. Das bedeutet, dass eine Lehrveranstaltung schon vor der ersten Prüfung angelegt werden muss."
    ]
  },
  {
    "text": "Es soll protokolliert werden, welche Veranstaltung an welcher Location mit welchen Teilnehmern mit welchen Sponsoren stattgefunden hat.",
    "entities": [ "Veranstaltung", "Teilnehmer", "Location", "Sponsor" ],
    "relation": "findet statt",
    "solution": [ "cn", "cn", "cn", "cn" ]
  },
  {
    "text": "Eine Fluggesellschaft möchte protokollieren, welche Piloten mit welchen Flugzeugen auf welchen Flugrouten eingesetzt werden. Die Fluggesellschaft bietet auch Charterflüge an.",
    "entities": [ "Pilot", "Flugzeug", "Flugroute" ],
    "relation": "eingesetzt",
    "solution": [ "cn", "cn", "n" ],
    "comments": [
      "Ein Pilot kann mehrfach mit einem Flugzeug auf einer Flugroute eingesetzt werden oder auf gar keiner (reiner Charterpilot).",
      "Ein Flugzeug kann mehrfach von einem Piloten auf einer Flugroute eingesetzt werden oder auf gar keiner (reine Charterflüge).",
      "Eine Flugroute wird mindestens einmal von einem Piloten mit einem Flugzeug bedient (sonst würde sie gar nicht erst in die Datenbank aufgenommen werden)."
    ]
  },
  {
    "text": "In einem Sprachenzentrum soll gespeichert werden, welche Dozenten welche der zu unterrichtenden Sprachen sprechen. Jeder Dozent beherrscht mindestens eine der Sprachen, zeitweise kann es aber passieren, dass es für eine Sprachen keinen Dozenten gibt.",
    "entities": [ "Dozent", "Sprache" ],
    "relation": "spricht",
    "solution": [ "cn", "n" ],
    "comments": [
      "Ein Dozent spricht eine oder mehrere der zu unterrichtenden Sprachen.",
      "Ein Sprache wird von keinem, einem oder mehreren Dozenten gesprochen."
    ]
  },
  {
    "text": "Beim Einwohnermeldeamt muss jeder Bürger seinen Wohnsitz anmelden. Obdachlose werden als 'ohne festen Wohnsitz' geführt und es können neben dem Hauptwohnsitz auch weitere Nebenwohnsitze gemeldet werden.",
    "entities": [ "Bürger", "Wohnsitz" ],
    "relation": "meldet an",
    "solution": [ "cn", "n" ],
    "comments": [
      "Ein Bürger hat keinen, einen oder mehrere Wohnsitze.",
      "Zu einem gemeldeten Wohnsitz gibt es einen oder mehrere Bürger, die dort wohnhaft sind."
    ]
  },
  {
    "text": "Eine Bibliothek möchte die einzelnen Seiten ausgewählter Bücher digitalisieren.",
    "entities": [ "Buch", "Seite" ],
    "relation": "hat",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Buch hat mehrere Seiten.",
      "Eine Seite gehört zu genau einem Buch."
    ]
  },
  {
    "text": "Ein Architekt möchte wichtige Eckdaten zu den einzelnen individuellen Räumen seiner Gebäude verwalten.",
    "entities": [ "Gebäude", "Raum" ],
    "relation": "hat",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Gebäude hat einen oder mehrere Räume.",
      "Ein Raum gehört zu genau einem Gebäude."
    ]
  },
  {
    "text": "Jeder Mitarbeiter hat einen Chef, der selbst auch Mitarbeiter ist.",
    "entities": [ "Mitarbeiter", "Mitarbeiter" ],
    "roles": [ "Chef", "" ],
    "relation": "ist Chef von",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Chef hat mindestens einen Mitarbeiter, sonst wäre er kein Chef. Allerdings ist es dann nicht ohne weiteres möglich einen Chef in der Datenbank anzulegen, wenn noch kein Mitarbeiter angegeben werden kann.",
      "Ein Mitarbeiter hat immer genau einen Chef. Dann muss allerdings auch der oberste Chef einen Chef haben. Für diesen einen Ausnahmefall kann der oberste Chef sich selbst als Chef angeben. Dies ist dann allerdings schwierig in die Datenbank einzutragen, da der oberste Chef noch nicht in der Datebank existiert, deshalb noch nicht auf sich selbst verweisen kann und deshalb nicht angelegt werden kann."
    ]
  },
  {
    "text": "Für ein Forschungsprojekt sollen in einem Landkreis alle Bäume und Wälder erfasst werden.",
    "entities": [ "Wald", "Baum" ],
    "relation": "hat",
    "solution": [ "n", "c" ],
    "comments": [
      "Ein Wald hat einen oder mehrere Bäume.",
      "Ein Baum gehört entweder zu einem Wald oder nicht."
    ]
  },
  {
    "text": "Bei einer Schiffssimulation soll protokolliert werden, ob und wie häufig ein Schiff unter einer bestimmten Flagge segelt.",
    "entities": [ "Flagge", "Schiff" ],
    "relation": "gehört zu",
    "solution": [ "n", "c" ],
    "comments": [
      "Eine protokollierte Flagge wurde von mindestens einem Schiff genutzt.",
      "Ein Schiff segelt zu einem festen Zeitpunkt immer nur unter genau einer oder keiner Flagge."
    ]
  },
  {
    "text": "Für ein Restaurant sollen die aktuell verwendeten Rezepte und die vorhandenen Zutaten verwaltet werden.",
    "entities": [ "Rezept", "Zutat" ],
    "relation": "hat",
    "solution": [ "n", "cn" ],
    "comments": [
      "Ein Rezept hat eine oder mehrere Zutaten.",
      "Eine vorhandene Zutat wird in keinem, einem oder mehreren Rezepten verwendet."
    ]
  },
  {
    "text": "In einem App Store gibt es die Anforderung, dass für jede App mindestens eine Kategorie hinterlegt sein.",
    "entities": [ "App", "Kategorie" ],
    "relation": "hat",
    "solution": [ "n", "cn" ],
    "comments": [
      "Eine App hat eine oder mehrere Kategorien.",
      "Eine Kategorie wurde bisher für keine, eine oder mehrere Apps hinterlegt."
    ]
  },
  {
    "text": "Ein Immobilienmakler möchte für seine verkauften Häuser die Kontaktdaten zu den neuen Eigentümern festhalten.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ],
    "comments": [
      "Ein Haus hat ein oder mehrere Eigentümer.",
      "Ein Eigentümer hat ein oder mehrere Häuser."
    ]
  },
  {
    "text": "Ein Atom hat Elektronen.",
    "entities": [ "Atom", "Elektron" ],
    "relation": "hat",
    "solution": [ "n", "n" ],
    "comments": [
      "Ein Atom hat ein oder mehrere Elektronen.",
      "Ein Elektron gehört zu einem oder mehreren Atomen (Elektronenpaarbindung)."
    ]
  },
  {
    "text": "Ein Kind hat eine (biologische) Mutter und einen (biologischen) Vater.",
    "entities": [ "Vater", "Mutter", "Kind" ],
    "relation": "hat",
    "solution": [ "n", "n", "1" ],
    "comments": [
      "Zu einem Vater gibt es genau eine Mutter und mindestens ein Kind.",
      "Zu einer Mutter gibt es genau einen Vater und mindestens ein Kind.",
      "Ein Kind hat genau eine Mutter und einen Vater."
    ]
  },
  {
    "text": "Ein Paketbote ist in der Regel ein Angestellter von DHL, Hermes oder DPD.",
    "entities": [ "Paketbote", "DHL", "Hermes", "DPD" ],
    "solution": [ "p", "d" ]
  },
  {
    "text": "Ein Hund kann ein Schäferhund, ein Mops oder ein Dackel sein.",
    "entities": [ "Hund", "Schäferhund", "Mops", "Dackel" ],
    "solution": [ "p", "n" ]
  },
  {
    "text": "Ein (biologischer) Elternteil ist entweder Mutter oder Vater.",
    "entities": [ "Elternteil", "Mutter", "Vater" ],
    "solution": [ "t", "d" ]
  },
  {
    "text": "An einer Hochschule gibt es Mitarbeiter und Studenten.",
    "entities": [ "Hochschulangehöriger", "Mitarbeiter", "Student" ],
    "solution": [ "t", "n" ],
    "comments": [
      "Neben Mitarbeitern und Studenten gibt es keine anderen Personengruppen an der Hochschule.",
      "Ein Student kann gleichzeitig auch ein Mitarbeiter (studentische Hilfskraft) und ein Mitarbeiter auch Student sein."
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "disjoint": "disjunkt",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
  "non_disjoint": "nicht-disjunkt",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "partial": "partiell",
  "phrase": "Phrase",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "solution": "Zeige Lösung",
  "submit": "Abschicken",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "disjoint": "disjoint",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the relationship type in the selection box that matches the phrase!",
  "non_disjoint": "non-disjoint",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "partial": "partial",
  "phrase": "Phrase",
  "retry": "Retry",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "solution": "Show Solution",
  "submit": "Submit",
  "title": "ER-Trainer",
  "total": "total"
};

/**
 * local configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css.1.1": "./../er_trainer/resources/styles-v2.css",
  "default.path": "./../er_trainer/resources/img/",
  "helper": [ "ccm.load", "./../libs/ccm/helper.mjs" ],
  "html.1": "./../er_trainer/resources/templates-v5.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "notations": notations,
  "onfinish": { "log": true, "restart": true },
  "phrases": phrases,
  "text": en
};

/**
 * demo configuration
 * @type {Object}
 */
export const demo = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "notations": notations,
  "phrases": phrases,
  "text": de
};
