'use strict';

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// [END import]

// [START addMessage]
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// [START addMessageTrigger]
exports.addMessage = functions.https.onRequest((req, res) => {
  // [END addMessageTrigger]
  // Grab the text parameter.
  const original = req.query.text;
  // [START adminSdkPush]
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
  // [END adminSdkPush]
});
// [END addMessage]

// [START makeUppercase]
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
// [START makeUppercaseTrigger]
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onWrite(event => {
    // [END makeUppercaseTrigger]
    // [START makeUppercaseBody]
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log('Uppercasing', event.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data.ref.parent.child('uppercase').set(uppercase);
    // [END makeUppercaseBody]
  });
// [END makeUppercase]
// [END all]

exports.addKey = functions.database.ref('/albums/{pushId}')
  .onCreate(event => {
    // Exit when the data is deleted.
    if (!event.data.exists()) {
      console.log('Album not exist anymore');
      return;
    }

    /**
     * event.data == snapshot
     * @url: https://firebase.google.com/docs/reference/functions/functions.database.DeltaSnapshot
     */
    console.log('New album key :', event.data.key);
    console.log('Write key', event.data.key);
    return event.data.ref.child('key').set(event.data.key);
  });
