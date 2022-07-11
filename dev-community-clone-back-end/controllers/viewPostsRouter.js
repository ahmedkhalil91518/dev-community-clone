const Post = require("../models/post");
const viewPostsRouter = require("express").Router();

viewPostsRouter.get("/", async (request, response, next) => {
  const posts = await Post.find({}).populate("author").populate("tags");
  response.send(posts);
});

viewPostsRouter.get("/:id", async (request, response, next) => {
  const post = await Post.findOne({ _id: request.params.id })
    .populate("author")
    .populate("tags");
  response.send(post);
});

module.exports = viewPostsRouter;
