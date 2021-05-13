/**
 * @overview ccmjs-based web component for ER model to logical scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (07.05.2021)
 */

( () => {

  const component = {
    name: 'er_logic_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_trainer/resources/default.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "uml",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/templates.mjs" ],
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
            {
              "html": "<input type='submit' class='btn btn-primary' form='attr-form' value='Speichern'>"
            },
            {
              "html": "<button class='btn btn-secondary' data-close>Abbrechen</button>"
            }
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
      "number": 5,
//    "oncancel": ( instance, phrase_nr ) => {},
      "onfinish": { "restart": true },
      "phrases": [ "ccm.get", { "name": "eild-er_trainer-phrases", "url": "https://ccm2.inf.h-brs.de" } ],
      "show_solution": true,
      "shuffle": true,
      "text": {
        "cancel": "Abbrechen",
        "correct": "Ihre letzte Antwort war richtig!",
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
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "submit": "Antworten",
        "table": "-Tabelle",
        "title": "ER-zu-Schema-Trainer"
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
        this.phrases.map( phrase => { delete phrase.key; return phrase; } );
      };

      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

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
          input: [
            [
              null,
              { arrow: true, opt: true },
              { arrow: true, opt: true }
            ],
            [
              { arrow: true, opt: true },
              null,
              { arrow: true, opt: true }
            ],
            [
              { arrow: true, opt: true },
              { arrow: true, opt: true },
              null
            ]
          ],
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
          dataset.sections[ phrase_nr - 1 ].input[ table ] = [ null, null, null ];
          render();
        },

        /** when a 'remove table' icon is clicked */
        onRemoveTable: table => {
          dataset.sections[ phrase_nr - 1 ].input[ table ] = null;
          render();
        },

        /** when a 'add attribute' icon is clicked */
        onAddAttr: table => {
          const section = dataset.sections[ phrase_nr - 1 ];
          const modal = this.modal.attr;
          const onSubmit = event => {
            event.preventDefault();
            const fk = $.formData( modal.element.querySelector( 'form' ) );
            section.input[ table ][ fk.table ] = { opt: fk.opt };
            render();
            modal.close();
          };
          this.html.render( this.html.attrForm( section, table, onSubmit ), modal.element.querySelector( 'main' ) );
          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {
          dataset.sections[ phrase_nr - 1 ].input[ from ][ to ] = null;
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {
          const section = dataset.sections[ phrase_nr - 1 ];
          section.input = [
            this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 2 : 1 ) ).value,
            this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 1 : 2 ) ).value
          ];
          section.correct = section.input.toString() === section.solution.toString();
          if ( section.correct ) dataset.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          !this.feedback && onNextClick();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {
          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );
          phrases.shift();
          nextPhrase();

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );
        },

        /** when 'finish' button is clicked */
        onFinishButton: () => {
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