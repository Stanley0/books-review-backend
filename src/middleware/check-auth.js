const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.locals = {};
    req.locals.userData = { nickname: decodedToken.nickname, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed" });
  }

};

//Code to portetcting routes from unathorized acces i.e editing/deleting posts. connected to auth-interceptor
