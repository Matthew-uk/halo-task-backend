const expressAsyncHandler = require("express-async-handler");
const userModel = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const getUser = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Cannot get user Details: TOKEN not provided",
    });
  }
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid Token", err: err.message, token });
    }
    const user = await userModel.findById(decoded.id).select("username email");
    res.status(200).json(user);
  });
});

const signUp = expressAsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "User Already Exists",
      });
    } else {
      if (email && username && password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await userModel.create({
          email,
          username,
          password: hashedPassword,
        });

        const user = await userModel
          .findById(newUser.id)
          .select("username email");

        res.status(201).json({
          status: "success",
          message: "Account Created",
          token: generateToken(newUser.id),
          user,
        });
      } else {
        res.status(402).json({
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

const login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = await req.body;

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      res.status(404).json({
        status: "Not Found",
        message: "User not Found",
      });
    } else {
      const user = await userModel
        .findById(userExists._id)
        .select("username email");
      const passwordMatch = await bcrypt.compare(password, userExists.password);
      if (passwordMatch) {
        res.status(200).json({
          message: "User Logged In",
          user,
          token: generateToken(userExists.id),
        });
      } else {
        res.status(400).json({
          message: "Password does not match",
        });
      }
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = { signUp, login, getUser };
