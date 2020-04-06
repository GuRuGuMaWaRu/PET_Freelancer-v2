const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const clientsRouter = require("./routes/clients");
const projectsRouter = require("./routes/projects");

// Set environament variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "process.env" });
}

// Connect to mongo DB
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DB_MAIN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });

  mongoose.set("useCreateIndex", true);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection to database is established"));

const app = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// Body parser
app.use(express.json({ limit: "10kb" }));

// Set CORS headers so that React SPA is able to communicate with this server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Heroku deployment --- serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Set up routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/clients", clientsRouter);

// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Handle all errors
app.use(globalErrorHandler);

// Connect to server
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
