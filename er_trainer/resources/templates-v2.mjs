/**
 * @overview HTML templates of ccmjs-based web component for training of a binary relationship in an ER diagram
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
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, events, phrase, phrase_nr ) {
  let { centered, comment, images, left, swap } = app.notations[ data.notation ];
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
            <select id="notation-input" class="form-control ms-2" @change=${ events.onNotationChange }>
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
          <button class="btn btn-link" @click=${ events.onLegendClick } data-lang="legend">${ app.text.legend }</button>
        </section>

      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>
        
        <!-- Phrase -->
        <section class="lead text-nowrap px-2 py-3">
          <b data-lang="phrase--${ phrase_nr }">${ app.ccm.helper.html( app.text.phrase, phrase_nr.toString() ) }</b>
          <span class="text-wrap">${ phrase.text }</span>
        </section>
        
        <!-- Diagram -->
        <section class="px-2 py-3">
          <div class="d-flex justify-content-between lead">
            <div data-lang="entity1">${ app.text.entity1 }</div>
            <div data-lang="entity2">${ app.text.entity2 }</div>
          </div>
          <div id="diagram" class="d-flex justify-content-between align-items-center">
            <div class="entity border rounded p-3 text-nowrap ${ app.feedback && section.correct !== undefined && ( section.input[ swap ? 1 : 0 ] === section.solution[ swap ? 1 : 0 ] ? 'correct' : 'failed' ) }">
              ${ phrase.relationship[ 0 ] }
            </div>
            <div>
              <img id="left" class="${ left }" src="${ images[ app.values.indexOf( section.input[ swap ? 1 : 0 ] ) + 1 ] }">
            </div>
            <div class="filler"></div>
            <div id="name">
              <img id="middle" src="${ images[ 5 ] }">
              <div class="text-nowrap" ?data-centered=${ centered }>${ phrase.relationship[ 1 ] }</div>
            </div>
            <div class="filler"></div>
            <div>
              <img id="right" src="${ images[ app.values.indexOf( section.input[ swap ? 0 : 1 ] ) + 1 ] }">
            </div>
            <div class="entity border rounded p-3 text-nowrap ${ app.feedback && section.correct !== undefined && ( section.input[ swap ? 0 : 1 ] === section.solution[ swap ? 0 : 1 ] ? 'correct' : 'failed' ) }">
              ${ phrase.relationship[ 2 ] }
            </div>
          </div>
        </section>

        <!-- Selector Boxes -->
        <section class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${ section.correct !== undefined }>
          <div class="d-flex align-items-center pe-2">
            <label for="input1" class="m-0 text-nowrap"><b data-lang="input1">${ app.text.input1 }</b></label>
            <select id="input1" class="form-control ms-2" @change=${ swap ? events.onRightInputChange : events.onLeftInputChange }>
              ${ app.text.selection.map( ( caption, i ) => html`<option value="${ app.values[ i - 1 ] || '' }" ?selected=${ app.values.indexOf( section.input[ swap ? 1 : 0 ] ) + 1 === i } data-lang="selection.${ i }">${ caption }</option>`) }
            </select>
          </div>
          <div class="d-flex align-items-center ps-2">
            <label for="input2" class="m-0 text-nowrap"><b data-lang="input2">${ app.text.input2 }</b></label>
            <select id="input2" class="form-control ms-2" @change=${ swap ? events.onLeftInputChange : events.onRightInputChange }>
              ${ app.text.selection.map( ( caption, i ) => html`<option value="${ app.values[ i - 1 ] || '' }" ?selected=${ app.values.indexOf( section.input[ swap ? 0 : 1 ] ) + 1 === i } data-lang="selection.${ i }">${ caption }</option>`) }
            </select>
          </div>
        </section>

        <!-- Notation Comment -->
        <section ?data-hidden=${ !comment || app.feedback && section.correct !== undefined }>
          <div class="alert alert-info mt-3 mb-0" role="alert">${ comment }</div>
        </section>

        <!-- Phrase Comments -->
        <section class="d-flex justify-content-between" ?data-hidden=${ !app.feedback || section.correct === undefined || section.correct || !phrase.comment || !phrase.comment[ 0 ] && !phrase.comment[ 1 ] }>
          <div class="me-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${ section.input[ swap ? 1 : 0 ] === section.solution[ swap ? 1 : 0 ] || phrase.comment && !phrase.comment[ swap ? 1 : 0 ] }>${ phrase.comment && phrase.comment[ swap ? 1 : 0 ] }</div>
          </div>
          <div class="ms-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${ section.input[ swap ? 0 : 1 ] === section.solution[ swap ? 0 : 1 ] || phrase.comment && !phrase.comment[ swap ? 0 : 1 ] }>${ phrase.comment && phrase.comment[ swap ? 0 : 1 ] }</div>
          </div>
        </section>
        
        <!-- Correct Solution -->
        <section class="d-flex flex-column align-items-center px-2" ?data-hidden=${ !app.feedback || !app.show_solution || section.correct === undefined || section.correct }>
          <div class="lead" data-lang="correct_solution">${ app.text.correct_solution }</div>
          <div class="d-flex align-items-center mt-3">
            <div>
              <img class="${ left }" id="left" src="${ images[ app.values.indexOf( section.solution[ swap ? 1 : 0 ] ) + 1 ] }">
            </div>
            <div id="name">
              <img id="middle" src="${ images[ 5 ] }">
              <div class="text-nowrap" ?data-centered=${ centered }>${ phrase.relationship[ 1 ] }</div>
            </div>
            <div>
              <img id="right" src="${ images[ app.values.indexOf( section.solution[ swap ? 0 : 1 ] ) + 1 ] }">
            </div>
          </div>
        </section>

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button id="cancel" class="btn btn-outline-danger m-1" id="cancel" @click=${ events.onCancelClick } ?data-hidden=${ !app.oncancel } data-lang="cancel">${ app.text.cancel }</button>
          <button id="submit" class="btn btn-primary m-1" @click=${ events.onSubmitClick } ?data-hidden=${ section.correct !== undefined || !section.input[ 0 ] || !section.input[ 1 ] } data-lang="submit">${ app.text.submit }</button>
          <button id="next" class="btn btn-primary m-1" @click=${ events.onNextClick } ?data-hidden=${ section.correct === undefined || phrase_nr === app.number } data-lang="next">${ app.text.next }</button>
          <button id="finish" class="btn btn-success m-1" @click=${ events.onFinishClick } ?data-hidden=${ section.correct === undefined || phrase_nr < app.number || !app.onfinish } data-lang="finish">${ app.text.finish }</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-2" ?data-hidden=${ !app.feedback }>
          <small id="current_state" data-lang="current_state--${ data.correct.toString() }-${ data.total.toString() }">${ app.ccm.helper.html( app.text.current_state, data.correct.toString(), data.total.toString() ) }</small>
        </section>

        <!-- Logos -->
        <section class="mx-3 mt-3 text-center">
          <img src="https://ccmjs.github.io/eild/logos.jpg">
        </section>

      </div>
    </main>
  `;
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
