const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const userModel = require("./../models/userModel");

const protect = expressAsyncHandler((req, res, next) => {
  let token;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      const decodedJwt = jwt.verify(token, process.env.SECRET);
      console.log(decodedJwt);
      req.user = userModel.findById(decodedJwt.id);
    } else {
      res.status(401).json({
        status: "UnAuthorized",
        message: "Authorization not found",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(405).json(error);
  }
});

module.exports = { protect };
