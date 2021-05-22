const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    // Identify user by token
    // Get user data
    // Save user data to req.locals.user = userDetails;
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }

};

//Code to portetcting routes from unathorized acces i.e editing/deleting posts. connected to auth-interceptor
