const Post = require("../models/post");
const Tag = require("../models/tag");
const viewPostsRouter = require("express").Router();

viewPostsRouter.get("/", async (request, response, next) => {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = {};

  if (endIndex < (await Post.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    results.data = await Post.find()
      .populate("author")
      .populate("tags")
      .sort([["created_at", -1]])
      .limit(limit)
      .skip(startIndex)
      .exec();
    console.log(results.next);
    response.json(results);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
});

viewPostsRouter.get("/post/:id", async (request, response, next) => {
  let results = {};
  results.data = await Post.findOne({ _id: request.params.id })
    .populate("author")
    .populate("tags");
  response.send(results);
});

viewPostsRouter.get("/tag/:tag", async (request, response, next) => {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = {};

  const tag = await Tag.findOne({ value: request.params.tag });
  results.data = await Post.find({ tags: { $elemMatch: { $eq: tag._id } } })
    .populate("author")
    .populate("tags")
    .sort([["created_at", -1]])
    .limit(limit)
    .skip(startIndex)
    .exec();

  if (endIndex < results.data) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  response.send(results);
});

module.exports = viewPostsRouter;
