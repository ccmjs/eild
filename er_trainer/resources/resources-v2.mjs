/**
 * @overview data-based resources of ccmjs-based web component for training of binary relations in an ER diagram
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
    "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "entities": [ "Topf", "Deckel" ],
    "relation": "hat",
    "solution": [ "c", "1" ]
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
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "cancel": "ER-Trainer",
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
  "cancel": "ER-Trainer",
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
  "html.1": "./../er_trainer/resources/templates-v3.mjs",
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
