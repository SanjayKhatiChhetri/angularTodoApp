const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
app.use(compression());

// Serve static files
app.use(
  express.static(path.join(__dirname, "dist/todo-frontend-angular/browser"))
);

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "dist/todo-frontend-angular/browser/index.html")
  );
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
