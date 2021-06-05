/**
 * @overview ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (05.06.2021)
 */

( () => {
  const component = {
    name: 'er_rel_trainer',
    version: [ 1, 0, 0 ],
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
        "path": "https://ccmjs.github.io/eild/er_rel_trainer/resources/img/"
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
          "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
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
          "text": "Ein Fahrzeug kann einen Anhänger haben.",
          "relationship": [ "Fahrzeug", "hat", "Anhänger" ],
          "solution": [ "c", "c" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:1-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Wenn bei einer 1:1-Beziehung beide Entitäten über exakt identische Kardinalitäten verfügen, wird ein Fremdschlüssel bei der Hauptentität (hier "Fahrzeug") hinzugefügt.
             Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.
             Bei einer 1:1-Beziehung muss der Fremdschlüssel ein Alternativschlüssel sein, damit nicht mehrere Datensätze von "Fahrzeug" über den Fremdschlüssel auf denselben "Anhänger"-Datensatz verweisen können.
             Da ein "Fahrzeug"-Datensatz auch keinen zugehörigen "Anhänger"-Datensatz haben kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel bei "Fahrzeug" gesetzt ist und auf "Anhänger" verweist, geht der Pfeil von "Fahrzeug" nach "Anhänger".`,
            ""
          ]
        },
        {
          "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
          "relationship": [ "Topf", "hat", "Deckel" ],
          "solution": [ "1", "c" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:1-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Wenn bei einer 1:1-Beziehung beide Entitäten über unterschiedliche Kardinalitäten verfügen, wird der Fremdschlüssel bei der schwächeren Entität (hier "Deckel") hinzugefügt.
             Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.
             Bei einer 1:1-Beziehung muss der Fremdschlüssel ein Alternativschlüssel sein, damit nicht mehrere Datensätze von "Deckel" über den Fremdschlüssel auf denselben "Topf"-Datensatz verweisen können.
             Da ein "Topf"-Datensatz auch keinen zugehörigen "Deckel"-Datensatz haben kann, muss der Fremdschlüssel optional sein.`,
            ""
          ]
        },
        {
          "text": "Zu jedem Patienten gibt es eine Patientenakte.",
          "relationship": [ "Patient", "hat", "Patientenakte" ],
          "solution": [ "1", "1" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:1-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Wenn bei einer 1:1-Beziehung beide Entitäten über exakt identische Kardinalitäten verfügen, wird ein Fremdschlüssel bei der Hauptentität (hier "Patient") hinzugefügt.
             Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.
             Bei einer 1:1-Beziehung muss der Fremdschlüssel ein Alternativschlüssel sein, damit nicht mehrere Datensätze von "Patient" über den Fremdschlüssel auf denselben "Patientenakte"-Datensatz verweisen können.
             Da der Fremdschlüssel bei "Patient" gesetzt ist und auf "Patientenakte" verweist, geht der Pfeil von "Patient" nach "Patientenakte".`,
            `Richtig! Hier noch ein paar ergänzende Hinweise:
             In der Praxis werden 1:1-Beziehungen häufig zu einer Tabelle zusammengefasst.
             Es kann vorkommen, dass es einen "Patientenakte"-Datensatz gibt, zu dem kein "Patient"-Datensatz existiert, der über den Fremdschlüssel auf den "Patientenakte"-Datensatz verweist.
             Das es zu jedem "Patientenakte"-Datensatz immer genau einen "Patient"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
          "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
          "solution": [ "c", "cn" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:N-Beziehung, daher wird keine mittlere "enthält"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier "Gegenstand") hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             Da ein "Gegenstand"-Datensatz auch keinen zugehörigen "Rucksack"-Datensatz haben kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel bei "Gegenstand" gesetzt ist und auf "Rucksack" verweist, geht der Pfeil von "Gegenstand" nach "Rucksack".`,
            ""
          ]
        },
        {
          "text": "Ein Wald hat Bäume.",
          "relationship": [ "Wald", "hat", "Baum" ],
          "solution": [ "c", "n" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:N-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier "Baum") hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             Da ein "Baum"-Datensatz auch keinen zugehörigen "Wald"-Datensatz haben kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel bei "Baum" gesetzt ist und auf "Wald" verweist, geht der Pfeil von "Baum" nach "Wald".`,
            `Richtig! Hier noch ein paar ergänzende Hinweise:
             Es kann vorkommen, dass es einen "Wald"-Datensatz gibt, zu dem kein "Baum"-Datensatz existiert, der über den Fremdschlüssel auf den "Wald"-Datensatz verweist.
             Das es zu jedem "Wald"-Datensatz immer mindestens einen "Baum"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`,
          ]
        },
        {
          "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
          "relationship": [ "Planet", "hat", "Mond" ],
          "solution": [ "1", "cn" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:N-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier "Mond") hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             Da der Fremdschlüssel bei "Mond" gesetzt ist und auf "Planet" verweist, geht der Pfeil von "Mond" nach "Planet".`,
            ""
          ]
        },
        {
          "text": "Ein Buch hat mehrere Seiten.",
          "relationship": [ "Buch", "hat", "Seite" ],
          "solution": [ "1", "n" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine 1:N-Beziehung, daher wird keine mittlere "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier "Seite") hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             Da der Fremdschlüssel bei "Seite" gesetzt ist und auf "Buch" verweist, geht der Pfeil von "Seite" nach "Buch".`,
            `Richtig! Hier noch ein paar ergänzende Hinweise:
             Es kann vorkommen, dass es einen "Buch"-Datensatz gibt, zu dem kein "Seite"-Datensatz existiert, der über den Fremdschlüssel auf den "Buch"-Datensatz verweist.
             Das es zu jedem "Buch"-Datensatz immer mindestens einen "Seite"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Kunden kaufen Produkte.",
          "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
          "solution": [ "cn", "cn" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine N:M-Beziehung, daher muss auch eine mittlere "hat gekauft"-Tabelle angelegt werden.
             Bei einer N:M-Beziehung muss der mittleren "hat gekauft"-Tabelle je ein Fremdschlüssel für jede der beiden Entitäten "Kunde" und "Produkt" hinzugefügt werden.
             Damit jede Kombination aus "Kunde" und "Produkt" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Alternativschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat gekauft"-Tabelle auf die beiden äußeren Tabellen "Kunde" und "Produkt" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            ""
          ]
        },
        {
          "text": "Auf einem Rezept stehen Zutaten.",
          "relationship": [ "Rezept", "hat", "Zutat" ],
          "solution": [ "cn", "n" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine N:M-Beziehung, daher muss auch eine mittlere "hat"-Tabelle angelegt werden.
             Bei einer N:M-Beziehung muss der mittleren "hat"-Tabelle je ein Fremdschlüssel für jede der beiden Entitäten "Rezept" und "Zutat" hinzugefügt werden.
             Damit jede Kombination aus "Rezept" und "Zutat" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Primärschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat"-Tabelle auf die beiden äußeren Tabellen "Rezept" und "Zutat" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            `Richtig! Hier noch ein paar ergänzende Hinweise:
             Es kann vorkommen, dass es einen "Rezept"-Datensatz gibt, zu dem in der mittleren "hat"-Tabelle kein Datensatz existiert, der dem "Rezept"-Datensatz einen "Zutat"-Datensatz zuordnet.
             Das es zu jedem "Rezept"-Datensatz immer mindestens einen zugehörigen "Seite"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
          "relationship": [ "Haus", "hat", "Eigentümer" ],
          "solution": [ "n", "n" ],
          "hints": [
            `Benötigt werden immer die beiden äußeren Tabellen mit jeweils einem eigenen künstlichen Primärschlüssel.
             Es handelt sich um eine N:M-Beziehung, daher muss auch eine mittlere "hat"-Tabelle angelegt werden.
             Bei einer N:M-Beziehung muss der mittleren "hat"-Tabelle je ein Fremdschlüssel für jede der beiden Entitäten "Haus" und "Eigentümer" hinzugefügt werden.
             Damit jede Kombination aus "Haus" und "Eigentümer" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Primärschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat"-Tabelle auf die beiden äußeren Tabellen "Haus" und "Eigentümer" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            `Richtig! Hier noch ein paar ergänzende Hinweise:
             Es kann vorkommen, dass es einen "Haus"-Datensatz gibt, zu dem in der mittleren "hat"-Tabelle kein Datensatz existiert, der dem "Haus"-Datensatz einen "Eigentümer"-Datensatz zuordnet.
             Umgekehrt kann es auch vorkommen, dass es zu einen "Eigentümer"-Datensatz keinen zugehörigen "Haus"-Datensatz gibt.
             Das es zu jedem "Haus"-Datensatz immer mindestens einen zugehörigen "Eigentümer"-Datensatz gibt und umgekehrt zu jedem "Eigentümer"-Datensatz immer mindestens einen zugehörigen "Haus"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        }
      ],
      "show_solution": true,
      "shuffle": true,
      "text": {
        "ak": "Alternativschlüssel",
        "ak_badge": "Alternativschlüssel: Weiterer Schlüssel mit dem sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.",
        "ak_input": "Geben Sie hier an, ob der Fremdschlüssel ein Alternativschlüssel ist bzw. zum zusammengesetzten Alternativschlüssel gehört.",
        "attr_modal_cancel": "Abbrechen",
        "attr_modal_confirm": "Hinzufügen",
        "attr_modal_title": "Neues Schlüsselattribut",
        "attr_name": "Name des Schlüsselattributs",
        "cancel": "Abbrechen",
        "correct": "Ihre Antwort war richtig!",
        "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "fk": "Fremdschlüssel",
        "fk_badge": "Fremdschlüssel: Attribut das auf einen Datensatz einer anderen Tabelle verweist.",
        "fk_input": "Geben Sie hier an, ob der Schlüssel ein Fremdschlüssel ist.",
        "heading": "Lösen Sie die gezeigte Beziehung zwischen den beiden Entitäten auf!",
        "key_attr": "Schlüsselattribut",
        "legend": "Legende",
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
      let $, dataset, phrase_nr, phrases;

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

      this.ready = async () => {

        phrases = $.clone( this.phrases );                                     // clone original phrases
        this.shuffle && $.shuffleArray( phrases );                             // shuffle cloned phrases
        if ( !this.number ) this.number = phrases.length;                      // no number of phrases? => use all phrases
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event

      };

      this.start = async () => {

        // not enough phrases left? => clone and shuffle original phrases
        if ( phrases.length < this.number ) {
          phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( phrases );
        }

        // set initial app state data
        dataset = await $.dataset( this.data );  // load already existing app state data
        dataset = Object.assign( dataset, {      // reset most values
          correct: 0,
          notation: dataset.notation || this.default.notation,  // keep last used notation
          sections: [],
          total: this.number
        } );

        // start with first phrase
        phrase_nr = 0; nextPhrase();

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

        // set initial app state data for current phrase
        dataset.sections.push( {
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
      const render = () => this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, events ), this.element );

      /**
       * contains all event handlers
       * @type Object.<string,Function>
       */
      const events = {

        /**
         * when selected entry for displayed notation changes
         * @param {Object} event - event object of the change event of the selector box for displaying the legend
         */
        onNotationChange: event => {
          dataset.notation = event.target.value;
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
          dataset.sections[ phrase_nr - 1 ].input.keys[ table ] = [
            false,  // foreign key to left table
            false,  // foreign key to middle table
            false,  // foreign key to right table
            true    // artificial primary key
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
          const keys = dataset.sections[ phrase_nr - 1 ].input.keys;

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
          const phrase = dataset.sections[ phrase_nr - 1 ];

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
              phrase.input.keys[ table ][ key.table ] = key.pk && 'pk' || key.opt && 'opt' || key.ak && 'ak' || 'fk';  // foreign key
            else
              phrase.input.keys[ table ][ 3 ] = true;  // artificial primary key

            modal.close(); render();
          };

          // render web form in modal dialog
          this.html.render( this.html.addKeyForm( this, phrase, table, onSubmit ), modal.element.querySelector( 'main' ) );

          const pk = modal.element.querySelector( '#key-pk' );                            // checkbox for primary key
          const fk = modal.element.querySelector( '#key-fk' );                            // checkbox for foreign key
          const ak = modal.element.querySelector( '#key-ak' );                            // checkbox for alternative key
          const opt = modal.element.querySelector( '#key-opt' );                          // checkbox for optional attribute
          const ref = modal.element.querySelector( '#key-fk-table' );                     // selector box for selecting the table referenced by the foreign key
          const submit = modal.element.querySelector( 'input[type="submit"]' );           // submit button of the web form
          const checkboxes = modal.element.querySelectorAll( 'input[type="checkbox"]' );  // all checkboxes of the web form

          // uncheck all checkboxes, deselect options of selector box
          checkboxes.forEach( checkbox => checkbox.checked = false );
          modal.element.querySelectorAll( 'option' ).forEach( option => option.selected = false );

          pk.disabled = phrase.input.keys[ table ][ 3 ];  // enable checkbox for primary key
          ref.disabled = true;     // disable selector box for selecting the table referenced by the foreign key
          ak.disabled = true;      // disable checkbox for alternative key
          opt.disabled = true;     // disable checkbox for optional attribute
          submit.disabled = true;  // disable submit button of the web form

          // listen to change event of checkbox for primary key
          pk.addEventListener( 'change', event => {
            ak.disabled = event.target.checked || !fk.checked;   // a primary key cannot also be an alternative key
            opt.disabled = event.target.checked || !fk.checked;  // a primary key cannot also be an optional attribute
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key
          } );

          // listen to change event of checkbox for foreign key
          fk.addEventListener( 'change', event => {
            pk.disabled = !event.target.checked && phrase.input.keys[ table ][ 3 ];  // a foreign key can be a primary key
            ref.disabled = !event.target.checked;                // the referenced table can only be selected for a foreign key
            ak.disabled = !event.target.checked || pk.checked;   // only a foreign key can be an alternate key
            opt.disabled = !event.target.checked || pk.checked;  // only a foreign key can be a optional key
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key

            // foreign key has been unchecked?
            if ( !event.target.checked ) {
              ak.checked = false;           // uncheck alternative key
              opt.checked = false;          // uncheck optional attribute
            }
          } );

          // listen to change event of checkbox for alternative key
          ak.addEventListener( 'change', event => {
            pk.disabled = event.target.checked;      // an alternative key cannot be an primary key
            opt.disabled = event.target.checked;     // an alternative key cannot be an optional attribute
          } );

          // listen to change event of checkbox for optional attribute
          opt.addEventListener( 'change', event => {
            pk.disabled = event.target.checked;       // a optional attribute cannot be a primary key
            ak.disabled = event.target.checked;       // a optional attribute cannot be a alternative key
          } );

          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {

          /**
           * key attributes of the relational scheme tables
           * @type {(string|boolean)[][]}
           */
          const keys = dataset.sections[ phrase_nr - 1 ].input.keys;

          // remove attribute from table
          if ( to === false )
            keys[ from ][ 3 ] = to;      // artificial primary key
          else
            keys[ from ][ to ] = false;  // foreign key

          render();
        },

        /** when an arrowhead is changed */
        onArrowChange: event => {
          dataset.sections[ phrase_nr - 1 ].input.arrows[ event.target.dataset.from ][ event.target.dataset.to ] = !!parseInt( event.target.value );
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {

          // analyse solution data of current phrase
          const section = dataset.sections[ phrase_nr - 1 ];
          const left = section.solution[ 0 ];
          const right = section.solution[ 1 ];
          const single_left = left === 'c' || left === '1';
          const single_right = right === 'c' || right === '1';
          const multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );
          const fk_l2r = ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ? ( right === 'c' ? 'opt' : ( single_left && single_right && !( left === 'c' && right === 'c' ) ? 'ak' : 'fk' ) ) : false;
          const fk_r2l = single_left && ( !single_right || ( left === '1' && right === 'c' ) ) ? ( left === 'c' ? 'opt' : ( single_left && single_right ? 'ak': 'fk' ) ) : false;

          // define correct solution for feedback
          section.feedback = {
            keys: [
              [ false, false, fk_l2r, true ],
              multi ? [ 'pk', false, 'pk', false ] : null,
              [ fk_r2l, false, false, true ]
            ],
            arrows: [
              [ false, false, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ],
              [ multi, false, multi ],
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ), false, false ]
            ]
          };

          // compare current app state data of current phrase with correct solution
          section.correct = JSON.stringify( section.input ) === JSON.stringify( section.feedback );
          section.correct && dataset.correct++;

          // no feedback? => show directly the next phrase
          if ( !this.feedback ) return events.onNextButton();

          // show visual feedback
          this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
        },

        /** when 'solution' button is clicked */
        onSolutionButton: () => {
          const feedback = dataset.sections[ phrase_nr - 1 ].feedback;
          feedback.show_solution = !feedback.show_solution;
          render();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const section = dataset.sections[ phrase_nr - 1 ];

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
          const section = dataset.sections[ phrase_nr - 1 ];

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