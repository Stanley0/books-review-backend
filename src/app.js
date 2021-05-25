const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");
const reviewsRoutes = require("./routes/reviews");


const dbURI = "mongodb+srv://Tomek:Zfy08qmsNof8C65I@cluster1.nvnfg.mongodb.net/book-review?retryWrites=true&w=majority"

mongoose
  .connect( dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", usersRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/reviews", reviewsRoutes);

module.exports = app;


