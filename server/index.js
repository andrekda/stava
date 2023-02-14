//Dependencies
const path = require("path");

//  Server-dependencies
const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

//  DB-dependencies
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const MongoDBStore = require("connect-mongodb-session")(session);
mongoose.set("strictQuery", false);

//Define constants
const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  IS_PROD,
  COOKIE_NAME,
} = require("./config/config");
const { MongoURI } = require("./config/database");
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

//configure mongoose
mongoose.connect(
  MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);
// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: MongoURI,
  collection: "sessions",
});

// Express-Session
app.use(
  session({
    name: COOKIE_NAME,
    secret: SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: IS_PROD,
    },
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routers:
const userRouter = require("./Routers/userRouter");
app.use("/api/user", userRouter);

// Handle all other GET-reqs
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});