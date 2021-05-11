/**
 * @overview data-based resources of ccmjs-based web component for ER model to logical scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./../er_logic_trainer/resources/styles.css",
    "html.1": "./../er_logic_trainer/resources/templates.mjs",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "onfinish": { "log": true, "restart": true }
  },

  "demo": {}

};
