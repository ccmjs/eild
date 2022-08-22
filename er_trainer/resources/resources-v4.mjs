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
      "Ein Haus hat keinen, einen oder mehrere Bewohner."
    ]
  },
  {
    "text": "Das Vereinswesen in Deutschland möchte eine Liste aller Vereine verwalten. Zu jedem Verein soll auch eine Kontaktperson eingetragen sein, wobei manche Vereine die gleiche Kontaktperson angeben.",
    "entities": [ "Verein", "Kontaktperson" ],
    "relation": "hat",
    "solution": [ "1", "n" ],
    "comments": [
      "Ein Verein hat genau eine Kontaktperson.",
      "Eine eingetragene Kontaktperson gehört zu mindestens einem Verein."
    ]
  },
  {
    "text": "Ein Radiosender für klassische Musik möchte eine Datensammlung von Musikstücken aufbauen, wobei für jedes Musikstück auch Hintergrundinformationen zum Komponisten abrufbar sein sollen.",
    "entities": [ "Musikstück", "Komponist" ],
    "relation": "hat",
    "solution": [ "1", "n" ],
    "comments": [
      "Ein Musikstück hat genau einen Komponisten.",
      "Zu jedem Komponisten in der Datensammlung gibt es mindestens ein Musikstück."
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
    "text": "Bei der Genforschung werden Chromosome und deren spezifische Merkmale untersucht, wobei sich während der Studie ein X-Chromosom mit einem X- oder Y-Chromosom verbinden kann und ein Y-Chromosom nur mit einem X-Chromosom.",
    "entities": [ "X-Chromosom", "Y-Chromosom" ],
    "relation": "verbunden",
    "solution": [ "c", "c" ],
    "comments": [
      "Ein X-Chromosom ist mit einem oder keinem Y-Chromosom verbunden.",
      "Ein Y-Chromosom ist mit einem oder keinem X-Chromosom verbunden."
    ]
  },
  {
    "text": "Für eine Fortpflanzungsstudie soll verwaltet werden, ob und wenn ja mit welchem Männchen ein Weibchen aktuell zusammen ist. Männchen und Weibchen der untersuchten Tierart haben nie mehrere Partner gleichzeitig.",
    "entities": [ "Weibchen", "Männchen" ],
    "relation": "ist zusammen mit",
    "solution": [ "c", "c" ],
    "comments": [
      "Ein Weibchen ist entweder mit einem oder keinem Männchen zusammen sein.",
      "Ein Männchen ist entweder mit einem oder keinem Weibchen zusammen sein."
    ]
  },
  {
    "text": "Bei einem Winzer gehört eine Weinflasche zu einer Weinsorte oder ist selbstgebraut.",
    "entities": [ "Weinflasche", "Weinsorte" ],
    "relation": "gehört zu",
    "solution": [ "c", "cn" ],
    "comments": [
      "Eine Weinflasche gehört zu genau einer oder keiner Weinsorte.",
      "Von einer Weinsorte hat ein Winzer entweder keine, eine oder mehrere Weinflaschen."
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
    "text": "Der deutsche Staat möchte transparent machen, welcher Bürger welcher Partei angehört.",
    "entities": [ "Bürger", "Partei" ],
    "relation": "ist Mitglied in",
    "solution": [ "c", "n" ],
    "comments": [
      "Ein Bürger kann nur Mitglied in maximal einer Partei gleichzeitig sein.",
      "Eine Partei hat eine Mindestzahl an Mitgliedern."
    ]
  },
  {
    "text": "Bei einer Tierbeobachtung soll erfasst werden, welche der Tiere sich zu einer Herde zusammenschließen.",
    "entities": [ "Tier", "Herde" ],
    "relation": "gehört zu",
    "solution": [ "c", "n" ],
    "comments": [
      "Ein Tier gehört entweder zu einer oder keiner Herde.",
      "Eine Herde besteht aus mindestens einem Tier."
    ]
  },
  {
    "text": "Bei einer Weltraumsimulation kann ein Planet Monde haben, die ihn umkreisen.",
    "entities": [ "Planet", "Mond" ],
    "relation": "hat",
    "solution": [ "cn", "1" ],
    "comments": [
      "Ein Planet hat keinen, einen oder mehrere Monde.",
      "Ein Mond gehört immer zu genau einem Planeten."
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
      "Ein Gegenstand ist im Inventar entweder enthalten oder nicht."
    ]
  },
  {
    "text": "In einem Projektmanagement-Tool sollen Aufgaben einem Mitarbeiter hauptverantwortlich zugewiesen werden können.",
    "entities": [ "Mitarbeiter", "Aufgabe" ],
    "relation": "ist zuständig für",
    "solution": [ "cn", "c" ],
    "comments": [
      "Ein Mitarbeiter ist zuständig für keine, eine, oder mehrere Aufgaben.",
      "Eine Aufgabe kann maximal einem Mitarbeiter hauptverantwortlich zugewiesen sein."
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
    "text": "Im neuen Gesundheitszentrum soll am Ende jedes Kurses jeder Teilnehmer eine vorab vorbereitete Teilnahmebescheinigung erhalten.",
    "entities": [ "Teilnehmer", "Bescheinigung" ],
    "relation": "erhalten",
    "solution": [ "cn", "cn" ],
    "comments": [
      "Ein Teilnehmer hat keine, eine oder mehrere Teilnahmebescheinigungen erhalten.",
      "Eine Bescheinigung wurde entweder noch gar nicht, einmal oder mehrmals an Teilnehmer ausgestellt."
    ]
  },
  {
    "text": "In einem Sprachenzentrum soll gespeichert werden, welche der zu unterrichtenden Sprachen von welchen Dozenten gesprochen werden. Jeder Dozent beherrscht mindestens eine der Sprachen, zeitweise kann es aber passieren, dass es zu einer Sprachen keinen Dozenten gibt.",
    "entities": [ "Sprache", "Dozent" ],
    "relation": "gesprochen von",
    "solution": [ "cn", "n" ],
    "comments": [
      "Eine Sprache wird von keinem, einem oder mehreren Dozenten gesprochen.",
      "Ein Dozent beherrscht mindestens eine der zu unterrichtenden Sprachen."
    ]
  },
  {
    "text": "Beim Einwohnermeldeamt muss jeder Bürger seinen Wohnsitz anmelden. Obdachlose werden als 'ohne festen Wohnsitz' geführt und es können neben dem Hauptwohnsitz auch weitere Nebenwohnsitze gemeldet werden.",
    "entities": [ "Bürger", "Wohnsitz" ],
    "relation": "meldet an",
    "solution": [ "cn", "n" ],
    "comments": [
      "Ein Bürger hat keinen, einen oder mehrere Wohnsitze.",
      "Zu einem gemeldeten Wohnsitz gibt es mindestens einen Bürger, der dort wohnhaft ist."
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
      "Ein Gebäude hat mindestens einen Raum.",
      "Ein Raum gehört zu genau einem Gebäude."
    ]
  },
  {
    "text": "Für ein Forschungsprojekt sollen in einem Landkreis alle Bäume und Wälder erfasst werden.",
    "entities": [ "Wald", "Baum" ],
    "relation": "hat",
    "solution": [ "n", "c" ],
    "comments": [
      "Ein Wald besteht aus mehreren Bäumen.",
      "Ein Baum muss nicht zwingend zu einem Wald gehören und gehört wenn dann immer nur zu genau einem Wald."
    ]
  },
  {
    "text": "Die Deutsche Post möchte bei der teilautomatisierten Briefverarbeitung den Absender eines Briefs erfassen.",
    "entities": [ "Absender", "Brief" ],
    "relation": "notiert auf",
    "solution": [ "n", "c" ],
    "comments": [
      "Ein erfasster Absender ist auf mindestens einem Brief notiert gewesen.",
      "Ein Brief enthält entweder einen oder keinen Absender."
    ]
  },
  {
    "text": "Für ein Restaurant sollen die aktuell verwendeten Rezepte und die vorhandenen Zutaten verwaltet werden.",
    "entities": [ "Rezept", "Zutat" ],
    "relation": "hat",
    "solution": [ "n", "cn" ],
    "comments": [
      "Ein Rezept hat immer mehrere Zutaten.",
      "Eine vorhandene Zutat wird in keinem, einem oder mehreren Rezepten verwendet."
    ]
  },
  {
    "text": "In einem App Store gibt es die Anforderung, dass für jede App mindestens eine von mehreren vordefinierten Kategorien angegeben werden muss.",
    "entities": [ "App", "Kategorie" ],
    "relation": "hat",
    "solution": [ "n", "cn" ],
    "comments": [
      "Für eine App muss mindestens eine Kategorie angegeben werden.",
      "Eine vordefinierte Kategorie wurde für keine, eine oder bereits für mehrere Apps angegeben."
    ]
  },
  {
    "text": "Ein Immobilienmakler möchte für seine verkauften Häuser die Kontaktdaten zu den neuen Eigentümern festhalten.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ],
    "comments": [
      "Ein Haus hat mindestens einen Eigentümer.",
      "Ein Eigentümer hat mindestens ein Haus."
    ]
  },
  {
    "text": "Im Rahmen eines chemischen Experiments sollen ausgewählte Atome, ihre Elektronen und deren Bindungsfähigkeit untersucht werden.",
    "entities": [ "Atom", "Elektron" ],
    "relation": "hat",
    "solution": [ "n", "n" ],
    "comments": [
      "Ein Atom hat mindestens ein Elektron.",
      "Ein Elektron gehört zu einem oder mehreren Atomen (Elektronenpaarbindung)."
    ]
  },
  {
    "text": "Beim Standesamt wird verwaltet, welche Personen gerade miteinander verheiratet sind.",
    "entities": [ "Person", "Person" ],
    "relation": "verheiratet",
    "solution": [ "c", "c" ],
    "comments": [
      "Eine Person kann höchstens mit einer anderen Person verheiratet sein.",
      "Eine Person kann höchstens mit einer anderen Person verheiratet sein.",
    ]
  },
  {
    "text": "Für ein Unternehmen sollen die Mitarbeiter verwaltet werden, wobei jeder Mitarbeiter genau einen Vorgesetzten und jeder Vorgesetzte mindestens einen Mitarbeiter haben soll.",
    "entities": [ "Mitarbeiter", "Mitarbeiter" ],
    "roles": [ "", "Vorgesetzter" ],
    "relation": "hat Vorgesetzten",
    "solution": [ "1", "n" ],
    "comments": [
      "Ein Mitarbeiter hat immer genau einen Vorgesetzten.",
      "Ein Vorgesetzter hat mindestens einen Mitarbeiter."
    ]
  },
  {
    "text": "Für die Erstellung eines Verkehrsplans muss verwaltet werden, welche Haltestellen miteinander verbunden sind. Durch Bauarbeiten und Umleitungen kann es zeitweise vorkommen, dass eine Haltestelle nicht angefahren wird.",
    "entities": [ "Haltestelle", "Haltestelle" ],
    "relation": "verbunden",
    "solution": [ "cn", "cn" ],
    "comments": [
      "Eine Haltestelle ist mit keiner, einer oder mehreren anderen Haltestelle verbunden.",
      "Eine Haltestelle ist mit keiner, einer oder mehreren anderen Haltestelle verbunden."
    ]
  },
  {
    "text": "In einer neuen Hochschule sollen nun Studenten Lehrveranstaltungen besuchen und am Ende des Semesters von einem Professor geprüft werden.",
    "entities": [ "Student", "Professor", "Lehrveranstaltung" ],
    "relation": "wird geprüft",
    "solution": [ "cn", "cn", "cn" ],
    "comments": [
      "Ein Student wurde entweder noch gar nicht, einmal oder bereits mehrmals geprüft.",
      "Ein Professor hat entweder noch gar nicht, einmal oder bereits mehrmals geprüft.",
      "In einer Lehrveranstaltung wurde noch gar nicht, einmal oder bereits mehrmals geprüft."
    ]
  },
  {
    "text": "Eine Fluggesellschaft möchte protokollieren, welche Piloten mit welchen Flugzeugen auf welchen Flugrouten eingesetzt werden. Bisher wurden im System nur Piloten und Flugzeuge verwaltet, für das Protokoll nun auch Flugrouten.",
    "entities": [ "Pilot", "Flugzeug", "Flugroute" ],
    "relation": "eingesetzt",
    "solution": [ "cn", "cn", "n" ],
    "comments": [
      "Ein Pilot wurde bisher gar nicht, einmal oder mehrmals mit einem Flugzeug auf einer Flugroute eingesetzt.",
      "Ein Flugzeug wurde bisher gar nicht, einmal oder mehrmals von einem Piloten auf einer Flugroute eingesetzt.",
      "Eine in der Datenbank vorhandene Flugroute wurde mindestens einmal von einem Piloten mit einem Flugzeug bedient."
    ]
  },
  {
    "text": "Ein Team von Programmierern möchte den Quelltext ihrer Programme versionieren, so dass bei jedem Speichern von Änderungen automatisch eine neue Version vom Quelltext separat gespeichert wird.",
    "entities": [ "Programmierer", "Quelltext", "Version" ],
    "relation": "speichert",
    "solution": [ "cn", "n", "1" ],
    "comments": [
      "Ein Programmierer hat noch keine, eine oder bereits mehrere Versionen des Quelltexts gespeichert.",
      "Zu einem gespeicherten Quelltext gibt es mindestens eine Version und einen Programmierer.",
      "Zu einer Version gibt es genau einen zugehörigen Quelltext und Programmierer."
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
    "text": "Über eine eigens dafür aufgesetzte Datenbank soll protokolliert werden, welche Veranstaltung an welcher Location mit welchen Teilnehmern mit welchen Sponsoren stattgefunden hat.",
    "entities": [ "Veranstaltung", "Location", "Teilnehmer", "Sponsor" ],
    "relation": "findet statt",
    "solution": [ "n", "n", "n", "n" ],
    "comments": [
      "Eine in der Datenbank vorhandene Veranstaltung wurde mindestens einmal protokolliert.",
      "Eine in der Datenbank vorhandene Location wurde bisher gar nicht, einmal oder bereits mehrmals protokolliert.",
      "Ein in der Datenbank vorhandener Teilnehmer hat mindestens an einer Veranstaltung teilgenommen.",
      "Ein in der Datenbank vorhandener Sponsor hat sich an mindestens einer Veranstaltung beteiligt."
    ]
  },
  {
    "text": "Ein Tierheim verwaltet Haustiere, die ein neues Zuhause suchen. Es handelt sich dabei vor allem um Hunde und Katzen.",
    "entities": [ "Haustier", "Hund", "Katze" ],
    "solution": [ "p", "d" ],
    "comments": [
      "Im Tierheim gibt es auch Haustiere, die weder Hund noch Katze sind.",
      "Es gibt keine Haustiere, die gleichzeitig Hund und Katze sind."
    ]
  },
  {
    "text": "Ein Versandhaus möchte verschiedene Paketdienstleister für die Zustellung ihrer Waren beauftragen. Pakete sollen vor allem über DHL, Hermes oder DPD versendet werden.",
    "entities": [ "Paketdienstleister", "DHL", "Hermes", "DPD" ],
    "solution": [ "p", "d" ],
    "comments": [
      "Aufträge können auch an andere Paketdienstleister vergeben werden (z.B. UPS).",
      "Ein Auftrag wird immer nur an einen Paketdienstleister vergeben."
    ]
  },
  {
    "text": "Verwaltet werden sollen die Besucher einer Gründermesse, auf der vor allem Unternehmensgründer und Sponsoren zusammenkommen.",
    "entities": [ "Besucher", "Gründer", "Sponsor" ],
    "solution": [ "p", "n" ],
    "comments": [
      "Neben Gründer und Sponsoren können auch andere Personengruppen (z.B. Ideengeber) die Messe besuchen.",
      "Ein Gründer kann auch gleichzeitig ein Sponsor und ein Sponsor selbst auch ein Gründer sein."
    ]
  },
  {
    "text": "Für eine Hundeshow sollen die teilnehmenden Hunde verwaltet werden. Zur Zeit sind vor allem Schäferhund, Mops und Dackel im Trend. Mischlinge aus diesen Rassen werden nicht als separate Hunderasse im System verwaltet.",
    "entities": [ "Hund", "Schäferhund", "Mops", "Dackel" ],
    "solution": [ "p", "n" ],
    "comments": [
      "An der Hundeshow nehmen auch vereinzelt andere Hunderassen teil, die weder Schäferhund, noch Mops oder Dackel sind.",
      "Neben den reinrassigen Hunden nehmen auch Mischlinge teil (z.B. ein Mops-Dackel-Mix). Ein Hund kann daher auch mehreren Hunderassen angehören."
    ]
  },
  {
    "text": "Eine Adoptionsvermittlungsstelle möchte die Kontaktdaten der (biologischen) Eltern verwalten. Dabei sollen auch Vater- und Mutter-spezifische Merkmale erfasst und deshalb explizit zwischen beiden unterschieden werden.",
    "entities": [ "Elternteil", "Mutter", "Vater" ],
    "solution": [ "t", "d" ],
    "comments": [
      "Ein (biologischer) Elternteil ist entweder Mutter oder Vater.",
      "Ein Elternteil kann nicht gleichzeitig Vater und Mutter sein."
    ]
  },
  {
    "text": "Auf dem schnurlosen Haustelefon soll es im Adressbuch grundsätzlich drei Kategorien von Einträgen mit spezifischen Merkmalen geben: Privat, Arbeit und Mobil. Jeder Eintrag muss einer dieser Kategorien zugeordnet werden.",
    "entities": [ "Adressbuch", "Privat", "Arbeit", "Mobil" ],
    "solution": [ "t", "d" ],
    "comments": [
      "Jeder Adressbucheintrag muss einer der Kategorien zugeordnet werden.",
      "Ein Eintrag kann nur einer der Kategorien zugeordnet werden."
    ]
  },
  {
    "text": "An einer Hochschule soll zwischen zwei Personengruppen unterschieden werden: Es gibt nur Studenten und Mitarbeiter.",
    "entities": [ "Hochschulangehöriger", "Student", "Mitarbeiter" ],
    "solution": [ "t", "n" ],
    "comments": [
      "Neben Studenten und Mitarbeitern werden keine anderen Personengruppen an der Hochschule verwaltet.",
      "Ein Student kann gleichzeitig auch ein Mitarbeiter (studentische Hilfskraft) und ein Mitarbeiter auch Student sein."
    ]
  },
  {
    "text": "Für ein Krankenhaus sollen die verschiedenen Personengruppen verwaltet werden. Unterschieden wird dabei zwischen Besuchern, Patienten und Personal.",
    "entities": [ "Person", "Besucher", "Patient", "Personal" ],
    "solution": [ "t", "n" ],
    "comments": [
      "Im Krankenhaus gibt es nur Besucher, Patienten und Personal. Andere Personengruppen können nicht vorkommen.",
      "Eine Person kann auch mehreren Personengruppen angehören. Jemand vom Personal kann z.B. auch Patient oder Besucher sein."
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
  "skip": "Überspringen",
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
  "skip": "Skip",
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
  "html.1": "./../er_trainer/resources/templates-v6.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "notations": notations,
  "onfinish": { "log": true, "restart": true },
  "phrases": phrases,
  "text": de,
  "shuffle": true
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
