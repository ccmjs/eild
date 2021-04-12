/**
 * @overview HTML templates of ccmjs-based web component for building a ER model training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render, repeat } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @param {Function} onDeleteNotation - when 'delete' button of a notation is clicked
 * @param {Function} onResetNotations - when 'reset' button for notations is clicked
 * @param {Function} onDeletePhrase - when 'delete' button of a phrase is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, onDeleteNotation, onResetNotations, onDeletePhrase ) {
  return html`
    <form id="erb-main-form">
      <div class="accordion" id="erb-accordion">
        
        <!-- General Settings -->
        <div class="card">
          <div class="card-header p-1" id="erb-general-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#erb-general-collapse" aria-expanded="false" aria-controls="erb-general-collapse">
                General Settings
              </button>
            </h2>
          </div>
          <div id="erb-general-collapse" class="collapse show" aria-labelledby="erb-general-heading" data-parent="#erb-accordion">
            <div class="card-body">

              <!-- Layout -->
              <div class="form-group">
                <label for="erb-css">Layout</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-css" aria-expanded="false" aria-controls="erb-info-css">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-css">
                  <div class="bg-info text-light rounded p-2">
                    Choose between a layout format.
                    Use the preview button below to see what the selected layout will look like.
                  </div>
                </div>
                <select class="form-control" name="css" id="erb-css">
                  ${ Object.values( builder.ignore.css ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.css) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
                </select>
              </div>

              <!-- Number of Phrases -->
              <div class="form-group">
                <label for="erb-number">Number of Phrases</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-number" aria-expanded="false" aria-controls="erb-info-number">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-number">
                  <div class="bg-info text-light rounded p-2">
                    How many phrases should be randomly selected and questioned?
                  </div>
                </div>
                <input type="number" required min="1" name="number" class="form-control" id="erb-number" .value=${config.number}>
              </div>

              <!-- Default Notation -->
              <div class="form-group" ?hidden=${Object.keys(config.notations).length<=1}>
                <label for="erb-default-notation">Default Notation</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-default-notation" aria-expanded="false" aria-controls="erb-info-default-notation">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-default-notation">
                  <div class="bg-info text-light rounded p-2">
                    Choose which notation is selected and displayed by default.
                  </div>
                </div>
                <select class="form-control" name="default.notation" id="erb-default-notation">
                  ${ Object.values( config.notations ).map( notation => html`<option value="${notation.key}" ?selected=${config.default.notation===notation.key}>${notation.title}</option>` )}
                </select>
              </div>

              <!-- Legend -->
              <div class="form-group">
                <input type="checkbox" name="legend" id="erb-legend" ?checked=${config.legend}>
                <label class="form-check-label pl-1" for="erb-legend">
                  Show Legend
                </label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-legend" aria-expanded="false" aria-controls="erb-info-legend">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-legend">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, the app contains a legend that gives an overview of all available notation forms.
                  </div>
                </div>
              </div>
              
              <!-- Enable Feedback -->
              <div class="form-group">
                <input type="checkbox" name="feedback" id="erb-feedback" ?checked=${config.feedback}>
                <label class="form-check-label pl-1" for="erb-feedback">
                  Enable Feedback
                </label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-feedback" aria-expanded="false" aria-controls="erb-info-feedback">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-feedback">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, the user is shown what is right and what is wrong when answering a phrase.
                  </div>
                </div>
              </div>

              <!-- Show Solution -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <input type="checkbox" name="show_solution" id="erb-show_solution" ?checked=${config.show_solution}>
                <label class="form-check-label pl-1" for="erb-show_solution">
                  Show Solution
                </label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-show_solution" aria-expanded="false" aria-controls="erb-info-show_solution">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-show_solution">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, the feedback will reveal the correct solution.
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- Notations -->
        <div class="card">
          <div class="card-header p-1" id="erb-notations-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#erb-notations-collapse" aria-expanded="true" aria-controls="erb-notations-collapse">
                Notations
              </button>
            </h2>
          </div>
          <div id="erb-notations-collapse" class="collapse" aria-labelledby="erb-notations-heading" data-parent="#erb-accordion">
            <div class="card-body p-0">
              <table class="table table-hover m-0">
                <tbody>
                  ${repeat(Object.values(config.notations),notation=>notation.key,notation=>notationRow(notation,onDeleteNotation))}
                </tbody>
              </table>
              <button type="button" class="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#erb-add-notation">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Notation
              </button>
              <button type="button" class="btn btn-danger btn-sm btn-block" @click="${onResetNotations}">Reset</button>
            </div>
          </div>
        </div>

        <!-- Phrases -->
        <div class="card">
          <div class="card-header p-1" id="erb-phrases-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#erb-phrases-collapse" aria-expanded="true" aria-controls="erb-phrases-collapse">
                Phrases
              </button>
            </h2>
          </div>
          <div id="erb-phrases-collapse" class="collapse" aria-labelledby="erb-phrases-heading" data-parent="#erb-accordion">
            <div class="card-body p-0">
              <table class="table table-hover m-0">
                <tbody>
                  ${repeat(Object.values(config.phrases),phrase=>phrase.key,phrase=>phraseRow(phrase,onDeletePhrase))}
                </tbody>
              </table>
              <button type="button" class="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#erb-add-phrase">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Phrase
              </button>
            </div>
          </div>
        </div>

        <!-- Texts and Labels -->
        <div class="card">
          <div class="card-header p-1" id="erb-texts-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#erb-texts-collapse" aria-expanded="true" aria-controls="erb-texts-collapse">
                Texts and Labels
              </button>
            </h2>
          </div>
          <div id="erb-texts-collapse" class="collapse" aria-labelledby="erb-texts-heading" data-parent="#erb-accordion">
            <div class="card-body">

              <!-- App Title -->
              <div class="form-group">
                <label for="erb-text-title">App Title</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-title" aria-expanded="false" aria-controls="erb-info-text-title">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-title">
                  <div class="bg-info text-light rounded p-2">
                    Choose the displayed title of the app.
                  </div>
                </div>
                <input type="text" name="text.title" class="form-control" id="erb-text-title" .value=${config.text.title}>
              </div>

              <!-- Heading -->
              <div class="form-group">
                <label for="erb-text-heading">Heading</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-heading" aria-expanded="false" aria-controls="erb-info-text-heading">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-heading">
                  <div class="bg-info text-light rounded p-2">
                    Choose the text for the headline.
                  </div>
                </div>
                <input type="text" name="text.heading" class="form-control" id="erb-text-heading" .value=${config.text.heading}>
              </div>

              <!-- Selector Box for Used Notation -->
              <div class="form-group">
                <label for="erb-text-notation">Selector Box for Used Notation</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-notation" aria-expanded="false" aria-controls="erb-info-text-notation">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-notation">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label for the selector box that determines the displayed notation in the diagram.
                  </div>
                </div>
                <input type="text" name="text.notation" class="form-control" id="erb-text-notation" .value=${config.text.notation}>
              </div>

              <!-- Legend -->
              <div class="form-group">
                <label for="erb-text-legend">Legend</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-legend" aria-expanded="false" aria-controls="erb-info-text-legend">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-legend">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label of the button that shows the legend.
                  </div>
                </div>
                <input type="text" name="text.legend" class="form-control" id="erb-text-legend" .value=${config.text.legend}>
              </div>

              <!-- Phrase Prefix -->
              <div class="form-group">
                <label for="erb-text-phrase">Phrase Prefix</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-phrase" aria-expanded="false" aria-controls="erb-info-text-phrase">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-phrase">
                  <div class="bg-info text-light rounded p-2">
                    Choose the prefix of a phrase.
                    The placeholder "%%" will later be automatically replaced by the current phrase number dynamically.
                  </div>
                </div>
                <input type="text" name="text.phrase" class="form-control" id="erb-text-phrase" .value=${config.text.phrase}>
              </div>

              <!-- Left Entity -->
              <div class="form-group">
                <label for="erb-text-entity1">Left Entity</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-entity1" aria-expanded="false" aria-controls="erb-info-text-entity1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-entity1">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label for the left entity on the diagram.
                  </div>
                </div>
                <input type="text" name="text.entity1" class="form-control" id="erb-text-entity1" .value=${config.text.entity1}>
              </div>

              <!-- Right Entity -->
              <div class="form-group">
                <label for="erb-text-entity2">Right Entity</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-entity2" aria-expanded="false" aria-controls="erb-info-text-entity2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-entity2">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label for the right entity on the diagram.
                  </div>
                </div>
                <input type="text" name="text.entity2" class="form-control" id="erb-text-entity2" .value=${config.text.entity2}>
              </div>

              <!-- Left Selector Box -->
              <div class="form-group">
                <label for="erb-text-input1">Left Selector Box</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-input1" aria-expanded="false" aria-controls="erb-info-text-input1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-input1">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label for the left selector box for user answer.
                  </div>
                </div>
                <input type="text" name="text.input1" class="form-control" id="erb-text-input1" .value=${config.text.input1}>
              </div>

              <!-- Right Selector Box -->
              <div class="form-group">
                <label for="erb-text-input2">Right Selector Box</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-input2" aria-expanded="false" aria-controls="erb-info-text-input2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-input2">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label of the right selector box for user answer.
                  </div>
                </div>
                <input type="text" name="text.input2" class="form-control" id="erb-text-input2" .value=${config.text.input2}>
              </div>

              <!-- Selector Box Entries -->
              <div class="form-group">
                <label for="erb-text-selection">Selector Box Entries</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-selection" aria-expanded="false" aria-controls="erb-info-text-selection">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-selection">
                  <div class="bg-info text-light rounded p-2">
                    Choose the captions for the entries of the left and right selector box for user answer.
                  </div>
                </div>
                <select multiple name="text.selection" id="erb-text-selection"></select>
              </div>

              <!-- Correct -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <label for="erb-text-correct">Correct Answer</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-correct" aria-expanded="false" aria-controls="erb-info-text-correct">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-correct">
                  <div class="bg-info text-light rounded p-2">
                    This text appears when a phrase has been answered correctly.
                  </div>
                </div>
                <input type="text" name="text.correct" class="form-control" id="erb-text-correct" .value=${config.text.correct}>
              </div>

              <!-- Failed -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <label for="erb-text-failed">Failed Answer</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-failed" aria-expanded="false" aria-controls="erb-info-text-failed">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-failed">
                  <div class="bg-info text-light rounded p-2">
                    This text appears when a phrase has been answered incorrectly.
                  </div>
                </div>
                <input type="text" name="text.failed" class="form-control" id="erb-text-failed" .value=${config.text.failed}>
              </div>

              <!-- Correct Solution -->
              <div class="form-group" ?hidden=${!config.feedback || !config.show_solution}>
                <label for="erb-text-correct_solution">Revealed Solution</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-correct_solution" aria-expanded="false" aria-controls="erb-info-text-correct_solution">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-correct_solution">
                  <div class="bg-info text-light rounded p-2">
                    This text appears when a phrase is answered incorrectly and the correct solution is revealed.
                  </div>
                </div>
                <input type="text" name="text.correct_solution" class="form-control" id="erb-text-correct_solution" .value=${config.text.correct_solution}>
              </div>

              <!-- Current State -->
              <div class="form-group" ?hidden=${!config.feedback}>
                <label for="erb-text-current_state">Current State</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-current_state" aria-expanded="false" aria-controls="erb-info-text-current_state">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-current_state">
                  <div class="bg-info text-light rounded p-2">
                    This text informs the user how many phrases have already been answered correctly.
                    The placeholders "%%" will later be automatically replaced by the current values dynamically.
                  </div>
                </div>
                <input type="text" name="text.current_state" class="form-control" id="erb-text-current_state" .value=${config.text.current_state}>
              </div>

              <!-- Next Button -->
              <div class="form-group">
                <label for="erb-text-next">Next Button</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-next" aria-expanded="false" aria-controls="erb-info-text-next">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-next">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label of the button that starts the next phrase.
                  </div>
                </div>
                <input type="text" name="text.next" class="form-control" id="erb-text-next" .value=${config.text.next}>
              </div>

              <!-- Submit Button -->
              <div class="form-group">
                <label for="erb-text-submit">Submit Button</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-submit" aria-expanded="false" aria-controls="erb-info-text-submit">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-submit">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label of the button that submits the solution selected by the user.
                  </div>
                </div>
                <input type="text" name="text.submit" class="form-control" id="erb-text-submit" .value=${config.text.submit}>
              </div>

              <!-- Finish Button -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="erb-text-finish">Finish Button</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-finish" aria-expanded="false" aria-controls="erb-info-text-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-finish">
                  <div class="bg-info text-light rounded p-2">
                    Choose the label for the finish button.
                  </div>
                </div>
                <input type="text" name="text.finish" class="form-control" id="erb-text-finish" .value=${config.text.finish}>
              </div>

            </div>
          </div>
        </div>

        <!-- Finish Actions -->
        <div class="card">
          <div class="card-header p-1" id="erb-finish-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#erb-finish-collapse" aria-expanded="false" aria-controls="erb-finish-collapse">
                Finish Actions
              </button>
            </h2>
          </div>
          <div id="erb-finish-collapse" class="collapse" aria-labelledby="erb-finish-heading" data-parent="#erb-accordion">
            <div class="card-body">

              <!-- Enable Finish Actions -->
              <div class="form-group">
                <input type="checkbox" name="finish" id="erb-finish" ?checked=${config.onfinish}>
                <label class="form-check-label pl-1" for="erb-finish">
                  Enable Finish Actions
                </label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-finish" aria-expanded="false" aria-controls="erb-info-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-finish">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, there is a finish button when all phrases are answered for which individual actions such as saving solutions and displaying another app can be set.
                  </div>
                </div>
              </div>

              <!-- Save submitted Solutions -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="erb-store">Save submitted Solutions</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-store" aria-expanded="false" aria-controls="erb-info-store">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-store">
                  <div class="bg-info text-light rounded p-2">
                    The results are stored on a server of the computer science department of the Bonn-Rhein-Sieg University of Applied Sciences.
                    <ul class="m-0 pl-4">
                      <li><b>Collective Solution:</b> Everyone is working on a common solution. When the app is started, the last submitted solution is restored.</li>
                      <li><b>User Specific:</b> Each user has their own solution that is restored when the app starts. Anyone can correct their submitted solution afterwards. A user must log in to submit a solution.</li>
                      <li><b>User Specific without Override:</b> The same as the previous option, except that each submitted solution is saved separately. Previously submitted solutions will not be overwritten. A user must log in to submit a solution.</li>
                    </ul>
                  </div>
                </div>
                <select class="form-control" name="store" id="erb-store">
                  <option value="" ?selected=${config.onfinish && !config.onfinish.store}>None</option>
                  <option value="collective" ?selected=${config.onfinish && config.onfinish.store === true && !config.onfinish.store.user}>Collective Solution</option>
                  <option value="user" ?selected=${config.onfinish && config.onfinish.store === true && config.data.user}>User Specific</option>
                  <option value="unique" ?selected=${config.onfinish && builder.ccm.helper.isObject( config.onfinish.store ) && config.onfinish.store.unique}>User Specific without Override</option>
                </select>
              </div>

              <!-- User Authentication -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user )}>
                <label for="erb-user">User Authentication</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-user" aria-expanded="false" aria-controls="erb-info-user">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-user">
                  <div class="bg-info text-light rounded p-2">
                    Choose here how a user has to authenticate when submitting a solution.
                    <ul class="m-0 pl-4">
                      <li><b>Guest Mode:</b> The user can authenticate with any username and without a password.</li>
                      <li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li>
                      <li><b>H-BRS FB02 Account:</b> The user has to authenticate with a account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li>
                      <li><b>H-BRS FB02 Account with Pseudonym:</b> The same as the previous option, but the username is replaced with a pseudonym.</li>
                      <li><b>One-time Pseudonym:</b> The user is automatically logged in with a one-time pseudonym. Each login returns a different pseudonym.</li>
                    </ul>
                  </div>
                </div>
                <select class="form-control" name="user" id="erb-user">
                  ${ Object.values( builder.ignore.user ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.user) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
                </select>
              </div>

              <!-- Confirmation Dialog -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="erb-confirm">Confirmation Dialog</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-confirm" aria-expanded="false" aria-controls="erb-info-confirm">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-confirm">
                  <div class="bg-info text-light rounded p-2">
                    If active, the user must explicitly confirm before saving a solution.
                    To activate this, specify the text that will be displayed to the user in the confirm dialog.
                  </div>
                </div>
                <input type="text" name="onfinish.confirm" class="form-control" id="erb-confirm" .value=${config.onfinish&&config.onfinish.confirm||''}>
              </div>

              <!-- Success Message -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="erb-success">Success Message</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-alert" aria-expanded="false" aria-controls="erb-info-alert">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-alert">
                  <div class="bg-info text-light rounded p-2">
                    Here you can specify a message that will be displayed to the user when the submitted solution has been saved successfully.
                  </div>
                </div>
                <input type="text" name="onfinish.alert" class="form-control" id="erb-success" .value=${config.onfinish&&config.onfinish.alert||''}>
              </div>

              <!-- Next Content -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="erb-render">Next Content</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-render" aria-expanded="false" aria-controls="erb-info-render">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-render">
                  <div class="bg-info text-light rounded p-2">
                    Specify which content should be displayed next after a solution has been submitted.
                  </div>
                </div>
                <select class="form-control" name="render" id="erb-render">
                  <option value="clear" ?selected=${config.onfinish && ( config.onfinish.clear || !config.onfinish.restart && !config.onfinish.render )}>Clear Content</option>
                  <option value="restart" ?selected=${config.onfinish && config.onfinish.restart}>Restart App</option>
                  <option value="app" ?selected=${config.onfinish && config.onfinish.render}>Show other App</option>
                </select>
              </div>

              <!-- Embed Code of the App -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.render}>
                <label for="erb-app">Embed Code of App</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-app" aria-expanded="false" aria-controls="erb-info-app">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-app">
                  <div class="bg-info text-light rounded p-2">
                    Enter the embed code of the app that should be displayed after submitting a solution.
                    The app must be an app created in the Digital Makerspace.
                  </div>
                </div>
                <input type="text" name="app" class="form-control" id="erb-app" .value=${config.onfinish&&config.onfinish.render&&config.onfinish.render.component&&builder.helper.embedCode(config.onfinish.render.component,config.onfinish.render.config)||''}>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Modal for each Notation -->
      ${repeat(Object.values(config.notations),notation=>notation.key,notation=>notationModal(notation))}

      <!-- Modal for each Phrase -->
      ${repeat(Object.values(config.phrases),phrase=>phrase.key,phrase=>phraseModal(config,phrase))}

      <!-- Preview Button -->
      <button type="button" class="btn btn-info btn-block mt-0" data-toggle="modal" data-target="#erb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${!builder.onfinish||!builder.submit}>${builder.submit}</button>
      
    </form>

    <!-- Modal: Add Notation -->
    <form id="erb-notation-form">
      <div id="erb-add-notation" class="modal" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Notation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              
              <!-- Title -->
              <div class="form-group">
                <label for="erb-add-notation-title">Title</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-title" aria-expanded="false" aria-controls="erb-info-add-notation-title">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-title">
                  <div class="bg-info text-light rounded p-2">
                    Choose the title of the notation.
                    The notation is then listed under this title in the selection list for changing the notation.
                  </div>
                </div>
                <input type="text" name="title" class="form-control" id="erb-add-notation-title" required>
              </div>
  
              <!-- None -->
              <div class="form-group">
                <label for="erb-add-notation-e">None</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-e" aria-expanded="false" aria-controls="erb-info-add-notation-e">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-e">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for a not chosen dependency on the right entity.
                    The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.0" class="form-control" id="erb-add-notation-e">
              </div>
  
              <!-- One -->
              <div class="form-group">
                <label for="erb-add-notation-1">One</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-1" aria-expanded="false" aria-controls="erb-info-add-notation-1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-1">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for a 'mandatory' dependency on the right entity.
                    The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.1" class="form-control" id="erb-add-notation-1">
              </div>
  
              <!-- Conditional -->
              <div class="form-group">
                <label for="erb-add-notation-c">Conditional</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-c" aria-expanded="false" aria-controls="erb-info-add-notation-c">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-c">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for a 'conditional' dependency on the right entity.
                    The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.2" class="form-control" id="erb-add-notation-c">
              </div>
  
              <!-- Many -->
              <div class="form-group">
                <label for="erb-add-notation-n">Many</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-n" aria-expanded="false" aria-controls="erb-info-add-notation-n">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-n">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for a 'many' dependency on the right entity.
                    The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.3" class="form-control" id="erb-add-notation-n">
              </div>
  
              <!-- Conditional Many -->
              <div class="form-group">
                <label for="erb-add-notation-cn">Conditional Many</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-cn" aria-expanded="false" aria-controls="erb-info-add-notation-cn">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-cn">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for a 'conditional many' dependency on the right entity.
                    The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.4" class="form-control" id="erb-add-notation-cn">
              </div>
  
              <!-- Relation -->
              <div class="form-group">
                <label for="erb-add-notation-r">Relation</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-r" aria-expanded="false" aria-controls="erb-info-add-notation-r">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-r">
                  <div class="bg-info text-light rounded p-2">
                    Image URL to the graphic for the relation in the middle of the diagram.
                    The graphic should have a width of exactly 240 pixels and the height should be a maximum of 100 pixels.
                    The graphic is centered vertically in the app, so the heights can be different.
                  </div>
                </div>
                <input type="url" name="images.5" class="form-control" id="erb-add-notation-r">
              </div>
              
              <!-- Left -->
              <div class="form-group">
                <label for="erb-add-notation-left">Left Side</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-left" aria-expanded="false" aria-controls="erb-info-add-notation-left">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </span>
                <div class="collapse" id="erb-info-add-notation-left">
                  <div class="bg-info text-light rounded p-2">
                    Choose how the notation should be displayed in the diagram for the left entity.
                  </div>
                </div>
                <select class="form-control" name="left" id="erb-add-notation-left">
                  <option value="copied">Copied</option>
                  <option value="mirrored">Mirrored</option>
                </select>
              </div>
              
              <!-- Swap -->
              <div class="form-group">
                <input type="checkbox" name="swap" id="erb-add-notation-swap">
                <label class="form-check-label pl-1" for="erb-add-notation-swap">Swap</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-swap" aria-expanded="false" aria-controls="erb-info-add-notation-swap">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </span>
                <div class="collapse" id="erb-info-add-notation-swap">
                  <div class="bg-info text-light rounded p-2">
                    Choose this if the notation refers to the relation rather than the entity.
                    A selection on one side then causes a graphical change in notation for the entity on the other side.
                  </div>
                </div>
              </div>
  
              <!-- Centered -->
              <div class="form-group">
                <input type="checkbox" name="centered" id="erb-add-notation-centered">
                <label class="form-check-label pl-1" for="erb-add-notation-centered">Centered</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-centered" aria-expanded="false" aria-controls="erb-info-add-notation-centered">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </span>
                <div class="collapse" id="erb-info-add-notation-centered">
                  <div class="bg-info text-light rounded p-2">
                    Choose this if the label of the relation should be displayed vertically centered in the middle and not a bit higher above a solid line.
                  </div>
                </div>
              </div>
              
              <!-- Comment -->
              <div class="form-group">
                <label for="erb-add-notation-comment">Comment</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-comment" aria-expanded="false" aria-controls="erb-info-add-notation-comment">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-notation-comment">
                  <div class="bg-info text-light rounded p-2">
                    An optional comment can be specified for each notation, which provides information on the peculiarities of the notation.
                  </div>
                </div>
                <textarea name="comment" class="form-control" id="erb-add-notation-comment"></textarea>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Modal: Add Phrase -->
    <form id="erb-phrase-form">
      <div id="erb-add-phrase" class="modal" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Phrase</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <!-- Text -->
              <div class="form-group">
                <label for="erb-add-phrase-text">Text</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-text" aria-expanded="false" aria-controls="erb-info-add-phrase-text">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-text">
                  <div class="bg-info text-light rounded p-2">
                    Choose the text of the phrase that describes the dependency between two entities.
                  </div>
                </div>
                <textarea name="text" class="form-control" id="erb-add-phrase-text"></textarea>
              </div>
  
              <!-- Left Entity -->
              <div class="form-group">
                <label for="erb-add-phrase-entity1">Left Entity</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-entity1" aria-expanded="false" aria-controls="erb-info-add-phrase-entity1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-entity1">
                  <div class="bg-info text-light rounded p-2">
                    Choose the name for the left entity.
                  </div>
                </div>
                <input type="text" name="relationship.0" class="form-control" id="erb-add-phrase-entity1">
              </div>
              
              <!-- Relation -->
              <div class="form-group">
                <label for="erb-add-phrase-relation">Relation</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-relation" aria-expanded="false" aria-controls="erb-info-add-phrase-relation">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-relation">
                  <div class="bg-info text-light rounded p-2">
                    Choose the name for the relation between the two entities.
                  </div>
                </div>
                <input type="text" name="relationship.1" class="form-control" id="erb-add-phrase-relation">
              </div>
              
              <!-- Right Entity -->
              <div class="form-group">
                <label for="erb-add-phrase-entity2">Right Entity</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-entity2" aria-expanded="false" aria-controls="erb-info-add-phrase-entity2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-entity2">
                  <div class="bg-info text-light rounded p-2">
                    Choose the name for the right entity.
                  </div>
                </div>
                <input type="text" name="relationship.2" class="form-control" id="erb-add-phrase-entity2">
              </div>
              
              <!-- Left Solution -->
              <div class="form-group">
                <label for="erb-add-phrase-solution1">Left Solution</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-solution1" aria-expanded="false" aria-controls="erb-info-add-phrase-solution1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-solution1">
                  <div class="bg-info text-light rounded p-2">
                    Choose the correct solution for the left selector box for user answer.
                  </div>
                </div>
                <select class="form-control" name="solution.0" id="erb-add-phrase-solution1">
                  ${Object.values(config.values).map((value,i)=>html`<option value="${value}">${config.text.selection[i+1]}</option>`)}
                </select>
              </div>
  
              <!-- Right Solution -->
              <div class="form-group">
                <label for="erb-add-phrase-solution2">Right Solution</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-solution2" aria-expanded="false" aria-controls="erb-info-add-phrase-solution2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-solution2">
                  <div class="bg-info text-light rounded p-2">
                    Choose the correct solution for the right selector box for user answer.
                  </div>
                </div>
                <select class="form-control" name="solution.1" id="erb-add-phrase-solution2">
                  ${Object.values(config.values).map((value,i)=>html`<option value="${value}">${config.text.selection[i+1]}</option>`)}
                </select>
              </div>

              <!-- Left Comment -->
              <div class="form-group">
                <label for="erb-add-phrase-comment1">Left Comment</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-comment1" aria-expanded="false" aria-controls="erb-info-add-phrase-comment1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-comment1">
                  <div class="bg-info text-light rounded p-2">
                    An optional comment can be entered for the left solution that explains why this solution is correct.
                    The comment is only displayed if the phrase was answered incorrectly.
                  </div>
                </div>
                <textarea name="comment.0" class="form-control" id="erb-add-phrase-comment1"></textarea>
              </div>
              
              <!-- Right Comment -->
              <div class="form-group">
                <label for="erb-add-phrase-comment1">Right Comment</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-add-phrase-comment2" aria-expanded="false" aria-controls="erb-info-add-phrase-comment2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-add-phrase-comment2">
                  <div class="bg-info text-light rounded p-2">
                    An optional comment can be entered for the right solution that explains why this solution is correct.
                    The comment is only displayed if the phrase was answered incorrectly.
                  </div>
                </div>
                <textarea name="comment.1" class="form-control" id="erb-add-phrase-comment2"></textarea>
              </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <!-- Modal: Preview -->
    <div class="modal fade" id="erb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
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
          <div id="erb-preview-body" class="modal-body p-0">
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

/**
 * returns the HTML template for a notation row
 * @param {Object} notation - notation data
 * @param {Function} onDeleteNotation - when 'delete' button of a notation is clicked
 * @returns {TemplateResult} HTML template for a notation row
 */
