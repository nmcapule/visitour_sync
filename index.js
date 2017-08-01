const firebase = require("firebase-admin");
const mysql = require("mysql");
const syncUsers = require("./lib/sync_users.js");

function firebaseInit() {
  const serviceAccount = require("./credentials-firebase.json");

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://visitour-2a6d8.firebaseio.com"
  });

  return firebase;
}

function mysqlInit() {
  const credentials = require("./credentials-mysql.json");
  const connection = mysql.createConnection(credentials);

  return connection;
}

function main() {
  const firebaseDb = firebaseInit().database();

  const mysqlDb = mysqlInit();
  mysqlDb.connect();

  console.log(syncUsers);

  syncUsers.setup(firebaseDb, mysqlDb);

  // conn.end();
}

main();
