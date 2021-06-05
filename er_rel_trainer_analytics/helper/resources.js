/**
 * @overview data-based resources used as example for learning analytics of ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "results": {
    "app": [ { "name": "ER-REL-Trainer" } ],
    "placeholder.captions": [ "User", "", "", "Correct", "Result", "Created", "Last Update", "" ],
    "store": [ "ccm.store", { "name": "dbs-ss21-er_rel_trainer-results", "url": "wss://ccm2.inf.h-brs.de" } ],
    "user": null
  },

  "log": {
    "data": {
      "store": [ "ccm.store", { "name": "dbs-ss21-er_rel_trainer-log", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": {}
    }
  }

};