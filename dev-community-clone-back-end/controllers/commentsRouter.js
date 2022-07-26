const comment = require("../models/comment");
const post = require("../models/post");

const commentsRouter = require("express").Router();

commentsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const data = new comment({
    comId: body.comId,
    text: body.text,
    userId: request.user._id,
    replies: [],
    parentPost: body.parentPost,
  });
  data.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  const postCommentRef = await post.findOneAndUpdate(
    { id: body.parentPost },
    {
      $push: {
        comments: data._id,
      },
    },
    {
      new: true, //to return updated document
    }
  ).exec()
  console.log("postCommentRef",postCommentRef);
  response.send(body);
});

module.exports = commentsRouter;
