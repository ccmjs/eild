/**
 * @overview HTML templates of ccmjs-based web component for building a ER model training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder ) {
  return html`
    <form>
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
                <input type="number" min="1" name="number" class="form-control" id="erb-number" value="${config.number}">
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
                    If enabled, the user is shown what is right and what is wrong when answering a question.
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
            <div class="card-body"></div>
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
            <div class="card-body"></div>
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
                <input type="text" name="text.title" class="form-control" id="erb-text-title" value="${config.text.title}">
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
                <input type="text" name="text.heading" class="form-control" id="erb-text-heading" value="${config.text.heading}">
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
                <input type="text" name="text.notation" class="form-control" id="erb-text-notation" value="${config.text.notation}">
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
                <input type="text" name="text.legend" class="form-control" id="erb-text-legend" value="${config.text.legend}">
              </div>

              <!-- Question Prefix -->
              <div class="form-group">
                <label for="erb-text-phrase">Question Prefix</label>
                <span type="button" data-toggle="collapse" data-target="#erb-info-text-phrase" aria-expanded="false" aria-controls="erb-info-text-phrase">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="erb-info-text-phrase">
                  <div class="bg-info text-light rounded p-2">
                    Choose the prefix of a question.
                    The placeholder "%%" will later be automatically replaced by the current question number dynamically.
                  </div>
                </div>
                <input type="text" name="text.phrase" class="form-control" id="erb-text-phrase" value="${config.text.phrase}">
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
                <input type="text" name="text.entity1" class="form-control" id="erb-text-entity1" value="${config.text.entity1}">
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
                <input type="text" name="text.entity2" class="form-control" id="erb-text-entity2" value="${config.text.entity2}">
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
                <input type="text" name="text.input1" class="form-control" id="erb-text-input1" value="${config.text.input1}">
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
                <input type="text" name="text.input2" class="form-control" id="erb-text-input2" value="${config.text.input2}">
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
                    This text appears when a question has been answered correctly.
                  </div>
                </div>
                <input type="text" name="text.correct" class="form-control" id="erb-text-correct" value="${config.text.correct}">
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
                    This text appears when a question has been answered incorrectly.
                  </div>
                </div>
                <input type="text" name="text.failed" class="form-control" id="erb-text-failed" value="${config.text.failed}">
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
                    This text appears when a question is answered incorrectly and the correct solution is revealed.
                  </div>
                </div>
                <input type="text" name="text.correct_solution" class="form-control" id="erb-text-correct_solution" value="${config.text.correct_solution}">
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
                    This text informs the user how many questions have already been answered correctly.
                    The placeholders "%%" will later be automatically replaced by the current values dynamically.
                  </div>
                </div>
                <input type="text" name="text.current_state" class="form-control" id="erb-text-current_state" value="${config.text.current_state}">
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
                    Choose the label of the button that starts the next question.
                  </div>
                </div>
                <input type="text" name="text.next" class="form-control" id="erb-text-next" value="${config.text.next}">
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
                <input type="text" name="text.submit" class="form-control" id="erb-text-submit" value="${config.text.submit}">
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
                <input type="text" name="text.finish" class="form-control" id="erb-text-finish" value="${config.text.finish}">
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
                    If enabled, there is a finish button when all questions are answered for which individual actions such as saving solutions and displaying another app can be set.
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
                    The results are stored on the server of the computer science department of the Bonn-Rhein-Sieg University of Applied Sciences.
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
                <input type="text" name="onfinish.confirm" class="form-control" id="erb-confirm" value="${config.onfinish && config.onfinish.confirm || ''}">
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
                <input type="text" name="onfinish.alert" class="form-control" id="erb-success" value="${config.onfinish && config.onfinish.alert || ''}">
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
                <input type="text" name="app" class="form-control" id="erb-app" value="${config.onfinish && config.onfinish.render && config.onfinish.render.component && builder.helper.embedCode( config.onfinish.render.component, config.onfinish.render.config ) || ''}">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Button -->
      <button type="button" class="btn btn-info btn-block mt-0" data-toggle="modal" data-target="#erb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${!builder.onfinish || !builder.submit}>${builder.submit}</button>
    </form>
    
    <!-- Modal: Preview -->
    <div class="modal fade" id="erb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
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
