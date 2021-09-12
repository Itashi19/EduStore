const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
dotenv.config();
connectDB();

//app.get("/api/notes", (req, res) => {
// res.json(notes);
//});
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(express.json());
app.use("/api/notes", noteRoutes);

//app.get("/api/notes/:id", (req, res) => {
// const note = notes.find((n) => n._id === req.params.id);
// res.send(note);
//});

//deployment
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
//----------------------------
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
