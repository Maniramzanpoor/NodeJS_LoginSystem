const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./Routes/Router");
const http = require("http");
const {
  NotFoundRoute,
  ExpressErrorHandler,
} = require("./Modules/ErrorHandler");
const path = require("path");
const app = express();
mongoose.connect("mongodb://localhost:27017/TaskManagerDB", (error) => {
  if (!error) console.log("Connected to db ...");
});
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);
app.use(NotFoundRoute);
app.use(ExpressErrorHandler);
http
  .createServer(app)
  .listen(5000, () => console.log("Server run at port 5000"));
