const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const code = `Welcome to wasteBin!
    
Use the commands in the top right corner
to create a new file to share with others.`;
  res.render("code-display", {
    code,
  });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", (req, res) => {
  const value = req.body.value;
  console.log(value);
});

app.listen(3000);
