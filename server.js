const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const code = `Welcome to wasteBin!
    
Use the commands in the top right corner
to create a new file to share with others.`;
  res.render("code-display", {
    code,
  });
});

app.listen(3000);
