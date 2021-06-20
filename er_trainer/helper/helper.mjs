/**
 * @overview Module for help functions
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

export function onstart( instance ) {
  instance.element.querySelector( '#cancel' ).style.display = 'none';
}

export function onchange( event ) {
  if ( event.event === 'submit' )
    event.instance.element.querySelector( '#cancel' ).style.display = 'block';
  if ( event.event === 'next' )
    event.instance.element.querySelector( '#cancel' ).style.display = 'none';
}

export function oncancel( instance, phrase_nr ) {
  instance.element.style.display = 'none';
  const div = document.createElement( 'div' );
  instance.shadow.appendChild( div );
  const state = instance.getValue();
  const phrase = state.sections[ phrase_nr - 1 ];
  phrase.hints = [ '', '' ];
  instance.ccm.start( 'https://ccmjs.github.io/eild/er_rel_trainer/versions/ccm.er_rel_trainer-1.0.0.js', {
    root: div,
    'default.notation': state.notation,
    phrases: [ phrase ],
    oncancel: () => {
      instance.helper.remove( div );
      instance.element.style.display = 'block';
    },
    onfinish: null,
    'text.cancel': 'ER-Trainer',
    'text.notation': instance.text.notation
  } );
}
