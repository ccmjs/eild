/**
 * @overview HTML templates of <i>ccmjs</i>-based web component for ER model to relational scheme training.
 * @author André Kless <andre.kless@web.de> 2021-2022
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * Returns the main HTML template.
 * @param {object} app - App instance
 * @param {boolean} [show_solution] - Reveal main solution
 * @returns {*}
 */
export function main( app, show_solution ) {

  /**
   * App state data
   * @type {app_state}
   */
  const data = app.getValue();

  /**
   * Data of the notation in the ER diagram
   * @type {notation_data}
   */
  const notation = app.notations[ data.notation ];

  /**
   * Current phrase number
   * @type {number}
   */
  const phrase_nr = data.results.length;

  /**
   * Data of the current phrase
   * @type {phrase_data}
   */
  const phrase = data.phrases[ phrase_nr - 1 ];

  /**
   * Result data of the current phrase
   * @type {result_data}
   */
  const result = data.results[ phrase_nr - 1 ];

  /**
   * ER diagram shows a binary relation
   * @type {boolean}
   */
  const is_binary = phrase.entities.length === 2;

  /**
   * ER diagram shows a recursive binary relation
   * @type {boolean}
   */
  const is_recursive = is_binary && phrase.entities[ 0 ] === phrase.entities[ 1 ] && !notation.mirrored;

  /**
   * ER diagram shows an one-to-one (1:1, 1:c, c:1 or c:c) relation
   * @type {boolean}
   */
  const is_single = !phrase.solution.find( value => value !== '1' && value !== 'c' );

  /**
   * ER diagram shows an many-to-many (n:n, cn:n, n:cn or cn:cn) relation
   * @type {boolean}
   */
  const is_multi = !phrase.solution.find( value => value !== 'cn' && value !== 'n' );

  /**
   * ER diagram shows an one-to-many (1:n, c:n, 1:cn or c:cn) relation
   * @type {boolean}
   */
  const is_many = is_binary && !is_single && !is_multi;

  /**
   * ER diagram shows a generalisation/specialisation relation
   * @type {boolean}
   */
  const is_hierarchy = !phrase.relation;

  /**
   * Bit mask for arrows
   * @type {number}
   */
  const arrows_mask = 15872;

  /**
   * Bit mask for foreign keys
   * @type {number}
   */
  const fk_mask = 496;

  /**
   * Translation index for the heading ('heading', 'correct' or 'failed')
   * @type {string}
   */
  const heading = result.correct === undefined ? 'main_heading' : 'feedback_' + ( result.correct ? 'correct' : 'failed' );

  return html`
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mx-3" data-lang="main_title">${ app.text.main_title }</h1>
      <aside></aside>
    </div>
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">

      <!-- Heading -->
      <div id="heading" class="p-2 pe-3" data-lang="${ heading }">${ app.text[ heading ] }</div>

      <div class="d-flex align-items-center text-nowrap px-2" ?data-hidden=${ app.fixed_notation }>

        <!-- Notation Selection -->
        <section>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0"><b data-lang="main_notation">${ app.text.main_notation }</b></label>
            <select id="notation-input" class="form-select ms-2" @change=${ event => app.events.onNotation( event.target.value ) }>
              ${ Object.values( app.notations ).sort( ( a, b ) =>
                a.title.localeCompare( b.title ) ).map( ( { key, title } ) =>
                  html`<option value="${ key }" ?disabled=${ !is_binary && app.notations[ key ].swap } ?selected=${ data.notation === key }>${ title }</option>`
              ) }
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ms-2" ?data-hidden=${ !app.legend }>
          <button class="btn btn-link" @click=${ app.events.onLegend } data-lang="legend">${ app.text.legend }</button>
        </section>

      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2 text-nowrap">
      <div>

        <!-- Phrase -->
        <section class="lead px-2 py-3" ?data-hidden=${ !phrase.text }>
          <b>
            <span data-lang="main_phrase">${ app.text.main_phrase }</span><span ?data-hidden=${ app.phrases.length === 1 }> ${ phrase_nr }/${ app.number }</span>:
          </b>
          <span class="text-wrap">${ phrase.text }</span>
        </section>

        <!-- Diagram and Tables -->
        ${ diagram() }
        <hr>
        ${ scheme() }
        
        <!-- Correct Solution -->
        <div ?data-hidden=${ !app.feedback || !app.show_solution || !show_solution || result.correct === undefined }>
          <hr>
          <div class="lead text-center pt-2" data-lang="feedback_solution">${ app.text.feedback_solution }</div>
          ${ app.feedback && app.show_solution && show_solution && result.correct !== undefined ? scheme( true ) : '' }
        </div>

        <hr>

        <!-- Comments During Input -->
        <section ?data-hidden=${ !( app.comments && app.comments.input && result.correct === undefined ) }>
          ${ comment( 'create_tables', !result.input.find( ( table, i ) => table !== null && !( i === 2 && is_recursive ) ) ) }
          ${ comment( 'decide_null', result.input.find( table => table && table.find( attr => attr & 508 && !( attr & 3 ) ) ) ) }
          ${ comment( 'connect_tables', result.input.find( ( table, i ) => table !== null && !table.find( attr => attr & fk_mask ) && !result.input.find( ( table, j ) => i !== j && isConnected( i, j ) ) ) ) }
          ${ comment( 'set_arrows', result.input.find( ( table, i ) => table !== null && table.find( ( attr, j ) => i !== j && attr & fk_mask && result.input[ j ] && !( attr & 1 << ( 4 + j + 5 ) ) && !( result.input[ j ][ i ] & 1 << ( 4 + i + 5 ) ) ) ) ) }
        </section>

        <!-- Comments on Wrong Solution -->
        <section ?data-hidden=${ !( app.comments && app.comments.wrong && result.correct === false ) }>
          
          <!-- Wrong Tables -->
          ${ comment( 'missing_entity_table', result.input.find( ( table, i ) => i && !table && !( i === 2 && is_recursive ) ) !== undefined ) }
          ${ comment( 'missing_relation_table', is_multi && !result.input[ 0 ] ) }
          ${ comment( 'not_needed_relation_table', !is_multi && result.input[ 0 ] ) }
          
          <!-- Wrong Primary Keys -->
          ${ comment( 'missing_pk', result.input.find( table => table && !table.find( attr => attr & 1 << 2 ) ) ) }
          ${ comment( 'pk_not_null', result.input.find( table => table && table.find( attr => attr & 1 << 2 && !( attr & 1 << 1 ) ) ) ) }
          ${ comment( 'wrong_pk', result.input.find( ( table, i ) => table && i && table.find( ( attr, j ) => attr & 1 << 2 && i !== j ) ) ) }
          ${ comment( 'nm_pk', is_multi && result.input[ 0 ] && ( result.input[ 0 ][ 0 ] & 1 << 2 || result.input[ 0 ].find( ( attr, i ) => i && !( attr & 1 << 2 ) ) ) ) }
          
          <!-- Wrong Foreign Keys -->
          ${ comment( '1c_fk', phrase.solution.toString() === '1,c' && result.input[ 1 ] && !( result.input[ 1 ][ 2 ] & 64 ) || phrase.solution.toString() === 'c,1' && result.input[ 2 ] && !( result.input[ 2 ][ 1 ] & 32 ) ) }
          ${ comment( '1n_fk', is_many && result.input.find( ( table, i ) => i && table && !phrase.solution[ i - 1 ].includes( 'n' ) && !( table[ i === 1 ? 2 : 1 ] & 1 << ( 4 + ( i === 1 ? 2 : 1 ) ) ) ) ) }
          ${ comment( 'nm_fk', is_multi && result.input[ 0 ] && result.input[ 0 ].find( ( attr, i ) => i ? !( attr & 1 << ( 4 + i ) ) : attr & 1 << ( 4 + i ) ) ) }
          ${ comment( 'hierarchy_fk', is_hierarchy && result.input.find( ( table, i ) => i > 1 && table && !( table[ 1 ] & ( 1 << 5 ) ) ) ) }
          ${ comment( 'not_null_fk', !( is_many && ( phrase.solution.includes( 'c' ) || phrase.solution.toString() === 'c,c' ) ) && !is_multi && result.input.find( ( table, i ) => table && table.find( ( attr, j ) => attr & fk_mask && ( attr & fk_mask ) === ( ( result.solution && result.solution[ i ] && result.solution[ i ][ j ] ) & fk_mask ) && attr & 1 ) ) ) }
          ${ comment( 'null_fk', is_many && ( phrase.solution.includes( 'c' ) || phrase.solution.toString() === 'c,c' ) && ( () => {
            const left = phrase.solution[ 0 ] === 'c';
            const table = result.input[ left ? 1 : 2 ];
            const attr = table && table[ left ? 2 : 1 ];
            const fk = left ? 64 : 32;
            return attr & fk && attr & 2;
          } )() ) }

          <!-- Wrong Alternate Key -->
          ${ comment( 'ak', is_hierarchy && result.input.find( ( table, i ) => i > 1 && table && table[ 1 ] & ( 1 << 5 ) && !( table[ 1 ] & 1 << 3 ) ) || is_single && ( () => {
            const c1 = phrase.solution.toString() === 'c,1';
            const table = result.input[ c1 ? 2 : 1 ];
            const attr = table && table[ c1 ? 1 : 2 ];
            const fk = c1 ? 32 : 64;
            return attr & fk && !( attr & 8 );
          } )() ) }
          
        </section>
        
        <!-- Comments on Correct Solution -->
        <section ?data-hidden=${ !( app.comments && app.comments.correct && result.correct === true ) }>
          ${ comment( 'alternate_solution', !!result.alternate_solution ) }
          ${ comment( 'mandatory', ( () => {
            switch ( phrase.solution.toString() ) {
              case '1,1':
              case '1,n':
              case 'n,1':
              case 'c,n':
              case 'n,c':
                return true;
            }
            return false;
          } )() ) }
          ${ comment( 'total', is_hierarchy && phrase.solution[ 0 ] === 't' ) }
          ${ comment( 'disjoint', is_hierarchy && phrase.solution[ 1 ] === 'd' ) }
        </section>

        <!-- Buttons -->
        <section id="buttons" class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button id="submit" type="submit" form="scheme" class="btn btn-primary m-1" ?disabled=${ result.correct !== undefined } data-lang="btn_submit">${ app.text.btn_submit }</input>
          <button id="correction" class="btn btn-primary m-1" @click=${ app.events.onCorrection } ?data-hidden=${ !app.correction } ?disabled=${ result.correct !== false || show_solution } data-lang="btn_correction">${ app.text.btn_correction }</button>
          <button id="solution" class="btn btn-primary m-1" @click=${ app.events.onSolution } ?data-hidden=${ !app.show_solution } ?disabled=${ result.correct === undefined || show_solution } data-lang="btn_solution">${ app.text.btn_solution }</button>
          <button id="next" class="btn btn-primary m-1" @click=${ app.events.onNext } ?disabled=${ !app.skip && result.correct === undefined || phrase_nr === app.number } data-lang="btn_${ app.skip && result.correct === undefined ? 'skip' : 'next' }">${ app.text[ 'btn_' + ( app.skip && result.correct === undefined ? 'skip' : 'next' ) ] }</button>
          <button id="finish" class="btn btn-primary m-1" @click=${ app.events.onFinish } ?disabled=${ !app.onfinish || !app.skip && result.correct === undefined || !app.anytime_finish && phrase_nr < app.number } data-lang="btn_finish">${ app.text.btn_finish }</button>
        </section>

      </div>
    </main>
    
    <!-- Logos -->
    <aside class="mx-3 mt-3 text-center">
      <img src="https://ccmjs.github.io/eild/logos.jpg">
    </aside>
  `;

  /**
   * Returns the HTML template for the ER diagram.
   * @returns {*}
   */
  function diagram() {
    return html`
      <section class="diagram px-2 py-4">
        <div class="text-center lead">

          <div></div>
          <div></div>
          ${ entity( phrase.relation ? 3 : 1 ) }
          <div></div>
          <div></div>

          <div></div>
          <div></div>
          ${ phrase.relation ? connection( 3 ) : line( 2 ) }
          <div></div>
          <div></div>

          ${ phrase.relation ? entity( 1 ) : line( 0 ) }
          ${ phrase.relation ? connection( 1 ) : line( 0 ) }
          <div id="relation">
            <img src="${ notation.images[ phrase.relation ? 5 : 6 ] }">
            <div ?data-centered=${ notation.centered } ?data-triangle=${ !phrase.relation }>
              ${ phrase.relation || html`
                <div data-lang="hierarchy_${ phrase.solution[ 0 ] }">${ app.text[ 'hierarchy_' + phrase.solution[ 0 ] ] }</div>
                <div data-lang="hierarchy_${ phrase.solution[ 1 ] }">${ app.text[ 'hierarchy_' + phrase.solution[ 1 ] ] }</div>
              ` || '' }
            </div>
          </div>
          ${ phrase.relation ? connection( 2 ) : line( 0 ) }
          ${ phrase.relation ? ( is_recursive ? line( 1 ) : entity( 2 ) ) : line( 0 ) }

          ${ line( is_recursive ? 4 : ( phrase.relation ? 0 : 6 ) ) }
          ${ line( is_recursive ? 3 : ( phrase.relation ? 0 : 5 ) ) }
          ${ is_recursive ? line( 3 ) : ( phrase.relation ? connection( 4 ) : line( 8 ) ) }
          ${ line( is_recursive ? 3 : ( phrase.relation ? 0 : 5 ) ) }
          ${ line( is_recursive ? 2 : ( phrase.relation ? 0 : 7 ) ) }

          ${ line( phrase.relation ? 0 : 1 ) }
          <div></div>
          ${ line( phrase.relation || phrase.entities.length < 4 ? 0 : 1 ) }
          <div></div>
          ${ line( phrase.relation ? 0 : 1 ) }

          ${ entity( phrase.relation ? 0 : 2 ) }
          <div></div>
          ${ entity( phrase.relation ? 4 : ( phrase.entities.length > 3 ? 3 : 4 ) ) }
          <div></div>
          ${ entity( phrase.relation ? 0 : ( phrase.entities.length > 3 ? 4 : 3 ) ) }
        </div>
      </section>
    `;

    /**
     * Returns the HTML template for an entity connection.
     * @param {entity_nr} [entity] - Entity number
     * @returns {*}
     */
    function connection( entity ) {
      return entity ? html`
        <div class="${ entity > 2 ? 'vertical' : '' }">
          <img class="${ entity === 1 && notation.mirrored ? 'mirrored' : '' }" src="${ notation.images[ [ '1', 'c', 'n', 'cn' ].indexOf( phrase.solution[ notation.swap ? ( entity > 1 ? 0 : 1 ) : entity - 1 ] ) + 1 ] }" ?data-hidden=${ !phrase.entities[ entity - 1 ] }>
        </div>
      ` : html`<div></div>`;
    }

    /**
     * Returns the HTML template for an entity.
     * @param {entity_nr} [nr] - Entity number
     * @returns {*}
     */
    function entity( nr ) {
      return phrase.entities[ nr - 1 ] ? html`
        <div class="entity p-3">
          ${ phrase.entities[ nr - 1 ] }
        </div>
      ` : html`<div></div>`;
    }

    /**
     * Returns the HTML template for a connection line.
     * @param {number} [nr] - Line number
     * @returns {*}
     */
    function line( nr ) {
      if ( !nr ) return html`<div></div>`;
      if ( nr === 8 ) return html`
        <div class="line8">
          <svg viewBox="0 0 240 60">
            <line x1="0" y1="59" x2="90" y2="59" stroke="black" stroke-width="2"/>
            <line x1="90" y1="0" x2="90" y2="60" stroke="black" stroke-width="2"/>
            <line x1="120" y1="0" x2="120" y2="60" stroke="${ phrase.entities.length < 4 ? 'transparent' : 'black' }" stroke-width="2"/>
            <line x1="150" y1="0" x2="150" y2="60" stroke="black" stroke-width="2"/>
            <line x1="150" y1="59" x2="240" y2="59" stroke="black" stroke-width="2"/>
          </svg>
        </div>
      `;
      return html`<div class="line${ nr }"></div>`;
    }

  }

  /**
   * Returns the HTML template for the relation scheme tables.
   * @param {boolean} [is_solution] - Scheme shows the solution
   * @returns {*}
   */
  function scheme( is_solution ) {

    /**
     * State in which the tables are displayed.
     * @type {table_data[]}
     */
    const input = is_solution ? result.solution : result.input;

    /**
     * Main solution with which the tables are compared for the automated feedback.
     * @type {table_data[]}
     */
    const solution = !is_solution && ( result.alternate_solution || result.solution );

    return html`
      <form id="scheme" @submit=${ event => { event.preventDefault(); !is_solution && app.events.onSubmit(); } }>
        <section class="tables px-2 py-4">
          ${ is_recursive && recursive()
          || is_binary && binary()
          || is_hierarchy && ( phrase.entities.length === 3 ? hierarchy_3() : hierarchy_4() )
          || ( phrase.entities.length === 3 ? multi_3() : multi_4() ) }
        </section>
      </form>
    `;

    /**
     * Returns the HTML template for the scheme tables of a binary relation.
     * @returns {*}
     */
    function binary() {
      return html`
        <div class="binary">
          ${ table( 1 ) }
          ${ arrow( 'l', 2, 1 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ arrow( 'r', 1, 2 ) }
          ${ table( 2 ) }

          ${ arrow( 'u', 0, 1 ) }
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 2 ) }

          ${ connection( 'ur', 1, 0 ) }
          ${ arrow( 'r', 1, 0 ) }
          ${ table( 0 ) }
          ${ arrow( 'l', 2, 0 ) }
          ${ connection( 'ul', 2, 0 ) }
        </div>
      `;
    }

    /**
     * Returns the HTML template for the scheme tables of a recursive binary relation.
     * @returns {*}
     */
    function recursive() {
      return html`
        <div class="recursive">
          ${ connection( 'rd', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'dl', 1, 2 ) }
          <div></div>

          ${ arrow( 'd', 1, 2 ) }
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          <div></div>

          ${ table( 1 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'ul', 1, 2 ) }
          <div></div>

          ${ arrow( 'u', 0, 1 ) }
          <div></div>
          <div></div>
          <div></div>

          ${ connection( 'ur', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ arrow( 'r', 1, 0 ) }
          ${ table( 0 ) }
        </div>
      `;
    }

    /**
     * Returns the HTML template for the scheme tables of a many-to-many relation with 3 entities.
     * @returns {*}
     */
    function multi_3() {
      return html`
        <div class="multi-3">
          ${ connection( 'rd', 1, 3 ) }
          ${ connection( 'h', 1, 3 ) }
          ${ arrow( 'r', 1, 3 ) }
          ${ table( 3 ) }
          ${ arrow( 'l', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'dl', 2, 3 ) }

          ${ connection( 'v', 1, 3 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 3 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 2, 3 ) }

          ${ arrow( 'd', 3, 1 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 0 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 2 ) }

          ${ table( 1 ) }
          ${ arrow( 'l', 0, 1 ) }
          ${ arrow( 'r', 1, 0 ) }
          ${ table( 0 ) }
          ${ arrow( 'l', 2, 0 ) }
          ${ arrow( 'r', 0, 2 ) }
          ${ table( 2 ) }

          ${ arrow( 'u', 2, 1 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'u', 1, 2 ) }

          ${ connection( 'ur', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'ul', 1, 2 ) }
        </div>
      `;
    }

    /**
     * Returns the HTML template for the scheme tables of a many-to-many relation with 4 entities.
     * @returns {*}
     */
    function multi_4() {
      return html`
        <div class="multi-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'rd', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'dl', 3, 4 ) }

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'd', 4, 3 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'v', 3, 4 ) }

          <div></div>
          <div></div>
          ${ connection( 'rd', 1, 3 ) }
          ${ connection( 'h', 1, 3 ) }
          ${ arrow( 'r', 1, 3 ) }
          ${ table( 3 ) }
          ${ arrow( 'l', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'dl', 2, 3 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 3, 4 ) }

          <div></div>
          <div></div>
          ${ connection( 'v', 1, 3 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 3 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 2, 3 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 3, 4 ) }

          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 1 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 0 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 2 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'rd', 1, 2 ) }
          ${ arrow( 'r', 2, 1 ) }
          ${ table( 1 ) }
          ${ arrow( 'l', 0, 1 ) }
          ${ arrow( 'r', 1, 0 ) }
          ${ table( 0 ) }
          ${ arrow( 'l', 2, 0 ) }
          ${ arrow( 'r', 0, 2 ) }
          ${ table( 2 ) }
          ${ arrow( 'l', 1, 2 ) }
          ${ connection( 'dl', 1, 2 ) }
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          ${ arrow( 'u', 4, 1 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 4, 0 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 4, 2 ) }
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          ${ connection( 'v', 1, 4 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 0, 4 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 2, 4 ) }
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          ${ connection( 'ur', 1, 4 ) }
          ${ connection( 'h', 1, 4 ) }
          ${ arrow( 'r', 1, 4 ) }
          ${ table( 4 ) }
          ${ arrow( 'l', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'ul', 2, 4 ) }
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'u', 3, 4 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          ${ connection( 'v', 3, 4 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'ur', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'h', 3, 4 ) }
          ${ connection( 'x', 1, 2, 3, 4 ) }
          ${ connection( 'ul', 3, 4 ) }

          ${ connection( 'ur', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ connection( 'ul', 1, 2 ) }
          <div></div>
        </div>
      `;
    }

    /**
     * Returns the HTML template for the scheme tables of a generalisation/specialisation relation with 3 entities.
     * @returns {*}
     */
    function hierarchy_3() {
      return html`
        <div class="multi-3">
          ${ connection( 'rd', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ arrow( 'r', 2, 1 ) }
          ${ table( 1 ) }
          ${ arrow( 'l', 3, 1 ) }
          ${ connection( 'h', 1, 3 ) }
          ${ connection( 'dl', 1, 3 ) }

          ${ connection( 'v', 1, 2 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 1 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 3 ) }

          ${ arrow( 'd', 1, 2 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 1, 0 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 1, 3 ) }

          ${ table( 2 ) }
          ${ arrow( 'l', 0, 2 ) }
          ${ arrow( 'r', 2, 0 ) }
          ${ table( 0 ) }
          ${ arrow( 'l', 3, 0 ) }
          ${ arrow( 'r', 0, 3 ) }
          ${ table( 3 ) }

          ${ arrow( 'u', 3, 2 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'u', 2, 3 ) }

          ${ connection( 'ur', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'h', 2, 3 ) }
          ${ connection( 'ul', 2, 3 ) }
        </div>
      `;
    }

    /**
     * Returns the HTML template for the scheme tables of a generalisation/specialisation relation with 4 entities.
     * @returns {*}
     */
    function hierarchy_4() {
      return html`
        <div class="multi-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'rd', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'dl', 1, 0 ) }

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'd', 0, 1 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 0 ) }

          <div></div>
          <div></div>
          ${ connection( 'rd', 1, 2 ) }
          ${ connection( 'h', 1, 2 ) }
          ${ arrow( 'r', 2, 1 ) }
          ${ table( 1 ) }
          ${ arrow( 'l', 4, 1 ) }
          ${ connection( 'h', 1, 4 ) }
          ${ connection( 'dl', 1, 4 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 0 ) }

          <div></div>
          <div></div>
          ${ connection( 'v', 1, 2 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 3, 1 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 4 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 0 ) }

          <div></div>
          <div></div>
          ${ arrow( 'd', 1, 2 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 1, 3 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 1, 4 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'rd', 2, 4 ) }
          ${ arrow( 'r', 4, 2 ) }
          ${ table( 2 ) }
          ${ arrow( 'l', 3, 2 ) }
          ${ arrow( 'r', 2, 3 ) }
          ${ table( 3 ) }
          ${ arrow( 'l', 4, 3 ) }
          ${ arrow( 'r', 3, 4 ) }
          ${ table( 4 ) }
          ${ arrow( 'l', 2, 4 ) }
          ${ connection( 'dl', 2, 4 ) }
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'v', 2, 4 ) }
          <div></div>
          ${ arrow( 'u', 0, 2 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 3 ) }
          <div></div>
          <div></div>
          ${ arrow( 'u', 0, 4 ) }
          <div></div>
          ${ connection( 'v', 2, 4 ) }
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'v', 2, 4 ) }
          <div></div>
          ${ connection( 'v', 2, 0 ) }
          <div></div>
          <div></div>
          ${ arrow( 'd', 3, 0 ) }
          <div></div>
          <div></div>
          ${ connection( 'v', 4, 0 ) }
          <div></div>
          ${ connection( 'v', 2, 4 ) }
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'v', 2, 4 ) }
          <div></div>
          ${ connection( 'ur', 2, 0 ) }
          ${ connection( 'h', 2, 0 ) }
          ${ arrow( 'r', 2, 0 ) }
          ${ table( 0 ) }
          ${ arrow( 'l', 4, 0 ) }
          ${ connection( 'h', 4, 0 ) }
          ${ connection( 'ul', 4, 0 ) }
          <div></div>
          ${ connection( 'v', 2, 4 ) }
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'v', 2, 4 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ arrow( 'u', 1, 0 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'v', 2, 4 ) }
          ${ connection( 'v', 1, 0 ) }

          ${ connection( 'v', 2, 4 ) }
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          ${ connection( 'ur', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'h', 1, 0 ) }
          ${ connection( 'x', 2, 4, 1, 0 ) }
          ${ connection( 'ul', 1, 0 ) }

          ${ connection( 'ur', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'h', 2, 4 ) }
          ${ connection( 'ul', 2, 4 ) }
          <div></div>
        </div>
      `;
    }

    /**
     * Returns the HTML template for a scheme table.
     * @param {table_nr} table - Table number
     * @returns {*}
     */
    function table( table ) {

      /**
       * Input data for table attributes
       * @type {number[]}
       */
      const input_table = input[ table ] && input[ table ].map( attr => attr & ~arrows_mask );

      /**
       * Solution data for table attributes
       * @type {number[]}
       */
      const solution_table = solution && solution[ table ] && solution[ table ].map( attr => attr & ~arrows_mask );

      // Table not created? => Render 'add table' button
      if ( !input_table )
        return html`
          <div>
            <button type="button" class="btn btn-${ solution ? ( solution_table === input_table ? 'success' : 'danger' ) : 'primary' } btn-sm text-nowrap" ?data-hidden=${ is_solution } ?disabled=${ solution } @click=${ () => app.events.onAddTable( table ) }>+ <span data-lang="main_table">${ app.text.main_table }</span>: "${ table ? phrase.entities[ table - 1 ] : phrase.relation || app.text.hierarchy_is }"</button>
          </div>
        `;

      // Table created? => Render table
      return html`
        <div class="box border text-nowrap bg-${ solution ? ( solution_table && solution_table.toString() === input_table.toString() ? 'success' : 'danger' ) : 'white' }">
          
          <!-- Table Header -->
          <header class="bg-${ solution ? ( !!solution_table === !!input_table ? 'success' : 'danger' ) : 'light' } border-bottom p-2 d-flex justify-content-center align-items-center">
            
            <!-- Edit Attributes Icon -->
            <span class="icon d-flex align-items-center" ?data-invisible=${ solution } @click=${ () => app.events.onEditTable( table ) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-primary" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
            </span>
            
            <!-- Table Name -->
            <span class="mx-2">${ getTableName( app, phrase, table ) }</span>

            <!-- Remove Table Icon -->
            <span class="icon d-flex align-items-center" ?data-invisible=${ solution || is_solution } @click=${ () => app.events.onRemoveTable( table ) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
              </svg>
            </span>
            
          </header>
          
          <!-- Table Body -->
          <main>
            
            <!-- Table Attributes -->
            <div class="p-1">
              ${ input_table.map( ( value, i ) => attr( i ) ) }
            </div>
            
            <!-- Composed Primary Key -->
            ${ key( 'pk' ) }
            
            <!-- Composed Alternate Key -->
            ${ key( 'ak' ) }
            
          </main>
          
        </div>
      `;

      /**
       * Returns the HTML template for a table attribute.
       * @param {number} i - Attribute index in the table
       * @returns {*}
       */
      function attr( i ) {

        /**
         * Current bit mask of the table attribute.
         * @type {number}
         */
        const input_attr = input_table[ i ];

        /**
         * Bit mask of the solution for the table attribute.
         * @type {number}
         */
        const solution_attr = solution && solution_table && solution_table[ i ];

        return html`
          <div class="${ solution ? 'bg-' + ( solution_attr === input_attr ? 'success' : 'danger' ) + ' ' : '' }rounded d-flex align-items-center px-1" ?data-hidden=${ !input_attr }>
            <span class="me-1">${ getAttributeName( app, phrase, i ) }</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 2 ) === ( input_attr & 1 << 2 ) ? 'success' : 'danger' ) : 'primary' } ms-1" ?data-hidden=${ !( input_attr & 1 << 2 ) || input_table.filter( value => value & 1 << 2 ).length > 1 }>${ app.text.badge_pk }</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 3 ) === ( input_attr & 1 << 3 ) ? 'success' : 'danger' ) : 'success' } ms-1" ?data-hidden=${ !( input_attr & 1 << 3 ) || input_table.filter( value => value & 1 << 3 ).length > 1 }>${ app.text.badge_ak }</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 4 ) === ( input_attr & 1 << 4 ) ? 'success' : 'danger' ) : 'warning' } ms-1" ?data-hidden=${ !( input_attr & 1 << 4 ) }>${ app.text.badge_fk }0</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 5 ) === ( input_attr & 1 << 5 ) ? 'success' : 'danger' ) : 'warning' } ms-1" ?data-hidden=${ !( input_attr & 1 << 5 ) }>${ app.text.badge_fk }1</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 6 ) === ( input_attr & 1 << 6 ) ? 'success' : 'danger' ) : 'warning' } ms-1" ?data-hidden=${ !( input_attr & 1 << 6 ) }>${ app.text.badge_fk }2</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 7 ) === ( input_attr & 1 << 7 ) ? 'success' : 'danger' ) : 'warning' } ms-1" ?data-hidden=${ !( input_attr & 1 << 7 ) }>${ app.text.badge_fk }3</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 8 ) === ( input_attr & 1 << 8 ) ? 'success' : 'danger' ) : 'warning' } ms-1" ?data-hidden=${ !( input_attr & 1 << 8 ) }>${ app.text.badge_fk }4</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 0 ) === ( input_attr & 1 << 0 ) ? 'success' : 'danger' ) : 'light' } ${ solution ? '' : 'text-dark' } ms-1" ?data-hidden=${ !( input_attr & 1 << 0 ) }>${ app.text.badge_opt }</span>
            <span class="badge bg-${ solution ? ( ( solution_attr & 1 << 1 ) === ( input_attr & 1 << 1 ) ? 'success' : 'danger' ) : 'light' } ${ solution ? '' : 'text-dark' } ms-1" ?data-hidden=${ !( input_attr & 1 << 1 ) }>${ app.text.badge_man }</span>
          </div>
        `;
      }

      /**
       * Returns the HTML template for a composite key.
       * @param {string} id - Key ID ('pk' or 'ak')
       * @returns {*}
       */
      function key( id ) {
        let bit, color;
        switch ( id ) {
          case 'pk': bit = 4; color = 'primary'; break;
          case 'ak': bit = 8; color = 'success'; break;
        }
        return html`
          <div class="border-top px-2 py-1 d-flex" ?data-hidden=${ input_table.filter( value => value & bit ).length < 2 }>
            <div>
              <span class="badge bg-${ color }">${ app.text[ 'badge_' + id ] }</span>
            </div>
            <div class="ps-2">
              ${ input_table.map( ( value, i ) => html`<div>${ value & bit ? getAttributeName( app, phrase, i ) : '' }</div>` ) }
            </div>
          </div>
        `;
      }

    }

    /**
     * Returns the HTML template for a part of a connection between two scheme tables.
     * @param {string} line_id - 'v': vertical, 'h': horizontal, 'l': left, 'r': right, 'u': up, 'd': down, 'ur': up right, 'ul': up left, 'rd': right down, 'dl': down left, 'x': cross
     * @param {table_nr} a - Table number of the first table of the first connection.
     * @param {table_nr} b - Table number of the second table of the first connection.
     * @param {table_nr} [c] - Table number of the first table of the second connection (only when the connecting lines of two table connections cross each other).
     * @param {table_nr} [d] - Table number of the second table of the second connection.
     * @returns {*}
     */
    function connection( line_id, a, b, c, d ) {
      if ( line_id === 'x' ) {
        const v = isConnected( a, b );
        const h = isConnected( c, d );
        if ( !v && !h ) return html`<div></div>`;
        if (  v && !h ) return line( 'v' );
        if ( !v &&  h ) return line( 'h' );
        if (  v &&  h ) return line( 'x' );
      }
      return isConnected( a, b ) ? line( line_id ) : html`<div></div>`;
    }

    /**
     * Returns the HTML template for a line as part of a connection between two scheme tables.
     * @param {string} line_id - 'v': vertical, 'h': horizontal, 'l': left, 'r': right, 'u': up, 'd': down, 'ur': up right, 'ul': up left, 'rd': right down, 'dl': down left, 'x': cross
     * @returns {*}
     */
    function line( line_id ) {
      if ( line_id === 'x' ) return html`
          <div class="line-x">
            <svg viewBox="0 0 18 26">
              <line x1="9" y1="0" x2="9" y2="26" stroke="black" stroke-width="2"/>
              <line x1="0" y1="13" x2="18" y2="13" stroke="black" stroke-width="2"/>
            </svg>
          </div>
        `;
      return html`<div class="line-${ line_id }"></div>`;
    }

    /**
     * Returns the HTML template for an arrow as endpoint of a connection between two scheme tables.
     * @param {string} arrow_id - 'l': left, 'r': right, 'u': up, 'd': down
     * @param {table_nr} from - Number of the table from which the connection starts.
     * @param {table_nr} to - Number of the table to which the connection goes.
     * @returns {*}
     */
    function arrow( arrow_id, from, to ) {
      if ( isConnected( from, to ) ) {
        const $arrow = () => {
          switch ( arrow_id ) {
            case 'l':
            case 'r':
              return html`
                  <div class="arrow-${ arrow_id }">
                    <svg viewBox="0 0 18 26">
                      <line x1="0" y1="12" x2="10" y2="12" stroke="black" stroke-width="2"></line>
                      <polygon points="10,8 18,12 10,17" style="fill:black"></polygon>
                    </svg>
                  </div>
                `;
            case 'u':
            case 'd':
              return html`
                  <div class="arrow-${ arrow_id }">
                    <svg viewBox="0 0 18 26">
                      <polygon points="5,8 9,0 13,8" style="fill:black"></polygon>
                      <line x1="9" y1="8" x2="9" y2="26" stroke="black" stroke-width="2"></line>
                    </svg>
                  </div>
                `;
          }
        };
        const $line = () => line( arrow_id === 'r' || arrow_id === 'l' ? 'h' : 'v' );
        if ( app.auto_arrows )
          return hasRef( from, to ) ? $arrow() : $line();
        const input_attr = input[ from ][ to ];
        const input_bit = input_attr & 1 << ( 9 + to );
        const solution_attr = solution && solution[ from ] && solution[ from ][ to ];
        const solution_bit = solution_attr & 1 << ( 9 + to );
        return html`
          <div class="endpoint d-flex justify-content-center align-items-center${ solution ? ' bg-' + ( input_bit === solution_bit ? 'success' : 'danger' ) : '' }">
            <select required ?disabled=${ solution || is_solution } @change=${ event => app.events.onArrow( event.target.value, from, to ) }>
              <option value=""></option>
              <option value="line" ?selected=${ !input_bit && is_solution }>—</option>
              <option value="arrow" ?selected=${ input_bit }>→</option>
            </select>
            <div ?data-hidden=${ input_attr & input_bit }>
              ${ $line() }
            </div>
            <div ?data-hidden=${ !( input_attr & input_bit ) }>
              ${ $arrow() }
            </div>
          </div>
        `;
      }
      return html`<div class="arrow-${ arrow_id }"></div>`;
    }

  }

  /**
   * Checks if two tables are connected.
   * @param {table_nr} a - table
   * @param {table_nr} b - another table
   * @returns {boolean}
   */
  function isConnected( a, b ) {
    return hasRef( a, b ) || hasRef( b, a );
  }

  /**
   * Checks if a table has a reference (foreign key) to another table.
   * @param {table_nr} from - Table potentially referencing another table.
   * @param {table_nr} to - Table that is potentially referenced.
   * @returns {boolean}
   */
  function hasRef( from, to ) {
    const value = result.input[ from ] && ( result.input[ to ] || is_recursive && to === 2 ) && result.input[ from ][ to ];
    return !!( value & 1 << 4 || value & 1 << 5 || value & 1 << 6 || value & 1 << 7 || value & 1 << 8 );
  }

  /**
   * Returns the HTML template for a comment.
   * @param {string} index - Comment index in config
   * @param {boolean} condition - Condition under which the comment is displayed.
   * @returns {*}
   */
  function comment( index, condition ) {
    return condition ? html`<div class="alert alert-info my-2 text-wrap" role="alert" data-lang="comment_${ index }">${ app.text[ 'comment_' + index ] }</div>` : html`<div></div>`;
  }

}

