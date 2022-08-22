'use strict';

/**
 * @overview <i>ccmjs</i>-based web component for ER model to relational scheme training.
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version 2.0.0
 * @changes
 * version 2.0.0 (22.08.2022)
 * - uses ccmjs v27.4.0 as default
 * - uses helper.mjs v8.4.0 as default
 * - uses ccm.modal.js v3.2.0 as default
 * - default notation is 'abrial'
 * - updated default phrases
 * - added support for recursive binary relations
 * - added support for generalisation/specialisation
 * - added support for n-ary relations with up to 4 entities
 * - added optional 'anytime_finish'
 * - added optional 'auto_arrows'
 * - added optional 'auto_pk'
 * - added optional 'fixed_notation'
 * - added optional 'hide_own_fk'
 * - added optional 'show_solution'
 * - added optional 'skip'
 * - added optional multilingualism
 * - added optional user authentication
 * - updated feedback comments
 * - feedback comments are separated in 3 groups and each group can be disabled
 * - removed optional logger
 * - updated callbacks in config
 * (for older version changes see ccm.er_rel_trainer-1.0.0.js)
 */

( () => {

  /**
   * Component for ER model to relational scheme training.
   * @type {object}
   * @property {string} name - Unique identifier of the component
   * @property {number[]} [version] - Version of the component according to Semantic Versioning 2.0 (default: latest version)
   * @property {string} ccm - URL of the (interchangeable) ccmjs version used at the time of publication
   * @property {config} config - Default instance configuration
   * @property {Class} Instance - Class from which component instances (app instances) are created.
   */
  const component = {
    name: 'er_rel_trainer',
    version: [ 2, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-27.4.0.min.js',
    config: {
//    "anytime_finish": true,
//    "auto_arrows": true,
//    "auto_pk": true,
      "comments": {
        "input": true,
        "wrong": true,
        "correct": true
      },
      "correction": true,
      "css": [ "ccm.load",
        [  // is loaded serially (not in parallel)
          "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_rel_trainer/resources/styles-v2.min.css"
        ],
        { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r", "s" ],
        "notation": "abrial",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "feedback": true,
//    "fixed_notation": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-8.4.0.min.mjs" ],
//    "hide_own_fk": true,
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_rel_trainer/resources/templates-v2.mjs" ],
//    "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js" ],
      "legend": true,
      "modal": {
        "attr": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.2.0.min.js", {
          "backdrop_close": true,
          "breakpoints": false,
          "buttons": [],
          "closed": true,
          "content": "",
          "css": [ "ccm.load",
            [  // serial
              "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap.min.css",
              "https://ccmjs.github.io/eild/er_rel_trainer/resources/modal.min.css"
            ],
            { "url": "https://ccmjs.github.io/eild/libs/bootstrap-5/css/bootstrap-fonts.min.css", "context": "head" }
          ]
        } ],
        "legend": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.2.0.min.js", {
          "backdrop_close": true,
          "buttons": "",
          "closed": true,
          "content": ""
        } ]
      },
      "notations": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources-v4.mjs#notations" ],
//    "number": 5,
//    "onchange": event => console.log( event ),
      "onfinish": { "restart": true },
//    "onready": event => console.log( event ),
//    "onstart": event => console.log( event ),
      "phrases": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources-v4.mjs#phrases" ],
      "show_solution": true,
      "shuffle": true,
      "skip": true,
      "text": [ "ccm.load", "https://ccmjs.github.io/eild/er_rel_trainer/resources/resources.mjs#en" ],
//    "user": [ "ccm.start", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.min.js" ]
    },
    Instance: function () {

      /**
       * Shortcut to helper functions
       * @private
       * @type {Object.<string,function>}
       */
      let $;

      /**
       * App state data
       * @private
       * @type {app_state}
       */
      let data;

      /**
       * When the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready. Allows dynamic post-configuration of the instance.
       * @async
       * @readonly
       * @function
       */
      this.init = async () => {

        // Merge all helper functions and offer them via a single variable.
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // Are the phrases given as an associative field? => Convert the phrases to an array.
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases );

        // By default, all phrases are asked.
        if ( !this.number ) this.number = this.phrases.length;

        // Unify notations data
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

        // Has modal dialog instance for notation legend? => Set title of modal dialog
        if ( this.modal && this.modal.legend ) this.modal.legend.title = `<span data-lang="legend">${ this.text.legend }</span>`;

        // Update the table schema when closing the modal dialog for editing table attributes.
        this.modal.attr.onclose = () => render();

      };

      /**
       * When the instance is created and after all dependent sub-instances are initialized and ready. Allows the first official actions of the instance that should only happen once.
       * @async
       * @readonly
       * @function
       */
      this.ready = async () => {

        // Set content of modal dialog for legend of ER diagram notations.
        this.modal.legend && this.html.render( this.html.legend( this ), this.modal.legend.element.querySelector( 'main' ) );

        // Trigger 'ready' event
        this.onready && await this.onready( { instance: this } );

      };

      /**
       * Starts the app. The current app state is visualized in the webpage area.
       * @async
       * @readonly
       * @function
       */
      this.start = async () => {

        // Load app state data from source.
        data = await $.dataset( this.data );

        // Set initial app state data.
        const initial = {
          correct: 0,
          notation: data.notation || this.default.notation,
          phrases: null,
          results: []
        };

        // All phrases are finished? => Restart with initial state.
        if ( !data.results || !data.phrases || data.results.length >= data.phrases.length ) data = initial;

        // Restart from initial state?
        if ( !data.phrases ) {
          data.phrases = $.clone( this.phrases );               // Clone all original phrases.
          this.shuffle && $.shuffleArray( data.phrases );       // Phrases need to be mixed? => Shuffle phrases
          data.phrases = data.phrases.slice( 0, this.number );  // Use only required number of phrases.
        }

        // Render current phrase
        nextPhrase();

        // Render language selection and user login/logout area.
        const aside = this.element.querySelector( 'aside' );
        if ( aside ) {
          this.lang && !this.lang.getContext() && $.append( aside, this.lang.root );
          this.user && $.append( aside, this.user.root );
        }

        // Trigger 'start' event
        this.onstart && await this.onstart( { instance: this } );

      };

      /**
       * Returns the current app state.
       * @readonly
       * @function
       * @returns {app_state} A deep copy of the app state data.
       */
      this.getValue = () => $.clone( data );

      /**
       * Contains all event handlers.
       * @readonly
       * @type {Object.<string,function>}
       */
      this.events = {

        /**
         * When the notation used in the ER diagram is switched.
         * @function
         * @param {string} value - ID of the selected notation.
         * @param {boolean} [show_solution] - correct solution is revealed
         */
        onNotation: ( value, show_solution ) => {

          // In the case of n-ary relationships, it is not possible to switch to a reverse-reading notation.
          if ( data.phrases[ data.results.length - 1 ].entities.length > 2 && this.notations[ value ].swap ) return;

          // Change notation in app state data
          data.notation = value;

          // Show ER diagram in new notation
          render( show_solution );

          // Trigger 'change' event because of notation change
          this.onchange && this.onchange( { event: 'notation', instance: this } );

        },

        /**
         * When the button to show the notation legend is clicked.
         * @function
         */
        onLegend: () => {
          this.modal.legend.open();                                               // Open modal dialog for notation legend
          this.lang && this.lang.translate( this.modal.legend.element );          // Is multilingual app? => Translate content of modal dialog
          this.onchange && this.onchange( { event: 'legend', instance: this } );  // Trigger the 'change' event for calling the notation legend.
        },

        /**
         * When the button to add a table is clicked.
         * @function
         * @param {table_nr} nr - table number
         */
        onAddTable: nr => {

          // Get result data of current phrase
          const result_data = data.results[ data.results.length - 1 ];

          // A table cannot be created during the feedback.
          if ( result_data.solution ) return;

          // Create an empty table without any key attributes.
          result_data.input[ nr ] = Array( data.phrases[ data.results.length - 1 ].entities.length + 1 ).fill( 0 );

          // Should an artificial primary key be created automatically? => Add artificial primary key
          if ( this.auto_pk ) result_data.input[ nr ][ nr ] = 6;  // 6 = 4 (0100b => PK) + 2 (0010b => NOT NULL)

          // Open modal dialog for editing table attributes
          this.events.onEditTable( nr );

        },

        /**
         * When the button for editing the table attributes is clicked.
         * @function
         * @param {table_nr} nr - table number
         */
        onEditTable: nr => {

          // Table attributes can't be edited during the feedback.
          if ( data.results[ data.results.length - 1 ].solution ) return;

          // Set content of modal dialog for title, body and footer
          this.html.render( this.html.tableDialogTitle( this, nr ), this.modal.attr.element.querySelector( '#title' ) );
          this.html.render( this.html.tableDialogBody( this, nr ), this.modal.attr.element.querySelector( 'main' ) );
          this.html.render( this.html.tableDialogFooter( this ), this.modal.attr.element.querySelector( 'footer' ) );

          this.lang && this.lang.translate( this.modal.attr.element );  // Is multilingual app? => Translate content of modal dialog
          this.modal.attr.open();                                       // Open modal dialog for editing table attributes

        },

        /**
         * When the button for removing a table is clicked.
         * @function
         * @param {table_nr} nr - Table number
         */
        onRemoveTable: nr => {

          const result_data = data.results[ data.results.length - 1 ];  // Get result data of current phrase
          if ( result_data.solution ) return;                           // A table can't be removed during the feedback.
          result_data.input[ nr ] = null;                         // Remove table in app state data

          // Remove all arrowheads on the table in app state data.
          result_data.input.forEach( table => table && ( table[ nr ] &= ~15872 ) );  // 15872 = (0011 1110 0000 0000b => arrow heads for FK0-FK4)

          render();  // Remove table in webpage area

        },

        /**
         * When a badge of a key attribute is clicked.
         * @function
         * @param {table_nr} table - Table number
         * @param {table_nr} attr - Table that references the attribute as a foreign key.
         * @param {number} badge_nr - 0: NULL, 1: NOT NULL, 2: PK, 3: AK, 4: FK0, 5: FK1, 6: FK2, 7: FK3, 8: FK4
         */
        onToggleBadge: ( table, attr, badge_nr ) => {

          const phrase_data = data.phrases[ data.results.length - 1 ];              // Get data of the current phrase.
          const result_data = data.results[ data.results.length - 1 ];              // Get result data of the current phrase.
          const table_state = result_data.input[ table ];                           // Get state data of the table.
          const toggleBit = ( table_data, i, bit ) => table_data[ i ] ^= 1 << bit;  // Toggles a bit of an attribute value.

          // When a foreign key is removed, the associated arrowhead is also removed.
          if ( badge_nr >= 4 && badge_nr <= 8 && table_state[ attr ] & ( 1 << badge_nr ) )
            table_state[ attr ] &= ~( 1 << ( badge_nr + 5 ) );

          toggleBit( table_state, attr, badge_nr );  // Update the attribute value in the state data of the table.
          const value = table_state[ attr ];         // Get updated attribute value

          // A foreign key is changed and arrows should be set automatically? => Toggle the corresponding foreign key arrowhead.
          if ( badge_nr >= 4 && badge_nr <= 8 && this.auto_arrows && !( phrase_data.solution.length === 2 && phrase_data.entities[ 0 ] === phrase_data.entities[ 1 ] && table === 0 && badge_nr === 6 ) )
            toggleBit( table_state, attr, badge_nr + 5 );

          // An attribute cannot be optional (NULL) and mandatory (NOT NULL) at the same time.
          if ( badge_nr === 0 && value & 1 << 1 ) toggleBit( table_state, attr, 1 );
          if ( badge_nr === 1 && value & 1 << 0 ) toggleBit( table_state, attr, 0 );

          // Update the body section of the modal dialog for editing table attributes.
          this.html.render( this.html.tableDialogBody( this, table ), this.modal.attr.element.querySelector( 'main' ) );

        },

        /**
         * When the end point of a connection between two tables is changed via a selector box.
         * @function
         * @param {string} value - The selected value in the selector box ('', 'line' or 'arrow').
         * @param {table_nr} from - Number of the table from which the connection starts.
         * @param {table_nr} to - Number of the table to which the connection goes.
         * @example onArrow( 'arrow', 1, 2 ) // Setting an arrow for the connection from entity table 1 to entity table 2 [E1]->[E2]
         */
        onArrow: ( value, from, to ) => {

          // Get the status data of the table that contains the associated foreign key.
          const table_state = data.results[ data.results.length - 1 ].input[ from ];

          // Set/Unset the arrowhead in the table state data for the appropriate foreign key.
          value === 'arrow' ? table_state[ to ] |= 1 << 9 + to : table_state[ to ] &= ~( 1 << 9 + to );  // 1 << 9-13 => arrow for FK0-FK4

          render();  // Update the changed table connection in the web page area.

        },

        /**
         * When the button is clicked that allows the user to submit a solution.
         * @function
         */
        onSubmit: () => {

          const phrase_data = data.phrases[ data.results.length - 1 ];  // Get data of current phrase
          const result_data = data.results[ data.results.length - 1 ];  // Get result data of current phrase
          if ( result_data.solution ) return;                           // A user's solution can't be submitted during the feedback.

          // Determine what type of relationship is being modeled.
          const is_binary = phrase_data.solution.length === 2;                                        // Binary relationship with two entities.
          const is_recursive = is_binary && phrase_data.entities[ 0 ] === phrase_data.entities[ 1 ];  // Recursive relationship with a single entity.
          const is_multi = !phrase_data.solution.find( value => value !== 'cn' && value !== 'n' );    // N:M relationship with two or more entities.
          const is_hierarchy = !phrase_data.relation;                                                 // Specialization/Generalization

          // Define and determine all possible solutions for the current phrase.
          let solutions;
          if ( is_hierarchy )
            if ( phrase_data.entities.length < 4 )  // Specialization/Generalization with 3 entities (2 sub entities)
              solutions = [
                [ null, [ 0, 6, 0, 0 ], [ 0, 1066, 6, 0 ], [ 0, 1066, 0, 6 ] ],  // E1[PK] E2[PK,AK+FK1] E3[PK,AK+FK1]
                [ null, [ 0, 6, 0, 0 ], [ 0, 1062, 0, 0 ], [ 0, 1062, 0, 0 ] ]   // E1[PK] E2[PK+FK1] E3[PK+FK1]
              ];
            else                                    // Specialization/Generalization with 4 entities (3 sub entities)
              solutions = [
                [ null, [ 0, 6, 0, 0, 0 ], [ 0, 1066, 6, 0, 0 ], [ 0, 1066, 0, 6, 0 ], [ 0, 1066, 0, 0, 6 ] ],  // E1[PK] E2[PK,AK+FK1] E3[PK,AK+FK1] E4[PK,AK+FK1]
                [ null, [ 0, 6, 0, 0, 0 ], [ 0, 1062, 0, 0, 0 ], [ 0, 1062, 0, 0, 0 ], [ 0, 1062, 0, 0, 0 ] ]   // E1[PK] E2[PK+FK1] E3[PK+FK1] E4[PK+FK1]
              ];
          else if ( is_multi ) {
            if ( phrase_data.entities.length === 2 )  // N:M relationship with 2 entities
              if ( is_recursive )
                solutions = [
                  [ [ 0, 1062, 70 ], [ 0, 6, 0 ], null ],  // R[PK+FK1,PK+FK2] E1[PK]
                  [ [ 6, 1066, 74 ], [ 0, 6, 0 ], null ]   // R[PK,AK+FK1,AK+FK2] E1[PK]
                ];
              else
                solutions = [
                  [ [ 0, 1062, 2118 ], [ 0, 6, 0 ], [ 0, 0, 6 ] ],  // R[PK+FK1,PK+FK2] E1[PK] E2[PK]
                  [ [ 6, 1066, 2122 ], [ 0, 6, 0 ], [ 0, 0, 6 ] ]   // R[PK,AK+FK1,AK+FK2] E1[PK] E2[PK]
                ];
            if ( phrase_data.entities.length === 3 )  // N:M relationship with 3 entities
              solutions = [
                [ [ 0, 1062, 2118, 4230 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 0, 0, 0, 6 ] ],  // R[PK+FK1,PK+FK2,PK+FK3] E1[PK] E2[PK] E3[PK]
                [ [ 6, 1066, 2122, 4234 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 0, 0, 0, 6 ] ]   // R[PK,AK+FK1,AK+FK2,AK+FK3] E1[PK] E2[PK] E3[PK]
              ];
            if ( phrase_data.entities.length === 4 )  // N:M relationship with 4 entities
              solutions = [
                [ [ 0, 1062, 2118, 4230, 8454 ], [ 0, 6, 0, 0, 0 ], [ 0, 0, 6, 0, 0 ], [ 0, 0, 0, 6, 0 ], [ 0, 0, 0, 0, 6 ] ],  // R[PK+FK1,PK+FK2,PK+FK3,PK+FK4] E1[PK] E2[PK] E3[PK] E4[PK]
                [ [ 6, 1066, 2122, 4234, 8458 ], [ 0, 6, 0, 0, 0 ], [ 0, 0, 6, 0, 0 ], [ 0, 0, 0, 6, 0 ], [ 0, 0, 0, 0, 6 ] ]   // R[PK,AK+FK1,AK+FK2,AK+FK3,AK+F4] E1[PK] E2[PK] E3[PK] E4[PK]
              ];
          }
          else if ( is_binary ) {

            // Define the possible solutions for all combinations of cardinalities given a binary relationship, excluding N:M relationships.
            solutions = {
              '1': {
                '1': [
                  [ null, [ 0, 6, 2122 ], [ 0, 0, 6 ] ],  // E1[PK,AK+FK2] E2[PK]
                  [ null, [ 0, 0, 2118 ], [ 0, 0, 6 ] ],  // E1[PK+FK2] E2[PK]
                  [ null, [ 0, 6, 0 ], [ 0, 1066, 6 ] ],  // E1[PK] E2[PK,AK+FK1]
                  [ null, [ 0, 6, 0 ], [ 0, 1062, 0 ] ]   // E1[PK] E2[PK+FK1]
                ],
                'c': [
                  [ null, [ 0, 6, 2122 ], [ 0, 0, 6 ] ],  // E1[PK,AK+FK2] E2[PK]
                  [ null, [ 0, 0, 2118 ], [ 0, 0, 6 ] ]   // E1[PK+FK2] E2[PK]
                ],
                'cn': [
                  [ null, [ 0, 6, 2114 ], [ 0, 0, 6 ] ]   // E1[PK,FK2] E2[PK]
                ],
                'n': [
                  [ null, [ 0, 6, 2114 ], [ 0, 0, 6 ] ]   // E1[PK,FK2] E2[PK]
                ]
              },
              'c': {
                '1': [
                  [ null, [ 0, 6, 0 ], [ 0, 1066, 6 ] ],  // E1[PK] E2[PK,AK+FK1]
                  [ null, [ 0, 6, 0 ], [ 0, 1062, 0 ] ]   // E1[PK] E2[PK+FK1]
                ],
                'c': [
                  [ null, [ 0, 6, 2121 ], [ 0, 0, 6 ] ],  // E1[PK,AK+FK2+NULL] E2[PK]
                  [ null, [ 0, 6, 0 ], [ 0, 1065, 6 ] ]   // E1[PK] E2[PK,AK+FK1+NULL]
                ],
                'cn': [
                  [ null, [ 0, 6, 2113 ], [ 0, 0, 6 ] ]   // E1[PK,FK2+NULL] E2[PK]
                ],
                'n': [
                  [ null, [ 0, 6, 2113 ], [ 0, 0, 6 ] ]   // E1[PK,FK2+NULL] E2[PK]
                ]
              },
              'cn': {
                '1': [
                  [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ]   // E1[PK] E2[PK,F1]
                ],
                'c': [
                  [ null, [ 0, 6, 0 ], [ 0, 1057, 6 ] ]   // E1[PK] E2[PK,F1+NULL]
                ]
              },
              'n': {
                '1': [
                  [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ]   // E1[PK] E2[PK,FK1]
                ],
                'c': [
                  [ null, [ 0, 6, 0 ], [ 0, 1057, 6 ] ]   // E1[PK] E2[PK,FK1+NULL]
                ]
              }
            };

            solutions = solutions[ phrase_data.solution[ 0 ] ][ phrase_data.solution[ 1 ] ];  // Select the solutions for the binary relationship to be modeled.
            is_recursive && solutions.forEach( solution => solution[ 2 ] = null );            // In a recursive binary relationship, the second entity table in the solution must be removed.

          }
          else if ( phrase_data.solution.toString() === 'cn,n,1' || phrase_data.solution.toString() === 'n,n,1' )  // N:M:1 relationships.
            solutions = [
              [ null, [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 0, 1058, 2114, 6 ] ],               // E1[PK] E2[PK] E3[PK,FK1,FK2]
              [ [ 0, 1058, 2114, 6 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], null ],               // R[FK1,FK2,PK]
              [ [ 0, 1062, 2118, 4234 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 0, 0, 0, 6 ] ],  // R[PK+FK1,PK+FK2,AK+FK3] E1[PK] E2[PK] E3[PK]
              [ [ 0, 1062, 2118, 0 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 534, 0, 0, 0 ] ],   // R[PK+FK1,PK+FK2] E1[PK] E2[PK] E3[PK+FK0]
              [ [ 0, 1062, 2118, 0 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 538, 0, 0, 6 ] ],   // R[PK+FK1,PK+FK2] E1[PK] E2[PK] E3[PK,AK+FK0]
              [ [ 6, 1066, 2122, 0 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 538, 0, 0, 6 ] ],   // R[PK,AK+FK1,PK,AK+FK2] E1[PK] E2[PK] E3[PK,AK+FK0]
              [ [ 6, 1066, 2122, 0 ], [ 0, 6, 0, 0 ], [ 0, 0, 6, 0 ], [ 534, 0, 0, 0 ] ]    // R[PK,AK+FK1,PK,AK+FK2] E1[PK] E2[PK] E3[PK+FK0]
            ];

          // A user's solution can only be submitted if a correct solution for control could be determined.
          if ( !solutions ) return;

          // Compare the determined possible solutions with the user's solution.
          const solution = solutions.find( solution => JSON.stringify( result_data.input ) === JSON.stringify( solution ) );

          // Note in the phrase's status data whether the user's solution matches one of the possible solutions.
          result_data.correct = !!solution;

          // Note in the phrase status data whether a valid alternative solution was found.
          if ( result_data.correct && result_data.solution !== solutions[ 0 ] ) result_data.alternate_solution = solution;

          // Note the main solution in the status data of the phrase, which the feedback will refer to.
          result_data.solution = solutions[ 0 ];

          // Did the user find a valid solution? => Increase the number of correctly answered phrases in the app state data.
          result_data.correct && data.correct++;

          // Does the user get automated feedback on their solution?
          if ( this.feedback ) {
            this.element.classList.add( result_data.correct ? 'correct' : 'failed' );  // Enable visual feedback in the webpage area.
            render();                                                                   // Refresh the webpage area.
          }

          this.onchange && this.onchange( { event: 'submit', instance: this } );  // Trigger the 'change' event for submitting a solution.
          !this.feedback && this.events.onNext();                                 // No automated feedback? => Switch to the next phrase.

        },

        /**
         * When the button is clicked that allows the user to correct an incorrect solution.
         * @function
         */
        onCorrection: () => {

          const result_data = data.results[ data.results.length - 1 ];  // Get result data of current phrase
          if ( !this.correction || !result_data.solution ) return;      // Check if the user is allowed to correct his solution.

          // Increment the counter for the number of corrections in the phrase state data.
          result_data.correction = result_data.correction ? result_data.correction + 1 : 1;

          delete result_data.correct; delete result_data.solution;                  // Remove the information about the correctness of the solution from the state data of the phrase.
          reset(); render();                                                          // Remove the visual feedback in the webpage area.
          this.onchange && this.onchange( { event: 'correction', instance: this } );  // Trigger the 'change' event because of the correction.

        },

        /**
         * When the button showing the sample solution for the current phrase is clicked.
         * @function
         */
        onSolution: () => {

          if ( !this.show_solution || !data.results[ data.results.length - 1 ].solution ) return;  // Check if the user is allowed to reveal the sample solution.
          render( true );                                                                          // Reveal the sample solution in the webpage area.
          this.onchange && this.onchange( { event: 'solution', instance: this } );                 // Trigger the 'change' event due to the reveal of the sample solution.

        },

        /**
         * When the button that starts the next phrase is clicked.
         * @function
         */
        onNext: () => {

          // Check if the user is allowed to start the next phrase.
          if ( !data.results[ data.results.length - 1 ].solution && !this.skip || data.results.length === this.number ) return;

          reset();       // Remove the visual feedback in the webpage area.
          nextPhrase();  // Switch to the next phrase.

          // Trigger the 'change' event due to the start of the next phrase.
          this.onchange && this.onchange( { event: 'next', instance: this, phrase: data.results.length } );

        },

        /**
         * When the button that finishes the app is clicked.
         * @function
         */
        onFinish: () => {

          // Check if the user is allowed to finish the app.
          if ( !this.onfinish || !data.results[ data.results.length - 1 ].solution && !this.skip || data.results.length < this.number && !this.anytime_finish ) return;

          reset();             // Remove the visual feedback in the webpage area.
          $.onFinish( this );  // Perform finish actions

        }

      };

      /**
       * Starts the next phrase.
       * @private
       * @function
       */
      const nextPhrase = () => {

        // Set initial state data for the new phrase.
        data.results.push( {
          input: Array( data.phrases[ data.results.length ].entities.length + 1 ).fill( null ),
          solution: null
        } );

        // An n-ary relationship should not be displayed in a reverse-reading notation, since the semantics are different there. In this case, a forward-reading notation is used.
        if ( data.phrases[ data.results.length - 1 ].entities.length > 2 && this.notations[ data.notation ].swap )  // Check for an n-ary relationship displayed in a reverse-reading notation.
          data.notation = Object.values( this.notations ).find( notation => !notation.swap ).key;                   // => Switch to a forward-reading notation.

        // Display the new Phrase in the webpage area
        render();

      };

      /**
       * Updates the webpage area with the current app state data.
       * @private
       * @function
       * @param {boolean} [show_solution] - The correct solution should be revealed.
       */
      const render = show_solution => {

        // Update main HTML template
        this.html.render( this.html.main( this, show_solution ), this.element );

        // Multilingual app? => Translate content of webpage area.
        this.lang && this.lang.translate();

      };

      /**
       * Removes the visual feedback in the webpage area.
       * @private
       * @function
       */
      const reset = () => this.element.classList.remove( 'correct', 'failed' );

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();

/**
 * Instance configuration
 * @typedef {object} config
 * @prop {boolean} [anytime_finish] - Finish button is always unlocked. You no longer have to go through all the phrases to use it.
 * @prop {boolean} [auto_arrows] - The arrows between tables are automatically set correctly and haven't to be selected manually.
 * @prop {boolean} [auto_pk] - When creating a table, an artificial primary key is created automatically.
 * @prop {object} [comments] - Show comments to support the user.
 * @prop {boolean} [comments.input] - Show comments during input (hints like "start creating tables" or "start to connect tables").
 * @prop {boolean} [comments.wrong] - Show comments as feedback on an incorrect solution.
 * @prop {boolean} [comments.correct] - Show comments as feedback on a correct solution.
 * @prop {boolean} [correction] - Allows the user to correct an incorrect solution.
 * @prop {array} css - CSS dependencies
 * @prop {object} [data] - Source of app state data
 * @prop {object} [default] - Default notations data
 * @prop {boolean} [feedback] - Show visual feedback and any comments after submitting a solution.
 * @prop {boolean} [fixed_notation] - The notation used in the ER diagram cannot be changed.
 * @prop {array} helper - Dependency on helper functions
 * @prop {boolean} [hide_own_fk] - No foreign key is offered for the table's own main attribute.
 * @prop {array} html - HTML template dependencies
 * @prop {array} [lang] - Dependency on component for multilingualism
 * @prop {boolean} [legend] - Button to display a legend for the different notations in the ER diagram
 * @prop {object} modal - Dependencies on component instances for modal dialogs
 * @prop {array} modal.attr - Modal dialog for editing attributes of a table
 * @prop {array} [modal.legend] - Modal dialog to display a legend for the different notations in the ER diagram
 * @prop {object} notations - Data of the different notations in the ER diagram
 * @prop {number} [number] - Number of phrases to be asked. By default, all phrases are asked.
 * @prop {function} [onchange] - When something changes in the app (notation change, show legend, submit, correction, show solution, next phrase).
 * @prop {function|object} [onfinish] - When the finish button is clicked. Sets the finish actions.
 * @prop {function} [onready] - Is called once before the first start of the app.
 * @prop {function} [onstart] - When the app has finished starting.
 * @prop {object} phrases - Data of the phrases
 * @prop {boolean} [show_solution] - If the user solves the phrase incorrectly, he can reveal a correct solution. After that, the user can no longer correct his input.
 * @prop {boolean} [shuffle] - The phrases are shuffled, so the order in which the phrases are asked is different each time the app is started.
 * @prop {boolean} [skip] - Phrases can be skipped, so that not all phrases have to be answered.
 * @prop {boolean} text - Contains the static texts (e.g. task description, labeling of buttons, hints on feedback)
 * @prop {boolean} [user] - Dependency on component for user authentication
 */

/**
 * App state data
 * @typedef {object} app_state
 * @prop {number} correct - Number of correctly answered phrases
 * @prop {string} notation - Current selected notation (e.g. 'abrial', 'arrow', 'chen', 'crow', 'mc', 'uml')
 * @prop {phrase_data[]} phrases - Phrases used in the order they are queried.
 * @prop {result_data[]} results - Result data of the phrases processed so far.
 * @example
 * {
 *   "correct": 1,
 *   "notation": "abrial",
 *   "phrases": [
 *     {
 *       "text": "Eine Bibliothek möchte die einzelnen Seiten ausgewählter Bücher digitalisieren.",
 *       "entities": [ "Buch", "Seite" ],
 *       "relation": "hat",
 *       "solution": [ "n", "1" ]
 *     },
 *     ...
 *   ]
 *   "results": [
 *     {
 *       "input": [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ],
 *       "correct": true,
 *       "solution": [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ]
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * Phrase data
 * @typedef {object} phrase_data
 * @prop {string} text - Text of the phrase
 * @prop {string[]} entities - Names of the entities
 * @prop {string[]} [roles] - Role names of the entities (useful in recursive relationships)
 * @prop {string} [relation] - Name of the relation between the entities (default: has relation of a generalization/specialization)
 * @prop {string[]} solution - Solution of the phrase ('1': simple, 'c': conditional, 'n': multiple, 'cn': conditional multiple)
 * @example
 * {
 *   "text": "Eine Bibliothek möchte die einzelnen Seiten ausgewählter Bücher digitalisieren.",
 *   "entities": [ "Buch", "Seite" ],
 *   "relation": "hat",
 *   "solution": [ "n", "1" ]
 * }
 */

/**
 * Result data of a phrase
 * @typedef {object} result_data
 * @prop {table_data[]} input - Input data of the tables
 * @prop {boolean} [correct] - Phrase answered correctly
 * @prop {table_data[]} solution - Solution data of the tables (main solution)
 * @prop {table_data[]} [alternate_solution] - Alternate solution found
 * @example
 * {
 *   "correct": true,
 *   "input": [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ],
 *   "solution": [ null, [ 0, 6, 0 ], [ 0, 1058, 6 ] ]
 * }
 */

/**
 * Table data<br>
 * null: not created<br>
 * [0]: ID attribute of relation table<br>
 * [1]: ID attribute of entity 1<br>
 * [2]: ID attribute of entity 2<br>
 * [3]: ID attribute of entity 3<br>
 * [4]: ID attribute of entity 4
 * @typedef {attr_value[]} table_data
 * @example
 * [ 0, 1058, 6 ]
 */

/**
 * Bit mask of a table attribute<br>
 * 0: not set<br>
 * 2^0^=1: is optional (NULL)<br>
 * 2^1^=2: is mandatory (NOT NULL)<br>
 * 2^2^=4: is part of primary key (PK)<br>
 * 2^3^=8: is part of alternate key (AK)<br>
 * 2^4^=16: is part of foreign key to relation table (FK0)<br>
 * 2^5^=32: is part of foreign key to entity 1 (FK1)<br>
 * 2^6^=64: is part of foreign key to entity 2 (FK2)<br>
 * 2^7^=128: is part of foreign key to entity 3 (FK3)<br>
 * 2^8^=256: is part of foreign key to entity 4 (FK4)<br>
 * 2^9^=512: arrow for FK0 is set<br>
 * 2^10^=1024: arrow for FK1 is set<br>
 * 2^11^=2048: arrow for FK2 is set<br>
 * 2^12^=4096: arrow for FK3 is set<br>
 * 2^13^=8192: arrow for FK4 is set
 * @typedef {number} attr_value
 * @example
 * 1058 // = 1024 + 32 + 2
 * // => Foreign key to entity 1 (FK1) with set arrow and NOT NULL
 */

/**
 * number of a relation scheme table (0: extra table, 1-N: entity table 1-N)
 * @typedef {number} table_nr
 *
 */
