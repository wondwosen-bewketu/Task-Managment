const mongoose = require("mongoose");

function connectToDatabase() {
  return mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`MongoDB connected on server ${process.env.PORT}`))
  .catch((err) => console.log(err));
}

module.exports = { connectToDatabase };
