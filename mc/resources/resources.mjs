/**
 * @overview data-based resources of ccmjs-based web component for multiple choice
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * example for questions data
 * @type {Object}
 */
export const example = [
  {
    "text": "Was ist HTML?",
    "answers": [
      { "text": "Auszeichnungssprache", "solution": true },
      { "text": "Programmiersprache", "solution": false },
      { "text": "Etwas essbares", "solution": false }
    ]
  },
  {
    "text": "Wer hat HTML erfunden?",
    "answers": [
      { "text": "Tim Berners-Lee", "solution": true },
      { "text": "Bill Gates", "solution": false },
      { "text": "Mark Zuckerberg", "solution": false },
      { "text": "Steve Jobs", "solution": false },
      { "text": "Fred Feuerstein", "solution": false }
    ]
  },
  {
    "text": "Wer arbeitet alles an der Weiterentwicklung von HTML?",
    "answers": [
      { "text": "das World Wide Web Consortium (W3C)", "solution": true },
      { "text": "die Web Hypertext Application Technology Working Group (WHATWG)", "solution": true },
      { "text": "die Organisation des Nordatlantikvertrags (NATO)", "solution": false },
      { "text": "die Nationale Sicherheitsbehörde (NSA)", "solution": false }
    ]
  }
];

/**
 * german texts and labels
 * @type {Object}
 */
export const de = {
  "btn_true": "Richtig",
  "btn_neutral": "",
  "btn_false": "Falsch",
  "finish": "Neustarten",
  "next": "Weiter",
  "question": "Frage",
  "retry": "Korrigieren",
  "submit": "Abschicken"
};

/**
 * english texts and labels
 * @type {Object}
 */
export const en = {
  "btn_true": "TRUE",
  "btn_neutral": "",
  "btn_false": "FALSE",
  "finish": "Restart",
  "next": "Next",
  "question": "Question",
  "retry": "Retry",
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
      "./../mc/resources/styles.css"
    ],
    { "url": "./../libs/bootstrap-5/css/bootstrap-fonts.css", "context": "head" }
  ],
  "dark": "auto",
  "feedback": true,
  "helper.1": "./../libs/ccm/helper.mjs",
  "html.1": "./../mc/resources/templates-v2.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.2.0.js", {
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "log": true, "restart": true },
  "questions": example,
  "random": true,
  "retry": true,
  "shuffle": true,
  "text": de
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "dark": "auto",
  "data": {
    "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
    "key": "demo"
  },
  "feedback": true,
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "onfinish": { "restart": true },
  "questions": example,
  "random": true,
  "shuffle": true,
  "text": de
};
