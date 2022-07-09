const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user")
authRouter.post("/social", async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const user = await User.findOne({ uid: body.uid });

  if (!user) {
    try {
      const userInfo = new User({
        name: body.name,
        email: body.email,
        photo: body.photo,
        uid: body.uid,
        provider: body.provider,
      });

      const savedUser = await userInfo.save();

    } catch (error) {
      next(error);
    }
  }

  const userForToken = {
    email: body.email,
    uid: body.uid,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, ...body });
});

module.exports = authRouter;
