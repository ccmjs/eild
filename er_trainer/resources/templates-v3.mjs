/**
 * @overview HTML templates of ccmjs-based web component for training of binary relations in an ER diagram
 * @author André Kless <andre.kless@web.de> 2022
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - app instance
 * @param {Object} data - app state data
 * @param {Object.<string,Function>} events - contains all event handlers
 * @param {Object} phrase - phrase data
 * @param {number} phrase_nr - number of current phrase
 * @param {boolean} [show_solution] - reveal correct solution
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, events, phrase, phrase_nr, show_solution ) {
  const notation = app.notations[ data.notation ];
  const section = data.sections[ phrase_nr - 1 ];
  const heading = section.correct === undefined ? 'heading' : ( section.correct ? 'correct' : 'failed' );
  return html`
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mx-3" data-lang="title">${ app.text.title }</h1>
      <aside></aside>
    </div>
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">

      <!-- Heading -->
      <div id="heading" class="p-2 pe-3" data-lang="${ heading }">${ app.text[ heading ] }</div>

      <div class="d-flex align-items-center text-nowrap px-2">

        <!-- Notation Selection -->
        <section ?data-hidden=${ Object.keys( app.notations ).length === 1 }>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b data-lang="notation">${ app.text.notation }</b></label>
            <select id="notation-input" class="form-select ms-2" @change=${ event => events.onNotation( event.target.value, show_solution ) }>
              ${ Object.values( app.notations ).sort( ( a, b ) =>
                a.title.localeCompare( b.title ) ).map( ( { key, title } ) =>
                  html`<option value="${ key }" ?selected=${ data.notation === key }>${ title }</option>`
                )
              }
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ms-2" ?data-hidden=${ !app.legend }>
          <button class="btn btn-link" @click=${ events.onLegend } data-lang="legend">${ app.text.legend }</button>
        </section>

      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>
        
        <!-- Phrase -->
        <section class="lead text-nowrap px-2 py-3" ?data-hidden=${ !phrase.text }>
          <b>
            <span data-lang="phrase">${ app.text.phrase }</span><span ?data-hidden=${ app.phrases.length === 1 }> ${ phrase_nr }/${ app.number }</span>:
          </b>
          <span class="text-wrap">${ phrase.text }</span>
        </section>

        <!-- Diagram -->
        ${ diagram() }

        <!-- Selector Boxes -->
        <section class="px-2 py-3 text-nowrap lead" ?data-hidden=${ section.correct !== undefined }>
          <form id="inputs" @submit=${ event => { event.preventDefault(); events.onSubmit(); } }>
            <div class="row">
              ${ select( 1 ) }
              ${ select( 2 ) }
            </div>
          </form>
        </section>

        <!-- Phrase Comments -->
        <section ?data-hidden=${ !phrase.comments || !app.feedback || section.correct !== false }>
          ${ phrase.entities.map( ( entity, i ) => html`
            <div class="alert alert-info my-2" role="alert" ?data-hidden=${ !phrase.comments || !phrase.comments[ i ] || section.input[ i ] === section.solution[ i ] }>
              ${ phrase.comments && phrase.comments[ i ] }
            </div>
          ` ) }
        </section>

        <!-- Notation Comment -->
        <section ?data-hidden=${ !notation.comment || app.feedback && section.correct !== undefined }>
          <div class="alert alert-info mt-3 mb-0" role="alert">${ notation.comment }</div>
        </section>
        
        <!-- Correct Solution -->
        <div ?data-hidden=${ !show_solution || !app.feedback || !app.show_solution || section.correct !== false }>
          <div class="lead text-center mt-3" data-lang="correct_solution">${ app.text.correct_solution }</div>
          ${ diagram( true ) }
        </div>

        <!-- Buttons -->
        <section id="buttons" class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button id="submit" type="submit" form="inputs" class="btn btn-primary m-1" ?disabled=${ section.correct !== undefined } data-lang="submit">${ app.text.submit }</input>
          <button id="retry" class="btn btn-primary m-1" @click=${ events.onRetry } ?data-hidden=${ !app.retry } ?disabled=${ show_solution || section.correct !== false } data-lang="retry">${ app.text.retry }</button>
          <button id="solution" class="btn btn-primary m-1" @click=${ events.onSolution } ?data-hidden=${ !app.show_solution } ?disabled=${ show_solution || section.correct !== false } data-lang="solution">${ app.text.solution }</button>
          <button id="next" class="btn btn-primary m-1" @click=${ events.onNext } ?disabled=${ section.correct === undefined || phrase_nr === app.number } data-lang="next">${ app.text.next }</button>
          <button id="finish" class="btn btn-primary m-1" @click=${ events.onFinish } ?disabled=${ !app.onfinish || section.correct === undefined || phrase_nr < app.number } data-lang="finish">${ app.text.finish }</button>
        </section>

        <!-- Logos -->
        <section class="mx-3 mt-3 text-center">
          <img src="https://ccmjs.github.io/eild/logos.jpg">
        </section>

      </div>
    </main>
  `;

  /**
   * returns the HTML template for a diagram
   * @param {boolean} [is_solution] - diagram shows correct solution
   * @returns {TemplateResult}
   */
  function diagram( is_solution ) {
    const is_recursive = phrase.entities.length === 2 && phrase.entities[ 0 ] === phrase.entities[ 1 ] && !notation.left;
    return html`
      <section class="diagram px-2 py-3">
        <div class="text-center lead">

          ${ entity( 1 ) }
          ${ connection( 1 ) }
          <div id="relation">
            <img src="${ notation.images[ 5 ] }">
            <div ?data-centered=${ notation.centered }>${ phrase.relation }</div>
          </div>
          ${ connection( 2 ) }
          ${ is_recursive ? line( 1 ) : entity( 2 ) }

          ${ line( 4 ) }
          ${ line( 3 ) }
          ${ line( 3 ) }
          ${ line( 3 ) }
          ${ line( 2 ) }
        </div>
      </section>
    `;

    /**
     * returns the HTML template for an entity connection
     * @param {number} nr - number of the entity
     * @returns {TemplateResult}
     */
    function connection( nr ) {
      return html`
        <div>
          <img class="${ nr === 1 && notation.left || '' }" src="${ notation.images[ app.values.indexOf( section[ is_solution ? 'solution' : 'input' ][ notation.swap ? ( nr > 1 ? 0 : 1 ) : nr - 1 ] ) + 1 ] }">
        </div>
      `;
    }

    /**
     * returns the HTML template for an entity
     * @param {number} nr - number of the entity
     * @returns {TemplateResult}
     */
    function entity( nr ) {
      const check = nr => section.input[ nr - 1 ] === section.solution[ nr - 1 ];
      return phrase.entities[ nr - 1 ] ? html`
        <div class="entity border rounded p-3${ !is_solution && app.feedback && section.correct !== undefined && ( check( nr ) && ( !is_recursive || check( 2 ) )  ? ' correct' : ' failed' ) || '' }">
          ${ phrase.entities[ nr - 1 ] }
        </div>
      ` : html`<div></div>`;
    }

    /**
     * returns the HTML template for a connection line
     * @param {number} nr - line number
     * @returns {TemplateResult}
     */
    function line( nr ) {
      return is_recursive ? html`
        <div class="line${ nr }"></div>
      ` : html`<div></div>`;
    }

  }

  /**
   * returns the HTML template for a selector box
   * @param {number} nr - number of the selector box
   * @returns {TemplateResult}
   */
  function select( nr ) {
    return html`
      <div class="col m-2">
        <label for="input${ nr }" class="m-0">
          <b>${ phrase.entities[ nr - 1 ] + ( phrase.roles && phrase.roles[ nr - 1 ] ? ' (' + phrase.roles[ nr - 1 ] + ')' : '' ) }:</b>
        </label>
        <select id="input${ nr }" class="form-select" required @change=${ event => events.onSelect( nr, event.target.value ) }>
          ${ app.text.selection.map( ( caption, i ) => html`
            <option value="${ app.values[ i - 1 ] || '' }" ?selected=${ i && ( app.values.indexOf( section.input[ notation.swap ? ( nr > 1 ? 1 : 0 ) : nr - 1 ] ) === i - 1 ) } data-lang="selection.${ i }">
              ${ caption }
            </option>`) }
        </select>
      </div>
    `;

  }

}

/**
 * returns the HTML template for legend table
 * @param {Object} app - app instance
 * @returns {TemplateResult} HTML template for legend table
 */
export function legend( app ) {
  return html`
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          ${ app.text.selection.map( ( selection, i ) => !i ? '' : html`<th scope="col" data-lang="selection.${ i }">${ selection }</th>` ) }
        </tr>
      </thead>
      <tbody>
        ${ Object.values( app.notations ).map( notation => html`
          <tr>
            <th scope="row" style="vertical-align: middle">${ notation.title }</th>
            ${ app.text.selection.map( ( selection, i) => !i ? '' : html`<td><img src="${ notation.images[ i ] }"></td>` ) }
          </tr>
        `) }
      </tbody>
    </table>
  `;
}
