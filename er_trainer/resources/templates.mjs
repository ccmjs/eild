/**
 * @overview HTML templates of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - app instance
 * @param {Object} data - app state data
 * @param {Object} phrase - phrase data
 * @param {number} phrase_nr - number of current phrase
 * @param {function} onNotationChange - when selected entry for displayed notation changes
 * @param {function} onLegendClick - when 'legend' button is clicked
 * @param {function} onLeftInputChange - when selected entry of left selector box changes
 * @param {function} onRightInputChange - when selected entry of right selector box changes
 * @param {function} onCancelClick - when 'cancel' button is clicked
 * @param {function} onSubmitClick - when 'submit' button is clicked
 * @param {function} onNextClick - when 'next' button is clicked
 * @param {function} onFinishClick - when 'finish' button is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, phrase, phrase_nr, onNotationChange, onLegendClick, onLeftInputChange, onRightInputChange, onCancelClick, onSubmitClick, onNextClick, onFinishClick ) {
  let { centered, comment, images, left, swap } = app.notations[ data.notation ];
  const section = data.sections[ phrase_nr - 1 ];
  return html`
    <h1 class="mx-3">${app.text.title}</h1> <!-- Title -->
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">
      <div id="heading" class="p-2 pr-3">${section.correct===undefined?app.text.heading:(section.correct?app.text.correct:app.text.failed)}</div> <!-- Heading -->
      <div class="d-flex align-items-center text-nowrap px-2">

        <!-- Notation Selection -->
        <section ?data-hidden=${Object.keys(app.notations).length===1}>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b>${app.text.notation}</b></label>
            <select id="notation-input" class="form-control ml-2" @change=${onNotationChange}>
              ${Object.values(app.notations).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map(({key,title})=>html`<option value="${key}" ?selected=${data.notation===key}>${title}</option>`)}
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ml-2" ?data-hidden=${!app.legend}>
          <button class="btn btn-link" @click=${onLegendClick}>${app.text.legend}</button>
        </section>
        
      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>
        
        <!-- Phrase -->
        <section class="lead text-nowrap px-2 py-3">
          <b>${app.ccm.helper.html(app.text.phrase,phrase_nr.toString())}</b>
          <span class="text-wrap">${phrase.text}</span>
        </section>
        
        <!-- Diagram -->
        <section class="px-2 py-3">
          <div class="d-flex justify-content-between lead">
            <div>${app.text.entity1}</div>
            <div>${app.text.entity2}</div>
          </div>
          <div id="diagram" class="d-flex justify-content-between align-items-center">
            <div class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[swap?1:0]===section.solution[swap?1:0]?'correct':'failed')}">
              ${phrase.relationship[0]}
            </div>
            <div>
              <img id="left" class="${left}" src="${images[app.values.indexOf(section.input[swap?1:0])+1]}">
            </div>
            <div class="filler"></div>
            <div id="name">
              <img id="middle" src="${images[5]}">
              <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
            </div>
            <div class="filler"></div>
            <div>
              <img id="right" src="${images[app.values.indexOf(section.input[swap?0:1])+1]}">
            </div>
            <div class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[swap?0:1]===section.solution[swap?0:1]?'correct':'failed')}">
              ${phrase.relationship[2]}
            </div>
          </div>
        </section>

        <!-- Selector Boxes -->
        <section class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${section.correct!==undefined}>
          <div class="d-flex align-items-center pr-2">
            <label for="input1" class="m-0 text-nowrap"><b>${app.text.input1}</b></label>
            <select id="input1" class="form-control ml-2" @change=${onLeftInputChange}>
              ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[0])+1===i}>${caption}</option>`)}
            </select>
          </div>
          <div class="d-flex align-items-center pl-2">
            <label for="input2" class="m-0 text-nowrap"><b>${app.text.input2}</b></label>
            <select id="input2" class="form-control ml-2" @change=${onRightInputChange}>
              ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[1])+1===i}>${caption}</option>`)}
            </select>
          </div>
        </section>

        <!-- Notation Comment -->
        <section ?data-hidden=${!comment||app.feedback&&section.correct!==undefined}>
          <div class="alert alert-info mt-3 mb-0" role="alert">${comment}</div>
        </section>

        <!-- Phrase Comments -->
        <section class="d-flex justify-content-between" ?data-hidden=${!app.feedback||section.correct===undefined||section.correct||!phrase.comment||!phrase.comment[0]&&!phrase.comment[1]}>
          <div class="mr-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${section.input[swap?1:0]===section.solution[swap?1:0]||phrase.comment&&!phrase.comment[swap?1:0]}>${phrase.comment&&phrase.comment[0]}</div>
          </div>
          <div class="ml-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${section.input[swap?0:1]===section.solution[swap?0:1]||phrase.comment&&!phrase.comment[swap?0:1]}>${phrase.comment&&phrase.comment[1]}</div>
          </div>
        </section>
        
        <!-- Correct Solution -->
        <section class="d-flex flex-column align-items-center px-2" ?data-hidden=${!app.feedback||!app.show_solution||section.correct===undefined||section.correct}>
          <div class="lead">${app.text.correct_solution}</div>
          <div class="d-flex align-items-center mt-3">
            <div>
              <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[swap?1:0])+1]}">
            </div>
            <div id="name">
              <img id="middle" src="${images[5]}">
              <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
            </div>
            <div>
              <img id="right" src="${images[app.values.indexOf(section.solution[swap?0:1])+1]}">
            </div>
          </div>
        </section>

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1" @click=${onCancelClick} ?data-hidden=${!app.oncancel}>${app.text.cancel}</button>
          <button class="btn btn-primary m-1" @click=${onSubmitClick} ?data-hidden=${section.correct!==undefined||!section.input[0]||!section.input[1]}>${app.text.submit}</button>
          <button class="btn btn-secondary m-1" @click=${onNextClick} ?data-hidden=${section.correct===undefined||phrase_nr===app.number}>${app.text.next}</button>
          <button class="btn btn-success m-1" @click=${onFinishClick} ?data-hidden=${section.correct===undefined||phrase_nr<app.number||!app.onfinish}>${app.text.finish}</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-2" ?data-hidden=${!app.feedback}>
          <small id="current_state">${app.ccm.helper.html(app.text.current_state,data.correct.toString(),data.total.toString())}</small>
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
          ${app.text.selection.map((selection,i)=>!i?'':html`<th scope="col">${selection}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${Object.values(app.notations).map(notation=>html`
          <tr>
            <th scope="row" style="vertical-align: middle">${notation.title}</th>
            ${app.text.selection.map((selection,i)=>!i?'':html`<td><img src="${notation.images[i]}"></td>`)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
}
