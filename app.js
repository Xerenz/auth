const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/auth_test");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

app.listen(8000, function() {
    console.log("listening to port 8000");
});