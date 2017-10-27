'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const addPropKey = require('./addPropKey');

// TODO: add user too
exports.addPropKeyOnCreatingAlbum = functions.database.ref('/albums/{pushId}').onCreate(addPropKey.handler);
exports.addPropKeyOnCreatingQuestion = functions.database.ref('/questions/{pushId}').onCreate(addPropKey.handler);
