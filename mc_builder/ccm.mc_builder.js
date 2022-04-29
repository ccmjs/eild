/**
 * @overview ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version latest (2.0.0)
 * @changes
 * version 2.0.0 (28.04.2022):
 * - uses ccmjs v27.3.1 as default
 * - uses helper.mjs v8.2.0 as default
 * - uses ccm.mc.js v1.1.0 as default
 * - added optional multilingualism
 * - added optional dark mode
 * - added header with language selection and login/logout button
 * - uses Bootstrap 5 as default
 * - no editable texts and labels, instead selectable language: german, english or multilingual
 * - no editable finish actions, instead enable/disable save of anonym results
 * - resulting app restarts after finish
 * - questions and answers can be move up or down via button
 * - added checkbox for optional retry button
 * - replace checkbox for HTML escape with checkbox for evaluate HTML
 * (for older version changes see ccm.mc_builder-1.0.0.js)
 */

( () => {
  const component = {
    name: 'mc_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.3.1.min.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-dark.min.css",
          "https://ccmjs.github.io/eild/mc_builder/resources/styles.min.css"
        ],
        "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-icons.min.css",
        { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" },
      ],
//    "dark": "auto",
//    "data": { "store": [ "ccm.store" ] },
      "editor": [ "ccm.component", "https://ccmjs.github.io/akless-components/quill/versions/ccm.quill-2.0.0.min.js", {
        "options": {
          "modules": {
            "toolbar": [
              [ "bold", "italic", "underline", "strike" ],
              [ { "color": [] }, { "background": [] } ],
              [ { "script": "sub" }, { "script": "super" } ],
              [ "link" ]
            ]
          },
          "theme": "snow"
        }
      } ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.2.0.min.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/mc_builder/resources/templates-v2.mjs" ],
      "ignore": {
        "defaults": {},
        "de": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.mjs#de" ],
        "en": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.mjs#en" ],
        "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
          "translations": {
            "de": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.mjs#de" ],
            "en": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.mjs#en" ]
          }
        } ]
      },
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
      "libs": [ "ccm.load", "https://ccmjs.github.io/eild/libs/bootstrap-5/js/bootstrap.bundle.min.js" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.min.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.min.js", "greedy" ] ],
//    "onfinish": { "restart": true },
//    "preview": true,
//    "results": { "store": { "name": "mc-results" } },
      "shadow": "none",
      "text": [ "ccm.load", "https://ccmjs.github.io/eild/mc_builder/resources/resources.mjs#en" ],
      "tool": [ "ccm.component", "https://ccmjs.github.io/eild/mc/versions/ccm.mc-1.1.0.min.js" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * resulting multiple choice configuration
       * @type {Object}
       */
      let mc_config;

      /**
       * modal dialog
       * @type {Element}
       */
      let modal;

      /**
       * WYSIWYG online text editor to edit the text of a question
       * @type {Object}
       */
      let editor;

      /**
       * main HTML form
       * @type {Element}
       */
      let form;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        this.element.classList.add( this.component.name );                         // add HTML class as prefix for CSS rules
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event

        // setup dark mode
        this.dark === 'auto' && this.element.classList.add( 'dark_auto' );
        this.dark === true && this.element.classList.add( 'dark_mode' );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // get initial multiple choice configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        mc_config = await adjustDataset( await $.integrate( await $.dataset( this.data ), await $.integrate( this.ignore.defaults, this.tool.config ) ) );

        this.logger && this.logger.log( 'start', $.clone( mc_config ) );                      // logging of 'start' event
        this.render( mc_config );                                                             // render webpage area
        form = this.element.querySelector( '#element.' + this.component.name + ' > form' );   // remember main HTML form
        modal = this.element.querySelector( '#edit' );                                        // remember modal dialog
        modal.addEventListener( 'hidden.bs.modal', events.onClose );                          // add event listener for closing the modal dialog

        // render language selection and user login/logout button
        this.lang && !this.lang.getContext() && $.append( this.element.querySelector( 'header' ), this.lang.root );
        this.user && $.append( this.element.querySelector( 'header' ), this.user.root );

        // listen to change events of the input fields => update webpage area
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render( mc_config = this.getValue() ) ) );

        // listen to submit event of the main HTML form
        this.text.submit && form.addEventListener( 'submit', event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting multiple choice configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        } );

      };

      /**
       * renders the webpage area
       * @param {Object} [mc_config = this.getValue()] - initial multiple choice configuration
       */
      this.render = ( mc_config = this.getValue() ) => {
        this.html.render( this.html.main( $.clone( mc_config ), this, events ), this.element );
        this.lang && this.lang.translate();
      };

      /**
       * returns current resulting multiple choice configuration
       * @returns {Object} current resulting multiple choice configuration
       */
      this.getValue = () => {
        const config = Object.assign( {}, mc_config, $.formData( form ) );
        config.escape = !config.escape;
        if ( config.lang === 'multi' )
          config.lang = this.ignore.lang;
        else {
          config.text = this.ignore[ config.lang ];
          config.lang = '';
        }
        if ( config.save ) {
          if ( !config.onfinish ) config.onfinish = {};
          config.onfinish.store = {
            settings: this.results,
            key: ( config.onfinish && config.onfinish.key || this.key || $.generateKey() ),
            unique: true
          };
        }
        else
          config.onfinish.store = false;
        delete config.save;
        return config;
      };

      /**
       * adjusts initial questions data
       * @param {Object} mc_config - initial multiple choice configuration
       * @returns {Promise<Object>}
       */
      const adjustDataset = async mc_config => {

        // load and clone questions data
        mc_config.questions = $.clone( await $.solveDependency( mc_config.questions ) );

        // transform questions data and answers data from array to object
        if ( Array.isArray( mc_config.questions ) ) {
          const questions = {};
          mc_config.questions.forEach( question => {
            question.key = question.key || $.generateKey();
            questions[ question.key ] = question;
            const answers = {};
            question.answers.forEach( answer => {
              answer.key = answer.key || $.generateKey();
              answers[ answer.key ] = answer;
            } );
            question.answers = answers;
          } );
          mc_config.questions = questions;
        }

        return mc_config;
      };

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when 'add' button for a question or an answer is clicked
         * @param {string} [question_key] - unique key of the question (only when adding an answer)
         */
        onAdd: question_key => {
          const key = $.generateKey();
          if ( question_key )
            mc_config.questions[ question_key ].answers[ key ] = {
              key: key,
              solution: false,
              text: ''
            };
          else
            mc_config.questions[ key ] = {
              key: key,
              answers: {},
              text: ''
            };
          this.render( mc_config );
        },

        /** when modal dialog for text edit is closed */
        onClose: () => {
          const answer_key = modal.dataset.answer;
          const question = mc_config.questions[ modal.dataset.question ];
          const text = editor.getValue().value;
          if ( answer_key )
            question.answers[ answer_key ].text = text;
          else
            question.text = text;
          this.render( mc_config );
        },

        /**
         * when 'delete' button of a question or an answer is clicked
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key] - unique key of the answer
         */
        onDelete: ( question_key, answer_key ) => {
          if ( answer_key )
            delete mc_config.questions[ question_key ].answers[ answer_key ];
          else
            delete mc_config.questions[ question_key ];
          this.render( mc_config );
        },

        /**
         * shows modal dialog with a WYSIWYG online text editor to edit the text of a question or an answer
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key = ''] - unique key of the answer
         */
        onEdit: async ( question_key, answer_key = '' ) => {
          const question = mc_config.questions[ question_key ];
          editor = await this.editor.start( {
            data: { value: answer_key ? question.answers[ answer_key ].text : question.text },
            html: true,
            root: this.element.querySelector( '#edit .modal-content' )
          } );
          modal.dataset.question = question_key;
          modal.dataset.answer = answer_key;
        },

        /** exports the questions and answers as CSV file */
        onExportQuestions: () => {
          let result = '';
          const questions = Object.values( this.getValue().questions );
          questions.forEach( question => {
            result += question.text + ';\r\n'
            const answers = Object.values( question.answers );
            answers.forEach( answer => result += ( answer.solution ? '1' : '0' ) + ';' + answer.text + '\r\n' );
            result += ';\r\n';
          } );
          result = result.slice( 0, -2 );
          window.open( encodeURI( 'data:text/csv;charset=utf-8,\uFEFF' + result ) );
        },

        /** reads the CSV file and extracts contained questions and answers */
        onFileSelected: event => {
          const reader = new FileReader();
          reader.onload = () => {
            let data = reader.result;
            data = data.split( '\n' );
            const questions = {};
            const readQuestion = () => {
              const question = {
                key: $.generateKey(),
                text: data.shift().split( ';' )[ 0 ],
                answers: {}
              };
              if ( question.text.startsWith( '"' ) )
                question.text = question.text.substring( 1, question.text.lastIndexOf( '"' ) ).replaceAll( '""', '"' );
              question.text = question.text.trim();
              while ( data.length && !data[ 0 ].startsWith( ';' ) )
                readAnswer( question );
              questions[ question.key ] = question;
              data.shift();
            };
            const readAnswer = question => {
              let answer = data.shift().split( ';' );
              answer = {
                key: $.generateKey(),
                solution: answer[ 0 ] === '1',
                text: answer[ 1 ]
              };
              if ( answer.text.startsWith( '"' ) )
                answer.text = answer.text.substring( 1, answer.text.lastIndexOf( '"' ) ).replaceAll( '""', '"' );
              answer.text = answer.text.trim();
              question.answers[ answer.key ] = answer;
            };
            while ( data.length && !data[ 0 ].startsWith( ';' ) )
              readQuestion();
            mc_config.questions = questions;
            this.render( mc_config );
          };
          reader.readAsText( event.target.files[ 0 ], 'UTF-8' );
        },

        /** imports questions from a CSV file */
        onImportQuestions: () => this.element.querySelector( 'input[type=file]' ).click(),

        /**
         * moves a question or an answer one position up
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key] - unique key of the answer
         */
        onMoveUp: ( question_key, answer_key ) => {
          if ( !answer_key )
            move( mc_config, 'questions', question_key, true );
          else
            move( mc_config.questions[ question_key ], 'answers', answer_key, true );
          this.render( mc_config );
        },

        /**
         * moves a question or an answer one position down
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key] - unique key of the answer
         */
        onMoveDown: ( question_key, answer_key ) => {
          if ( !answer_key )
            move( mc_config, 'questions', question_key, false );
          else
            move( mc_config.questions[ question_key ], 'answers', answer_key, false );
          this.render( mc_config );
        },

        /**
         * shows the preview in the modal dialog for multiple choice preview
         * @param {Object} [config = this.getValue()] - multiple choice configuration
         */
        onShowPreview: ( config = this.getValue() ) => {
          const modal_body = this.element.querySelector( '#preview .modal-content' );
          modal_body.innerHTML = this.html.spinner;
          this.tool.start( Object.assign( config, { root: modal_body } ) );
        },

        /**
         * when 'show' button of a question is clicked
         * @param {string} question_key - unique key of the question
         */
        onShowQuestion: question_key => {
          const config = this.getValue();
          Object.assign( config, {
            data: {},
            feedback: true,
            logger: '',
            number: '',
            onfinish: { restart: true },
            questions: [ config.questions[ question_key ] ],
            retry: '',
            shuffle: '',
            user: ''
          } );
          events.onShowPreview( config );
        },

        /**
         * switches whether an answer is correct or wrong
         * @param {string} question_key - unique key of the question
         * @param {string} answer_key - unique key of the answer
         */
        onSwitch: ( question_key, answer_key ) => {
          const answer = mc_config.questions[ question_key ].answers[ answer_key ];
          answer.solution = !answer.solution;
          this.render( mc_config );
        }

      };

      /**
       * moves a value in an object one position up or down
       * @param {Object} parent - object that contains the object with the value
       * @param {string} prop - index under which the parent contains the object
       * @param {string} key - index under which the object contains the value
       * @param {boolean} up_down - true: up, false: down
       */
      function move( parent, prop, key, up_down ) {
        const obj = parent[ prop ];
        const values = Object.values( obj );
        const i = values.findIndex( value => value === obj[ key ] );
        if ( up_down ? i <= 0 : i >= values.length - 1 ) return;
        let tmp = values[ i ];
        const j = up_down ? i - 1 : i + 1;
        values[ i ] = values[ j ];
        values[ j ] = tmp;
        parent[ prop ] = $.arrToObj( values );
      }

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();