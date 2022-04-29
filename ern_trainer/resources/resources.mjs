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
    "text": "Jeder Mitarbeiter hat einen Chef.",
    "entities": [ "Mitarbeiter", "Mitarbeiter" ],
    "relation": "ist Chef von",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Chef hat mindestens einen Mitarbeiter, sonst wäre er kein Chef. Allerdings ist es dann nicht ohne weiteres möglich einen Chef in der Datenbank anzulegen, wenn noch kein Mitarbeiter angegeben werden kann.",
      "Ein Mitarbeiter hat immer genau einen Chef. Dann muss allerdings auch der oberste Chef einen Chef haben. Für diesen einen Ausnahmefall kann der oberste Chef sich selbst als Chef angeben. Dies ist dann allerdings schwierig in die Datenbank einzutragen, da der oberste Chef noch nicht in der Datebank existiert, deshalb noch nicht auf sich selbst verweisen kann und deshalb nicht angelegt werden kann."
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
    "text": "Es soll protokolliert werden, welche Veranstaltung an welcher Location mit welchen Teilnehmern mit welchen Sponsoren stattgefunden hat.",
    "entities": [ "Veranstaltung", "Teilnehmer", "Location", "Sponsor" ],
    "relation": "findet statt",
    "solution": [ "cn", "cn", "cn", "cn" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ]
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
    "text": "Ein Kind hat eine (biologische) Mutter und einen (biologischen) Vater.",
    "entities": [ "Vater", "Mutter", "Kind" ],
    "relation": "hat",
    "solution": [ "n", "n", "1" ],
    "comments": [
      "Zu einem Vater gibt es genau eine Mutter und mindestens ein Kind.",
      "Zu einer Mutter gibt es genau einen Vater und mindestens ein Kind.",
      "Ein Kind hat genau eine Mutter und einen Vater."
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "cancel": "Abbrechen",
  "comment": "<b>Hinweis zur verwendeten Notation:</b> Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht.",
  "correct": "Ihre letzte Antwort war richtig!",
  "correct_solution": "Richtige Lösung:",
  "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "heading": "Bitte wählen Sie in den Auswahlboxen den passenden Beziehungstyp für jede Entität entsprechend der Phrase aus!",
  "notation": "Notation:",
  "legend": "Legende",
  "next": "Weiter",
  "phrase": "Phrase",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "solution": "Zeige Lösung",
  "submit": "Abschicken",
  "title": "ERN-Trainer"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "cancel": "Cancel",
  "comment": "<b>Hint to the used Notation:</b> For each entity type involved in a relationship, the abrial respectively (min, max) notation indicates the minimum and maximum number of entities on the other side that an entity of this type is related to.",
  "correct": "Your last answer was correct!",
  "correct_solution": "Correct solution:",
  "current_state": "You answered %% of %% phrases correctly!",
  "failed": "Your last answer was wrong!",
  "finish": "Restart",
  "heading": "Please select the appropriate relationship type in the selection boxes for each entity according to the phrase!",
  "notation": "Notation:",
  "legend": "Legend",
  "next": "Next",
  "phrase": "Phrase",
  "retry": "Retry",
  "selection": [ "Please Choose", "simple", "conditional", "many", "conditional many" ],
  "solution": "Show Solution",
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
  "shuffle": false,
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
