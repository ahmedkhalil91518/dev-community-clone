const postsRouter = require("express").Router();

postsRouter.post("/add", async (request, response, next) => {
  const body = request.body;
  console.log(body);
  response.send("hi")
});

module.exports = postsRouter;
