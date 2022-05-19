/**
 * @overview ccmjs-based web component for training of binary relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version 3.0.0
 * @changes
 * version 3.0.0 (19.05.2022)
 * - removed optional logger
 * - default layout uses CSS Grid instead of CSS Flexbox
 * - default notation is 'abrial'
 * - all phrases are used as default
 * - added optional onready callback
 * - added 'retry' button
 * - added 'show solution' button
 * - changed properties for a phrase ('entities' and 'relation' instead of 'relationship')
 * (for older version changes see ccm.er_trainer-2.0.0.js)
 */

( () => {
  const component = {
    name: 'er_trainer',
    version: [ 3, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_trainer/resources/styles-v2.min.css"
        ],
        { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "notation": "abrial",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/templates-v3.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
      "feedback": true,
      "legend": true,
      "modal": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.1.0.min.js", {
        "backdrop_close": true,
        "content": "",
        "closed": true,
        "buttons": ""
      } ],
      "notations": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources-v2.mjs#notations" ],
//    "number": 1,
//    "onchange": event => console.log( event ),
      "onfinish": { "restart": true },
//    "onready": event => console.log( event ),
//    "onstart": event => console.log( event ),
      "phrases": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources-v2.mjs#phrases" ],
      "retry": true,
      "show_solution": true,
      "shuffle": true,
      "text": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources-v2.mjs#en" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ],
      "values": [ "1", "c", "n", "cn" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * app state data
       * @type {Object}
       */
      let data;

      /**
       * current selected notation
       * @type {string}
       */
      let notation;

      /**
       * current phrase number
       * @type {number}
       */
      let phrase_nr;

      /**
       * phrases data
       * @type {Object}
       */
      let phrases;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
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

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

        // use all phrases as default
        if ( !this.number ) this.number = this.phrases.length;

        // trigger 'ready' event
        this.onready && await this.onready( { instance: this } );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // not enough phrases left? => clone and shuffle original phrases
        if ( phrases.length < this.number ) {
          phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( phrases );
        }

        // load initial app state data
        data = await $.dataset( this.data );
        data = Object.assign( data, {
          correct: 0,
          notation: notation || data.notation || this.default.notation,
          sections: [],
          total: this.number
        } );

        // render first phrase
        phrase_nr = 0; nextPhrase();

        // render language selection and user login/logout
        const aside = this.element.querySelector( 'aside' );
        if ( aside ) {
          aside && this.lang && !this.lang.getContext() && $.append( aside, this.lang.root );
          aside && this.user && $.append( aside, this.user.root );
        }

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.element.querySelector( 'main' ) );

        // trigger 'start' event
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( data );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /** when selected entry for displayed notation changes */
        onNotation: ( value, show_solution ) => {
          data.notation = value;
          render( show_solution );
          this.onchange && this.onchange( { event: 'notation', instance: this } );
        },

        /** when 'legend' button is clicked */
        onLegend: () => {
          this.modal.open();
          this.lang.translate( this.modal.element );
          this.onchange && this.onchange( { event: 'legend', instance: this } );
        },

        /** when selected entry of a selector box changes */
        onSelect: ( nr, value ) => {
          setInput( nr, value );
          render();
          this.onchange && this.onchange( { event: 'input', instance: this, phrase: phrase_nr, nr: nr, value: value } );
        },

        /** when 'submit' button is clicked */
        onSubmit: () => {
          const section = data.sections[ phrase_nr - 1 ];
          section.input = [
            this.element.querySelector( '#input1' ).value,
            this.element.querySelector( '#input2' ).value
          ];
          section.correct = section.input.toString() === section.solution.toString();
          if ( section.correct ) data.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          this.onchange && this.onchange( { event: 'submit', instance: this, phrase: phrase_nr } );
          !this.feedback && events.onNext();
        },

        /** when 'retry' button is clicked */
        onRetry: () => {
          const section = data.sections[ phrase_nr - 1 ];
          if ( !this.retry || section.correct !== false ) return;
          delete section.correct;
          this.element.classList.remove( 'failed' );
          render();
          this.onchange && this.onchange( { event: 'retry', instance: this, phrase: phrase_nr } );
        },

        /** when 'solution' button is clicked */
        onSolution: () => {
          if ( !this.show_solution || data.sections[ phrase_nr - 1 ].correct !== false ) return;
          render( true );
          this.onchange && this.onchange( { event: 'solution', instance: this, phrase: phrase_nr } );
        },

        /** when 'next' button is clicked */
        onNext: () => {
          if ( data.sections[ phrase_nr - 1 ].correct === undefined || phrase_nr === this.number ) return;
          reset();
          phrases.shift(); nextPhrase();
          this.onchange && this.onchange( { event: 'next', instance: this, phrase: phrase_nr } );
        },

        /** when 'finish' button is clicked */
        onFinish: () => {
          if ( !this.onfinish || data.sections[ phrase_nr - 1 ].correct === undefined || phrase_nr < this.number ) return;
          reset();
          phrases.shift(); this.onfinish && $.onFinish( this );
        }

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        data.sections.push( {
          input: [ '', '' ],
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /**
       * renders current phrase
       * @param {boolean} [show_solution] - reveal correct solution
       */
      const render = show_solution => {
        this.html.render( this.html.main( this, data, events, phrases[ 0 ], phrase_nr, show_solution ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
        this.lang && this.lang.translate();
      };

      /** resets visual feedback and selected input values */
      const reset = () => {
        this.element.classList.remove( 'correct', 'failed' );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = false );
      };

      /**
       * updates selected value of a selector box in app state data
       * @param {number} nr - selector box number (1: left, 2: middle, 3: right)
       * @param {string} value - selected value
       */
      const setInput = ( nr, value ) => {
        const section = data.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ nr - 1 ] = value;
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();