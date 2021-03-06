const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) return { error: 'Only admins can add other admins.' };

    admin
        .auth()
        .getUserByEmail(data.email)
        .then(user =>
            admin
                .auth()
                .setCustomUserClaims(user.uid, {
                    admin: true
                })
                .then(() => ({ message: `Successfully made ${user.fname} an admin.` }))
                .catch(error => error)
        );
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
