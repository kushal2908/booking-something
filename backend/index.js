require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const User = require("./models/user/User");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
/////////////////
// Middlewares
//////////////////
//to parse json from frontend payload
app.use(express.json());
//reading cookies
app.use(cookieParser());
//Cors enabling and configure
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
//Morgan
app.use(morgan("tiny"));

//connect db
mongoose.connect(process.env.MONGO_URL);

// secrects
let salt = bcrypt.genSaltSync(10);
let jwtSecret = process.env.JWT_SECRET;

//////////////////////////////////////////////
// API Routes
//////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json({ Message: "Welcome to airBnB clone by Sarder Safa Bin Salam" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let findUser = await User.findOne({ email });
    if (findUser) {
      const validatePassword = bcrypt.compareSync(password, findUser?.password);
      if (validatePassword) {
        jwt.sign({ id: findUser?._id, name: findUser?.name }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token)
            .json({ message: "User Found", data: { name: findUser?.name, id: findUser?._id } });
        });
      } else {
        res.status(400).json({ message: "Password doesn't match" });
      }
    } else {
      re.status(401).json({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      let userData = await User.findById(user?.id);
      res.json({ name: userData?.name, id: userData?._id });
    });
  } else {
    res.status(400).json({ message: "Cookies where?" });
  }
});

app.post("/place", (req, res) => {});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logout successful");
});

app.listen(4000, () => {
  console.log("App starts in port 4000");
});
