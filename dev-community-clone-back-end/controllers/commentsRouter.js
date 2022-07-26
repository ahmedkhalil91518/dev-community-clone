const comment = require("../models/comment");

const commentsRouter = require("express").Router();

commentsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const data = new comment({
    comId: body.comId,
    text: body.text,
    userId: request.user._id,
    replies: [],
    parentPost: body.parentPost
  });
  data.save(function (err) {
    if (err) {
      console.log(err);
    }
  });

  response.send(body);
});

module.exports = commentsRouter;