const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");

const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1/auth_test");

const app = express();

app.use(expressSession({
    secret: "We are working on user authenticaton",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret", {user : req.user});
});

// Auth Routes


// Register
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({
        // auth info
        username : req.body.username,

        // personal info
        name : req.body.name,
        phone : req.body.phone,
        college : req.body.college

    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        console.log("user created " + user.username);
        passport.authenticate("local")(req, res, function() {
            console.log("user authenticated");
            res.redirect("/secret");
        });
    });
});


// Login
app.get("/login", function(req, res) {
    var message = "LogIn Here!"
    if (req.isAuthenticated)
        message = "LogIn with another account?";
    res.render("login", {message : message});
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
    // final handler
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// middleware for cheking user auth
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function() {
    console.log("listening to port 8000");
});