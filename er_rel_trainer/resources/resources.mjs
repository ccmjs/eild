/**
 * @overview Data-based resources of <i>ccmjs</i>-based web component for ER model to relational scheme training.
 * @author André Kless <andre.kless@web.de> 2022
 * @license The MIT License (MIT)
 */

/**
 * Used app configuration
 * @namespace DataResources
 */

/**
 * German translations
 * @type {Object.<string,string>}
 * @memberOf DataResources
 */
export const de = {

  /* Badges */
  "badge_ak": "AK",
  "badge_ak_title": "Alternativschlüssel",
  "badge_fk": "FK",
  "badge_fk_title": "Fremdschlüssel",
  "badge_man": "NOT NULL",
  "badge_opt": "NULL",
  "badge_pk": "PK",
  "badge_pk_title": "Primärschlüssel",

  /* Basic Terms */
  "main_title": "ER-REL-Trainer",
  "main_heading": "Gegeben ist ein ER-Diagramm, das eine Beziehung zwischen Entitäten zeigt. Ihre Aufgabe ist es das ER-Diagramm in ein logisches relationales Schema zu überführen und dafür die nötigen Tabellen anzulegen, darin die erforderlichen Schlüsselattribute zu ergänzen und die Richtung festzulegen, in der die Tabellen miteinander in Beziehung stehen.",
  "main_notation": "ER-Notation:",
  "main_phrase": "Phrase",
  "main_table": "Tabelle",

  /* Buttons */
  "btn_correction": "Korrigieren",
  "btn_finish": "Neustart",
  "btn_next": "Weiter",
  "btn_skip": "Überspringen",
  "btn_solution": "Zeige Lösung",
  "btn_submit": "Abschicken",

  /* Comments During Input */
  "comment_create_tables": "Hinweis: Über die Buttons unter dem ER-Diagramm können neue Tabellen angelegt werden. Entscheide, welche Tabellen benötigt werden.",
  "comment_decide_null": "Hinweis: Lege für jedes Attribut fest, ob dessen Wert optional (NULL) oder verpflichtend (NOT NULL) ist.",
  "comment_connect_tables": "Hinweis: Setze über Fremdschlüssel die Tabellen miteinander in Beziehung.",
  "comment_set_arrows": "Hinweis: Lege an den Endpunkten der Verbindungslinien zwischen Tabellen fest, in welcher Richtung die Tabellen miteinander in Beziehung stehen.",

  /* Comments on Wrong Solution Concerning Tables */
  "comment_missing_entity_table": "Hinweis: Für jede Entität muss eine Tabelle erstellt werden.",
  "comment_missing_relation_table": "Hinweis: Zur Auflösung einer 'n:m'-Beziehung zwischen zwei oder mehr Entitäten wird eine zusätzliche Tabelle benötigt.",
  "comment_not_needed_relation_table": "Hinweis: Eine zusätzliche Tabelle wird nur bei einer 'n:m'-Beziehung zwischen zwei oder mehr Entitäten benötigt.",

  /* Comments on Wrong Solution Concerning Primary Keys */
  "comment_missing_pk": "Hinweis: Jede angelegte Tabelle benötigt einen Primärschlüssel.",
  "comment_pk_not_null": "Hinweis: Attribute, die zum Primärschlüssel gehören, sind immer Pflichtfelder (NOT NULL).",
  "comment_wrong_pk": "Hinweis: Eine Entitäts-Tabelle hat üblicherweise einen künstlichen Primärschlüssel und der Attributname orientiert sich am Namen der Entität.",
  "comment_nm_pk": "Hinweis: Bei einer 'n:m'-Beziehung zwischen zwei oder mehr Entitäten hat die zusätzliche Tabelle üblicherweise einen zusammengesetzten Primärschlüssel, bestehend aus jeweils einem Attribut für jede Entität. Darüber wird sichergestellt, dass jede Kombination aus deren Werten nur einmal vorkommt.",

  /* Comments on Wrong Solution Concerning Foreign Keys */
  "comment_1c_fk": "Hinweis: Wenn bei einer '1:1'-Beziehung beide Entitäten über unterschiedliche Kardinalitäten verfügen, wird der Fremdschlüssel bei der schwächeren Entität hinzugefügt. Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.",
  "comment_1n_fk": "Hinweis: Bei einer '1:n'-Beziehung wird der Fremdschlüssel bei der einfachen Entität gesetzt. Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.",
  "comment_nm_fk": "Hinweis: Bei einer 'n:m'-Beziehung zwischen zwei oder mehr Entitäten werden die Fremdschlüssel in der zusätzlichen Tabelle gesetzt.",
  "comment_hierarchy_fk": "Hinweis: Bei einer Generalisierung/Spezialisierung werden die Fremdschlüssel bei den Spezialisierungen gesetzt.",
  "comment_not_null_fk": "Hinweis: Wird über den Fremdschlüssel eine Muss-Kardinalität modelliert, ist der Fremdschlüssel nicht optional (NOT NULL). Dadurch ist die Referenzierung eines Datensatzes in der Zieltabelle verpflichtend.",
  "comment_null_fk": "Hinweis: Wird über den Fremdschlüssel eine Kann-Kardinalität modelliert, ist der Fremdschlüssel optional (NULL). Dadurch ist die Referenzierung eines Datensatzes in der Zieltabelle nicht verpflichtend.",

  /* Comments on Wrong Solution Concerning Alternate Keys */
  "comment_ak": "Hinweis: Bei einer '1:1'-Beziehung wird der Fremdschlüssel als Alternativschlüssel gesetzt, damit es keine mehrfache Referenzierung eines Datensatzes in der Zieltabelle geben kann. Ohne den Alternativschlüssel würde man eine '1:n'-Beziehung statt einer '1:1'-Beziehung realisieren.",

  /* Comments on Correct Solution */
  "comment_alternate_solution": "Hinweis: Dies ist eine alternative Lösung. Sie entspricht nicht der empfohlenen Lösung, erfüllt aber ebenfalls die Anforderungen.",
  "comment_mandatory": "Hinweis: Dies ist eine korrekte Lösung. Bedenke aber, dass manches auch nicht modellierbar war. Eine Muss-Kardinalität, bei der über den Fremdschlüssel referenzierten Entität, lässt sich im logischen relationalen Schema nicht abbilden. Es kann zwar beim Fremdschlüssel mittels NULL und NOT NULL festgelegt werden, dass es zu jeder A-Entität mindestens eine B-Entität geben muss, aber nicht gleichzeitig auch umgekehrt. Eine Referenzierung in beide Richtungen wäre eine Redundanz und daher keine Lösung.",
  "comment_total": "Hinweis: Dies ist eine korrekte Lösung. Bedenke aber, dass manches auch nicht modellierbar war. Bei einer Generalisierung/Spezialisierung lässt sich die totale Vollständigkeit im logischen relationalen Schema nicht abbilden. Es kann daher nicht garantiert werden, dass es keine weiteren Untertypen des Obertyps gibt.",
  "comment_disjoint": "Hinweis: Dies ist eine korrekte Lösung. Bedenke aber, dass manches auch nicht modellierbar war. Bei einer Generalisierung/Spezialisierung lässt sich die Disjunktheit im logischen relationalen Schema nicht abbilden. Es kann daher nicht garantiert werden, dass eine Entität genau einer Spezialisierung angehört.",

  /* Feedback */
  "feedback_correct": "Ihre Antwort war richtig!",
  "feedback_failed": "Ihre letzte Antwort war falsch!",
  "feedback_solution": "Richtige Lösung:",

  /* Generalisation/Specialisation Relation */
  "hierarchy_d": "disjunkt",
  "hierarchy_is": "ist",
  "hierarchy_n": "nicht-disjunkt",
  "hierarchy_p": "partiell",
  "hierarchy_t": "total",

  /* Legend of Notations */
  "legend": "Legende",
  "legend_1": "einfach",
  "legend_c": "bedingt",
  "legend_n": "mehrfach",
  "legend_cn": "bedingt mehrfach",

  /* Table Dialog */
  "table_dialog_info": "Lege fest, welche Attribute Teil welcher Schlüssel sind. Entscheide auch für jedes Attribut, ob es optional (NULL) oder verpflichtend (NOT NULL) ist."

};

