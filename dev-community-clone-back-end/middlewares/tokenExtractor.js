const tokenExtractor = (request, response, next) => {
  console.log("token");
  try {
    const getTokenFrom = (request) => {
      const authorization = request.get("Authorization");
      if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
      }
      return null;
    };

    const token = getTokenFrom(request);
    if (token) {
      request.token = token;
      next();
    } else {
      response.status(401).json({ error: "token missing or invalid" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = tokenExtractor;
