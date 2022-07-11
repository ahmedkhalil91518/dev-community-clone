const Tag = require("../models/tag");
const tagsRouter = require("express").Router();

tagsRouter.get("/", async (request, response, next) => {
  const tags = await Tag.find({})
  response.send(tags);
});

module.exports = tagsRouter;
