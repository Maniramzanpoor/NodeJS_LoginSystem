const express = require("express");
const http = require("http");
const {
  NotFoundRoute,
  ExpressErrorHandler,
} = require("./Modules/ErrorHandler");
const usrersRoute = require("./Routes/Users");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usrersRoute);
app.use(NotFoundRoute);
app.use(ExpressErrorHandler);
http
  .createServer(app)
  .listen(5000, () => console.log("Server run at port 2500"));
