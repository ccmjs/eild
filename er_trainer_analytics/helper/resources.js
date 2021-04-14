/**
 * @overview data-based resources used as example for learning analytics of ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "er_trainer": {
    "app": [ { "name": "ER-Trainer" } ],
    "placeholder.captions": [ "", "", "", "Correct", "Result", "Created", "Last Update", "" ],
    "store": [ "ccm.store", { "name": "er_trainer-results", "url": "wss://ccm2.inf.h-brs.de" } ],
    "user": null
  }

};