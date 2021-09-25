const router = require("express").Router();

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
router.get("/google", (req, res) => {
  //handle with passport
  res.send("Logging in with Google");
});

module.exports = router;
