/**
 * @overview data-based resources used as example for learning analytics of ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "analytics_config": {
    "app": [ { "name": "ER-zu-relationales-Schema-Trainer" } ],
    "placeholder.captions": [ "User", "", "", "Correct", "Result", "Created", "Last Update", "" ],
    "store": [ "ccm.store", { "name": "er_logic_trainer-results", "url": "wss://ccm2.inf.h-brs.de" } ],
    "user": null
  }

};