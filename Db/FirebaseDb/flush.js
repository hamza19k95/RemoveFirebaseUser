const admin = require("firebase-admin");
const serviceAccount = require("./flush-66fa7-firebase-adminsdk-oy65x-5860559933.json");
const dbURL = "https://flush-66fa7-default-rtdb.firebaseio.com";
// const bucketURL = "entreego-f77ce.appspot.com";

class FirebaseDBManager {
  constructor() {
    this.firebaseDB = null;
  }

  connectDB = async (callback) => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbURL,
    });

    this.firebaseDataBase = admin.database();
    this.firebaseDB = admin.firestore();
    this.firebaseAuth = admin.auth();
    this.firebaseStorage = admin.storage();
    this.firebaseDB.settings({ ignoreUndefinedProperties: true });
    console.log("Connected to Firebase DB");

    callback(this.firebaseDB);
  };

  getAllUser = async (callback) => {
    let userIds = [];
    this.firebaseAuth
      .listUsers(1000, callback)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          userIds.push(userRecord.uid);
        });
        console.log("userIds +++++++++ ", userIds);
        this.firebaseAuth
          .deleteUsers(userIds)
          .then((deleteUsersResult) => {
            console.log(
              `Successfully deleted ${deleteUsersResult.successCount} users`
            );
            console.log(
              `Failed to delete ${deleteUsersResult.failureCount} users`
            );
            deleteUsersResult.errors.forEach((err) => {
              console.log(err.error.toJSON());
            });
          })
          .catch((error) => {
            console.log("Error deleting users:", error);
          });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  };
}

module.exports = FirebaseDBManager;
