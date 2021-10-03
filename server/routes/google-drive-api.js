const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const fs = require("fs");
const formidable = require("formidable");
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
  @api {post} /googleDrive/readDrive Get images from resource server
  @apiName readDrive
  @apiGroup googleDrive
  @apiSuccess (Success 201) {JSON Object} {name,id,webViewLink,webContentLink}
  @apiError {text} 400 Error No files found
 */
router.post("/readDrive", async (req, res) => {
  try {
    if (req.body.token == null) return res.status(400).send("Token not found");
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    await drive.files.list(
      {
        pageSize: 100,
      },
      (err, response) => {
        if (err) {
          return res.status(400).send(err);
        }
        const files = response.data.files;
        const arr = [];
        if (files.length) {
          files.map(async (file) => {
            await drive.permissions.create({
              fileId: file.id,
              requestBody: {
                role: "reader",
                type: "anyone",
              },
            });
            const result = await drive.files.get({
              fileId: file.id,
              fields: "webViewLink, webContentLink",
            });
            arr.push({
              name: file.name,
              id: file.id,
              webViewLink: result.data.webViewLink,
              webContentLink: result.data.webContentLink,
            });
            if (arr.length === files.length) {
              res.send(arr);
            }
          });
        } else {
          console.log("No files found.");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

/*
  @api {post} /googleDrive/fileUpload Upload images to resource server
  @apiName fileUpload
  @apiGroup googleDrive
  @apiSuccess (Success 201)
  @apiError {text} 400 Error 
 */
router.post("/fileUpload", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send(err);
    const token = JSON.parse(fields.token);
    if (token == null) return res.status(400).send("Token not found");
    oAuth2Client.setCredentials(token);
    console.log(files.file);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const fileMetadata = {
      name: files.file.name,
    };
    const media = {
      mimeType: files.file.type,
      body: fs.createReadStream(files.file.path),
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err, file) => {
        oAuth2Client.setCredentials(null);
        if (err) {
          console.error(err);
          res.status(400).send(err);
          console.log(err);
        } else {
          res.send(file);
        }
      }
    );
  });
});

/*
  @api {post} /deleteFile/:id  Upload images to resource server
  @apiParam {String} image ID
  @apiName deleteFile
  @apiGroup googleDrive
  @apiSuccess (Success 201) Done
  @apiError {text} 400 Error 
 */
router.post("/deleteFile/:id", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  var fileId = req.params.id;
  drive.files.delete({ fileId: fileId }).then((response) => {
    res.send(response);
  });
});

router.post("/download/:id", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  var fileId = req.params.id;
  drive.files.get(
    { fileId: fileId, alt: "media" },
    { responseType: "stream" },
    function (err, response) {
      response.data
        .on("end", () => {
          console.log("Done");
        })
        .on("error", (err) => {
          console.log("Error", err);
        })
        .pipe(res);
    }
  );
});

router.post("/getUrl/:id", async (req, res) => {
  try {
    if (req.body.token == null) return res.status(400).send("Token not found");
    oAuth2Client.setCredentials(req.body.token);
    const fileId = req.params.id;
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
    res.send(result.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
