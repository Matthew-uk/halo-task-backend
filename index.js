const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routers/router");
const mongoose = require("mongoose");

const allowedOrigins = [
  "https://thehalotask.vercel.app/",
  "http://localhost:3000/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

app.use("/api/v1/", userRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  console.log(req.headers);
  res.status(200).json({ status: 200, message: "All is Well" });
});

app.listen(process.env.PORT, () => {
  console.log(`App is Running on Port: ${process.env.PORT}!!!`);
});
