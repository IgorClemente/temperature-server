var admin = require("firebase-admin");

var express = require("express");
const server = express();

const { PythonShell } = require("python-shell");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://raspberry-temperature-contr-xh.firebaseio.com/"
});

var defaultDatabase = admin.database();
var ref = defaultDatabase.ref();

entitiesFromAssistant = {};

setInterval(() => {
  PythonShell.run("humidity.py", null, function(err, result) {
    if (err) throw err;
    console.log("finished", result);
    ref.set({ temperature: result });
  });
}, 20000);

ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var val = childSnapshot.val();

    entitiesFromAssistant[key] = val;
  });
  console.log(entitiesFromAssistant);
});
