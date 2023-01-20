const express = require("express");
const http = require("http");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (req, res, next) => {
    req.request_date = new Date();
    next();
  },
  (req, res, next) => {
    req.body.user = "Manimrmp.ir";
    next();
  },
  (req, res, next) => {
    req.online_users = 200;
    next();
  }
);

app.post("/postnames/:name", (req, res, next) => {
  try {
    if (Object.key(req.body).length > 0) {
      return res.json({
        body: req.body,
        query: req.query,
        params: req.params,
        onlineUesers: req.online_users,
        RequestData: req.request_date,
      });
    }
    throw { status: 400, messag: "request body cannot be empty" };
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.get("/users", (req, res) => {
  res.json({
    name: "mani",
    lastname: "rmp",
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Route Not Found",
  });
});
app.use((error, req, res, next) => {
  const status = error?.status || error?.code || 500;
  const message = error?.message || "Internal server Errors";
  return res.status(status).json({
    status,
    success: false,
    message,
  });
});

http
  .createServer(app)
  .listen(2500, () => console.log("Server run at port 2500"));
