/**
 * @overview ccmjs-based web component for training of ternary relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (21.04.2022)
 */

( () => {
  const component = {
    name: 'ern_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/ern_trainer/resources/styles.min.css"
        ],
        { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
//    "data": { "store": [ "ccm.store" ] },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.1.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/ern_trainer/resources/templates.mjs" ],
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
      "notation": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "path": "https://ccmjs.github.io/eild/ern_trainer/resources/img/",
        "title": "Abrial"
      },
//    "number": 1,
//    "oncancel": event => console.log( event ),
//    "onchange": event => console.log( event ),
      "onfinish": { "restart": true },
//    "onstart": event => console.log( event ),
      "phrases": [ "ccm.load", "https://ccmjs.github.io/eild/ern_trainer/resources/resources.mjs#phrases" ],
      "retry": true,
      "show_solution": true,
      "shuffle": true,
      "text": [ "ccm.load", "https://ccmjs.github.io/eild/ern_trainer/resources/resources.mjs#en" ],
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

        // pass setting for dark mode to child instances
        if ( this.lang ) this.lang.dark = this.dark;
        if ( this.user ) this.user.dark = this.dark;

        // set title of modal dialog
        this.modal.title = this.text.legend;

        // uniform notation data
        this.notation.images = this.notation.images.map( image => this.notation.path + image + '.' + this.notation.format );

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

        /** when 'legend' button is clicked */
        onLegend: () => {
          this.modal.open();
          this.lang.translate( this.modal.element );
          this.onchange && this.onchange( { event: 'legend', instance: this } );
        },

        /** when selected entry of left selector box changes */
        onSelect: ( nr, value ) => {
          setInput( nr, value );
          render();
          this.onchange && this.onchange( { event: 'input', instance: this, phrase: phrase_nr, nr: nr, value: value } );
          this.logger && this.logger.log( 'input', { phrase: phrase_nr, nr: nr, value: value } );
        },

        /** when 'cancel' button is clicked */
        onCancel: () => {
          if ( !this.oncancel ) return;
          this.oncancel( { instance: this, phrase_nr: phrase_nr } );
          this.onchange( { event: 'cancel', instance: this, phrase: phrase_nr } );
        },

        /** when 'submit' button is clicked */
        onSubmit: () => {
          const section = data.sections[ phrase_nr - 1 ];
          if ( section.correct !== undefined || section.input.includes( '' ) ) return;
          section.input = [];
          [
            this.element.querySelector( '#input1' ),
            this.element.querySelector( '#input2' ),
            this.element.querySelector( '#input3' ),
            this.element.querySelector( '#input4' )
          ].forEach( select => select && section.input.push( select.value ) );
          section.correct = section.input.toString() === section.solution.toString();
          if ( section.correct ) data.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          this.onchange && this.onchange( { event: 'submit', instance: this, phrase: phrase_nr } );
          !this.feedback && events.onNextClick();
        },

        /** when 'retry' button is clicked */
        onRetry: () => {
          const section = data.sections[ phrase_nr - 1 ];
          if ( !this.retry || section.correct !== false ) return;
          delete section.correct;
          this.element.classList.remove( 'failed' );
          render();
        },

        /** when 'solution' button is clicked */
        onSolution: () => this.show_solution && data.sections[ phrase_nr - 1 ].correct === false && render( true ),

        /** when 'next' button is clicked */
        onNext: () => {
          if ( data.sections[ phrase_nr - 1 ].correct === undefined || phrase_nr === this.number ) return;
          reset();
          phrases.shift(); nextPhrase();
          this.onchange && this.onchange( { event: 'next', instance: this, phrase: phrase_nr } );
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );
        },

        /** when 'finish' button is clicked */
        onFinish: () => {
          if ( !this.onfinish || data.sections[ phrase_nr - 1 ].correct === undefined || phrase_nr < this.number ) return;
          reset();
          phrases.shift(); this.onfinish && $.onFinish( this );
          this.logger && this.logger.log( 'finish', this.getValue() );
        }

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        data.sections.push( {
          text: phrases[ 0 ].text,
          entities: phrases[ 0 ].entities,
          relation: phrases[ 0 ].relation,
          solution: phrases[ 0 ].solution,
          input: phrases[ 0 ].entities.map( () => '' )
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