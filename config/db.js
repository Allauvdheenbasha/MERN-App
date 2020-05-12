const config = require("config");
const mongoose = require("mongoose");


const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db),{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    };

    console.log('MONGODB connected')
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