/**
 * Returns the HTML template of the legend table that shows the different notations in the ER diagram.
 * @param {object} app - App instance
 * @returns {*}
 */
export function legend( app ) {
  const ids = [ '1', 'c', 'n', 'cn' ];
  return html`
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          ${ ids.map( id => html`<th scope="col" data-lang="legend_${ id }">${ app.text[ 'legend_' + id ] }</th>`) }
        </tr>
      </thead>
      <tbody>
        ${ Object.values( app.notations ).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map( notation => html`
          <tr>
            <th scope="row" style="vertical-align: middle">${ notation.title }</th>
            ${ ids.map( ( id, i ) => html`<td><img src="${ notation.images[ i + 1 ] }"></td>` ) }
          </tr>
        ` ) }
      </tbody>
    </table>
  `;
}

/**
 * Returns the HTML template for the title of the table dialog.
 * @param {object} app - App instance
 * @param {table_nr} table - Table number
 * @returns {*}
 */
export function tableDialogTitle( app, table ) {
  const data = app.getValue();
  const phrase = data.phrases[ data.results.length - 1 ];
  return html`
    <span data-lang='table'>${ app.text.table }</span>: ${ table && phrase.entities[ table - 1 ] || phrase.relation || app.text.hierarchy_is }
  `;
}

