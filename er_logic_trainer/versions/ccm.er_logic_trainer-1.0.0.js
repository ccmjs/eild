/**
 * @overview ccmjs-based web component for ER model to logical scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (26.05.2021)
 */

( () => {

  const component = {
    name: 'er_logic_trainer',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_logic_trainer/resources/styles.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "abrial",
        "path": "https://ccmjs.github.io/eild/er_logic_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_logic_trainer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": {
        "attr": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "breakpoints": false,
          "buttons": [
            { "html": "<button class='btn btn-secondary' data-close>Abbrechen</button>" },
            { "html": "<input type='submit' class='btn btn-primary' form='attr-form' value='Hinzufügen'>" }
          ]
        } ],
        "legend": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "buttons": ""
        } ]
      },
      "notations": {
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
          "comment": "In der Chen-Notation kann zur Spezifikation der Kardinalitäten jeder Entitätstyp entweder mit einer Kardinalität 1 oder mit einer Kardinalität N am Beziehungstyp partizipieren. (In dieser Grundform werden die Beziehungsmengen nur mit ihrer Maximalaussage genannt.)"
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
      },
//    "number": 5,
//    "oncancel": ( instance, phrase_nr ) => {},
      "onfinish": { "restart": true },
      "phrases": [
        {
          "text": "Ein Fahrzeug kann einen Anhänger haben.",
          "relationship": [ "Fahrzeug", "hat", "Anhänger" ],
          "solution": [ "c", "c" ],
          "hints": [
            "Ein Fahrzeug hat keinen oder genau einen Anhänger und ein Anhänger ist an kein oder genau ein Fahrzeug angehängt.",
            "Richtig für den Fall, dass der aktuelle Zustand gespeichert werden soll. Die Frage an welche Fahrzeuge ein Anhänger in seiner Lebenszeit schon angehängt wurde, könnte so nicht beantwortet werden."
          ]
        },
        {
          "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
          "relationship": [ "Topf", "hat", "Deckel" ],
          "solution": [ "1", "c" ],
          "hints": [
            "Jeder Topf hat keinen oder genau einen Deckel und jeder Deckel gehört zu genau einem Topf.",
            "Das ein Deckel immer zu genau einen Topf gehört, lässt sich mit den hier verfügbaren Mitteln nicht sicherstellen. Später in der Datenbank muss dies anders sichergestellt werden. Wenn es einen Deckel gibt, zu dem es keinen Topf gibt, der auf den Deckel verweist, hat der Deckel keinen Topf. Auch könnte es mehrere Deckel geben, die auf den gleichen Topf verweisen, dies lässt sich ebenfalls auf dieser Ebene nicht verhindern."
          ]
        },
        {
          "text": "Zu jedem Patienten gibt es eine Patientenakte.",
          "relationship": [ "Patient", "hat", "Patientenakte" ],
          "solution": [ "1", "1" ],
          "hints": [
            "Ein Patient hat genau eine Patientenakte und eine Patientenakte gehört zu genau einem Patienten.",
            "Korrekt, in der Praxis fasst man eine 1-zu-1-Beziehung allerdings häufig zu einer Tabelle zusammen."
          ]
        },
        {
          "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
          "relationship": [ "Rucksack", "enthält", "Gegenstände" ],
          "solution": [ "c", "cn" ],
          "comment": [
            "Ein Rucksack enthält keinen, einen oder mehrere Gegenstände und ein Gegenstand befindet sich in keinem oder genau einem Rucksack.",
            "Richtig, um den aktuellen Zustand eines Rucksacks festzuhalten. Die Historie, in welchen Rucksäcken ein Gegenstand bereits enthalten war, könnte man so aber nicht ermitteln."
          ]
        },
        {
          "text": "Ein Wald hat Bäume.",
          "relationship": [ "Wald", "hat", "Baum" ],
          "solution": [ "c", "n" ],
          "hints": [
            "Ein Wald hat einen oder mehrere Bäume und ein Baum gehört zu keinem oder genau einem Wald.",
            "Richtig, aber es kann so auch einen Wald ohne Bäume geben, nämlich genau dann, wenn es zu einem Wald keinen Baum gibt, der auf ihn verweist. Dies lässt sich mit den hier verfügbaren Mitteln nicht verhindern. Später in der Datenbank muss anders sichergestellt werden, dass ein Wald immer mind. einen Baum hat."
          ]
        },
        {
          "text": "Ein Sonne kann Planeten haben, die sie umkreisen.",
          "relationship": [ "Sonne", "hat", "Planeten" ],
          "solution": [ "1", "cn" ],
          "hints": [
            "Eine Sonne hat keinen, einen oder mehrere Planeten und ein Planet umkreist genau eine Sonne.",
            "Eine Sonne hat genau dann keinen Planeten, wenn es keinen Planeten in der Datenbank gibt, der auf die Sonne verweist."
          ]
        },
        {
          "text": "Ein Buch hat mehrere Seiten.",
          "relationship": [ "Buch", "hat", "Seite" ],
          "solution": [ "1", "n" ],
          "hints": [
            "Ein Buch hat mind. eine oder mehrere Seiten und eine Seite gehört zu genau einem Buch.",
            ""
          ]
        },
        {
          "text": "Kunden kaufen Produkte.",
          "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
          "solution": [ "cn", "cn" ],
          "hints": [
            "Ein Kunde hat keine, ein, oder mehrere Produkte gekauft und ein Produkt wurde von keinem, einem oder mehreren Kunden gekauft.",
            ""
          ]
        },
        {
          "text": "Auf einem Rezept stehen Zutaten.",
          "relationship": [ "Rezept", "hat", "Zutat" ],
          "solution": [ "cn", "n" ],
          "hints": [
            "Ein Rezept hat mind. eine oder mehrere Zutaten und eine Zutat gehört zu keinem, einem oder mehreren Rezepten.",
            "Das ein Rezept mind. eine Zutat hat, lässt sich mit den hier verfügbaren Mitteln nicht sicherstellen. Es ist möglich, dass es zu einem Rezept keine Zutat gibt, die auf das Rezept verweist. Später in der Datenbank muss anders sichergestellt werden, dass ein Rezept immer mind. eine Zutat hat."
          ]
        },
        {
          "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
          "relationship": [ "Haus", "hat", "Eigentümer" ],
          "solution": [ "n", "n" ],
          "hints": [
            "Ein Haus hat mind. einen oder mehrere Eigentümer und ein Eigentümer hat mind. ein oder mehrere Häuser.",
            "Das ein Haus mind. einen Eigentümer und ein Eigentümer mind. ein Haus hat, lässt sich erst später in der Datenbank mit anderen Mitteln sicherstellen. Wenn es zu z.B. zu einem Haus keinen Eigentümer gibt, der auf das Haus verweist, hat das Haus keinen Eigentümer."
          ]
        }
      ],
      "show_solution": true,
      "shuffle": true,
      "text": {
        "cancel": "Abbrechen",
        "correct": "Ihre Antwort war richtig!",
        "correct_solution": "Richtige Lösung:",
        "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "heading": "Lösen Sie die gezeigte Beziehung zwischen den beiden Entitäten auf!",
        "notation": "ER-Notation:",
        "legend": "Legende",
        "next": "Weiter",
        "phrase": "Phrase [%%]:",
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "show_feedback": "Zeige Feedback",
        "show_solution": "Zeige Lösung",
        "submit": "Antworten",
        "table": "-Tabelle",
        "title": "ER-zu-relationales-Schema-Trainer"
      },
      "values": [ "1", "c", "n", "cn" ]
    },

    Instance: function () {

      let $, dataset, notation, phrase_nr, phrases;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title for modal dialogs
        this.modal.legend.title = this.text.legend;
        this.modal.attr.title = 'Neuer Fremdschlüssel';

        // uniform notations data
        for ( const key in this.notations ) {
          let notation = this.notations[ key ];
          this.notations[ key ] = {
            key: notation.key,
            title: notation.title,
            swap: !!notation.swap,
            centered: !!notation.centered,
            left: notation.left || this.default.left,
            images: ( notation.images || this.default.images ).map( image => image.includes( '.' ) ? image : ( notation.path || this.default.path ) + notation.key + '/' + image + '.' + ( notation.format || this.default.format ) ),
            comment: notation.comment
          };
        }

        // uniform phrases data
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases );
        this.phrases = this.phrases.filter( phrase => { delete phrase.key; return phrase.relationship[ 0 ] !== phrase.relationship[ 2 ]; } );

      };

      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

        // no number of phrases? => use all phrases
        if ( !this.number ) this.number = phrases.length;

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // not enough phrases left? => clone and shuffle original phrases
        if ( phrases.length < this.number ) {
          phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( phrases );
        }

        // get already existing app state data
        dataset = await $.dataset( this.data );
        dataset = Object.assign( dataset, {
          correct: 0,
          notation: notation || dataset.notation || this.default.notation,
          sections: [],
          total: this.number
        } );

        // render first phrase
        phrase_nr = 0;
        nextPhrase();

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.legend.element.querySelector( 'main' ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( dataset ), phrases: $.clone( phrases ) } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        dataset.sections.push( {
          input: {
            keys: [ null, null, null ],
            arrows: [
              [ false, false, false ],
              [ false, false, false ],
              [ false, false, false ]
            ]
          },
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, events ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
      };

      /**
       * contains all event handlers
       * @type Object.<string,Function>
       */
      const events = {

        /** when selected entry for displayed notation changes */
        onNotationChange: event => {
          dataset.notation = notation = event.target.value;
          render();
        },

        /** when 'legend' button is clicked */
        onLegendClick: () => this.modal.legend.open(),

        /** when an 'add table' button is clicked */
        onAddTable: table => {
          dataset.sections[ phrase_nr - 1 ].input.keys[ table ] = [ null, null, null ];
          render();
        },

        /** when a 'remove table' icon is clicked */
        onRemoveTable: table => {
          const keys = dataset.sections[ phrase_nr - 1 ].input.keys;
          keys[ table ] = null;
          keys.forEach( fks => fks && ( fks[ table ] = null ) );
          render();
        },

        /** when a 'add attribute' icon is clicked */
        onAddAttr: table => {
          const section = dataset.sections[ phrase_nr - 1 ];
          const modal = this.modal.attr;
          const onSubmit = event => {
            event.preventDefault();
            const fk = $.formData( modal.element.querySelector( 'form' ) );
            section.input.keys[ table ][ fk.table ] = { opt: fk.opt };
            render();
            modal.close();
          };
          this.html.render( this.html.fkForm( section, table, onSubmit ), modal.element.querySelector( 'main' ) );
          modal.element.querySelector( 'input[name="opt"]' ).checked = false;
          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {
          dataset.sections[ phrase_nr - 1 ].input.keys[ from ][ to ] = null;
          render();
        },

        /** when an arrowhead is changed */
        onArrowChange: event => {
          dataset.sections[ phrase_nr - 1 ].input.arrows[ event.target.dataset.from ][ event.target.dataset.to ] = !!parseInt( event.target.value );
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {
          const section = dataset.sections[ phrase_nr - 1 ];
          const left = section.solution[ 0 ];
          const right = section.solution[ 1 ];
          const single_left = left === 'c' || left === '1';
          const single_right = right === 'c' || right === '1';
          const multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );
          section.feedback = {
            keys: [
              [ null, null, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ? { opt: right === 'c' } : null ],
              multi ? [ { opt: false }, null, { opt: false } ] : null,
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ) ? { opt: left === 'c' } : null, null, null ]
            ],
            arrows: [
              [ false, false, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ],
              [ multi, false, multi ],
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ), false, false ]
            ]
          };
//        section.input = section.feedback;
          section.correct = JSON.stringify( section.input ) === JSON.stringify( section.feedback );
          section.correct && dataset.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          !this.feedback && events.onNextButton();
        },

        /** when 'solution' button is clicked */
        onSolutionButton: () => {
          const feedback = dataset.sections[ phrase_nr - 1 ].feedback;
          feedback.show_solution = !feedback.show_solution;
          render();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {

          const section = dataset.sections[ phrase_nr - 1 ];
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;

          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();
          nextPhrase();

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );

        },

        /** when 'finish' button is clicked */
        onFinishButton: () => {

          const section = dataset.sections[ phrase_nr - 1 ];
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;

          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();
          this.onfinish && $.onFinish( this );

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', this.getValue() );
        }

      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();