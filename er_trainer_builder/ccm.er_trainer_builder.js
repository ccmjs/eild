/**
 * @overview ccmjs-based web component for building a ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (14.04.2021)
 */

( () => {
  const component = {
    name: 'er_trainer_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.css",
            "https://ccmjs.github.io/eild/er_trainer_builder/resources/default.css"
          ]
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {},
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.2.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer_builder/resources/templates.mjs" ],
      "ignore": {
        "css": {
          "default": {
            "key": "default",
            "title": "EDB-like",
            "value": [ "ccm.load",
              [
                "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
                "https://ccmjs.github.io/eild/er_trainer/resources/default.css"
              ]
            ]
          },
          "lea": {
            "key": "lea",
            "title": "LEA-like",
            "value": [ "ccm.load",
              [
                "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
                "https://ccmjs.github.io/eild/er_trainer/resources/lea-like.css"
              ]
            ]
          }
        },
        "user": {
          "guest": {
            "key": "guest",
            "title": "Guest Mode",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
          },
          "cloud": {
            "key": "cloud",
            "title": "Digital Makerspace Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
          },
          "hbrsinfkaul": {
            "key": "hbrsinfkaul",
            "title": "H-BRS FB02 Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
          },
          "hbrsinfpseudo": {
            "key": "hbrsinfpseudo",
            "title": "H-BRS FB02 Account with Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
          },
          "pseudo": {
            "key": "pseudo",
            "title": "One-time Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
          }
        }
      },
      "libs": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          [  // parallel
            "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js",
            [  // serial
              "https://ccmjs.github.io/akless-components/libs/selectize-0/selectize.min.js",
              [  // parallel
                "https://ccmjs.github.io/akless-components/libs/selectize-0/remove_button-plugin.min.js",
                [  // serial
                  "https://ccmjs.github.io/akless-components/libs/jquery-ui-1/jquery-ui-sortable.min.js",
                  "https://ccmjs.github.io/akless-components/libs/selectize-0/drag_drop-plugin.min.js"
                ]
              ]
            ]
          ]
        ]
      ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "preview": "Preview",
  //  "onfinish": { "restart": true },
      "results": { "store": { "name": "er_trainer-results" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
      "shadow": "none",
      "submit": "Submit",
      "tool": [ "ccm.component", "https://ccmjs.github.io/eild/er_trainer/versions/ccm.er_trainer-1.0.0.js" ]
    },

    Instance: function () {
      let $, dataset; const self = this;

      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      this.start = async () => {

        // get initial app configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        dataset = await adjustDataset( await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) ) );

        this.logger && this.logger.log( 'start', $.clone( dataset ) );   // logging of 'start' event
        this.render( dataset );                                          // render main HTML template
        jQuery( '[data-toggle=popover]' ).popover();                     // initialize popovers for info icons
        selectize( '#erb-text-selection', dataset.text.selection, '' );  // initialize input field for selectize

        // listen to change events of the input fields
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render( dataset = this.getValue() ) ) );

        // update app preview in modal dialog
        jQuery( '#erb-preview' ).on( 'show.bs.modal', () => this.tool.start( Object.assign( this.getValue(), { root: this.element.querySelector( '#erb-preview-body' ) } ) ) );

        // listen to submit event of the main HTML form
        this.submit && this.element.querySelector( '#erb-main-form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const config = this.getValue();                                 // get result data
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        } );

        // listen to submit event of the HTML form for adding a notation
        this.element.querySelector( '#erb-notation-form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const form = this.element.querySelector( '#erb-notation-form' );
          const notation = $.formData( form );
          notation.key = notation.title.toLowerCase().trim().replace( /\W/g, '-' );
          dataset.notations[ notation.key ] = notation;
          jQuery( '#erb-add-notation' ).modal( 'hide' );
          form.reset();
          this.render( dataset );
        } );

        // listen to submit event of the HTML form for adding a phrase
        this.element.querySelector( '#erb-phrase-form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const form = this.element.querySelector( '#erb-phrase-form' );
          const phrase = $.formData( form );
          phrase.key = $.generateKey();
          dataset.phrases[ phrase.key ] = phrase;
          jQuery( '#erb-add-phrase' ).modal( 'hide' );
          form.reset();
          this.render( dataset );
        } );

      };

      /**
       * renders the main HTML template
       * @param {Object} [config = this.getValue()] - app configuration
       */
      this.render = ( config = this.getValue() ) => {
        this.html.render( this.html.main( config, this, onDeleteNotation, onResetNotations, onDeletePhrase ), this.element );
      }

      /**
       * returns current result data
       * @returns {Object} app configuration
       */
      this.getValue = () => {
        const config = $.formData( this.element.querySelector( '#erb-main-form' ) );
        config.css = this.ignore.css[ config.css ].value;
        config.default = Object.assign( dataset.default, config.default );
        config.values = dataset.values;
        if ( !config.finish ) config.onfinish = ''; delete config.finish;
        if ( !config.onfinish ) return config;
        const key = this.results.key || dataset.key || $.generateKey();
        switch ( config.store ) {
          case 'collective': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key }; break;
          case 'user': config.onfinish.store = true; config.data = { store: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, permissions: this.results.permissions }; break;
          case 'unique': config.onfinish.login = true; config.onfinish.store = { settings: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, unique: true, permissions: this.results.permissions }; config.data = ''; break;
          default: config.data = '';
        }
        if ( !config.store || config.store === 'collective' ) config.user = '';
        delete config.store;
        if ( config.user ) config.user = this.ignore.user[ config.user ].value;
        switch ( config.render ) {
          case 'clear': config.onfinish.clear = true; break;
          case 'restart': config.onfinish.restart = true; break;
          case 'app':
            config.onfinish.render = {};
            if ( config.app ) {
              config.onfinish.render = $.decomposeEmbedCode( config.app );
              config.onfinish.render.config = [ 'ccm.get', config.onfinish.render.config.store, config.onfinish.render.config.key ];
            }
            break;
        }
        delete config.render;
        delete config.app;
        return config;
      };

      /**
       * prepares an input field for selectize
       * @param {string} selector - selector to select the input field
       * @param {string[]} items - initial selected items
       * @param {string} placeholder - placeholder of the input field
       */
      const selectize = ( selector, items, placeholder ) => {
        jQuery( this.element.querySelector( selector ) ).selectize( {
          create: true,
          items: items,
          labelField: 'value',
          options: items && items.map( item => { return { value: item } } ),
          placeholder: placeholder,
          plugins: [ 'drag_drop', 'remove_button' ]
        } );
      };

      /**
       * adjusts notations and phrases data
       * @param {Object} config
       * @returns {Promise<Object>}
       */
      const adjustDataset = async config => {
        config.notations = $.clone( config.notations );
        for ( const key in config.notations ) {
          const notation = config.notations[ key ];
          if ( !notation.images )
            notation.images = config.default.images.map( image => image.includes( '.' ) ? image : ( notation.path || config.default.path ) + notation.key + '/' + image + '.' + ( notation.format || config.default.format ) );
        }
        config.phrases = $.clone( await $.solveDependency( config.phrases ) );
        if ( Array.isArray( config.phrases ) ) {
          const phrases = {};
          config.phrases.forEach( phrase => {
            phrase.key = phrase.key || $.generateKey();
            phrases[ phrase.key ] = phrase;
          } );
          config.phrases = phrases;
        }
        return config;
      }

      /** when 'delete' button of a notation is clicked */
      function onDeleteNotation() {
        delete dataset.notations[ this.dataset.key ];
        self.render( dataset );
      }

      /** when 'reset' button for notations is clicked */
      async function onResetNotations() {
        dataset.notations = self.tool.config.notations;
        await adjustDataset( dataset );
        self.render( dataset );
      }

      /** when 'delete' button of a phrase is clicked */
      function onDeletePhrase() {
        delete dataset.phrases[ this.dataset.key ];
        self.render( dataset );
      }

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();