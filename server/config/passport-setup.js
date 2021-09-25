const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        //check if user already exists
        if (currentUser) {
          console.log("User exists, user is " + currentUser);
        } else {
          //create user
          new User({
            username: profile.displayName,
            googleID: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("New user created " + newUser);
            });
        }
      });
    }
  )
);
