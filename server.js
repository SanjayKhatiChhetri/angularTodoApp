const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, "dist/todo-frontend-angular")));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/todo-frontend-angular/index.html"));
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
