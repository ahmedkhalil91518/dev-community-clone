const Post = require("../models/post");

const viewCommentsRouter = require("express").Router();

viewCommentsRouter.get("/:id", async (request, response, next) => {
  let data = await Post.find({ _id: request.params.id })
    .populate("author")
    .populate("comments")
    .populate("tags")
    .exec();
  console.log("thedata" ,data);
  response.send(data);
});

module.exports = viewCommentsRouter;
