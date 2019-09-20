var admin = require("firebase-admin");

var express = require("express");
const server = express();

const { PythonShell } = require("python-shell");

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

PythonShell.run("humidity.py", null, function(err, result) {
  if (err) throw err;
  console.log("finished", result);

  PythonShell.run("humidity.py", null, function(err, result) {
    if (err) throw err;
    console.log("finished", result);
  });
});

ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var val = childSnapshot.val();

    entitiesFromAssistant[key] = val;
  });

  console.log(entitiesFromAssistant);
});
