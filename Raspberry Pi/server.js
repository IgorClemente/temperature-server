var admin = require("firebase-admin");

var express = require("express");
const server = express();

var fs = require("fs");
var sys = required("sys");
var spawn = required("child_process").spawn;
var dummy = spawn("python", ["humidity.py"]);

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://raspberry-temperature-contr-xh.firebaseio.com/"
});

var defaultDatabase = admin.database();
var ref = defaultDatabase.ref();

entitiesFromAssistant = {};

const currentTemperature = "";

dummy.stdout.on("data", function(data) {
  currentTemperature = data.toString();
});

ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var val = childSnapshot.val();

    entitiesFromAssistant[key] = val;
  });

  console.log(entitiesFromAssistant);
  ref.set({ temperature: currentTemperature });
});
