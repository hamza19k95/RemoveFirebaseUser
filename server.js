// const FirebaseDBManager = require("./Db/FirebaseDb/flush");
const FirebaseDBManager = require("./Db/FirebaseDb/978eats");
var dbManager = new FirebaseDBManager();
dbManager.connectDB((db) => {
  console.log("FirebaseDB connected");
});

dbManager.getAllUser();
console.log("tet");
