/**
 * @overview data-based resources of ccmjs-based web component for training of ternary relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * default phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Eine Fluggesellschaft möchte protokollieren, welche Piloten mit welchen Flugzeugen auf welchen Flugrouten eingesetzt werden. Die Fluggesellschaft bietet auch Charterflüge an.",
    "entities": [ "Pilot", "Flugzeug", "Flugroute", "Passagier" ],
    "relation": "eingesetzt",
    "solution": [ "cn", "cn", "n", "n" ],
    "comments": [
      "Ein Pilot kann nie (reiner Charterpilot) oder auch mehrfach mit einem Flugzeug auf einer Flugroute eingesetzt werden.",
      "Ein Flugzeug kann nie (macht nur Charterflüge) oder auch mehrfach von einem Piloten auf einer Flugroute eingesetzt werden.",
      "Eine Flugroute wird mindestens einmal von einem Piloten mit einem Flugzeug bedient (sonst würde sie gar nicht erst in die Datenbank aufgenommen werden).",
      ""
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "cancel": "Abbrechen",
  "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht.",
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie in den Auswahlboxen den passenden Beziehungstyp entsprechend der Phrase aus!",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "phrase": "Phrase",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "submit": "Abschicken",
  "title": "ERN-Trainer"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "cancel": "Cancel",
  "comment": "For each entity type involved in a relationship, the abrial respectively (min, max) notation indicates the minimum and maximum number of entities on the other side that an entity of this type is related to.",
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the appropriate relationship type in the selection boxes according to the phrase!",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "phrase": "Phrase",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "submit": "Submit",
  "title": "ERN-Trainer"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css.1.1": "./../ern_trainer/resources/styles.css",
  "helper": [ "ccm.load", "./../libs/ccm/helper.mjs" ],
  "html.1": "./../ern_trainer/resources/templates.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  "onfinish": { "log": true, "restart": true },
  "phrases": phrases,
  "text": en
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "phrases": phrases,
  "text": de
};
