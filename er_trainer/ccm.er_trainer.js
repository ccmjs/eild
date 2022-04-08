/**
 * @overview ccmjs-based web component for training of a binary relationship in an ER diagram
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (06.04.2022)
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.1.0 as default
 * - uses Bootstrap 5 as default
 * - added optional dark mode
 * - added optional multilingualism
 * - changed parameter for 'onstart' callback
 * version 1.0.0 (19.04.2021)
 */

( () => {
  const component = {
    name: 'er_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-dark.min.css",
          "https://ccmjs.github.io/eild/er_trainer/resources/styles.min.css"
        ],
        { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
//    "dark": "auto",
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "crow",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/templates-v2.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.1.0.min.js", {
        "backdrop_close": true,
        "content": "",
        "closed": true,
        "buttons": ""
      } ],
      "notations": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources.mjs#notations" ],
      "number": 5,
//    "oncancel": event => console.log( event ),
//    "onchange": event => console.log( event ),
      "onfinish": { "restart": true },
//    "onstart": event => console.log( event ),
      "phrases": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources.mjs#phrases" ],
      "show_solution": true,
      "shuffle": true,
      "text": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources.mjs#en" ],
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

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

        // log 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

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

        // trigger and log 'start' event
        this.onstart && await this.onstart( { instance: this } );
        this.logger && this.logger.log( 'start', { dataset: $.clone( data ), phrases: $.clone( phrases ) } );

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
        onNotationChange: event => {
          data.notation = notation = event.target.value;
          render();
          this.onchange && this.onchange( { event: 'notation', instance: this } );
        },

        /** when 'legend' button is clicked */
        onLegendClick: () => {
          this.modal.open();
          this.lang.translate( this.modal.element );
          this.onchange && this.onchange( { event: 'legend', instance: this } );
        },

        /** when selected entry of left selector box changes */
        onLeftInputChange: event => {
          setInput( false, event.target.value );
          render();
          this.onchange && this.onchange( { event: 'left', instance: this, phrase: phrase_nr } );
        },

        /** when selected entry of right selector box changes */
        onRightInputChange: event => {
          setInput( true, event.target.value );
          render();
          this.onchange && this.onchange( { event: 'right', instance: this, phrase: phrase_nr } );
        },

        /** when 'cancel' button is clicked */
        onCancelClick: () => {
          if ( !this.oncancel ) return;
          this.oncancel( { instance: this, phrase_nr: phrase_nr } );
          this.onchange( { event: 'cancel', instance: this, phrase: phrase_nr } );
        },

        /** when 'submit' button is clicked */
        onSubmitClick: () => {
          const section = data.sections[ phrase_nr - 1 ];
          section.input = [
            this.element.querySelector( '#input' + ( this.notations[ data.notation ].swap ? 2 : 1 ) ).value,
            this.element.querySelector( '#input' + ( this.notations[ data.notation ].swap ? 1 : 2 ) ).value
          ];
          section.correct = section.input.toString() === section.solution.toString();
          if ( section.correct ) data.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          this.onchange && this.onchange( { event: 'submit', instance: this, phrase: phrase_nr } );
          !this.feedback && events.onNextClick();
        },

        /** when 'next' button is clicked */
        onNextClick: () => {
          this.element.classList.remove( 'correct', 'failed' );
          phrases.shift(); nextPhrase();
          this.onchange && this.onchange( { event: 'next', instance: this, phrase: phrase_nr } );
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );
        },

        /** when 'finish' button is clicked */
        onFinishClick: () => {
          this.element.classList.remove( 'correct failed' );
          phrases.shift(); this.onfinish && $.onFinish( this );
          this.logger && this.logger.log( 'finish', this.getValue() );
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

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, data, events, phrases[ 0 ], phrase_nr ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
        this.lang && this.lang.translate();
      };

      /**
       * updates selected value of left or right selector box in app state data
       * @param {boolean} left_or_right - left: false, right: true
       * @param {string} value - selected value
       */
      const setInput = ( left_or_right, value ) => {
        const section = data.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ left_or_right ? 1 : 0 ] = value;
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();