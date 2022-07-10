const Post = require("../models/post");
const Tag = require("../models/tag");
const postsRouter = require("express").Router();

postsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log(body);
  let tagsArray = [];
  if (body.tags) {
    for (let i = 0; i < body.tags.length; i++) {
      if (body.tags[i].__isNew__) {
        const newTag = new Tag({
          value: body.tags[i].value,
          label: body.tags[i].label,
        });
        await newTag.save();
        tagsArray.push(newTag._id);
      }
    }
  }
  const post = new Post({
    title: body.title,
    coverPicture: body.coverPicture,
    content: JSON.stringify(body.article),
    tags: tagsArray,
    author: request.user._id,
  });
  post.save(function (err) {
    if (err) {
      console.log(err);
    }
  });

  response.send(body);
});

postsRouter.get("/",async (request, response, next) => {
  const posts = await Post.find({}).populate("author").populate("tags");
  response.send(posts)
})

module.exports = postsRouter;
