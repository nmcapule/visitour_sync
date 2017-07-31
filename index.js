const firebase = require("firebase-admin");
const mysql = require("mysql");

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

function setupSyncingUsers(firebaseDb, mysqlDb) {
  // Clear users.
  console.log("Resetting table user...");
  mysqlDb.query("TRUNCATE TABLE user", (error, results, fields) => {
    if (error !== null) console.error(error);
  });

  const insertUser = (id, user) => {
    const { email, avatar, name } = user;
    const dbUser = { id, email, avatar, name };

    mysqlDb.query("INSERT INTO user SET ?", dbUser, (error, results, fields) => {
      if (error !== null) console.error(error);
    });
  };

  const updateUser = (id, user) => {
    const { email, avatar, name } = user;
    const dbUser = { id, email, avatar, name };

    mysqlDb.query("UPDATE user SET ? WHERE id = ?", [dbUser, id], (error, results, fields) => {
      if (error !== null) console.error(error);
    });
  }

  // Update users with new data.
  console.log("connecting to firebase...");
  const userRef = firebaseDb.ref("user");

  console.log("listing users...");
  userRef.once("value", (snapshot) => {
    const users = snapshot.val();

    Object.keys(users).map((key) => {
      const user = users[key];
      console.log("inserting user: " + user.name);
      insertUser(key, user);
    });

    console.log("done");

  });

  userRef.on("child_changed", (snapshot) => {
    const key = snapshot.key;
    const user = snapshot.val();

    console.log("updating user: " + user.name);
    updateUser(key, user);
    console.log("done");
  });
}

function main() {
  const firebaseDb = firebaseInit().database();

  const mysqlDb = mysqlInit();
  mysqlDb.connect();

  setupSyncingUsers(firebaseDb, mysqlDb);

  // conn.end();
}

main();
