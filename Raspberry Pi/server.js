var admin = require("firebase-admin");

// filestream library for writing file
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

ref.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var key = childSnapshot.key;
    var val = childSnapshot.val();

    entitiesFromAssistant[key] = val;
  });

  console.log(entitiesFromAssistant);

  if (entitiesFromAssistant.read) {
    dummy.stdout.on("data", function(data) {
      console.log(data.toString());
    });
  }
}); // ref.on('value', function (snapshot)
