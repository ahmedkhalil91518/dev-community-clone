const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.email) {
      console.log(request.token);
      console.log(decodedToken);
      return response.status(401).json({ error: "token missing or invalid" });
    }
    console.log("user2");
    const user = await User.findOne({email:decodedToken.email})
    request.user = user;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
