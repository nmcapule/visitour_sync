const firebase = require("firebase-admin");


exports.setup = function(firebaseDb, mysqlDb) {
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