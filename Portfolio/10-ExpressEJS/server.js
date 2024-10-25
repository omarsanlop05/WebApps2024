const { render } = require("ejs");
const express = require("express");
const app = express();
const https = require("https");
const { title } = require("process");

// TODO: configure the express server
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/html/index.html");
  res.render("test")
});

app.get("/login", (req, res) => {
  //var name = req.query.name1;
  name = req.query.name;
  //res.send("<b>Hello, " + name + "</b><br/> sent from GET method");
  res.render("home", {name, posts});
});

app.post("/login", (req, res) => {
  //var name = req.body.name2;
  name = req.body.name;
  //res.send("<b>Hello, " + name + "</b><br/> sent from POST method");
  res.render("home", {name, posts});
});

app.get("/home", (req,res) => {
  res.render("home", {name, posts});
});

app.post("/add", (req, res) => {
  var title = req.body.title;
  var cont = req.body.content;
  posts.push({"title": title, "content": cont});
  //res.render("home", {name, posts})
  res.redirect("/home")
});

app.get("/posts/:idx", (req,res) => {
  var index = req.params.idx;
  var post = posts[index];
  res.render("posts", {name, post, index, posts})
});

app.get("/delete/:idx", (req,res) => {
  var indexDlt = parseInt(req.params.idx);
  posts = posts.filter((_, index) => index !== indexDlt);
  res.redirect("/home");
});

app.post("/edit/:idx", (req, res) => {
  var index = req.params.idx;
  newt = req.body.title;
  newc = req.body.content;
  posts[index].title = newt;
  posts[index].content = newc;
  var post = posts[index];
  res.render("posts", {name, post, index, posts})
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
