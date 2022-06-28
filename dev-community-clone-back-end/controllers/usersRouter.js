const usersRouter = require("express").Router();
const { getAuth } = require("firebase-admin/auth");

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.

  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log("user", userRecord.toJSON());
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
// Start listing users from the beginning, 1000 at a time.

usersRouter.get("/getAll", (req, res, next) => {
  listAllUsers()
});

module.exports = usersRouter;
