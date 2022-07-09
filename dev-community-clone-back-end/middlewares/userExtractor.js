const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
  console.log("user");
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id)
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
