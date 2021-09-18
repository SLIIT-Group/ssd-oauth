const mongoose = require("mongoose");

const databaseConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.mongoURI);
    console.log(`Database Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = databaseConnect;
