const mongoose = require("mongoose");
const config = require("config");
const gravatar = require("gravatar");
db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongodb Connected");
  } catch (error) {
    console.error(err.message);
    // Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
