const Post = require("../models/post");
const Tag = require("../models/tag");
const viewPostsRouter = require("express").Router();

viewPostsRouter.get("/", async (request, response, next) => {
  const posts = await Post.find({}).populate("author").populate("tags");
  response.send(posts);
});

viewPostsRouter.get("/post/:id", async (request, response, next) => {
  const post = await Post.findOne({ _id: request.params.id })
    .populate("author")
    .populate("tags");
  response.send(post);
});

viewPostsRouter.get("/tag/:tag", async (request, response, next) => {
  const tag = await Tag.findOne({value: request.params.tag})
  console.log(tag);
  const posts = await Post.find({tags: { $elemMatch: { $eq: tag._id } }}).populate("author").populate("tags");
  response.send(posts);
});

module.exports = viewPostsRouter;
