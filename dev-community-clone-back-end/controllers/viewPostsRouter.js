const Post = require("../models/post");
const viewPostsRouter = require("express").Router();

viewPostsRouter.get("/",async (request, response, next) => {
    const posts = await Post.find({}).populate("author").populate("tags");
    response.send(posts)
  })
  
  module.exports = viewPostsRouter;