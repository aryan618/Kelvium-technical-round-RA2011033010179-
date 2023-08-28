const mongoose = require("mongoose");

const connectDB = (url) => {
  // here url is the "connection string" we are passing to mongoose
  // this arrow function returns a promise
  return mongoose.connect(url, {
    // object to solve the deprecated problems
    useNewUrlParser: true,
    //useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB; // exporting the connectDB function to be used in the app.js file
