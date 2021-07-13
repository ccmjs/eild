/**
 * @overview HTML templates of ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} instance - instance of ccmjs-based web component for ER model to relational scheme training
 * @param {Object} state - current app state data
 * @param {Object} phrase - data of current phrase
 * @param {number} phrase_nr - number of current phrase
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( instance, state, phrase, phrase_nr, events ) {

  const notation = instance.notations[ state.notation ];                                                // data of the currently used notation
  const section = state.sections[ phrase_nr - 1 ];                                                      // app state data of current phrase
  const input = section.feedback && section.feedback.show_solution ? section.feedback : section.input;  // current user input data
  const left = section.solution[ 0 ];                                                                   // left cardinality
  const right = section.solution[ 1 ];                                                                  // right cardinality
  const is_single = ( left === 'c' || left === '1' ) && ( right === 'c' || right === '1' );             // is one-to-one relationship
  const is_multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );            // is many-to-many relationship

  return html`
    <h1 class="mx-3">${ instance.text.title }</h1> <!-- Title -->
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">
      <div id="heading" class="p-2 pr-3">${ !section.feedback ? instance.text.heading : ( section.correct ? instance.text.correct : instance.text.failed ) }</div> <!-- Heading -->
      <div class="d-flex align-items-center text-nowrap px-2">

        <!-- Notation Selection -->
        <section ?data-hidden=${ Object.keys( instance.notations ).length === 1 }>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b>${ instance.text.notation }</b></label>
            <select id="notation-input" class="form-control ml-2" @change=${ events.onNotationChange }>
              ${ Object.values( instance.notations ).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map( ( { key, title } ) => html`<option value="${ key }" .selected=${ state.notation === key }>${ title }</option>`)}
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ml-2" ?data-hidden=${ !instance.legend }>
          <button class="btn btn-link" @click=${ events.onLegendClick }>${ instance.text.legend }</button>
        </section>

      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>

        <!-- Phrase -->
        <section class="lead text-nowrap px-2 py-3">
          <b>${ instance.ccm.helper.html( instance.text.phrase, phrase_nr.toString() ) }</b>
          <span class="text-wrap">${phrase.text}</span>
        </section>

        <!-- Diagram -->
        <section class="px-2 pt-3">
          <div class="d-flex justify-content-between lead text-nowrap">
            <div class="pr-1">${ instance.text.entity1 }</div>
            <div class="pl-1">${ instance.text.entity2 }</div>
          </div>
          <div id="diagram" class="text-center">
            <div class="entity border rounded p-3 text-nowrap">
              ${ phrase.relationship[ 0 ] }
            </div>
            <div>
              <img id="left" class="${ notation.left }" src="${ notation.images[ instance.values.indexOf( section.solution[ notation.swap ? 1 : 0 ] ) + 1 ] }">
            </div>
            <div class="filler"></div>
            <div id="name">
              <img id="middle" src="${ notation.images[ 5 ] }">
              <div class="text-nowrap" ?data-centered=${ notation.centered }>${ phrase.relationship[ 1 ] }</div>
            </div>
            <div class="filler"></div>
            <div>
              <img id="right" src="${ notation.images[ instance.values.indexOf( section.solution[ notation.swap ? 0 : 1 ] ) + 1 ] }">
            </div>
            <div class="entity border rounded p-3 text-nowrap">
              ${ phrase.relationship[ 2 ] }
            </div>
          </div>
        </section>

        <!-- "Add Table" Buttons -->
        <section id="table_buttons" class="p-2 text-nowrap">
          ${ addTableButton( 0 ) }
          ${ addTableButton( 1 ) }
          ${ addTableButton( 2 ) }
       </section>

        <!-- Notation Comment
        <section class="comment" ?data-hidden=${ phrase_nr !== 1 || !notation.comment || section.input.keys.find( table => table ) }>
          <div class="alert alert-info mt-3 mb-0" role="alert">${ notation.comment }</div>
        </section>
        -->

        <!-- Relational Scheme Tables -->
        <section id="tables" class="px-2 text-nowrap">
          <div>
            ${ table( 0 ) }
          </div>
          <div>
            ${ arrow( 2, 0, events.onArrowChange ) }
            ${ arrow( 1, 0, events.onArrowChange ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            ${ arrow( 0, 1 ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            ${ arrow( 0, 1, events.onArrowChange ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            <div>
              ${ table( 1 ) }
            </div>
          </div>
          <div>
            ${ arrow( 0, 2 ) }
            ${ arrow( 2, 1, events.onArrowChange ) }
          </div>
          <div>
            ${ arrow( 0, 2 ) }
            ${ arrow( 1, 2 ) }
          </div>
          <div>
            ${ arrow( 0, 2, events.onArrowChange ) }
            ${ arrow( 1, 2, events.onArrowChange ) }
          </div>
          <div>
            ${ table( 2 ) }
          </div>
        </section>

        <!-- Phrase Comments -->
        ${ !section.feedback && !section.input.keys.some( table => table ) && phraseComment( instance.text.comment.create_tables ) || '' }
        ${ !section.feedback && !section.input.keys.every( table => !table || table.some( key => key ) ) && phraseComment( instance.text.comment.add_keys ) || '' }
        ${ !section.feedback && missingArrowheads() && phraseComment( instance.text.comment.missing_arrow ) || '' }
        ${ instance.feedback && section.feedback && ( !section.input.keys[ 0 ] || !section.input.keys[ 2 ] ) && phraseComment( instance.text.comment.missing_entity_table ) || '' }
        ${ instance.feedback && section.feedback && ( section.input.keys[ 0 ] && !section.input.keys[ 0 ][ 3 ] || section.input.keys[ 2 ] && !section.input.keys[ 2 ][ 3 ] ) && phraseComment( instance.text.comment.missing_entity_pk ) || '' }
        ${ instance.feedback && section.feedback && !is_multi && section.input.keys[ 1 ] && phraseComment( instance.text.comment.no_nm_table ) || '' }
        ${ instance.feedback && section.feedback && is_multi && !section.input.keys[ 1 ] && phraseComment( instance.text.comment.missing_nm_table ) || '' }
        ${ instance.feedback && section.feedback && is_multi && section.input.keys[ 1 ] && ( !section.input.keys[ 1 ][ 0 ] || !section.input.keys[ 1 ][ 2 ] ) && phraseComment( instance.text.comment.missing_nm_fk ) || '' }
        ${ instance.feedback && section.feedback && is_multi && section.input.keys[ 1 ] && section.input.keys[ 1 ][ 0 ] && section.input.keys[ 1 ][ 2 ] && ( section.input.keys[ 1 ][ 0 ] !== 'pk' || section.input.keys[ 1 ][ 2 ] !== 'pk' ) && phraseComment( instance.text.comment.missing_nm_pk, 0 ) || '' }
        ${ instance.feedback && section.feedback && is_single && section.input.keys[ 0 ] && section.input.keys[ 2 ] && left === right && !section.input.keys[ 0 ][ 2 ] && phraseComment( instance.text.comment.missing_11_fk, 0 ) || '' }
        ${ instance.feedback && section.feedback && is_single && section.input.keys[ 0 ] && section.input.keys[ 2 ] && left !== right && !section.input.keys[ left === 'c' ? 0 : 2 ][ left === 'c' ? 2 : 0 ] && phraseComment( instance.text.comment.missing_1c_fk, left === 'c' ? 0 : 2 ) || '' }
        ${ instance.feedback && section.feedback && !is_single && !is_multi && section.input.keys[ 0 ] && section.input.keys[ 2 ] && !section.input.keys[ left === 'c' || left === '1' ? 2 : 0 ][ left === 'c' || left === '1' ? 0 : 2 ] && phraseComment( instance.text.comment.missing_1n_fk, left === 'c' || left === '1' ? 2 : 0 ) || '' }
        ${ instance.feedback && section.feedback && is_single && section.input.keys[ 0 ] && section.input.keys[ 2 ] && !section.input.keys[ left === right || left === 'c' ? 0 : 2 ][ left === right || left === 'c' ? 2 : 0 ].startsWith( 'ak' ) && phraseComment( instance.text.comment.missing_ak, left === right || left === 'c' ? 0 : 2 ) || '' }
        ${ instance.feedback && section.feedback && !is_multi && section.input.keys[ 0 ] && section.input.keys[ 2 ] && ( left === 'c' || right === 'c' ) && ( !is_single || left === right ) && phraseComment( instance.text.comment.missing_opt, right === 'c' ? 0 : 2 ) || '' }
        ${ instance.feedback && section.feedback && !is_multi && JSON.stringify( section.input.keys ) === JSON.stringify( section.feedback.keys ) && JSON.stringify( section.input.arrows ) !== JSON.stringify( section.feedback.arrows ) && phraseComment( instance.text.comment.missing_arrowhead, section.input.keys[ 0 ][ 2 ] ? 0 : 2 ) || '' }
        ${ instance.feedback && section.feedback && is_multi && section.input.keys[ 1 ] && section.input.keys[ 1 ][ 0 ] && section.input.keys[ 1 ][ 2 ] && JSON.stringify( section.input.arrows ) !== JSON.stringify( section.feedback.arrows ) && phraseComment( instance.text.comment.missing_arrowhead_nm, 0 ) || '' }
        ${ instance.feedback && section.feedback && left === '1' && right === '1' && JSON.stringify( section.input ) === JSON.stringify( section.feedback ) && phraseComment( instance.text.comment.mandatory_11, 0 ) || '' }
        ${ instance.feedback && section.feedback && left === '1' && right === '1' && JSON.stringify( section.input ) === JSON.stringify( section.feedback ) && phraseComment( instance.text.comment.merge_11 ) || '' }
        ${ instance.feedback && section.feedback && !is_single && !is_multi && ( left === 'n' || right === 'n' ) && JSON.stringify( section.input ) === JSON.stringify( section.feedback ) && phraseComment( instance.text.comment.mandatory_1n, left === 'n' ? 0 : 2 ) || '' }
        ${ instance.feedback && section.feedback && is_multi && ( left === 'n' || right === 'n' ) && JSON.stringify( section.input ) === JSON.stringify( section.feedback ) && phraseComment( instance.text.comment.mandatory_nm, left === 'n' ? 0 : 2 ) || '' }

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1" @click=${ events.onCancelButton } ?data-hidden=${ !instance.oncancel }>${ instance.text.cancel }</button>
          <button class="btn btn-primary m-1" @click=${ events.onSubmitButton } ?data-hidden=${ section.feedback || !tablesConnected() }>${ instance.text.submit }</button>
          <button class="btn btn-warning m-1" @click=${ events.onRetryButton } ?data-hidden=${ section.correct !== false || !instance.retry }>${ instance.text.retry }</button>
          <button class="btn btn-info m-1" @click=${ events.onSolutionButton } ?data-hidden=${ section.correct !== false || !instance.show_solution }>${ section.feedback && section.feedback.show_solution ? instance.text.show_feedback : instance.text.show_solution }</button>
          <button class="btn btn-secondary m-1" @click=${ events.onNextButton } ?data-hidden=${ !section.feedback || phrase_nr === instance.number }>${ instance.text.next }</button>
          <button class="btn btn-primary m-1" @click=${ events.onFinishButton } ?data-hidden=${ !section.feedback || phrase_nr < instance.number || !instance.onfinish }>${ instance.text.finish }</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-3" ?data-hidden=${ !instance.feedback || state.total < 2 }>
          <small id="current_state">${ instance.ccm.helper.html( instance.text.current_state, state.correct.toString(), state.total.toString() ) }</small>
        </section>

      </div>
    </main>
    <footer class="mx-3 mt-3 text-center">
      <img src="https://ccmjs.github.io/eild/logos.jpg"> <!-- Logos -->
    </footer>
  `;

  /**
   * returns the HTML template for an 'add table' button
   * @param {number} table - table index (0: left, 1: middle, 2: right)
   * @returns {TemplateResult} HTML template for an 'add table' button
   */
  function addTableButton( table ) {
    return html`
      <div class="text-${ table === 0 ? 'left' : ( table === 1 ? 'center px-2' : 'right' ) }">
        <button class="btn btn-${ section.feedback ? ( section.feedback.keys[ table ] ? 'danger' : 'success' ) : 'primary' } btn-sm" @click=${ () => events.onAddTable( table ) } .disabled=${ section.feedback } ?data-invisible=${ input.keys[ table ] !== null }>+ "${ section.relationship[ table ] }"${ instance.text.table }</button>
      </div>
    `;
  }

  /**
   * returns the HTML template for relational scheme table
   * @param {number} table - table index (0: left, 1: middle, 2: right)
   * @returns {TemplateResult} HTML template for relational scheme table
   */
  function table( table ) {

    /**
     * key attributes of the tables
     * @type {(string|boolean)[]}
     */
    const keys = input.keys[ table ];

    /**
     * missed key attributes for correct solution
     * @type {(string|boolean)[]}
     */
    const missed_keys = section.feedback && section.feedback.keys[ table ] && keys && section.feedback.keys[ table ].find( ( key, table ) => key && !keys[ table ] );

    /**
     * table has a composite primary key
     * @type {boolean}
     */
    const multi_pk = keys && ( ( keys[ 0 ] === 'pk' ) + ( keys[ 1 ] === 'pk' ) + ( keys[ 2 ] === 'pk' ) + keys[ 3 ] ) > 1;

    return html`
      <div class="scheme border" ?data-invisible=${ keys === null }>
        <header class="bg-${ section.feedback ? ( section.feedback.keys[ table ] ? 'success' : 'danger' ) : 'light' } border-bottom px-3 py-2 d-inline-flex justify-content-center align-items-center">
          <span>${ section.relationship[ table ] }</span>
          <span class="icon" ?data-hidden=${ !keys } @click=${ () => events.onRemoveTable( table ) }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </span>
        </header>
        <main class="p-2">
          <div class="d-flex align-items-stretch border border-primary rounded bg-light" ?data-hidden=${ !multi_pk }>
            <div>
              ${ multi_pk && keys && keys[ 3 ] ? attr( toID( section.relationship[ table ] ), true, false, false, false ) : '' }
              ${ multi_pk && keys && keys.map( ( fk, i ) => i < 3 && fk !== false && fk === 'pk' ? attr( toID( section.relationship[ i ] ), fk === 'pk', i, fk === 'ak', fk === 'opt' ) : '' ) || '' }
            </div>
            <div class="bg-primary d-flex align-items-center">
              <span class="badge badge-primary ml-0" title="${ instance.text.multi_pk_badge }">PK</span>
            </div>
          </div>
          ${ !multi_pk && keys && keys[ 3 ] ? attr( toID( section.relationship[ table ] ), true, false, false, false ) : '' }
          ${ keys && keys.map( ( fk, i ) => i < 3 && fk !== false && !( fk === 'pk' && multi_pk ) ? attr( toID( section.relationship[ i ] ), fk === 'pk', i, fk === 'ak' || fk === 'opt_ak', fk === 'opt' || fk === 'opt_ak' ) : '' ) }
          <div class="px-1 ${ missed_keys ? 'bg-danger' : '' }">
            <button class="btn btn-link btn-sm mt-1 p-0" .disabled=${ section.feedback } ?data-hidden=${ keys && keys[ 3 ] && !addableForeignKey( input.keys, table ) || section.feedback && !missed_keys } @click=${ () => events.onAddAttr( table ) }>+ ${ instance.text.key_attr }</button>
          </div>
        </main>
      </div>
    `;

    /**
     * returns the HTML template for attribute of a relational scheme table
     * @param {string} name - attribute name
     * @param {boolean} pk - is primary key
     * @param {boolean|number} fk - is foreign key to table with given index
     * @param {boolean} ak - is alternative key (or part of it)
     * @param {boolean} opt - is optional attribute
     * @returns {TemplateResult} HTML template for attribute
     */
    function attr( name, pk, fk, ak, opt ) {
      return html`
        <div class="attr p-1 d-flex align-items-center ${ section.feedback && section.feedback.keys[ table ] ? ( fk !== false && keys[ fk ] === section.feedback.keys[ table ][ fk ] || fk === false && pk && keys[ 3 ] === section.feedback.keys[ table ][ 3 ] ? 'bg-success' : 'bg-danger' ) : '' }">
          <span title="${ instance.text.attr_name }">${ name }</span>
          ${ pk && !multi_pk ? html`<span class="badge badge-primary" title="${ instance.text.pk_badge }">PK</span>` : '' }
          ${ fk || fk === 0 ? html`<span class="badge badge-warning" title="${ instance.text.fk_badge }">FK</span>` : '' }
          ${ ak ? html`<span class="badge badge-info" title="${ instance.text.ak_badge }">AK</span>` : '' }
          ${ opt ? html`<span class="badge badge-secondary" title="${ instance.text.opt_badge }">OPT</span>` : '' }
          <span class="icon" title="${ instance.text.remove_attr }" @click=${ () => events.onRemoveAttr( table, fk ) }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </span>
        </div>
      `;
    }

    /**
     * converts a string to a key attribute name
     * @param {string} string
     * @returns {string} key attribute name
     */
    function toID( string ) {
      return string.toLowerCase().trim().replace( /ä/g, 'ae' ).replace( /ö/g, 'oe' ).replace( /ü/g, 'ue' ).replace( /ß/g, 'ss' ).replace( /\W/g, '_' ) + '_id';
    }

  }

  /**
   * returns the HTML template for an arrow line
   * @param {number} [from] - index of the table from which the arrow starts
   * @param {number} [to] - table index
   * @param {Function} [onChange] - when the arrowhead is changed
   * @returns {TemplateResult} HTML template for an arrow line
   */
  function arrow( from, to, onChange ) {
    return html`
      <div class="line" ?data-hidden=${ !input.keys[ from ] || !input.keys[ to ] || !input.keys[ from ][ to ] && !input.keys[ to ][ from ] }>
        <div class="arrowhead ${ section.feedback && section.feedback.keys[ from ] && section.feedback.keys[ to ] && ( section.feedback.keys[ from ][ to ] || section.feedback.keys[ to ][ from ] ) ? ( input.arrows[ from ][ to ] === section.feedback.arrows[ from ][ to ] ? 'bg-success' : 'bg-danger' ) : '' }" ?data-hidden=${ !onChange }>
          <select data-from="${ from }" data-to="${ to }" .value="${ ( input.arrows[ from ][ to ] + 0 ).toString() }" @change=${ onChange }>
            <option value="0">−</option>
            <option value="1">${ from - to > 0 ? '⟵' : '⟶' }</option>
          </select>
          <div class="arrow">
            <div class="filler" ?data-hidden=${ from - to > 0 }></div>
            <div ?data-hidden=${ input.arrows[ from ][ to ] }></div>
            <svg ?data-hidden=${ !input.arrows[ from ][ to ] } height="8" width="8" class="${ from - to > 0 ? 'mirrored' : '' }"><polygon points="0,0 8,4 0,8" style="fill:black"></polygon></svg>
            <div class="filler" ?data-hidden=${ from - to < 0 }></div>
          </div>
        </div>
        <div ?data-hidden=${ onChange }></div>
      </div>
    `;
  }

  /**
   * returns the HTML template for a comment
   * @param {string} text - comment text
   * @param {number} [fk_table] - index of the table that needs a foreign key
   * @returns {TemplateResult} HTML template for a comment
   */
  function phraseComment( text, fk_table ) {
    return html`
      <section class="comment">
        <div class="alert alert-info mt-2 mb-0" role="alert">${ text.replaceAll( '%middle%', phrase.relationship[ 1 ] ).replaceAll( '%fk%', phrase.relationship[ fk_table ] ).replaceAll( '%nofk%', phrase.relationship[ fk_table ? 0 : 2 ] ) }</div>
      </section>
    `;
  }

  /**
   * checks whether there are at least 2 tables and whether each table is connected to at least one other table
   * @returns {boolean}
   */
  function tablesConnected() {

    // less than two tables? => at least two tables required
    if ( input.keys.filter( table => table ).length < 2 ) return false;

    // check for each table => is the table linked to at least one other table?
    for ( let from = 0; from < input.keys.length; from++ )
      if ( input.keys[ from ] )
        if ( !isConnected( from ) )
          return false;
    return true;

    /**
     * checks whether a table is connected to at least one other table
     * @param {number} from - table index (0: left, 1: middle, 2: right)
     * @return {boolean}
     */
    function isConnected( from ) {
      for ( let to = 0; to < input.keys.length; to++ )                         // check for each table:
        if ( from !== to )                                                     // - only other tables
          if ( input.keys[ to ] )                                              // - other table is created?
            if ( input.keys[ from ][ to ] || input.keys[ to ][ from ] )        // - both tables connected with a foreign key?
              if ( input.arrows[ from ][ to ] || input.arrows[ to ][ from ] )  // - connection has an arrow head?
                return true;                                                   // => both tables are connected
      return false;                                                            // => table is not connected
    }

  }

  /**
   * checks whether there are missing arrowheads
   * @returns {boolean}
   */
  function missingArrowheads() {
    for ( let i = 0; i < input.keys.length; i++ )
      if ( input.keys[ i ] )
        for ( let j = 0; j < input.keys[ i ].length; j++ )
          if ( input.keys[ i ][ j ] === 'fk' ) {
            if ( !input.arrows[ i ][ j ] && !input.arrows[ j ][ i ] )
              return true;
          }
    return false;
  }

}

