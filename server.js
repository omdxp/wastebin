const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wastebin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to wasteBin!
    
Use the commands in the top right corner
to create a new file to share with others.`;
  res.render("code-display", {
    code,
    language: "plaintext",
  });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    const doc = await Document.create({
      value,
    });
    res.redirect(`/${doc.id}`);
  } catch (e) {
    res.render("new", { value });
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Document.findById(id);
    res.render("new", {
      code: doc.value,
    });
  } catch (e) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Document.findById(id);
    res.render("code-display", {
      code: doc.value,
      id,
    });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
