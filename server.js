const express = require("express");
const connectDB = require("./config/db");

const App = express();

// connect DB
connectDB();

// body parser middleware
App.use(express.json());

App.get("/", (req, res) => {
  res.send({ msg: "nicely working" });
});

//regisiter routes
App.use("/api/users/", require("./routes/api/users"));
App.use("/api/profile/", require("./routes/api/profile"));
App.use("/api/posts/", require("./routes/api/posts"));
App.use("/api/auth/", require("./routes/api/auth"));

const PORT = process.env.PORT || 4999;

App.listen(PORT, () => console.log(`server started at ${PORT}`));
