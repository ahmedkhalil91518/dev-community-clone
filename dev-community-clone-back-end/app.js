const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");

const unknownEndpoint = require("./middlewares/unknownEndpoint");
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./controllers/authRouter");
// const serviceAccount = require("./dev-community-clone-firebase-adminsdk-fx6ls-2e5cc4e794.json");
const postsRouter = require("./controllers/postsRouter");
const tokenExtractor = require("./middlewares/tokenExtractor");
const userExtractor = require("./middlewares/userExtractor");
const viewPostsRouter = require("./controllers/viewPostsRouter");
const tagsRouter = require("./controllers/tagsRouter");

require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(cors());

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json({  limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRouter);
app.use("/api/posts", [tokenExtractor, userExtractor], postsRouter);
app.use("/api/viewPosts", viewPostsRouter);
app.use("/api/tags",tagsRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
