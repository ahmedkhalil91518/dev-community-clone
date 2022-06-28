const signupRouter = require("express").Router();
const { getAuth } = require("firebase-admin/auth");

signupRouter.post("/", (req, res, next) => {
  getAuth()
    .createCustomToken(req.body.uid)
    .then((customToken) => {
      // Send token back to client
      res.send(customToken);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = signupRouter;
