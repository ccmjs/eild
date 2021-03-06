/**
 * @overview ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.07.2021)
 */

( () => {
  const component = {
    name: 'er_rel_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_rel_trainer/resources/styles.css"
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
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_rel_trainer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": {
        "attr": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "breakpoints": false,
          "buttons": ""
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
          "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sind andere Notationen besser geeignet."
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
          "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
          "relationship": [ "Topf", "hat", "Deckel" ],
          "solution": [ "1", "c" ]
        },
        {
          "text": "Zu jedem Patienten gibt es eine Patientenakte.",
          "relationship": [ "Patient", "hat", "Patientenakte" ],
          "solution": [ "1", "1" ]
        },
        {
          "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
          "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
          "solution": [ "c", "cn" ]
        },
        {
          "text": "Ein Wald hat Bäume.",
          "relationship": [ "Wald", "hat", "Baum" ],
          "solution": [ "c", "n" ]
        },
        {
          "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
          "relationship": [ "Planet", "hat", "Mond" ],
          "solution": [ "1", "cn" ]
        },
        {
          "text": "Ein Buch hat mehrere Seiten.",
          "relationship": [ "Buch", "hat", "Seite" ],
          "solution": [ "1", "n" ]
        },
        {
          "text": "Kunden kaufen Produkte.",
          "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
          "solution": [ "cn", "cn" ]
        },
        {
          "text": "Auf einem Rezept stehen Zutaten.",
          "relationship": [ "Rezept", "hat", "Zutat" ],
          "solution": [ "cn", "n" ]
        },
        {
          "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
          "relationship": [ "Haus", "hat", "Eigentümer" ],
          "solution": [ "n", "n" ]
        }
      ],
      "retry": true,
      "show_solution": true,
      "shuffle": true,
      "text": {
        "attr_modal_cancel": "Abbrechen",
        "attr_modal_confirm": "Hinzufügen",
        "attr_modal_title": "Neues Schlüsselattribut",
        "attr_name": "Name des Schlüsselattributs",
        "cancel": "Abbrechen",
        "comment": {
          "create_tables": "Hinweis: Legen Sie mit Hilfe der Buttons die nötigen Tabellen an.",
          "add_keys": "Hinweis: Ergänzen Sie in jeder angelegten Tabelle die erforderlichen Schlüsselattribute.",
          "missing_arrow": "Hinweis: Setzen Sie für die Verbindungslinie zwischen zwei Tabellen die Pfeilspitzen, um die Richtung festzulegen, in der die Tabellen miteinander in Beziehung stehen.",
          "missing_entity_table": "Hinweis: Für jede der beiden Entitäten muss eine Tabelle erstellt werden.",
          "missing_entity_pk": "Hinweis: Jede der beiden Entitätstabelle benötigt einen Primärschlüssel.",
          "no_nm_table": "Hinweis: Die mittlere \"%middle%\"-Tabelle wird nur bei einer N:M-Beziehung benötigt.",
          "missing_nm_table": "Hinweis: Da es sich um eine N:M-Beziehung handelt, wird eine \"%middle%\"-Tabelle benötigt.",
          "missing_nm_fk": "Hinweis: Die \"%middle%\"-Tabelle benötigt zwei Fremdschlüssel die jeweils auf eine der beiden Entitätstabellen verweisen.",
          "missing_nm_pk": "Hinweis: Damit jede Kombination aus \"%fk%\" und \"%nofk%\" nur einmal vorkommen kann, müssen in der \"%middle%\"-Tabelle die beiden Fremdschlüssel einen zusammengesetzten Primärschlüssel bilden.",
          "missing_11_fk": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über exakt identische Kardinalitäten verfügen, wird ein Fremdschlüssel bei der Hauptentität (hier \"%fk%\") hinzugefügt. Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.",
          "missing_1c_fk": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über unterschiedliche Kardinalitäten verfügen, wird der Fremdschlüssel bei der schwächeren Entität (hier \"%fk%\") hinzugefügt. Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.",
          "missing_1n_fk": "Hinweis: Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier \"%fk%\") hinzugefügt. Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.",
          "missing_11_unique": "Hinweis: Bei einer 1:1-Beziehung muss der Fremdschlüssel eindeutig sein, damit nicht mehrere Datensätze von \"%fk%\" über den Fremdschlüssel auf denselben \"%nofk%\"-Datensatz verweisen können.",
          "missing_opt": "Hinweis: Da ein \"%fk%\"-Datensatz auch keinen zugehörigen \"%nofk%\"-Datensatz haben kann, muss der Fremdschlüssel optional sein.",
          "missing_arrowhead": "Hinweis: Da der Fremdschlüssel bei \"%fk%\" gesetzt ist und auf \"%nofk%\" verweist, geht der Pfeil von \"%fk%\" nach \"%nofk%\".",
          "missing_arrowhead_nm": "Hinweis: Da die beiden Fremdschlüssel der \"%middle%\"-Tabelle auf die beiden äußeren Tabellen \"%fk%\" und \"%nofk%\" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.",
          "mandatory_11": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem kein \"%fk%\"-Datensatz existiert, der über den Fremdschlüssel auf den \"%nofk%\"-Datensatz verweist. Das es zu jedem \"%nofk%\"-Datensatz immer genau einen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
          "mandatory_1n": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem kein \"%fk%\"-Datensatz existiert, der über den Fremdschlüssel auf den \"%nofk%\"-Datensatz verweist. Das es zu jedem \"%nofk%\"-Datensatz immer mindestens einen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
          "mandatory_nm": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem in der \"%middle%\"-Tabelle kein Datensatz existiert, der dem \"%nofk%\"-Datensatz einen \"%fk%\"-Datensatz zuordnet. Das es zu jedem \"%nofk%\"-Datensatz immer mindestens einen zugehörigen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
          "merge_11": "Anmerkung: In der Praxis werden 1:1-Beziehungen häufig zu einer Tabelle zusammengefasst."
        },
        "comment_prefix": "Richtig! Hier noch ein paar ergänzende Hinweise:",
        "correct": "Ihre Antwort war richtig!",
        "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "fk": "Fremdschlüssel",
        "fk_badge": "Fremdschlüssel: Attribut das auf einen Datensatz einer anderen Tabelle verweist.",
        "fk_input": "Geben Sie hier an, ob der Schlüssel ein Fremdschlüssel ist.",
        "heading": "Gegeben ist ein ER-Diagramm, das eine binäre Beziehung zwischen zwei Entitäten zeigt. Ihre Aufgabe ist es das ER-Diagramm in ein logisches relationales Schema zu überführen und dafür die nötigen Tabellen anzulegen, darin die erforderlichen Schlüsselattribute zu ergänzen und die Richtung festzulegen, in der die Tabellen miteinander in Beziehung stehen.",
        "key_attr": "Schlüsselattribut",
        "legend": "Legende",
        "multi_pk_badge": "Zusammengesetzter Primärschlüssel: Attribute mit denen sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.",
        "next": "Weiter",
        "notation": "ER-Notation:",
        "opt": "Optional",
        "opt_badge": "Optionales Attribut: Muss nicht zwingend einen Wert haben.",
        "opt_input": "Geben Sie hier an, ob es sich bei dem Fremdschlüssel um ein optionales Attribut handelt.",
        "phrase": "Phrase [%%]:",
        "pk": "Primärschlüssel",
        "pk_badge": "Primärschlüssel: Attribut mit dem sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.",
        "pk_input": "Geben Sie hier an, ob der Schlüssel ein Primärschlüssel ist bzw. zum zusammengesetzten Primärschlüssel gehört.",
        "ref_table": "Referenzierte Tabelle:",
        "ref_table_input": "Geben Sie hier an auf welche Tabelle der Fremdschlüssel verweist.",
        "remove_attr": "Schlüsselattribut entfernen",
        "retry": "Korrigieren",
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "show_feedback": "Zeige Feedback",
        "show_solution": "Zeige Lösung",
        "submit": "Antworten",
        "table": "-Tabelle",
        "title": "ER-REL-Trainer"
      },
      "values": [ "1", "c", "n", "cn" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * current app state data
       * @type {Object}
       */
      let data;

      /**
       * current phrase number
       * @type {number}
       */
      let phrase_nr;

      /**
       * data of used phrases in final order
       * @type {Object[]}
       */
      let phrases;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title and buttons for modal dialogs
        this.modal.legend.title = this.text.legend;
        this.modal.attr.title = this.text.attr_modal_title;
        this.modal.attr.buttons = [
          { html: `<button class="btn btn-secondary" data-close>${ this.text.attr_modal_cancel }</button>` },
          { html: `<input type="submit" class="btn btn-primary" form="attr-form" value="${ this.text.attr_modal_confirm }">` }
        ];

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

        // phrases given as associative array? => convert phrases to simple array
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases );

        // remove phrases with entities of the same name (prevent recursive entity relationships) and remove key of each phrase
        this.phrases = this.phrases.filter( phrase => { delete phrase.key; return phrase.relationship[ 0 ] !== phrase.relationship[ 2 ]; } );

      };

      /**
       * when the instance is created after all dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        phrases = $.clone( this.phrases );                                     // clone original phrases
        this.shuffle && $.shuffleArray( phrases );                             // shuffle cloned phrases
        if ( !this.number ) this.number = phrases.length;                      // no number of phrases? => use all phrases
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event

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

        // set initial app state data
        data = await $.dataset( this.data );  // load already existing app state data
        data = Object.assign( data, {         // reset most values
          correct: 0,
          notation: data.notation || this.default.notation,  // keep last used notation
          sections: [],
          total: this.number
        } );

        // start with first phrase
        phrase_nr = 0; nextPhrase();

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.legend.element.querySelector( 'main' ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( data ), phrases: $.clone( phrases ) } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( data );

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;

        // set initial app state data for current phrase
        data.sections.push( {
          input: {
            keys: [ null, null, null ],  // no tables
            arrows: [                    // no arrows
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

      /** renders actual state of current phrase */
      const render = () => this.html.render( this.html.main( this, data, phrases[ 0 ], phrase_nr, events ), this.element );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when selected entry for displayed notation changes
         * @param {Object} event - event object of the change event of the selector box for displaying the legend
         */
        onNotationChange: event => {
          data.notation = event.target.value;
          render();
        },

        /** when 'legend' button is clicked */
        onLegendClick: () => this.modal.legend.open(),

        /**
         * when an 'add table' button is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onAddTable: table => {

          // create empty table without any key attribute
          data.sections[ phrase_nr - 1 ].input.keys[ table ] = [
            false,  // foreign key to left table
            false,  // foreign key to middle table
            false,  // foreign key to right table
            false   // artificial primary key
          ];

          render();
        },

        /**
         * when a 'remove table' icon is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onRemoveTable: table => {

          /**
           * key attributes of the relational scheme tables
           * @type {(string|boolean)[][]}
           */
          const keys = data.sections[ phrase_nr - 1 ].input.keys;

          // remove table and any foreign keys in other tables that reference that table
          keys[ table ] = null;
          keys.forEach( fks => fks && ( fks[ table ] = false ) );

          render();
        },

        /**
         * when an 'add key attribute' button is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onAddAttr: table => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const phrase = data.sections[ phrase_nr - 1 ];

          /**
           * instance of ccmjs-based web component for the modal dialog for adding a key attribute
           * @type {Object}
           */
          const modal = this.modal.attr;

          /**
           * when the submit button in the modal dialog is clicked
           * @param {Object} event - event object of the change event of the selector box for displaying the legend
           */
          const onSubmit = event => {
            event.preventDefault();

            /**
             * result data from the web form
             * @type {Object}
             */
            const key = $.formData( modal.element.querySelector( 'form' ) );

            // add key attribute in table
            if ( key.fk )
              phrase.input.keys[ table ][ key.table ] = key.pk && 'pk' || key.opt && 'opt' || 'fk';  // foreign key
            else
              phrase.input.keys[ table ][ 3 ] = true;  // artificial primary key

            modal.close(); render();
          };

          // render web form in modal dialog
          this.html.render( this.html.addKeyForm( this, phrase, table, onSubmit ), modal.element.querySelector( 'main' ) );

          const pk = modal.element.querySelector( '#key-pk' );                            // checkbox for primary key
          const fk = modal.element.querySelector( '#key-fk' );                            // checkbox for foreign key
          const opt = modal.element.querySelector( '#key-opt' );                          // checkbox for optional attribute
          const ref = modal.element.querySelector( '#key-fk-table' );                     // selector box for selecting the table referenced by the foreign key
          const submit = modal.element.querySelector( 'input[type="submit"]' );           // submit button of the web form
          const checkboxes = modal.element.querySelectorAll( 'input[type="checkbox"]' );  // all checkboxes of the web form

          // uncheck all checkboxes, deselect options of selector box
          checkboxes.forEach( checkbox => checkbox.checked = false );
          modal.element.querySelectorAll( 'option' ).forEach( option => option.selected = false );

          pk.disabled = phrase.input.keys[ table ][ 3 ];  // enable checkbox for primary key
          ref.disabled = true;     // disable selector box for selecting the table referenced by the foreign key
          opt.disabled = true;     // disable checkbox for optional attribute
          submit.disabled = true;  // disable submit button of the web form

          // listen to change event of checkbox for primary key
          pk.addEventListener( 'change', event => {
            opt.disabled = event.target.checked || !fk.checked;  // a primary key cannot also be an optional attribute
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key
          } );

          // listen to change event of checkbox for foreign key
          fk.addEventListener( 'change', event => {
            pk.disabled = !event.target.checked && phrase.input.keys[ table ][ 3 ];  // a foreign key can be a primary key
            ref.disabled = !event.target.checked;                // the referenced table can only be selected for a foreign key
            opt.disabled = !event.target.checked || pk.checked;  // only a foreign key can be a optional key
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key

            // foreign key has been unchecked?
            if ( !event.target.checked ) {
              opt.checked = false;          // uncheck optional attribute
            }
          } );

          // listen to change event of checkbox for optional attribute
          opt.addEventListener( 'change', event => {
            pk.disabled = event.target.checked;       // a optional attribute cannot be a primary key
          } );

          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {

          /**
           * key attributes of the relational scheme tables
           * @type {(string|boolean)[][]}
           */
          const keys = data.sections[ phrase_nr - 1 ].input.keys;

          // is artificial primary key?
          if ( to === false ) {
            keys[ from ][ 3 ] = false;                              // remove artificial primary key
            keys.forEach( fks => fks && ( fks[ from ] = false ) );  // remove any foreign keys in other tables that reference that table
          }
          // is foreign key => remove key and corresponding arrowheads
          else {
            keys[ from ][ to ] = false;
            if ( !keys[ to ][ from ] ) {
              data.sections[ phrase_nr - 1 ].input.arrows[ from ][ to ] = false;
              data.sections[ phrase_nr - 1 ].input.arrows[ to ][ from ] = false;
            }
          }

          render();
        },

        /** when an arrowhead is changed */
        onArrowChange: event => {
          data.sections[ phrase_nr - 1 ].input.arrows[ event.target.dataset.from ][ event.target.dataset.to ] = !!parseInt( event.target.value );
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {

          // analyse solution data of current phrase
          const section = data.sections[ phrase_nr - 1 ];
          const left = section.solution[ 0 ];
          const right = section.solution[ 1 ];
          const single_left = left === 'c' || left === '1';
          const single_right = right === 'c' || right === '1';
          const multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );
          const fk_l2r = single_right && !( left === '1' && right === 'c' ) ? ( right === 'c' ? 'opt' : ( single_left ? 'pk' : 'fk' ) ) : false;
          const fk_r2l = single_left && right !== '1' ? ( left === 'c' ? 'opt' : ( single_right ? 'pk': 'fk' ) ) : false;

          // define correct solution for feedback
          section.feedback = {
            keys: [
              [ false, false, fk_l2r, !( single_left && single_right && right !== 'c' ) ],
              multi ? [ 'pk', false, 'pk', false ] : null,
              [ fk_r2l, false, false, !( single_left && single_right && right === 'c' ) ]
            ],
            arrows: [
              [ false, false, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ],
              [ multi, false, multi ],
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ), false, false ]
            ]
          };

          // compare current app state data of current phrase with correct solution
          section.correct = JSON.stringify( section.input ) === JSON.stringify( section.feedback );
          section.correct && data.correct++;

          // no feedback? => show directly the next phrase
          if ( !this.feedback ) return events.onNextButton();

          // show visual feedback
          this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
        },

        /** when 'retry' button is clicked */
        onRetryButton: () => {
          if ( !this.retry ) return;
          const section = data.sections[ phrase_nr - 1 ];
          this.element.classList.remove( section.correct ? 'correct' : 'failed' );
          section.correct && data.correct--;
          delete section.feedback;
          delete section.correct;
          render();
        },

        /** when 'solution' button is clicked */
        onSolutionButton: () => {
          if ( !this.show_solution ) return;
          const feedback = data.sections[ phrase_nr - 1 ].feedback;
          feedback.show_solution = !feedback.show_solution;
          render();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const section = data.sections[ phrase_nr - 1 ];

          // update solution data with correct solution
          delete section.feedback.show_solution;
          section.solution = section.feedback;

          // remove feedback-relevant data
          delete section.feedback;
          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          // start next phrase
          phrases.shift(); nextPhrase();

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );

        },

        /** when 'finish' button is clicked */
        onFinishButton: () => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const section = data.sections[ phrase_nr - 1 ];

          // update solution data with correct solution and remove feedback-relevant data
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;
          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();                                              // current phrase is finished
          this.onfinish && $.onFinish( this );                          // perform finish actions
          this.logger && this.logger.log( 'finish', this.getValue() );  // logging of 'finish' event

        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();