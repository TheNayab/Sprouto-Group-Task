const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRoute);
app.use("/api/v1", taskRoute);

module.exports = app;
// "https://cheethwork.netlify.app"