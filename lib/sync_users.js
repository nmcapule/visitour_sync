const firebase = require("firebase-admin");
const utility = require("./utility.js");

function deconstructFirebaseUser(id, user, useDefaultValue) {
  const set = utility.enterIfValid;
  const val = (x) => useDefaultValue?x:undefined;

  let dbUser = {};
  dbUser = set(dbUser, "user_id", id);
  dbUser = set(dbUser, "email", user["email"] || val(''));
  dbUser = set(dbUser, "address", user["address"] || val(''));
  dbUser = set(dbUser, "mobile", user["mobile"] || val(''));

  const names = utility.deconstructFirebaseName(user["name"] || val(''));
  dbUser = set(dbUser, "first_name", names["first_name"] || val(''));
  dbUser = set(dbUser, "middle_name", names["middle_name"] || val(''));
  dbUser = set(dbUser, "last_name", names["last_name"] || val(''));

  return dbUser;
}

function insertUser(mysqlDb, id, user) {
  const dbUser = deconstructFirebaseUser(id, user, true);

  mysqlDb.query("INSERT INTO user_account SET ?", dbUser, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function updateUser(mysqlDb, id, user) {
  const dbUser = deconstructFirebaseUser(id, user);

  mysqlDb.query("UPDATE user_account SET ? WHERE id = ?", [dbUser, id], (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function deleteUser(mysqlDb, id) {
  mysqlDb.query("DELETE FROM user_account WHERE id = ?", id, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function setup(firebaseDb, mysqlDb) {
  // Clear users.
  console.log("Resetting table user_account...");
  mysqlDb.query("TRUNCATE TABLE user_account", (error, results, fields) => {
    if (error !== null) console.error(error);
  });

  // Update users with new data.
  console.log("connecting to firebase...");
  const userRef = firebaseDb.ref("user");

  // userRef.once("value", (snapshot) => {
  //   const users = snapshot.val();

  //   Object.keys(users).map((key) => {
  //     const user = users[key];
  //     console.log("inserting user: " + user.name);
  //     insertUser(mysqlDb, key, user);
  //   });

  //   console.log("done");
  // });

  userRef.on("child_added", (snapshot) => {
    const key = snapshot.key;
    const user = snapshot.val();

    console.log("init: inserting user: " + user.name);
    insertUser(mysqlDb, key, user);
    
    console.log("done");
  });

  userRef.on("child_changed", (snapshot) => {
    const key = snapshot.key;
    const user = snapshot.val();

    console.log("updating user: " + user.name);
    updateUser(mysqlDb, key, user);
    
    console.log("done");
  });

  userRef.on("child_removed", (snapshot) => {
    const key = snapshot.key;

    console.log("deleting user: " + user.name);
    deleteUser(mysqlDb, key);

    console.log("done");
  });
}

exports.setup = setup;