function notationRow( notation, onDeleteNotation ) {
  return html`
    <tr>
      <th class="align-middle">
        <div class="d-flex align-items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea text-success" viewBox="0 0 16 16">
              <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </div>
          <div class="ml-2">${notation.title}</div>
        </div>
      </th>
      <td class="text-right">
        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#notation-${notation.key}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-danger btn-sm" data-key="${notation.key}" @click="${onDeleteNotation}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </td>
    </tr>
  `;
}

/**
 * returns the HTML template for modal dialog to create/edit a notation
 * @param {Object} notation - notation data
 * @returns {TemplateResult} HTML template for modal dialog to create/edit a notation
 */
function notationModal( notation ) {
  return html`
    <div id="notation-${notation.key}" class="modal" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edited Notation: ${notation.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <!-- Key -->
            <input type="hidden" name="notations.${notation.key}.key" .value=${notation.key}>
            
            <!-- Title -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-title">Title</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-title" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-title">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-title">
                <div class="bg-info text-light rounded p-2">
                  Choose the title of the notation.
                  The notation is then listed under this title in the selection list for changing the notation.
                </div>
              </div>
              <input type="text" name="notations.${notation.key}.title" class="form-control" id="erb-notation-${notation.key}-title" .value=${notation.title}>
            </div>

            <!-- None -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-e">None</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-e" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-e">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-e">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for a not chosen dependency on the right entity.
                  The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.0" class="form-control" id="erb-notation-${notation.key}-e" .value=${notation.images[0]}>
            </div>

            <!-- One -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-1">One</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-1" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-1">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for a 'mandatory' dependency on the right entity.
                  The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.1" class="form-control" id="erb-notation-${notation.key}-1" .value=${notation.images[1]}>
            </div>

            <!-- Conditional -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-c">Conditional</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-c" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-c">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-c">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for a 'conditional' dependency on the right entity.
                  The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.2" class="form-control" id="erb-notation-${notation.key}-c" .value=${notation.images[2]}>
            </div>

            <!-- Many -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-n">Many</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-n" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-n">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-n">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for a 'many' dependency on the right entity.
                  The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.3" class="form-control" id="erb-notation-${notation.key}-n" .value=${notation.images[3]}>
            </div>

            <!-- Conditional Many -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-cn">Conditional Many</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-cn" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-cn">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-cn">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for a 'conditional many' dependency on the right entity.
                  The graphic should have a width of exactly 60 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.4" class="form-control" id="erb-notation-${notation.key}-cn" .value=${notation.images[4]}>
            </div>

            <!-- Relation -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-r">Relation</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-r" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-r">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-r">
                <div class="bg-info text-light rounded p-2">
                  Image URL to the graphic for the relation in the middle of the diagram.
                  The graphic should have a width of exactly 240 pixels and the height should be a maximum of 100 pixels.
                  The graphic is centered vertically in the app, so the heights can be different.
                </div>
              </div>
              <input type="url" name="notations.${notation.key}.images.5" class="form-control" id="erb-notation-${notation.key}-r" .value=${notation.images[5]}>
            </div>
            
            <!-- Left -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-left">Left Side</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-left" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-left">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-left">
                <div class="bg-info text-light rounded p-2">
                  Choose how the notation should be displayed in the diagram for the left entity.
                </div>
              </div>
              <select class="form-control" name="notations.${notation.key}.left" id="erb-notation-${notation.key}-left">
                <option value="copied" ?selected=${notation.left==='copied'}>Copied</option>
                <option value="mirrored" ?selected=${notation.left==='mirrored'}>Mirrored</option>
              </select>
            </div>
            
            <!-- Swap -->
            <div class="form-group">
              <input type="checkbox" name="notations.${notation.key}.swap" id="erb-notation-${notation.key}-swap" ?checked=${notation.swap}>
              <label class="form-check-label pl-1" for="erb-notation-${notation.key}-swap">Swap</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-swap" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-swap">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-swap">
                <div class="bg-info text-light rounded p-2">
                  Choose this if the notation refers to the relation rather than the entity.
                  A selection on one side then causes a graphical change in notation for the entity on the other side.
                </div>
              </div>
            </div>

            <!-- Centered -->
            <div class="form-group">
              <input type="checkbox" name="notations.${notation.key}.centered" id="erb-notation-${notation.key}-centered" ?checked=${notation.centered}>
              <label class="form-check-label pl-1" for="erb-notation-${notation.key}-centered">Centered</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-notation-${notation.key}-centered" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-centered">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-centered">
                <div class="bg-info text-light rounded p-2">
                  Choose this if the label of the relation should be displayed vertically centered in the middle and not a bit higher above a solid line.
                </div>
              </div>
            </div>

            <!-- Comment -->
            <div class="form-group">
              <label for="erb-notation-${notation.key}-comment">Comment</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-add-notation-comment" aria-expanded="false" aria-controls="erb-info-notation-${notation.key}-comment">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-notation-${notation.key}-comment">
                <div class="bg-info text-light rounded p-2">
                  An optional comment can be specified for each notation, which provides information on the peculiarities of the notation.
                </div>
              </div>
              <textarea name="notations.${notation.key}.comment" class="form-control" id="erb-notation-${notation.key}-comment" .value=${notation.comment}></textarea>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * returns the HTML template for a phrase row
 * @param {Object} phrase - phrase data
 * @param {Function} onDeletePhrase - when 'delete' button of a phrase is clicked
 * @returns {TemplateResult} HTML template for a phrase row
 */
function phraseRow( phrase, onDeletePhrase ) {
  return html`
    <tr>
      <td class="align-middle">
        <div class="d-flex align-items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hdd-network text-success" viewBox="0 0 16 16">
              <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2V4zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5z"/>
            </svg>
          </div>
          <div class="ml-2">${phrase.text}</div>
        </div>
      </td>
      <td class="text-right text-nowrap">
        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#phrase-${phrase.key}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-danger btn-sm" data-key="${phrase.key}" @click="${onDeletePhrase}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </td>
    </tr>
  `;
}

/**
 * returns the HTML template for modal dialog to create/edit a phrase
 * @param {Object} config - initial app configuration
 * @param {Object} phrase - phrase data
 * @returns {TemplateResult} HTML template for modal dialog to create/edit a phrase
 */
function phraseModal( config, phrase ) {
  return html`
    <div id="phrase-${phrase.key}" class="modal" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editing a Phrase</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <!-- Key -->
            <input type="hidden" name="phrases.${phrase.key}.key" .value=${phrase.key}>
            
            <!-- Text -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-text">Text</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-text" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-text">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-text">
                <div class="bg-info text-light rounded p-2">
                  Choose the text of the phrase that describes the dependency between two entities.
                </div>
              </div>
              <textarea name="phrases.${phrase.key}.text" class="form-control" id="erb-phrase-${phrase.key}-text" .value=${phrase.text}></textarea>
            </div>

            <!-- Left Entity -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-entity1">Left Entity</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-entity1" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-entity1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-entity1">
                <div class="bg-info text-light rounded p-2">
                  Choose the name for the left entity.
                </div>
              </div>
              <input type="text" name="phrases.${phrase.key}.relationship.0" class="form-control" id="erb-phrase-${phrase.key}-entity1" .value=${phrase.relationship[0]}>
            </div>
            
            <!-- Relation -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-relation">Relation</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-relation" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-relation">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-relation">
                <div class="bg-info text-light rounded p-2">
                  Choose the name for the relation between the two entities.
                </div>
              </div>
              <input type="text" name="phrases.${phrase.key}.relationship.1" class="form-control" id="erb-phrase-${phrase.key}-relation" .value=${phrase.relationship[1]}>
            </div>
            
            <!-- Right Entity -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-entity2">Right Entity</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-entity2" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-entity2">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-entity2">
                <div class="bg-info text-light rounded p-2">
                  Choose the name for the right entity.
                </div>
              </div>
              <input type="text" name="phrases.${phrase.key}.relationship.2" class="form-control" id="erb-phrase-${phrase.key}-entity2" .value=${phrase.relationship[2]}>
            </div>
            
            <!-- Left Solution -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-solution1">Left Solution</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-solution1" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-solution1">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-solution1">
                <div class="bg-info text-light rounded p-2">
                  Choose the correct solution for the left selector box for user answer.
                </div>
              </div>
              <select class="form-control" name="phrases.${phrase.key}.solution.0" id="erb-phrase-${phrase.key}-solution1">
                ${Object.values(config.values).map((value,i)=>html`<option value="${value}" ?selected=${phrase.solution[0]===value}>${config.text.selection[i+1]}</option>`)}
              </select>
            </div>

            <!-- Right Solution -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-solution2">Right Solution</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-solution2" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-solution2">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-solution2">
                <div class="bg-info text-light rounded p-2">
                  Choose the correct solution for the right selector box for user answer.
                </div>
              </div>
              <select class="form-control" name="phrases.${phrase.key}.solution.1" id="erb-phrase-${phrase.key}-solution2">
                ${Object.values(config.values).map((value,i)=>html`<option value="${value}" ?selected=${phrase.solution[1]===value}>${config.text.selection[i+1]}</option>`)}
              </select>
            </div>

            <!-- Left Comment -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-comment1">Left Comment</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-comment1" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-comment1">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-comment1">
                <div class="bg-info text-light rounded p-2">
                  An optional comment can be entered for the left solution that explains why this solution is correct.
                  The comment is only displayed if the phrase was answered incorrectly.
                </div>
              </div>
              <textarea name="phrases.${phrase.key}.comment.0" class="form-control" id="erb-phrase-${phrase.key}-comment1" .value=${phrase.comment?phrase.comment[0]:''}></textarea>
            </div>

            <!-- Right Comment -->
            <div class="form-group">
              <label for="erb-phrase-${phrase.key}-comment2">Right Comment</label>
              <span type="button" data-toggle="collapse" data-target="#erb-info-phrase-${phrase.key}-comment2" aria-expanded="false" aria-controls="erb-info-phrase-${phrase.key}-comment2">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
              <div class="collapse" id="erb-info-phrase-${phrase.key}-comment2">
                <div class="bg-info text-light rounded p-2">
                  An optional comment can be entered for the right solution that explains why this solution is correct.
                  The comment is only displayed if the phrase was answered incorrectly.
                </div>
              </div>
              <textarea name="phrases.${phrase.key}.comment.1" class="form-control" id="erb-phrase-${phrase.key}-comment2" .value=${phrase.comment?phrase.comment[1]:''}></textarea>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