/**
 * Returns the HTML template for the body of the table dialog.
 * @param {object} app - App instance
 * @param {table_nr} table - Table number
 * @returns {*}
 */
export function tableDialogBody( app, table ) {
  const data = app.getValue();
  const phrase = data.phrases[ data.results.length - 1 ];
  const result = data.results[ data.results.length - 1 ];
  return html`
    <table class="table table-bordered table-striped text-nowrap">
      <tbody>
        ${ result.input[ table ].map( ( _, i, arr ) => attr( i ) ) }
      </tbody>
    </table>
  `;

  /**
   * Returns the HTML template for a row of a table attribute.
   * @param {table_nr} attr - Table that references the attribute as a foreign key.
   * @returns {*}
   */
  function attr( attr ) {
    return html`
      <tr>
        <td>
          ${ getAttributeName( app, phrase, attr ) }
        </td>
        <td>
          <span class="badge ${ result.input[ table ][ attr ] & 1 << 2 ? 'on' : 'off' } bg-primary" @click=${ () => app.events.onToggleBadge( table, attr, 2 ) }>${ app.text.badge_pk }</span>
          <span class="badge ${ result.input[ table ][ attr ] & 1 << 3 ? 'on' : 'off' } bg-success" @click=${ () => app.events.onToggleBadge( table, attr, 3 ) }>${ app.text.badge_ak }</span>
          <span class="badge ${ result.input[ table ][ attr ] & 1 << attr + 4 ? 'on' : 'off' } bg-warning" ?data-invisible=${ app.hide_own_fk && table === attr } @click=${ () => app.events.onToggleBadge( table, attr, attr + 4 ) }>${ app.text.badge_fk }${ attr }</span>
          <span class="d-inline-flex">
            <span class="badge left ${ result.input[ table ][ attr ] & 1 ? 'on' : 'off' } bg-secondary" @click=${ () => app.events.onToggleBadge( table, attr, 0 ) }>${ app.text.badge_opt }</span>
            <span class="badge right ${ result.input[ table ][ attr ] & 1 << 1 ? 'on' : 'off' } bg-secondary" @click=${ () => app.events.onToggleBadge( table, attr, 1 ) }>${ app.text.badge_man }</span>
          </span>
        </td>
      </tr>
    `;
  }

}

