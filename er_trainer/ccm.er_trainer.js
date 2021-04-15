/**
 * @overview ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (14.04.2021)
 */

( () => {

  const component = {
    name: 'er_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.0.js',
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
        "notation": "crow",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/templates.mjs" ],
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
          "centered": true
        },
        "arrow": {
          "key": "arrow",
          "title": "Pfeilnotation",
          "left": "mirrored"
        },
        "chen": {
          "key": "chen",
          "title": "Chen",
          "centered": true
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
        "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
        "input1": "Auswahl 1:",
        "input2": "Auswahl 2:",
        "notation": "Notation:",
        "legend": "Legende",
        "next": "Weiter",
        "phrase": "Phrase [%%]:",
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "submit": "Antworten",
        "title": "ER-Trainer"
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
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases ).map( phrase => { delete phrase.key; return phrase; } );

      };

      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

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

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        dataset.sections.push( {
          input: [ '', '' ],
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, onNotationChange, onLegendClick, onLeftInputChange, onRightInputchange, onCancelClick, onSubmitClick, onNextClick, onFinishClick ), this.element );
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

      /** when selected entry of left selector box changes */
      const onLeftInputChange = event => {
        setInput( false, event.target.value );
        render();
      };

      /** when selected entry of right selector box changes */
      const onRightInputchange = event => {
        setInput( true, event.target.value );
        render();
      };

      /** when 'cancel' button is clicked */
      const onCancelClick = () => this.oncancel && this.oncancel( this, phrase_nr );

      /** when 'submit' button is clicked */
      const onSubmitClick = () => {
        const section = dataset.sections[ phrase_nr - 1 ];
        section.input = [ this.element.querySelector( '#input1' ).value, this.element.querySelector( '#input2' ).value ];
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
      }

      /** when 'finish' button is clicked */
      const onFinishClick = () => {
        this.element.classList.remove( 'correct' );
        this.element.classList.remove( 'failed' );
        phrases.shift();
        this.onfinish && $.onFinish( this );
      }

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