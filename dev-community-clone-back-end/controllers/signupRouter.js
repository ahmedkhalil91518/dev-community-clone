const signupRouter = require("express").Router();
const admin = require("firebase-admin");
const auth = require("firebase-admin/auth");
const serviceAccount = require("../dev-community-clone-firebase-adminsdk-fx6ls-f81d57f0ea.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

signupRouter.post("/", async (req, res, next) => {
  auth
    .getAuth()
    .createCustomToken(req.body.uid)
    .then((customToken) => {
      // Send token back to client
      console.log(customToken);
      res.send(customToken)
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = signupRouter;
