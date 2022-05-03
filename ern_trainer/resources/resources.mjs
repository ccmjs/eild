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
    "roles": [ "Chef", "" ],
    "relation": "ist Chef von",
    "solution": [ "n", "1" ],
    "comments": [
      "Ein Chef hat mindestens einen Mitarbeiter, sonst wäre er kein Chef. Allerdings ist es dann nicht ohne weiteres möglich einen Chef in der Datenbank anzulegen, wenn noch kein Mitarbeiter angegeben werden kann.",
      "Ein Mitarbeiter hat immer genau einen Chef. Dann muss allerdings auch der oberste Chef einen Chef haben. Für diesen einen Ausnahmefall kann der oberste Chef sich selbst als Chef angeben. Dies ist dann allerdings schwierig in die Datenbank einzutragen, da der oberste Chef noch nicht in der Datebank existiert, deshalb noch nicht auf sich selbst verweisen kann und deshalb nicht angelegt werden kann."
    ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "entities": [ "Haus", "Eigentümer" ],
    "relation": "hat",
    "solution": [ "n", "n" ]
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
  "onchange": event => {
    if ( event.event !== 'next' ) return;                                                         // when a new phrase starts
    const phrase = event.instance.getValue().sections[ event.phrase - 1 ];                        // and when the new phrase
    if ( phrase.entities.length !== 2 || phrase.entities[ 0 ] === phrase.entities[ 1 ] ) return;  // is a non-recursive binary relation
    switch_to_er( event.instance, phrase );                                                       // then use ER Trainer for this phrase
  },
  "onfinish": { "log": false, "restart": true },
  "onstart": event => {
    const phrase = event.instance.getValue().sections[ 0 ];                                       // when the first phrase
    if ( phrase.entities.length !== 2 || phrase.entities[ 0 ] === phrase.entities[ 1 ] ) return;  // is a non-recursive binary relation
    switch_to_er( event.instance, phrase );                                                       // then use ER Trainer for this phrase
  },
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

/**
 * configuration for EILD project
 * @type {Object}
 */
export const eild = {
  "onchange": event => {
    if ( event.event !== 'next' ) return;                                                         // when a new phrase starts
    const phrase = event.instance.getValue().sections[ event.phrase - 1 ];                        // and when the new phrase
    if ( phrase.entities.length !== 2 || phrase.entities[ 0 ] === phrase.entities[ 1 ] ) return;  // is a non-recursive binary relation
    switch_to_er( event.instance, phrase );                                                       // then use ER Trainer for this phrase
  },
  "onstart": event => {
    const phrase = event.instance.getValue().sections[ 0 ];                                       // when the first phrase
    if ( phrase.entities.length !== 2 || phrase.entities[ 0 ] === phrase.entities[ 1 ] ) return;  // is a non-recursive binary relation
    switch_to_er( event.instance, phrase );                                                       // then use ER Trainer for this phrase
  },
  "phrases": phrases,
  "text": de
};

const switch_to_er = ( instance, phrase ) => {
  instance.element.style.display = 'none';
  const config = JSON.parse( instance.config );
  const div = document.createElement( 'div' );
  instance.shadow.appendChild( div );
  instance.ccm.start( 'https://ccmjs.github.io/eild/er_trainer/versions/ccm.er_trainer-2.0.0.min.js', {
    root: div,
    css: [ 'ccm.load',
      [  // serial
        "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
        "https://ccmjs.github.io/eild/er_trainer/resources/styles.css"
      ]
    ],
    'default.notation': 'abrial',
    feedback: config.feedback,
    legend: config.legend,
    modal: config.modal,
    number: 1,
    onchange: event => {
      if ( event.event === 'left' ) {
        instance.element.querySelector( '#input2' ).value = event.value;
        instance.element.querySelector( '#input2' ).onchange();
      }
      if ( event.event === 'right' ) {
        instance.element.querySelector( '#input1' ).value = event.value;
        instance.element.querySelector( '#input1' ).onchange();
      }
    },
    onfinish: () => {
      instance.helper.remove( div );
      instance.element.style.display = 'block';
      instance.element.querySelector( '#submit' ).click();
      instance.element.querySelector( '#finish' ).click();
    },
    phrases: [ {
      "text": phrase.text,
      "relationship": [ phrase.entities[ 0 ], phrase.relation, phrase.entities[ 1 ] ],
      "solution": phrase.solution,
      "comments": phrase.comments
    } ],
    show_solution: config.show_solution,
    shuffle: false,
    text: {
      "cancel": "ER-Trainer",
      "correct": "Ihre letzte Antwort war richtig!",
      "correct_solution": "Richtige Lösung:",
      "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
      "entity1": "Entität 1",
      "entity2": "Entität 2",
      "failed": "Ihre letzte Antwort war falsch!",
      "finish": "Weiter",
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
    },
    values: config.values
  } );

};
