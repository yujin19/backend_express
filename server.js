const express = require("express");
const app = express();

const router = require("./userListRouter");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
mongoose
  .connect(
    // "mongodb://localhost:27017/userlist",
    "mongodb://127.0.0.1:27017/userlist",
    //"mongodb://localhost:27017/project1",
    //"mongodb+srv://root:root@cluster0-9swpb.mongodb.net/userlist?retryWrites=true",
    //"mongodb+srv://root:root@cluster0-9swpb.mongodb.net/userlist?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
// const port = 8889;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Resource-With, Content-Type, Accept"
  );
  console.log("requst url = " + req.url);
  next();
});

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "hooray! welcome to our home!" });
});

app.listen(port, () => {
  console.log("Magic happens on port " + port);
});
