const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

function generateRandomString() {
  let name = Math.random().toString(36).slice(2, 8);
  return name;
}

const urlDatabase = {
  "b2xVn2": "https://www.lighthouselabs.ca",
  "9sm5xK": "https://www.google.com"
}

app.set("view engine","ejs");

app.get("/urls.json", (req,res) => {
  res.json(urlDatabase);
});

//get list of URLS
app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});


//get create new URL page
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//get page for list of short URL
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]};
  res.render('urls_show', templateVars);
});

//get short url link, redirect to the corresponding long URL
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  const id = req.params.id;
  delete urlDatabase[id];
  res.redirect("/urls/");
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  res.send("Okay");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});