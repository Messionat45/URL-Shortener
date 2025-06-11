const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URL;
// console.log(dbURL);
const dbConnect = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("conn to db");
  } catch (error) {
    console.log("error conn db", error.message);
  }
};

module.exports = dbConnect;
