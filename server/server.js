const express = require("express");
const cors = require("cors");
const app = express();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/", require("./routes/routes"));
app.use("/googleDrive", require("./routes/google-drive-api"));
app.use("/auth", require("./routes/auth"));
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
