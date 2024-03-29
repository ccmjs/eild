/**
 * @overview data-based resources of ccmjs-based web component for multiple choice analytics
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

/**
 * test configuration (relative paths)
 * @type {Object}
 */
export const local = {
  "css.1.1": "./../mc_analytics/resources/styles.css",
  "data": {
    "store": [ "ccm.store", { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" } ],
    "key": {
      "app": "1636960873115X4972872488669309"
    },
    "convert": [ "ccm.load", "./../mc_analytics/resources/resources.mjs#convert" ]
  },
  "editor": [ "ccm.instance", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js", {
    "editor": [ "ccm.load",
      "https://ccmjs.github.io/tkless-components/libs/quill/quill.js",
      "https://cdn.quilljs.com/1.2.0/quill.snow.css"
    ],
    "settings": {
      "modules": {
        "toolbar": [
          [ "bold", "italic", "underline", "strike" ],
          [ { "list": "ordered" }, { "list": "bullet" } ],
          [ "link", "image" ]
        ]
      },
      "theme": "snow"
    }
  } ],
  "html.1": "./../mc_analytics/resources/templates.mjs",
  "sort": [ "ccm.load", "./../mc_analytics/resources/resources.mjs#sort" ],
//  "source": [ "ccm.store", { "name": "dbs-questions", "url": "https://ccm2.inf.h-brs.de" } ],
  "text": {
    "answer": "Multiple Choice Antwort",
    "average": "Durchschnittlich erreichte Punkte",
    "correct": "Richtige Lösung ausgewählt",
    "diagram": "Zeige Diagramm",
    "pchart": {
      "points": "Punkte",
      "series": [ "Minimum", "Durchschnitt", "Maximum" ],
      "title": "Durchschnittlich erreichte Punktzahl",
      "xaxis": "Multiple Choice Fragen",
      "yaxis": "Erreichte Punktzahl"
    },
    "points": "Zeige Punktedurchschnitt",
    "qchart": {
      "column": "A%nr%",
      "correct": "richtig beantwortet",
      "subtitle": "Insgesamt %total% Einreichung(en).",
      "tooltip": "<b>%category%</b> wurde in <b>%y%</b> Einreichung(en) <b>%series%</b>.<br><i>%answer%</i>",
      "wrong": "falsch beantwortet",
      "yaxis": "Anzahl an Einreichungen"
    },
    "question": "Multiple Choice Frage",
    "refresh": "Aktualisiere Tabellendaten",
    "solution": "Richtige Lösung",
    "sum": "Anzahl an Einreichungen",
    "wrong": "Falsche Lösung ausgewählt"
  }
};

/**
 * demo configuration (absolute paths)
 * @type {Object}
 */
export const demo = {
  "data": {
    "store": [ "ccm.store", { "name": "mc-data", "url": "https://ccm2.inf.h-brs.de" } ],
    "key": "demo"
  }
};

/**
 * default sort functions for questions and answers
 * @type {Object}
 */
export const sort = {
  "question": ( a, b ) => a.nr - b.nr,
  "answer":   ( a, b ) => a.nr - b.nr
};

export const convert = dataset => {
  console.log( dataset );
  const questions = [];
  if ( !Array.isArray( dataset ) ) dataset = [ dataset ];
  dataset.forEach( dataset => dataset.questions.forEach( question => {
    questions.push( question );
  } ) );
  dataset.questions = questions;
  return dataset;
};
