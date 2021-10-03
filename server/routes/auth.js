const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const credentials = require("../credentials.json");

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPE = [
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive",
];

/*
  @api {get} /auth/getAuthURL Request Auth URL from server
  @apiName getAuthURL
  @apiGroup auth
  @apiSuccess (Success 201) {text} oauth token
  @apiError {text} Error retrieving access token
 */
router.get("/getAuthURL", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });
  return res.send(authUrl);
});

router.post("/getToken", (req, res) => {
  if (req.body.code == null) return res.status(400).send("Invalid Request");
  oAuth2Client.getToken(req.body.code, (err, token) => {
    if (err) {
      return res.status(400).send("Error retrieving access token");
    }
    res.send(token);
  });
});

router.post("/getUserInfo", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
  oauth2.userinfo.get((err, response) => {
    if (err) res.status(400).send(err);
    res.send(response.data);
  });
});

module.exports = router;
