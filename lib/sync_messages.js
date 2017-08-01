const firebase = require("firebase-admin");
const utility = require("./utility.js");

function deconstructFirebaseMessage(id, message, useDefaultValue) {
  const set = utility.enterIfValid;
  const val = (x) => useDefaultValue?x:undefined;

  let dbMessage = {};

  // TODO(ncapule): Wait for SQL schema of group messages.

  return dbMessage;
}

function insertMessage(mysqlDb, id, message) {
  const dbMessage = deconstructFirebaseMessage(id, message, true);

  // TODO(ncapule): Wait for SQL schema of group messages.

  // mysqlDb.query("INSERT INTO group_messages SET ?", dbMessage, (error, results, fields) => {
  //   if (error !== null) console.error(error);
  // });
}

function updateMessage(mysqlDb, id, message) {
  const dbMessage = deconstructFirebaseMessage(id, message);

  // TODO(ncapule): Wait for SQL schema of group messages.

  // mysqlDb.query("UPDATE group_messages SET ? WHERE message_id = ?", [dbMessage, id], (error, results, fields) => {
  //   if (error !== null) console.error(error);
  // });
}

function deleteMessage(mysqlDb, id) {

  // TODO(ncapule): Wait for SQL schema of group messages.
  
  // mysqlDb.query("DELETE FROM group_messages WHERE message_id = ?", id, (error, results, fields) => {
  //   if (error !== null) console.error(error);
  // });
}

function setup(firebaseDb, mysqlDb) {
  // Clear messages.
  // console.log("Resetting table group_messages...");
  // mysqlDb.query("TRUNCATE TABLE group_messages", (error, results, fields) => {
  //   if (error !== null) console.error(error);
  // });

  // Update messages with new data.
  console.log("connecting to firebase...");
  const messageRef = firebaseDb.ref("message");

  messageRef.on("child_added", (snapshot) => {
    const key = snapshot.key;
    const message = snapshot.val();

    console.log("inserting message: " + message.name);
    insertMessage(mysqlDb, key, message);
    
    console.log("done");
  });

  messageRef.on("child_changed", (snapshot) => {
    const key = snapshot.key;
    const message = snapshot.val();

    console.log("updating message: " + message.name);
    updateMessage(mysqlDb, key, message);
    
    console.log("done");
  });

  messageRef.on("child_removed", (snapshot) => {
    const key = snapshot.key;

    console.log("deleting message of key: " + key);
    deleteMessage(mysqlDb, key);

    console.log("done");
  });
}

exports.setup = setup;