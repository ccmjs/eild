/**
 * @overview HTML templates of ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat, unsafeHTML } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
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
  return html`
    <form id="mcb-main-form">
      <div class="accordion" id="mcb-accordion">
        
        <!-- General Settings -->
        <div class="card">
          <div class="card-header p-1" id="mcb-general-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#mcb-general-collapse" aria-expanded="false" aria-controls="mcb-general-collapse">
                ${ builder.text.general_settings }
              </button>
            </h2>
          </div>
          <div id="mcb-general-collapse" class="collapse show" aria-labelledby="mcb-general-heading" data-parent="#mcb-accordion">
            <div class="card-body">

              <!-- Layout -->
              <div class="form-group" ?data-hidden=${ !builder.ignore.css || Object.keys( builder.ignore.css ).length <= 1 }>
                <label for="mcb-css">
                  ${ builder.text.css }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-css" aria-expanded="false" aria-controls="mcb-info-css">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-css">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.css_info ) }
                  </div>
                </div>
                <select class="form-control" name="css" id="mcb-css">
                  ${ Object.values( builder.ignore.css ).map( obj => html`<option value="${ obj.key }" ?selected=${ JSON.stringify( config.css ) === JSON.stringify( obj.value ) }>${ obj.title }</option>` ) }
                </select>
              </div>

              <!-- Number of Questions -->
              <div class="form-group">
                <label for="mcb-number">
                  ${ builder.text.number }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-number" aria-expanded="false" aria-controls="mcb-info-number">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-number">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.number_info ) }
                  </div>
                </div>
                <input type="number" min="1" name="number" class="form-control" id="mcb-number" .value=${ config.number }>
              </div>

              <!-- Shuffle Questions -->
              <div class="form-group" ?data-hidden=${ config.number }>
                <input type="checkbox" name="shuffle" id="mcb-shuffle" ?checked=${ config.shuffle }>
                <label class="form-check-label pl-1" for="mcb-shuffle">
                  ${ builder.text.shuffle }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-shuffle" aria-expanded="false" aria-controls="mcb-info-shuffle">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-shuffle">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.shuffle_info ) }
                  </div>
                </div>
              </div>

              <!-- Random Answers -->
              <div class="form-group">
                <input type="checkbox" name="random" id="mcb-random" ?checked=${ config.random }>
                <label class="form-check-label pl-1" for="mcb-random">
                  ${ builder.text.random }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-random" aria-expanded="false" aria-controls="mcb-info-random">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-random">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.random_info ) }
                  </div>
                </div>
              </div>

              <!-- Enable Feedback -->
              <div class="form-group">
                <input type="checkbox" name="feedback" id="mcb-feedback" ?checked=${ config.feedback }>
                <label class="form-check-label pl-1" for="mcb-feedback">
                  ${ builder.text.feedback }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-feedback" aria-expanded="false" aria-controls="mcb-info-feedback">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-feedback">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.feedback_info ) }
                  </div>
                </div>
              </div>
              
              <!-- Escape HTML -->
              <div class="form-group">
                <input type="checkbox" name="escape" id="mcb-escape" ?checked=${ config.escape }>
                <label class="form-check-label pl-1" for="mcb-escape">
                  ${ builder.text.escape }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-escape" aria-expanded="false" aria-controls="mcb-info-escape">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-escape">
                  <div class="bg-info text-light rounded p-2">
                   ${ unsafeHTML( builder.text.escape_info ) }
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- Questions and Answers -->
        <div class="card">
          <div class="card-header p-1" id="mcb-questions-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#mcb-questions-collapse" aria-expanded="true" aria-controls="mcb-questions-collapse">
                ${ builder.text.questions }
              </button>
            </h2>
          </div>
          <div id="mcb-questions-collapse" class="collapse" aria-labelledby="mcb-questions-heading" data-parent="#mcb-accordion">
            <div class="card-body p-0">
              <table class="table table-hover m-0">
                <tbody>
                  ${ repeat( Object.values( config.questions ), question => question.key, question => html`
                    <tr>
                      <th class="align-middle">
                        <div class="d-flex align-items-center">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-question-square text-primary" viewBox="0 0 16 16">
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                          </div>
                          <div class="ml-2">${ text( question.text ) }</div>
                        </div>
                      </th>
                      <td class="text-right text-nowrap">
                        <button type="button" class="btn btn-info btn-sm" title="${ builder.text.question_preview }" @click=${ () => events.onShowQuestion( question.key ) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" title="${ builder.text.edit_question }" @click=${ () => events.onEdit( question.key ) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" title="${ builder.text.delete_question }" @click=${ () => events.onDelete( question.key ) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                    ${ repeat( Object.values( question.answers ), answer => answer.key, answer => html`
                      <tr>
                        <td class="align-middle">
                          <div class="d-flex align-items-center">
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square text-warning" viewBox="0 0 16 16">
                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"></path>
                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"></path>
                              </svg>
                            </div>
                            <div class="ml-2">${ text( answer.text ) }</div>
                          </div>
                        </td>
                        <td class="text-right text-nowrap">
                          <span title="${ builder.text.solution }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="currentColor" class="bi bi-circle-fill text-${ answer.solution ? 'success' : 'danger' }" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" @click=${ () => events.onSwitch( question.key, answer.key ) }/>
                            </svg>
                          </span>
                          <button type="button" class="btn btn-primary btn-sm" title="${ builder.text.edit_answer }" @click=${ () => events.onEdit( question.key, answer.key ) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                          </button>
                          <button type="button" class="btn btn-danger btn-sm" title="${ builder.text.delete_answer }" @click=${ () => events.onDelete( question.key, answer.key ) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ` ) }
                    <tr>
                      <td colspan="2" class="align-middle">
                        <button type="button" class="btn btn-warning btn-sm btn-block border-bottom" @click=${ () => events.onAdd( question.key ) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                          </svg>
                          ${ builder.text.add_answer }
                        </button>
                      </td>
                    </tr>
                  ` ) }
                </tbody>
              </table>
              <button type="button" class="btn btn-primary btn-sm btn-block border-bottom" @click=${ () => events.onAdd() }>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                ${ builder.text.add_question }
              </button>
              <div class="d-flex flex-direction-column align-items-stretched">
                <button type="button" class="btn btn-info btn-sm btn-block d-flex justify-content-center align-items-center border-right" @click=${ events.onImportQuestions }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                  <span class="pl-2">
                    ${ builder.text.import }
                  </span>
                </button>
                <input type="file" hidden @change=${ events.onFileSelected }>
                <button type="button" class="btn btn-info btn-sm btn-block d-flex justify-content-center align-items-center" @click=${ events.onExportQuestions }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                  <span class="pl-2">
                    ${ builder.text.export }
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Texts and Labels -->
        <div class="card">
          <div class="card-header p-1" id="mcb-texts-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#mcb-texts-collapse" aria-expanded="true" aria-controls="mcb-texts-collapse">
                ${ builder.text.texts_heading }
              </button>
            </h2>
          </div>
          <div id="mcb-texts-collapse" class="collapse" aria-labelledby="mcb-texts-heading" data-parent="#mcb-accordion">
            <div class="card-body">

              <!-- Numbering of Questions -->
              <div class="form-group">
                <label for="mcb-text-question">
                  ${ builder.text.numbering_questions }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-question" aria-expanded="false" aria-controls="mcb-info-text-question">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-question">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.numbering_questions_info ) }
                  </div>
                </div>
                <input type="text" name="text.question" class="form-control" id="mcb-text-question" .value=${ config.text.question }>
              </div>

              <!-- TRUE Switch -->
              <div class="form-group">
                <label for="mcb-text-true">
                  ${ builder.text.true_switch }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-true" aria-expanded="false" aria-controls="mcb-info-text-true">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-true">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.true_switch_info ) }
                  </div>
                </div>
                <input type="text" name="text.buttons.0" class="form-control" id="mcb-text-true" .value=${ config.text.buttons[ 0 ] }>
              </div>

              <!-- IGNORE Switch -->
              <div class="form-group">
                <label for="mcb-text-ignore">
                  ${ builder.text.ignore_switch }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-ignore" aria-expanded="false" aria-controls="mcb-info-text-ignore">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-ignore">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.ignore_switch_info ) }
                  </div>
                </div>
                <input type="text" name="text.buttons.1" class="form-control" id="mcb-text-ignore" .value=${ config.text.buttons[ 1 ] }>
              </div>

              <!-- FALSE Switch -->
              <div class="form-group">
                <label for="mcb-text-false">
                  ${ builder.text.false_switch }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-false" aria-expanded="false" aria-controls="mcb-info-text-false">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-false">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.false_switch_info ) }
                  </div>
                </div>
                <input type="text" name="text.buttons.2" class="form-control" id="mcb-text-false" .value=${ config.text.buttons[ 2 ] }>
              </div>

              <!-- Next Button -->
              <div class="form-group">
                <label for="mcb-text-next">
                  ${ builder.text.next_button }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-next" aria-expanded="false" aria-controls="mcb-info-text-next">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-next">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.next_button_info ) }
                  </div>
                </div>
                <input type="text" name="text.next" class="form-control" id="mcb-text-next" .value=${ config.text.next }>
              </div>

              <!-- Submit Button -->
              <div class="form-group">
                <label for="mcb-text-submit">
                  ${ builder.text.submit_button }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-submit" aria-expanded="false" aria-controls="mcb-info-text-submit">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-submit">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.submit_button_info ) }
                  </div>
                </div>
                <input type="text" name="text.submit" class="form-control" id="mcb-text-submit" .value=${ config.text.submit }>
              </div>

              <!-- Finish Button -->
              <div class="form-group" ?hidden=${ !config.onfinish }>
                <label for="mcb-text-finish">
                  ${ builder.text.finish_button }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-text-finish" aria-expanded="false" aria-controls="mcb-info-text-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-text-finish">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.finish_button_info ) }
                  </div>
                </div>
                <input type="text" name="text.finish" class="form-control" id="mcb-text-finish" .value=${ config.text.finish }>
              </div>

            </div>
          </div>
        </div>

        <!-- Finish Actions -->
        <div class="card">
          <div class="card-header p-1" id="mcb-finish-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#mcb-finish-collapse" aria-expanded="false" aria-controls="mcb-finish-collapse">
                Finish Actions
              </button>
            </h2>
          </div>
          <div id="mcb-finish-collapse" class="collapse" aria-labelledby="mcb-finish-heading" data-parent="#mcb-accordion">
            <div class="card-body">

              <!-- Enable Finish Actions -->
              <div class="form-group">
                <input type="checkbox" name="finish" id="mcb-finish" ?checked=${ config.onfinish }>
                <label class="form-check-label pl-1" for="mcb-finish">
                  ${ builder.text.finish_actions }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-finish" aria-expanded="false" aria-controls="mcb-info-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-finish">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.finish_actions_info ) }
                  </div>
                </div>
              </div>

              <!-- Save submitted Solutions -->
              <div class="form-group" ?hidden=${ !config.onfinish }>
                <label for="mcb-store">
                  ${ unsafeHTML( builder.text.save_solutions ) }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-store" aria-expanded="false" aria-controls="mcb-info-store">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-store">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.save_solutions_info ) }
                  </div>
                </div>
                <select class="form-control" name="store" id="mcb-store">
                  <option value="" ?selected=${ config.onfinish && !config.onfinish.store }>None</option>
                  <option value="collective" ?selected=${ config.onfinish && config.onfinish.store === true && !config.onfinish.store.user && !config.data.user }>Collective Solution</option>
                  <option value="user" ?selected=${ config.onfinish && config.onfinish.store === true && config.data.user }>User Specific</option>
                  <option value="unique" ?selected=${ config.onfinish && builder.ccm.helper.isObject( config.onfinish.store ) && config.onfinish.store.unique }>User Specific without Override</option>
                </select>
              </div>

              <!-- User Authentication -->
              <div class="form-group" ?hidden=${ !config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user ) }>
                <label for="mcb-user">
                  ${ builder.text.user_authentication }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-user" aria-expanded="false" aria-controls="mcb-info-user">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-user">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.user_authentication_info ) }
                  </div>
                </div>
                <select class="form-control" name="user" id="mcb-user">
                  ${ Object.values( builder.ignore.user ).map( obj => html`<option value="${ obj.key }" ?selected=${ JSON.stringify( config.user ) === JSON.stringify( obj.value ) }>${ obj.title }</option>` ) }
                </select>
              </div>

              <!-- Confirmation Dialog -->
              <div class="form-group" ?hidden=${ !config.onfinish || !config.onfinish.store }>
                <label for="mcb-confirm">
                  ${ builder.text.confirm_dialog }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-confirm" aria-expanded="false" aria-controls="mcb-info-confirm">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-confirm">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.confirm_dialog_info ) }
                  </div>
                </div>
                <input type="text" name="onfinish.confirm" class="form-control" id="mcb-confirm" .value=${ config.onfinish && config.onfinish.confirm || '' }>
              </div>

              <!-- Success Message -->
              <div class="form-group" ?hidden=${ !config.onfinish || !config.onfinish.store }>
                <label for="mcb-success">
                  ${ builder.text.success_message }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-alert" aria-expanded="false" aria-controls="mcb-info-alert">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-alert">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.success_message_info ) }
                  </div>
                </div>
                <input type="text" name="onfinish.alert" class="form-control" id="mcb-success" .value=${ config.onfinish && config.onfinish.alert || '' }>
              </div>

              <!-- Next Content -->
              <div class="form-group" ?hidden=${ !config.onfinish }>
                <label for="mcb-render">
                  ${ builder.text.next_content }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-render" aria-expanded="false" aria-controls="mcb-info-render">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-render">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.next_content_info ) }
                  </div>
                </div>
                <select class="form-control" name="render" id="mcb-render">
                  <option value="clear" ?selected=${ config.onfinish && ( config.onfinish.clear || !config.onfinish.restart && !config.onfinish.render ) }>Clear Content</option>
                  <option value="restart" ?selected=${ config.onfinish && config.onfinish.restart }>Restart App</option>
                  <option value="app" ?selected=${ config.onfinish && config.onfinish.render }>Show other App</option>
                </select>
              </div>

              <!-- Embed Code of the App -->
              <div class="form-group" ?hidden=${ !config.onfinish || !config.onfinish.render }>
                <label for="mcb-app">
                  ${ builder.text.embed_code }
                </label>
                <span type="button" data-toggle="collapse" data-target="#mcb-info-app" aria-expanded="false" aria-controls="mcb-info-app">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="mcb-info-app">
                  <div class="bg-info text-light rounded p-2">
                    ${ unsafeHTML( builder.text.embed_code_info ) }
                  </div>
                </div>
                <input type="text" name="app" class="form-control" id="mcb-app" .value=${ config.onfinish && config.onfinish.render && config.onfinish.render.component && builder.helper.embedCode( config.onfinish.render.component, config.onfinish.render.config ) || '' }>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Preview Button -->
      <button type="button" class="btn btn-info btn-block mt-0" @click=${ () => events.onShowPreview() } ?data-hidden=${ !builder.text.preview }>${ builder.text.preview }</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${ !builder.onfinish || !builder.text.submit }>${ builder.text.submit }</button>
      
    </form>

    <!-- Modal: Edit Text -->
    <div id="mcb-edit-modal" class="modal" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content"></div>
      </div>
    </div>

    <!-- Modal: Preview -->
    <div class="modal fade" id="mcb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">App Preview</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <!-- Modal Body -->
          <div id="mcb-preview-body" class="modal-body p-0">
            <div class="d-flex justify-content-center align-items-center spinner">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

}