/**
 * English translations
 * @type {Object.<string,string>}
 * @memberOf DataResources
 */
export const en = {

  /* Badges */
  "badge_ak": "AK",
  "badge_ak_title": "Alternate Key",
  "badge_fk": "FK",
  "badge_fk_title": "Foreign Key",
  "badge_man": "NOT NULL",
  "badge_opt": "NULL",
  "badge_pk": "PK",
  "badge_pk_title": "Primary Key",

  /* Basic Terms */
  "main_title": "ER-REL Trainer",
  "main_heading": "Given an ER diagram showing a relationship between entities. Your task is to convert the ER diagram into a logical relational schema and to create the necessary tables, add the necessary key attributes and determine the direction in which the tables are related to each other.",
  "main_notation": "ER Notation:",
  "main_phrase": "Phrase",
  "main_table": "Table",

  /* Buttons */
  "btn_correction": "Correction",
  "btn_finish": "Restart",
  "btn_next": "Next",
  "btn_skip": "Skip",
  "btn_solution": "Show Solution",
  "btn_submit": "Submit",

  /* Comments During Input */
  "comment_create_tables": "Note: New tables can be created using the buttons below the ER diagram. Decide which tables are needed.",
  "comment_decide_null": "Note: Specify for each attribute whether its value is optional (NULL) or mandatory (NOT NULL).",
  "comment_connect_tables": "Note: Use foreign keys to relate the tables to one another.",
  "comment_set_arrows": "Note: At the endpoints of the connecting lines between tables, specify in which direction the tables relate to each other.",

  /* Comments on Wrong Solution Concerning Tables */
  "comment_missing_entity_table": "Note: A table must be created for each entity.",
  "comment_missing_relation_table": "Note: An additional table is required to resolve an 'many-to-many' relationship between two or more entities.",
  "comment_not_needed_relation_table": "Note: An additional table is only required for an 'many-to-many' relationship between two or more entities.",

  /* Comments on Wrong Solution Concerning Primary Keys */
  "comment_missing_pk": "Note: Each table created requires a primary key.",
  "comment_pk_not_null": "Note: Attributes belonging to the primary key are always mandatory (NOT NULL).",
  "comment_wrong_pk": "Note: An entity table usually has an artificial primary key and the attribute name is based on the entity name.",
  "comment_nm_pk": "Note: In an 'many-to-many' relationship between two or more entities, the additional table typically has a composite primary key consisting of one attribute for each entity. This ensures that each combination of their values occurs only once.",

  /* Comments on Wrong Solution Concerning Foreign Keys */
  "comment_1c_fk": "Note: In an 'one-to-one' relationship, if both entities have different cardinalities, the foreign key is added at the weaker entity. An entity is a weak entity if its existence depends on the other entity.",
  "comment_1n_fk": "Note: In an 'one-to-many' relationship, the foreign key is set on the simple entity. A simple entity is the entity that is connected to the other entity at most once.",
  "comment_nm_fk": "Note: In an 'many-to-many' relationship between two or more entities, the foreign keys are set in the additional table.",
  "comment_hierarchy_fk": "Note: In the case of a generalization/specialization, the foreign keys are set for the specializations.",
  "comment_not_null_fk": "Note: If a mandatory cardinality is modeled via the foreign key, the foreign key is not optional (NOT NULL). This means that a data record must be referenced in the target table.",
  "comment_null_fk": "Note: If an optional cardinality is modeled via the foreign key, the foreign key is optional (NULL). This means that referencing a data record in the target table is not mandatory.",

  /* Comments on Wrong Solution Concerning Alternate Keys */
  "comment_ak": "Note: In an 'one-to-one' relationship, the foreign key is set as an alternative key so that a data record cannot be referenced multiple times in the target table. Without the alternative key, an 'one-to-many' relationship would be realized instead of an 'one-to-one' relationship.",

  /* Comments on Correct Solution */
  "comment_alternate_solution": "Note: This is an alternative solution. It is not the recommended solution, but still fulfills the requirements.",
  "comment_mandatory": "Note: This is a correct solution. But keep in mind that some things could not be modeled. A mandatory cardinality for the entity referenced via the foreign key cannot be mapped in the logical relational schema. With the foreign key, you can use NULL and NOT NULL to specify that there must be at least one B entity for every A entity, but not vice versa at the same time. Referencing in both directions would be redundant and therefore not a solution.",
  "comment_total": "Note: This is a correct solution. But keep in mind that some things could not be modeled. In the case of generalization/specialization, total completeness cannot be represented in the logical relational schema. It can therefore not be guaranteed that there are no further subtypes of the supertype.",
  "comment_disjoint": "Note: This is a correct solution. But keep in mind that some things could not be modeled. In the case of generalization/specialization, the disjointness cannot be represented in the logical relational schema. It can therefore not be guaranteed that an entity belongs to exactly one specialization.",

  /* Feedback */
  "feedback_correct": "Your answer was correct!",
  "feedback_failed": "Ihre letzte Antwort war falsch!",
  "feedback_solution": "Your last answer was wrong!",

  /* Generalisation/Specialisation Relation */
  "hierarchy_d": "disjoint",
  "hierarchy_is": "is",
  "hierarchy_n": "non-disjoint",
  "hierarchy_p": "partial",
  "hierarchy_t": "total",

  /* Legend of Notations */
  "legend": "Legend",
  "legend_1": "Simple",
  "legend_c": "Conditional",
  "legend_n": "Multiple",
  "legend_cn": "Conditional Multiple",

  /* Table Dialog */
  "table_dialog_info": "Specify which attributes are part of which keys. Also decide for each attribute whether it is optional (NULL) or mandatory (NOT NULL)."

};

