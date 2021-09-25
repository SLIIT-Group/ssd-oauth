const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.send("Login Page");
});

//auth logout
router.get("/logout", (req, res) => {
  //Handle with passport
  res.send("Logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//redirect url
router.get("/google/redirect", (req, res) => {
  res.send("Reached Callback URI");
});

module.exports = router;
