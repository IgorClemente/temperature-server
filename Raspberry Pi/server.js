var admin = require("firebase-admin");

var express = require("express");
const server = express();

var PythonShell = require("python-shell");

var fs = require("fs");
var sys = require("sys");
var spawn = require("child_process").spawn;
var dummy = spawn("python", ["humidity.py"]);

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://raspberry-temperature-contr-xh.firebaseio.com/"
});

var defaultDatabase = admin.database();
var ref = defaultDatabase.ref();

entitiesFromAssistant = {};

/** 
dummy.stdout.on("data", function(data) {
  ref.set({ temperature: data.toString() });
});
**/

PythonShell.run("humidity.py", {}, function(err, results) {
  if (err) throw err;

  console.log("results: %j", results);
});

ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var val = childSnapshot.val();

    entitiesFromAssistant[key] = val;
  });

  console.log(entitiesFromAssistant);
});