/**
 * Local app configuration (relative paths)
 * @type {app_config}
 * @memberOf DataResources
 */
export const local = {
  "auto_arrows": false,
  "css.1.1": "./../er_rel_trainer/resources/styles-v2.css",
  "default.path": "./../er_trainer/resources/img/",
  "fixed_notation": false,
  "helper": [ "ccm.load", "./../libs/ccm/helper.mjs" ],
  "html.1": "./../er_rel_trainer/resources/templates-v2.mjs",
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/ccm.lang.js", {
    "translations": { "de": de, "en": en }
  } ],
  "notations.1": "./../er_trainer/resources/resources-v5.mjs#notations",
  "modal.attr.2.css.1.1": "./../er_rel_trainer/resources/modal.css",
  "onfinish": { "log": true, "restart": true },
  "phrases": [ "ccm.load", "./../er_trainer/resources/resources-v5.mjs#phrases" ],
  "show_solution": true,
  "shuffle": true,
  "text": de
};

/**
 * Demo app configuration
 * @type {app_config}
 * @memberOf DataResources
 */
export const demo = {
  "lang": [ "ccm.start", "https://ccmjs.github.io/akless-components/lang/versions/ccm.lang-1.1.0.min.js", {
    "translations": { "de": de, "en": en }
  } ],
  "text": de
};
