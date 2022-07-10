const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/social", async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const user = await User.findOne({ email: body.email });
  console.log(user);
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

      const userForToken = {
        email: body.email,
        uid: body.uid,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);
      console.log(savedUser);
      response.status(200).send({ token, ...savedUser._doc, ...savedUser.id });
    } catch (error) {
      next(error);
    }
  } else {
    const userForToken = {
      email: body.email,
      uid: body.uid,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    console.log(user);
    response.status(200).send({ token, ...user._doc });
  }
});

authRouter.post("/signup", async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const user = await User.findOne({ email: body.email });

  if (!user) {
    try {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      const userInfo = new User({
        name: body.name,
        email: body.email,
        photo: body.photo,
        uid: body.uid,
        provider: body.provider,
        passwordHash,
      });

      const savedUser = await userInfo.save();
      const userForToken = {
        email: body.email,
        uid: body.uid,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      response.status(200).send({ token, ...savedUser._doc, ...savedUser.id });
    } catch (error) {
      next(error);
    }
  } else {
    response.status(400).send("user already exist with this email");
  }
});

authRouter.post("/login", async (request, response, next) => {
  const body = request.body;

  const user = await User.findOne({ email: body.email });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, ...user._doc, ...user.id });
});

module.exports = authRouter;
