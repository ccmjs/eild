/**
 * @overview HTML templates of ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2021-2022
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
import { use, text as input, checkbox, select } from 'https://ccmjs.github.io/akless-components/config_builder/resources/templates.mjs';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, events ) {
  const text = text => new DOMParser().parseFromString( text, 'text/html' ).body.textContent.trim() || '';
  const id = builder.component.name;
  use( config, builder, events, id );

  // adapt initial multiple choice configuration
  config.escape = !config.escape;
  if ( config.lang.toString() === builder.ignore.lang.toString() ) config.lang = 'lang';
  else if ( config.text.toString() === builder.ignore.de.toString() ) config.lang = 'de';
  else if ( config.text.toString() === builder.ignore.en.toString() ) config.lang = 'en';

  return html`
    <header></header>
    <form>
      <div class="accordion m-2" id="${ id }-acc">
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-heading_questions">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-acc_questions" aria-expanded="true" aria-controls="${ id }-acc_questions" data-lang="questions">
              ${ builder.text.questions }
            </button>
          </h2>
          <div id="${ id }-acc_questions" class="accordion-collapse collapse" aria-labelledby="${ id }-heading_questions" data-bs-parent="#${ id }-acc">
            <div class="accordion-body p-0">
              <table class="table table-hover m-0">
                <tbody>
                  ${ repeat( Object.values( config.questions ), question => question.key, ( question, i ) => html`
                    <tr>
                      <th class="align-middle">
                        <div class="d-flex align-items-center">
                          <i class="bi bi-question-square text-primary ms-1 me-2"></i>
                          ${ text( question.text ) }
                        </div>
                      </th>
                      <td class="align-middle p-0">
                        <div class="d-flex justify-content-end align-items-center">
                          <button type="button" class="btn btn-info btn-sm" title="${ builder.text.question_preview }" data-lang="question_preview-title" data-bs-toggle="modal" data-bs-target="#preview" @click=${ () => events.onShowQuestion( question.key ) }>
                            <i class="bi bi-eye"></i>
                          </button>
                          <button type="button" class="btn btn-primary btn-sm ms-1" title="${ builder.text.edit_question }" data-lang="edit_question-title" data-bs-toggle="modal" data-bs-target="#edit" @click=${ () => events.onEdit( question.key ) }>
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button type="button" class="btn btn-danger btn-sm ms-1" title="${ builder.text.delete_question }" data-lang="delete_question-title" @click=${ () => events.onDelete( question.key ) }>
                            <i class="bi bi-trash"></i>
                          </button>
                          <div class="btn-group-vertical mx-2">
                            <i class="bi bi-caret-up-fill" data-lang="move_question_up-title" title="${ builder.text.move_question_up }" ?data-invisible=${ i <= 0 } @click=${ () => events.onMoveUp( question.key ) }></i>
                            <i class="bi bi-caret-down-fill" data-lang="move_question_down-title" title="${ builder.text.move_question_down }" ?data-invisible=${ i >= Object.values( config.questions ).length - 1 } @click=${ () => events.onMoveDown( question.key ) }></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                    ${ repeat( Object.values( question.answers ), answer => answer.key, ( answer, i ) => html`
                      <tr>
                        <td class="align-middle">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-check2-square text-warning ms-1 me-2"></i>
                            ${ text( answer.text ) }
                          </div>
                        </td>
                        <td class="align-middle p-0">
                          <div class="d-flex justify-content-end align-items-center">
                            <span title="${ builder.text.solution }" data-lang="solution-title">
                              <i class="bi bi-circle-fill text-${ answer.solution ? 'success' : 'danger' }" @click=${ () => events.onSwitch( question.key, answer.key ) }></i>
                            </span>
                            <button class="btn btn-primary btn-sm ms-2" type="button" title="${ builder.text.edit_answer }" data-lang="edit_answer-title" data-bs-toggle="modal" data-bs-target="#edit" @click=${ () => events.onEdit( question.key, answer.key ) }>
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm ms-1" type="button" title="${ builder.text.delete_answer }" data-lang="delete_answer-title" @click=${ () => events.onDelete( question.key, answer.key ) }>
                              <i class="bi bi-trash"></i>
                            </button>
                            <div class="btn-group-vertical mx-2">
                              <i class="bi bi-caret-up-fill" data-lang="move_answer_up-title" title="${ builder.text.move_answer_up }" ?data-invisible=${ i <= 0 } @click=${ () => events.onMoveUp( question.key, answer.key ) }></i>
                              <i class="bi bi-caret-down-fill" data-lang="move_answer_down-title" title="${ builder.text.move_answer_down }" ?data-invisible=${ i >= Object.values( question.answers ).length - 1 } @click=${ () => events.onMoveDown( question.key, answer.key ) }></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ` ) }
                    <tr>
                      <td colspan="2">
                        <div class="d-grid">
                          <button class="btn btn-warning btn-sm rounded-0" type="button" @click=${ () => events.onAdd( question.key ) }>
                            <i class="bi bi-plus"></i>
                            <span data-lang="add_answer">${ builder.text.add_answer }</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ` ) }
                </tbody>
              </table>
              <div class="d-grid">
                <button class="btn btn-primary btn-sm rounded-0 border-bottom" type="button" @click=${ () => events.onAdd() }>
                  <i class="bi bi-plus"></i>
                  <span data-lang="add_question">${ builder.text.add_question }</span>
                </button>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button class="btn btn-info btn-sm rounded-0" type="button" @click=${ events.onImportQuestions }>
                    <i class="bi bi-upload"></i>
                    <span class="ps-2" data-lang="import">${ builder.text.import }</span>
                  </button>
                  <input type="file" hidden @change=${ events.onFileSelected }>
                  <button class="btn btn-info btn-sm rounded-0" type="button" @click=${ events.onExportQuestions }>
                    <i class="bi bi-download"></i>
                    <span class="ps-2" data-lang="export">${ builder.text.export }</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="${ id }-heading_settings">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${ id }-acc_settings" aria-expanded="true" aria-controls="${ id }-acc_settings" data-lang="settings">
              ${ builder.text.settings }
            </button>
          </h2>
          <div id="${ id }-acc_settings" class="accordion-collapse collapse" aria-labelledby="heading_settings" data-bs-parent="#${ id }-acc">
            <div class="accordion-body">
              ${ checkbox( { prop: 'feedback', switcher: true } ) }
              ${ checkbox( { prop: 'retry', switcher: true, disabled: !config.feedback } ) }
              ${ checkbox( { prop: 'shuffle', switcher: true } ) }
              ${ checkbox( { prop: 'random', switcher: true } ) }
              ${ checkbox( { prop: 'escape', switcher: true } ) }
              ${ checkbox( { prop: 'save', switcher: true } ) }
              <div class="pt-2"></div>
              ${ select( { prop: 'dark', options: [
                { value: 'auto', inner: builder.text.dark_auto },
                { value: true, inner: builder.text.dark_true },
                { value: false, inner: builder.text.dark_false }
              ] } ) }
              ${ select( { prop: 'lang', options: [
                { value: 'de', inner: builder.text.lang_de },
                { value: 'en', inner: builder.text.lang_en },
                { value: 'multi', inner: builder.text.lang_multi }
              ] } ) }
              ${ input( { prop: 'number', type: 'number' } ) }
            </div>
          </div>
        </div>
      </div>
      <div class="m-2 mt-0">
        <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#preview" ?data-hidden=${ !builder.preview } @click=${ () => events.onShowPreview() }>${ builder.text.preview }</button>
        <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${ !builder.onfinish || !builder.text.submit }>${ builder.text.submit }</button>
      </div>
    </form>
    <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="Edit Text" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content"></div>
      </div>
    </div>
    <div class="modal fade" id="preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content"></div>
      </div>
    </div>
  `;
}

/**
 * returns the HTML for the loading animation
 * @type {string}
 */
export const spinner = `
  <div class="d-flex justify-content-center align-items-center spinner">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`;