/**
 * returns the HTML template for legend table
 * @param {Object} instance - instance of ccmjs-based web component for ER model to relational scheme training
 * @returns {TemplateResult} HTML template for legend table
 */
export function legend( instance ) {
  return html`
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          ${ instance.text.selection.map( ( selection, i ) => !i ? '' : html`<th scope="col">${ selection }</th>`) }
        </tr>
      </thead>
      <tbody>
        ${ Object.values( instance.notations ).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map( notation => html`
          <tr>
            <th scope="row" style="vertical-align: middle">${ notation.title }</th>
            ${ instance.text.selection.map( ( selection, i ) => !i ? '' : html`<td><img src="${ notation.images[ i ] }"></td>` ) }
          </tr>
        ` ) }
      </tbody>
    </table>
  `;
}

/**
 * returns the HTML template for 'add foreign key' form
 * @param {Object} instance - instance of ccmjs-based web component for ER model to relational scheme training
 * @param {Object} section - app state data of current section
 * @param {number} table - index of the table that will contain the foreign key (0: left, 1: middle, 2: right)
 * @param {Function} onSubmit - when form is submitted
 * @returns {TemplateResult} HTML template for 'attribute form'
 */
export function addKeyForm( instance, section, table, onSubmit ) {

  /**
   * referencable tables
   * @type {number[]}
   */
  const tables = [];

  // determine referencable tables
  for ( let i = 0; i <= 2; i++ )                    // check for each possible table:
    if ( table !== i )                              // - not the table that will contain the foreign key?
      if ( section.input.keys[ i ] )                // - table is created?
        if ( section.input.keys[ i ][ 3 ] )         // - table has an artificial primary key?
          if ( !section.input.keys[ table ][ i ] )  // - table is not already referenced by the table that will contain the foreign key?
            tables.push( i );                       // => table is referencable

  return html`
    <form id="attr-form" @submit=${ onSubmit }>

      <!-- Primary Key -->
      <div class="form-group" title="${ instance.text.pk_input }">
        <input type="checkbox" name="pk" id="key-pk">
        <label class="form-check-label pl-1" for="key-pk">
          ${ instance.text.pk }
          <span class="badge badge-primary" title="${ instance.text.pk_badge }">PK</span>
        </label>
      </div>

      <!-- Foreign Key -->
      <div class="form-group" title="${ instance.text.fk_input }">
        <input type="checkbox" name="fk" id="key-fk" .disabled=${ !addableForeignKey( section.input.keys, table ) }>
        <label class="form-check-label pl-1" for="key-fk">
          ${ instance.text.fk }
          <span class="badge badge-warning" title="${ instance.text.fk_badge }">FK</span>
        </label>
      </div>

      <!-- Referenced Table -->
      <div id="ref_table" class="form-group" title="${ instance.text.ref_table_input }">
        <label for="key-fk-table">${ instance.text.ref_table }</label>
        <select class="form-control" name="table" id="key-fk-table">
          ${ tables.map( table => html`<option value="${ table }">${ section && section.relationship[ table ] }</option>` ) }
        </select>
      </div>

      <!-- Alternative Key -->
      <div class="form-group" title="${ instance.text.ak_input }">
        <input type="checkbox" name="ak" id="key-ak">
        <label class="form-check-label pl-1" for="key-ak">
          ${ instance.text.ak }
          <span class="badge badge-info" title="${ instance.text.ak_badge }">AK</span>
        </label>
      </div>

      <!-- Optional Attribute -->
      <div class="form-group" title="${ instance.text.opt_input }">
        <input type="checkbox" name="opt" id="key-opt">
        <label class="form-check-label pl-1" for="key-opt">
          ${ instance.text.opt }
          <span class="badge badge-secondary" title="${ instance.text.opt_badge }">OPT</span>
        </label>
      </div>
      
    </form>
  `;

}

/**
 * checks for a relational scheme table whether there is at least one other table that could be referenced with a foreign key
 * @param {(string|boolean)[]} keys - key attributes of the tables
 * @param {number} table - index of the table that is checked (0: left, 1: middle, 2: right)
 * @returns {boolean}
 */
function addableForeignKey( keys, table ) {

  for ( let i = 0; i <= 2; i++ )      // check for each possible table:
    if ( table !== i )                // - not the current table?
      if ( keys[ i ] )                // - table is created?
        if ( keys[ i ][ 3 ] )         // - table has an artificial primary key?
          if ( !keys[ table ][ i ] )  // - table is not already referenced by a foreign key in current table?
            return true;              // => table is referencable with another foreign key

  return false;                       // => there is no other table that could be referenced with a foreign key
}
