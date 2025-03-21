const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

// Connect database
connectDB();

// Init middleware

app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/products", require("./routes/api/products"));
// Serve Static assets in dev
app.use(express.static("./public"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server up on ${PORT}`);
});
