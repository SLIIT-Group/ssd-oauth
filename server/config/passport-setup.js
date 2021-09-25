const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");
const credentials = require("../credentials.json");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: credentials.web.client_id,
      clientSecret: credentials.web.client_secret,
    },
    //passport callback function
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        //check if user already exists
        if (currentUser) {
          console.log("User exists, user is " + currentUser);
          done(null, currentUser);
        } else {
          //create user
          new User({
            username: profile.displayName,
            googleID: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("New user created " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