/**
 * Returns the HTML template for the footer of the table dialog.
 * @param {object} app - App instance
 * @returns {*}
 */
export function tableDialogFooter( app ) {
  return html`
    <div data-lang="table_dialog_info">${ app.text.table_dialog_info }</div>
    <div class="d-flex flex-wrap mt-2">
      <div class="me-2 mb-1 d-flex align-items-center">
        <span class="badge bg-primary" data-lang="badge_pk">${ app.text.badge_pk }</span>:&nbsp;
        <span data-lang="badge_pk_title">${ app.text.badge_pk_title }</span>
      </div>
      <div class="me-2 mb-1 d-flex align-items-center">
        <span class="badge bg-success" data-lang="badge_ak">${ app.text.badge_ak }</span>:&nbsp;
        <span data-lang="badge_ak_title">${ app.text.badge_ak_title }</span>
      </div>
      <div class="me-2 mb-1 d-flex align-items-center">
        <span class="badge bg-warning" data-lang="badge_fk">${ app.text.fk }</span>:&nbsp;
        <span data-lang="badge_fk_title">${ app.text.badge_fk_title }</span>
      </div>
    </div>
  `;
}

/**
 * Returns the name of a table.
 * @param {object} app - App instance
 * @param {phrase_data} phrase - Phrase to which the table belongs.
 * @param {table_nr} table - Table number
 * @returns {string}
 */
function getTableName( app, phrase, table ) {
  return table && phrase.entities[ table - 1 ] || phrase.relation || app.text.hierarchy_is;
}

/**
 * Returns the name of a table attribute.
 * @param {object} app - App instance
 * @param {phrase_data} phrase - Phrase to which the attribute belongs.
 * @param {table_nr} attr - Table that references the attribute as a foreign key.
 * @returns {string}
 */
function getAttributeName( app, phrase, attr ) {
  const getRole = entity_nr => attr && phrase.roles && phrase.roles[ entity_nr - 1 ];
  const is_recursive = phrase.entities.length === 2 && phrase.entities[ 0 ] === phrase.entities[ 1 ];
  const name = getTableName( app, phrase, attr );
  return toID( getRole( attr ) || is_recursive && attr === 2 && !getRole( 1 ) && name + '2' || name );
}

/**
 * Converts a string to an identifier in snake case.
 * @param {string} str
 * @returns {string}
 * @example
 * toID('Person') // => person_id
 */
function toID( str ) {
  return str.toLowerCase().trim().replace( /ä/g, 'ae' ).replace( /ö/g, 'oe' ).replace( /ü/g, 'ue' ).replace( /ß/g, 'ss' ).replace( /\W/g, '_' ) + '_id';
}
