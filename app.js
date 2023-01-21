const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const {
  NotFoundRoute,
  ExpressErrorHandler,
} = require("./Modules/ErrorHandler");
const usrersRoute = require("./Routes/Users");
const path = require("path");
const app = express();
mongoose.connect("mongodb://localhost:27017/TaskManagerDB", (error) => {
  if (!error) console.log("Connected to db ...");
});
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usrersRoute);
app.use(NotFoundRoute);
app.use(ExpressErrorHandler);
http
  .createServer(app)
  .listen(5000, () => console.log("Server run at port 5000"));
