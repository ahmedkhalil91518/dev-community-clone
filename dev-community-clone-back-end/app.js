const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRouter = require("./controllers/signupRouter")
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/signup", signupRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
