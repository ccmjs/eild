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
      "modal": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
        "backdrop_close": true,
        "content": "",
        "closed": true,
        "buttons": ""
      } ],
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
        "heading": "Wandle das ER-Diagramm in ein logisches Tabellenschema um!",
        "input1": "Auswahl 1:",
        "input2": "Auswahl 2:",
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

        // set title of modal dialog
        this.modal.title = this.text.legend;

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
        this.html.render( this.html.legend( this ), this.modal.element.querySelector( 'main' ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( dataset ), phrases: $.clone( phrases ) } );

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        dataset.sections.push( {
          input: [
            [
              { primary: true },
              { foreign: { to: 1, swap: false } },
            ],
            [
              {
                primary: true,
                foreign: { to: 0, swap: true },
                opt: true
              },
              {
                primary: true,
                foreign: { to: 2, swap: false },
                opt: true
              }
            ],
            [
              { primary: true },
              { foreign: { to: 1, swap: true } }
            ]
          ],
          relationship: phrases[ 0 ].relationship,
          relation: phrases[ 0 ].relation,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, onNotationChange, onLegendClick, onLeftTableButtonClick, onMiddleTableButtonClick, onRightTableButtonClick, onRemoveTableClick, onRemoveTableAttributeClick, onCancelClick, onSubmitClick, onNextClick, onFinishClick ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** when selected entry for displayed notation changes */
      const onNotationChange = event => {
        dataset.notation = notation = event.target.value;
        render();
      };

      /** when 'legend' button is clicked */
      const onLegendClick = () => this.modal.open();

      /** when ... */
      const onLeftTableButtonClick = () => {
        dataset.sections[ phrase_nr - 1 ].input[ 0 ] = [];
        render();
      };

      /** when ... */
      const onMiddleTableButtonClick = () => {
        dataset.sections[ phrase_nr - 1 ].input[ 1 ] = [];
        render();
      };

      /** when ... */
      const onRightTableButtonClick = () => {
        dataset.sections[ phrase_nr - 1 ].input[ 2 ] = [];
        render();
      };

      /** when ... */
      const onRemoveTableClick = table => {
        dataset.sections[ phrase_nr - 1 ].input[ table ] = null;
        render();
      };

      /** when ... */
      const onRemoveTableAttributeClick = ( table, attr ) => {
        dataset.sections[ phrase_nr - 1 ].input[ table ].splice( attr, 1 );
        render();
      };

      /** when 'cancel' button is clicked */
      const onCancelClick = () => this.oncancel && this.oncancel( this, phrase_nr );

      /** when 'submit' button is clicked */
      const onSubmitClick = () => {
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
      };

      /** when 'next' button is clicked */
      const onNextClick = () => {
        this.element.classList.remove( 'correct' );
        this.element.classList.remove( 'failed' );
        phrases.shift();
        nextPhrase();

        // logging of 'next' event
        this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );
      };

      /** when 'finish' button is clicked */
      const onFinishClick = () => {
        this.element.classList.remove( 'correct' );
        this.element.classList.remove( 'failed' );
        phrases.shift();
        this.onfinish && $.onFinish( this );

        // logging of 'finish' event
        this.logger && this.logger.log( 'finish', this.getValue() );
      };

      /**
       * updates selected value of left or right selector box in app state data
       * @param {boolean} left_or_right - left: false, right: true
       * @param {string} value - selected value
       */
      const setInput = ( left_or_right, value ) => {
        const section = dataset.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ left_or_right ? 1 : 0 ] = value;
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();