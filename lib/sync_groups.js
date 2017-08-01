const firebase = require("firebase-admin");
const utility = require("./utility.js");

function deconstructFirebaseRoom(id, room, useDefaultValue) {
  const set = utility.enterIfValid;
  const val = (x) => useDefaultValue?x:undefined;

  let dbGroup = {};

  dbGroup = set(dbGroup, "group_id", id);
  dbGroup = set(dbGroup, "name", room["groupInfo"]["name"] || val(""));
  dbGroup = set(dbGroup, "location", room["groupInfo"]["location"] || val(""));
  dbGroup = set(dbGroup, "privacy_type", room["groupInfo"]["privacy_type"] || val(""));

  return dbGroup;
}

function insertGroup(mysqlDb, id, room) {
  const dbGroup = deconstructFirebaseRoom(id, room, true);

  mysqlDb.query("INSERT INTO groups SET ?", dbGroup, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function updateGroup(mysqlDb, id, room) {
  const dbGroup = deconstructFirebaseRoom(id, room);

  mysqlDb.query("UPDATE groups SET ? WHERE group_id = ?", [dbGroup, id], (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function deleteGroup(mysqlDb, id) {
  mysqlDb.query("DELETE FROM groups WHERE group_id = ?", id, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function setup(firebaseDb, mysqlDb) {
  // Clear users.
  console.log("Resetting table groups...");
  mysqlDb.query("TRUNCATE TABLE groups", (error, results, fields) => {
    if (error !== null) console.error(error);
  });

  // Update users with new data.
  console.log("connecting to firebase...");
  const roomRef = firebaseDb.ref("room");

  roomRef.on("child_added", (snapshot) => {
    const key = snapshot.key;
    const group = snapshot.val();

    console.log("inserting group: " + key);
    insertGroup(mysqlDb, key, group);
    
    console.log("done");
  });

  roomRef.on("child_changed", (snapshot) => {
    const key = snapshot.key;
    const group = snapshot.val();

    console.log("updating group: " + key);
    updateGroup(mysqlDb, key, group);
    
    console.log("done");
  });

  roomRef.on("child_removed", (snapshot) => {
    const key = snapshot.key;

    console.log("deleting group of key: " + key);
    deleteGroup(mysqlDb, key);

    console.log("done");
  });
}

exports.setup = setup;