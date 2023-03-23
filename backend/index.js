require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const User = require("./models/user/User");
const Place = require("./models/place/Place");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");
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
//FS for photos
app.use("/uploads", express.static(__dirname + "/uploads"));

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

app.post("/upload-photo-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo-" + Date.now() + ".jpeg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const upload = multer({ dest: "uploads" });
app.post("/upload-photos", upload.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req?.files?.length; i++) {
    const { path, originalname } = req.files[i];
    //Renaming file name
    const parts = originalname?.split(".");
    const ext = parts[parts?.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/add-place", async (req, res) => {
  const { token } = req.cookies;
  const { title, address, photos, description, perks, extra_info, check_in, check_out, max_guest } = req.body;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      let placeDoc = await Place.create({
        owner: user?.id,
        title,
        address,
        photos,
        description,
        perks,
        extra_info,
        check_in,
        check_out,
        max_guest,
      });
      res.json({ message: "Place created successfully" });
    });
  } catch (err) {
    res.status(400).json({
      message: "Error! Creating Place",
    });
  }
});

app.get("/places", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { id } = user;
      let places = await Place.find({ owner: id });
      res.json(places);
    });
  } else {
    res.status(400).json({ message: "Error!" });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  let places = await Place.find({ _id: id });
  res.json(places);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logout successful");
});

app.listen(4000, () => {
  console.log("App starts in port 4000");
});
