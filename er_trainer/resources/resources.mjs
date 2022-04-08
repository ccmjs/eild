/**
 * @overview data-based resources of ccmjs-based web component for training of a binary relationship in an ER diagram
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
    "swap": true,
    "centered": true,
    "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht."
  },
  "arrow": {
    "key": "arrow",
    "title": "Pfeilnotation",
    "left": "mirrored"
  },
  "chen": {
    "key": "chen",
    "title": "Chen",
    "centered": true,
    "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
  },
  "crow": {
    "key": "crow",
    "title": "Krähenfuß",
    "left": "mirrored"
  },
  "mc": {
    "key": "mc",
    "title": "MC"
  },
  "uml": {
    "key": "uml",
    "title": "UML"
  }
};

/**
 * default phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "relationship": [ "Topf", "hat", "Deckel" ],
    "solution": [ "1", "c" ]
  },
  {
    "text": "Zu jedem Patienten gibt es eine Patientenakte.",
    "relationship": [ "Patient", "hat", "Patientenakte" ],
    "solution": [ "1", "1" ]
  },
  {
    "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
    "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
    "solution": [ "c", "cn" ]
  },
  {
    "text": "Ein Wald hat Bäume.",
    "relationship": [ "Wald", "hat", "Baum" ],
    "solution": [ "c", "n" ]
  },
  {
    "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
    "relationship": [ "Planet", "hat", "Mond" ],
    "solution": [ "1", "cn" ]
  },
  {
    "text": "Ein Buch hat mehrere Seiten.",
    "relationship": [ "Buch", "hat", "Seite" ],
    "solution": [ "1", "n" ]
  },
  {
    "text": "Kunden kaufen Produkte.",
    "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
    "solution": [ "cn", "cn" ]
  },
  {
    "text": "Auf einem Rezept stehen Zutaten.",
    "relationship": [ "Rezept", "hat", "Zutat" ],
    "solution": [ "cn", "n" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "relationship": [ "Haus", "hat", "Eigentümer" ],
    "solution": [ "n", "n" ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "cancel": "Abbrechen",
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
  "entity1": "Entität 1",
  "entity2": "Entität 2",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
  "input1": "Auswahl 1:",
  "input2": "Auswahl 2:",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "phrase": "Phrase [%%]:",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "submit": "Abschicken",
  "title": "ER-Trainer"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "cancel": "Cancel",
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "entity1": "Entity 1",
  "entity2": "Entity 2",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the relationship type in the selection box that matches the phrase!",
  "input1": "Selection 1:",
  "input2": "Selection 2:",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "phrase": "Phrase [%%]:",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "submit": "Submit",
  "title": "ER-Trainer"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css.1.2": "./../er_trainer/resources/default.css",
  "dark": false,
  "helper": [ "ccm.load", "./../libs/ccm/helper.mjs" ],
  "html.1": "./../er_trainer/resources/templates-v2.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "notations": notations,
  "oncancel": [ "ccm.load", "./../er_trainer/helper/helper.mjs#oncancel" ],
  "onchange": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onchange" ],
  "onstart": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onstart" ],
  "onfinish": { "log": true, "restart": true },
  "phrases": phrases,
  "text": en,
  "text.cancel": "ER-REL-Trainer",
  "default.notation": "abrial"
};

/**
 * demo configuration (absolute paths)
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
