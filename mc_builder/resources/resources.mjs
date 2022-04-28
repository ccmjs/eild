/**
 * @overview data-based resources of ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "add_answer": "Antwort hinzufügen",
  "add_question": "Frage hinzufügen",
  "dark": "Dark Mode",
  "dark_auto": "Automatisch",
  "dark_false": "Aus",
  "dark_info": "Im Dark Mode wird alles in einem dunklen Layout dargestellt. Dadurch wird das Auge und die Batterie geschont. Ob ein Dark Mode bevorzugt wird, kann auch automatisch über das Betriebssystem ermittelt werden.",
  "dark_true": "Ein",
  "delete_answer": "Antwort löschen",
  "delete_question": "Frage löschen",
  "edit_answer": "Antwort bearbeiten",
  "edit_question": "Frage bearbeiten",
  "escape": "HTML-Code auswerten",
  "escape_info": "Wenn aktiviert, wird in Fragen und Antworten enthaltener HTML-Code ausgewertet.",
  "export": "Exportieren",
  "feedback": "Direktes Feedback",
  "feedback_info": "Wenn aktiviert, wird bei der Beantwortung einer Frage direkt angezeigt, was richtig und was falsch war.",
  "import": "Importieren",
  "lang": "Sprache",
  "lang_de": "Deutsch",
  "lang_en": "Englisch",
  "lang_info": "Sprache in der die App dargestellt werden soll. Bei 'mehrsprachig' kann in der App die Sprache gewechselt werden.",
  "lang_multi": "mehrsprachig",
  "move_answer_down": "Ändert die Reihenfolge der Antworten: Bewegt die Antwort eine Position nach unten.",
  "move_answer_up": "Ändert die Reihenfolge der Antworten: Bewegt die Antwort eine Position nach oben.",
  "move_question_down": "Ändert die Reihenfolge der Fragen: Bewegt die Frage eine Position nach unten.",
  "move_question_up": "Ändert die Reihenfolge der Fragen: Bewegt die Frage eine Position nach oben.",
  "number": "Limitierte Anzahl an Fragen",
  "number_info": "Wie viele der Fragen sollen abgefragt werden? Standardmäßig werden alle abgefragt.",
  "preview": "Vorschau",
  "question_preview": "Zeige eine Vorschau der Frage",
  "questions": "Fragen und Antworten",
  "random": "Antworten mischen",
  "random_info": "Wenn aktiviert, werden die Antworten auf eine Frage in zufälliger Reihenfolge angezeigt.",
  "results": "Auswertung der Ergebnisse",
  "retry": "Eingaben korrigierbar",
  "retry_info": "Wenn aktiviert, kann nach einer falschen Antwort die Eingabe nochmal korrigiert werden.",
  "save": "Ergebnisse anonymisiert speichern",
  "save_info": "Wenn aktiviert, werden die Ergebnisse anonym gespeichert, sodass nachvollziehbar ist, welche Fragen und Antworten wie oft richtig beantwortet wurden.",
  "settings": "Sonstige Einstellungen",
  "shuffle": "Fragen mischen",
  "shuffle_info": "Wenn aktiviert, werden die Fragen gemischt, sodass sie jedes Mal in einer anderen Reihenfolge abgefragt werden.",
  "solution": "Zeigt an, ob die Antwort richtig ist. Anklicken, um den Status zu ändern.",
  "submit": "Abschicken"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "add_answer": "Add Answer",
  "add_question": "Add Question",
  "dark": "Dark Mode",
  "dark_auto": "Auto",
  "dark_false": "Off",
  "dark_info": "In dark mode, everything is displayed in a dark layout. This protects the eye and the battery. Whether a dark mode is preferred can also be determined automatically via the operating system.",
  "dark_true": "On",
  "delete_answer": "Delete Answer",
  "delete_question": "Delete Question",
  "edit_answer": "Edit Answer",
  "edit_question": "Edit Question",
  "escape": "Evaluate HTML",
  "escape_info": "If activated, HTML code contained in questions and answers is evaluated.",
  "export": "Export",
  "feedback": "Enable Feedback",
  "feedback_info": "If enabled, the user is shown what is right and what is wrong when answering a question.",
  "import": "Import",
  "lang": "Language",
  "lang_de": "German",
  "lang_en": "English",
  "lang_info": "Language in which the app should be displayed. With 'multilingual', the language can be changed in the app.",
  "lang_multi": "multilingual",
  "move_answer_down": "Changes the order of answers: Moves this answer one position down.",
  "move_answer_up": "Changes the order of answers: Moves this answer one position up.",
  "move_question_down": "Changes the order of questions: Moves this question one position down.",
  "move_question_up": "Changes the order of questions: Moves this question one position up.",
  "number": "Limited Number of Questions",
  "number_info": "How many questions should be questioned? By default, all questions are questioned.",
  "preview": "Preview",
  "question_preview": "Show Question Preview",
  "questions": "Questions and Answers",
  "random": "Random Answers",
  "random_info": "If enabled, the answers to a question are shown in random order.",
  "results": "Evaluation of Results",
  "retry": "Correctable Inputs",
  "retry_info": "If enabled, an incorrect answer can be corrected again after submit.",
  "save": "Save results anonymously",
  "save_info": "If enabled, the results are saved anonymously, so that it can be seen which questions and answers were answered correctly and how often.",
  "settings": "Other Settings",
  "shuffle": "Shuffle Questions",
  "shuffle_info": "If enabled, the questions are mixed so that they are questioned in a different order each time.",
  "solution": "Indicates whether the answer is correct. Click to change state.",
  "submit": "Submit"
};

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const test = {
  "css": [ "ccm.load",
    [  // serial
      "./../libs/bootstrap-5/css/bootstrap.css",
      "./../libs/bootstrap-5/css/bootstrap-dark.css",
      "./../mc_builder/resources/styles.css"
    ],
    "./../libs/bootstrap-5/css/bootstrap-icons.css",
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" },
  ],
  "dark": "auto",
  "editor.1": "https://ccmjs.github.io/akless-components/quill/ccm.quill.js",
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../mc_builder/resources/templates-v2.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs.1": "./../libs/bootstrap-5/js/bootstrap.bundle.js",
  "onfinish": { "log": true },
  "preview": true,
  "results": { "name": "test", "url": "https://ccm2.inf.h-brs.de" },
  "text": de,
  "tool": [ "ccm.component", "./../mc/ccm.mc.js", [ "ccm.load", "./../mc/resources/resources.mjs#test" ] ]
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "dark": "auto",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "log": true },
  "preview": true,
  "text": de
};

/**
 * configuration for Digital Makerspace
 * @type {Object}
 */
export const dms = {
  "css": [ "ccm.load", "https://ccmjs.github.io/eild/mc_builder/resources/default.css" ],
  "dark": false,
  "ignore": {
    "feedback": true,
    "retry": true,
    "shuffle": true,
    "random": true,
    "dark": false,
    "text": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.mjs#de" ]
  },
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "libs": null,
  "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" } },
  "text": de
};
