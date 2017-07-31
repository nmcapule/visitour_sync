const firebase = require("firebase-admin");

const serviceAccount = require("./visitour-admin.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://visitour-2a6d8.firebaseio.com"
});

console.log("connecting...");
let db = firebase.database();

let userRef = db.ref("user");
userRef.once("value", (snapshot) => {
  console.log(snapshot.val());
});

userRef.on("child_changed", (snapshot) => {
  let value = snapshot.val();
  console.log(snapshot.key);
  console.log(value);
});

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "visitour"
});