/**
 * @overview data-based resources of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./resources/default.css",
    "data": {
      "store": [ "ccm.store", { "name": "er_trainer-data", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "test",
      "login": true,
      "user": true
    },
    "html.1": "./resources/templates.mjs",
    "onfinish": { "restart": true, store: true, alert: 'Saved!' },
    "text.finish": "Speichern und Neustart",
    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
  },

  "demo": {}

};