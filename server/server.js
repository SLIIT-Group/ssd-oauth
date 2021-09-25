require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

//Connect to MongoDB
connectDB();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/", require("./routes/routes"));
app.use("/auth", require("./routes/auth-routes"));
app.use("/profile", require("./routes/profile-routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
