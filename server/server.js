const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/", require("./routes/routes"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
