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
    "text": "Zwischen zwei Haltestellen besteht eine oder keine Verbindung.",
    "entities": [ "Haltestelle 1", "Haltestelle 2" ],
    "relation": "verbindet",
    "solution": [ "c", "c" ]
  },
  {
    "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "entities": [ "Topf", "Deckel" ],
    "relation": "hat",
    "solution": [ "c", "1" ]
  },
  {
    "text": "Eine Stadt kann ein U-Bahnnetz haben.",
    "entities": [ "Stadt", "U-Bahnnetz" ],
    "relation": "hat",
    "solution": [ "1", "c" ]
  },
  {
    "text": "Zu jedem Patienten gibt es eine Patientenakte.",
    "entities": [ "Patient", "Patientenakte" ],
    "relation": "hat",
    "solution": [ "1", "1" ]
  },
  {
    "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
    "entities": [ "Rucksack", "Gegenstand" ],
    "relation": "enthält",
    "solution": [ "cn", "c" ]
  },
  {
    "text": "Ein Wald hat Bäume.",
    "entities": [ "Wald", "Baum" ],
    "relation": "hat",
    "solution": [ "n", "c" ]
  },
  {
    "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
    "entities": [ "Planet", "Mond" ],
    "relation": "hat",
    "solution": [ "cn", "1" ]
  },
  {
    "text": "Ein Buch hat mehrere Seiten.",
    "entities": [ "Buch", "Seite" ],
    "relation": "hat",
    "solution": [ "n", "1" ]
  },
  {
    "text": "Kunden kaufen Produkte.",
    "entities": [ "Kunde", "Produkt" ],
    "relation": "hat gekauft",
    "solution": [ "cn", "cn" ]
  },
  {
    "text": "Auf einem Rezept stehen Zutaten.",
    "entities": [ "Rezept", "Zutat" ],
    "relation": "hat",
    "solution": [ "n", "cn" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ]
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
    "text": "Jeder Mitarbeiter hat einen Chef.",
    "entities": [ "Mitarbeiter", "Mitarbeiter" ],
    "roles": [ "Chef", "" ],
    "relation": "ist Chef von",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Chef hat mindestens einen Mitarbeiter, sonst wäre er kein Chef. Allerdings ist es dann nicht ohne weiteres möglich einen Chef in der Datenbank anzulegen, wenn noch kein Mitarbeiter angegeben werden kann.",
      "Ein Mitarbeiter hat immer genau einen Chef. Dann muss allerdings auch der oberste Chef einen Chef haben. Für diesen einen Ausnahmefall kann der oberste Chef sich selbst als Chef angeben. Dies ist dann allerdings schwierig in die Datenbank einzutragen, da der oberste Chef noch nicht in der Datebank existiert, deshalb noch nicht auf sich selbst verweisen kann und deshalb nicht angelegt werden kann."
    ]
  },
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "phrase": "Phrase",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "solution": "Zeige Lösung",
  "submit": "Abschicken",
  "title": "ER-Trainer"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the relationship type in the selection box that matches the phrase!",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "phrase": "Phrase",
  "retry": "Retry",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "solution": "Show Solution",
  "submit": "Submit",
  "title": "ER-Trainer"
};

/**
 * local configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css.1.1": "./../er_trainer/resources/styles-v2.css",
  "helper": [ "ccm.load", "./../libs/ccm/helper.mjs" ],
  "html.1": "./../er_trainer/resources/templates-v4.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "notations": notations,
//"oncancel": [ "ccm.load", "./../er_trainer/helper/helper.mjs#oncancel" ],
//"onchange": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onchange" ],
//"onstart": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onstart" ],
  "onfinish": { "log": true, "restart": true },
  "phrases": phrases,
  "text": en,
  "default.notation": "abrial"
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
