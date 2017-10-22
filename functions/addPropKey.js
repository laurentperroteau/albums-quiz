'use strict';

const functions = require('firebase-functions');
const admin     = require('firebase-admin');

exports.handler = event => {
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    console.log('Not exist anymore');
    return;
  }

  /**
   * event.data == snapshot
   * @url: https://firebase.google.com/docs/reference/functions/functions.database.DeltaSnapshot
   */
  console.log('New key :', event.data.key);
  console.log('Write key', event.data.key);
  return event.data.ref.child('key').set(event.data.key);
};
