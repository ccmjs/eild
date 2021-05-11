/**
 * @overview HTML templates of ccmjs-based web component for ER model to logical scheme training
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
 * @param {function} onLeftTableButtonClick - when left table button is clicked
 * @param {function} onMiddleTableButtonClick - when middle table button is clicked
 * @param {function} onRightTableButtonClick - when right table button is clicked
 * @param {function} onRemoveTableClick - when a button to remove a table is clicked
 * @param {function} onCancelClick - when 'cancel' button is clicked
 * @param {function} onSubmitClick - when 'submit' button is clicked
 * @param {function} onNextClick - when 'next' button is clicked
 * @param {function} onFinishClick - when 'finish' button is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, phrase, phrase_nr, onNotationChange, onLegendClick, onLeftTableButtonClick, onMiddleTableButtonClick, onRightTableButtonClick, onRemoveTableClick, onRemoveTableAttributeClick, onCancelClick, onSubmitClick, onNextClick, onFinishClick ) {
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

        <!-- Notation Comment -->
        <section ?data-hidden=${!comment}>
          <div class="alert alert-info mt-3 mb-0" role="alert">${comment}</div>
        </section>

        <!-- Diagram -->
        <section class="px-2 pt-3">
          <div class="d-flex justify-content-between lead text-nowrap">
            <div class="pr-1">${app.text.entity1}</div>
            <div class="pl-1">${app.text.entity2}</div>
          </div>
          <div id="diagram" class="text-center">
            <div class="entity border rounded p-3 text-nowrap">
              ${phrase.relationship[0]}
            </div>
            <div>
              <img id="left" class="${left}" src="${images[app.values.indexOf(section.solution[swap?1:0])+1]}">
            </div>
            <div class="filler"></div>
            <div id="name">
              <img id="middle" src="${images[5]}">
              <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
            </div>
            <div class="filler"></div>
            <div>
              <img id="right" src="${images[app.values.indexOf(section.solution[swap?0:1])+1]}">
            </div>
            <div class="entity border rounded p-3 text-nowrap">
              ${phrase.relationship[2]}
            </div>
          </div>
        </section>

        <!-- "Add Table" Buttons -->
        <section id="table_buttons" class="p-2 text-nowrap">
          <div class="text-left">
            <button class="btn btn-primary btn-sm" @click=${onLeftTableButtonClick} ?data-invisible=${section.input[0]!==null}>+ ${section.relationship[0]}"${app.text.table}</button>
          </div>
          <div class="mx-2 text-center">
            <button class="btn btn-primary btn-sm" @click=${onMiddleTableButtonClick} ?data-invisible=${section.input[1]!==null}>+ "${section.relationship[1]}"${app.text.table}</button>
          </div>
          <div class="text-right">
            <button class="btn btn-primary btn-sm" @click=${onRightTableButtonClick} ?data-invisible=${section.input[2]!==null}>+ "${section.relationship[2]}"${app.text.table}</button>
          </div>
        </section>
        
        <!-- Logical Scheme Tables -->
        <section id="tables" class="px-2 text-nowrap">
          <div>
            <div class="scheme border" ?data-invisible=${section.input[0]===null}>
              <header class="bg-light border-bottom px-3 py-2 d-inline-flex justify-content-center align-items-center">
                <span>${section.relationship[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16" @click=${()=>onRemoveTableClick(0)}>
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
              </header>
              <main class="px-3 py-2">
                ${section.input[0] && section.input[0].map( ( key, i ) => attr( section, 0, i, onRemoveTableAttributeClick ) )}
                <button class="btn btn-link btn-sm mt-1 p-0">+ Schlüsselattribut</button>
              </main>
            </div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div class="scheme border" ?data-invisible=${section.input[1]===null}>
              <header class="bg-light border-bottom px-3 py-2 d-inline-flex justify-content-center align-items-center">
                <span>${section.relationship[1]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16" @click=${()=>onRemoveTableClick(1)}>
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
              </header>
              <main class="px-3 py-2">
                ${section.input[1] && section.input[1].map( ( key, i ) => attr( section, 1, i, onRemoveTableAttributeClick ) )}
                <button class="btn btn-link btn-sm mt-1 p-0">+ Schlüsselattribut</button>
              </main>
            </div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div class="scheme border" ?data-invisible=${section.input[2]===null}>
              <header class="bg-light border-bottom px-3 py-2 d-inline-flex justify-content-center align-items-center">
                <span>${section.relationship[2]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16" @click=${()=>onRemoveTableClick(2)}>
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
              </header>
              <main class="px-3 py-2">
                ${section.input[2] && section.input[2].map( ( key, i ) => attr( section, 2, i, onRemoveTableAttributeClick ) )}
                <button class="btn btn-link btn-sm mt-1 p-0">+ Schlüsselattribut</button>
              </main>
            </div>
          </div>
        </section>

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1" @click=${onCancelClick} ?data-hidden=${!app.oncancel}>${app.text.cancel}</button>
          <button class="btn btn-primary m-1" @click=${onSubmitClick} ?data-hidden=${true||section.correct!==undefined||!section.input[0]||!section.input[1]}>${app.text.submit}</button>
          <button class="btn btn-secondary m-1" @click=${onNextClick} ?data-hidden=${section.correct===undefined||phrase_nr===app.number}>${app.text.next}</button>
          <button class="btn btn-success m-1" @click=${onFinishClick} ?data-hidden=${section.correct===undefined||phrase_nr<app.number||!app.onfinish}>${app.text.finish}</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-2" ?data-hidden=${!app.feedback}>
          <small id="current_state">${app.ccm.helper.html(app.text.current_state,data.correct.toString(),data.total.toString())}</small>
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

/**
 * returns the HTML template for key attribute in logical scheme
 * @param {Object} section - section data
 * @param {number} table - table index (0: left, 1: middle, 2: right)
 * @param {number} attr - key attribute index (0: first attribute, 1: second attribute, ...)
 * @param {Function} onRemove - when icon to remove the attribute is clicked
 * @returns {TemplateResult} HTML template for key attribute
 */
function attr( section, table, attr, onRemove ) {
  const key = section.input[ table ][ attr ];
  return html`
    <div class="attr py-1 d-flex align-items-center">
      <span>${ ( key.primary && !key.foreign && toKey( section.relationship[ table ] ) || key.foreign && toKey( section.relationship[ key.foreign.to ] ) ) + '_id' }</span>
      ${ key.primary && html`<span class="badge badge-primary">PK</span>` }
      ${ key.foreign && html`<span class="badge badge-warning">FK</span>` }
      ${ key.opt && html`<span class="badge badge-secondary">OPT</span>` }
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16" @click=${ () => onRemove( table, attr ) }>
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
      </svg>
    </div>
  `;
}

function toKey( string ) {
  return string.toLowerCase().trim().replace( /ä/g, 'ae' ).replace( /ö/g, 'oe' ).replace( /ü/g, 'ue' ).replace( /ß/g, 'ss' ).replace( /\W/g, '_' );
}
