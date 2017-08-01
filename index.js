const firebase = require("firebase-admin");
const mysql = require("mysql");

const syncUsers = require("./lib/sync_users.js");
const syncGroups = require("./lib/sync_groups.js");
const syncMessages = require("./lib/sync_messages.js");

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

  syncUsers.setup(firebaseDb, mysqlDb);
  syncGroups.setup(firebaseDb, mysqlDb);
  syncMessages.setup(firebaseDb, mysqlDb);

  // mysqlDb.end();
}

main();
