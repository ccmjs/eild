/**
 * @overview data-based resources for quiz
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "db_ss21_eh02": {
    "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    "data": {
      "key": "eh20",
      "store": [
        "ccm.store",
        {
          "name": "db-ss21-quiz-results",
          "url": "https://ccm2.inf.h-brs.de"
        }
      ]
    },
    "onfinish": {
      "confirm": "",
      "clear": false,
      "restart": true,
      "alert": ""
    },
    "questions": [
      {
        "text": "Gegeben sind die folgenden beiden Datensätze der Datensammlung \"Personen\":",
        "input": "checkbox",
        "description": "\"Harald Kaputnik, Hauptstraße 18, 53117 Bonn\" und\n\"Petra Weizenkeim, 22.06.1999, 0228-12345678, 53117 Bonn\"",
        "answers": [
          {
            "text": "Die Datensammlung \"Personen\" vereinigt unstrukturierte Daten.",
            "correct": true,
            "comment": "Weil das richtig ist."
          },
          {
            "text": "Die Datensammlung \"Personen\" vereinigt semi-strukturierte Daten.",
            "correct": false,
            "comment": "Weil das leider falsch ist."
          },
          {
            "text": "Die Datensammlung \"Personen\" vereinigt strukturierte Daten.",
            "correct": false,
            "comment": ""
          },
          {
            "text": "Die Bedeutung der Datenwerte ist für den Leser nicht ersichtlich.",
            "correct": true,
            "comment": ""
          },
          {
            "text": "Es könnte sich um zwei Datensätze einer Tabelle \"Personen\" handeln.",
            "correct": false,
            "comment": ""
          }
        ]
      },
      {
        "text": "Die logische Datenunabhängigkeit bedeutet, dass ...",
        "input": "checkbox",
        "description": "\"Harald Kaputnik, Hauptstraße 18, 53117 Bonn\" und\n\"Petra Weizenkeim, 22.06.1999, 0228-12345678, 53117 Bonn\"",
        "answers": [
          {
            "text": "der Datenzugriff lediglich über eine Beschreibung der gewünschten Daten und nicht über die Angabe der Speicheradresse erfolgt.",
            "correct": false,
            "comment": ""
          },
          {
            "text": "die Datenbank eine Vereinigung der Daten vieler Anwendungsbereiche enthält.",
            "correct": false,
            "comment": ""
          },
          {
            "text": "die interne Darstellung der Daten geändert werden kann, ohne dass die Anwendungsprogramme angepasst werden müssen.",
            "correct": true,
            "comment": ""
          },
          {
            "text": "die Daten auf eine andere Datenbank verschoben werden können, ohne dass die Anwendungsprogramme angepasst werden müssen.",
            "correct": false,
            "comment": ""
          },
          {
            "text": "sich der Name einer Tabelle oder einer Spalte ändern kann, ohne dass die Anwendungsprogramme angepasst werden müssen.",
            "correct": true,
            "comment": ""
          }
        ]
      }
    ],
    "start_button": false,
    "feedback": true,
    "progress_bar": false,
    "navigation": false,
    "skippable": false,
    "anytime_finish": false,
    "time": 180,
    "shuffle": false,
    "random": false,
    "escape": false,
    "user": [
      "ccm.instance",
      "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js",
      {
        "realm": "guest",
        "guest": true
      }
    ],
    "placeholder": {
      "prev": "Vorherige Frage",
      "submit": "Abschicken",
      "next": "Nächste Frage",
      "finish": "Speichern"
    }
  }

};