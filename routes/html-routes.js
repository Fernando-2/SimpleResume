// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("homepage");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signUp");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  //If a user who is not logged in tries to access this route they will be redirected to the signp page
  app.get("/generate", isAuthenticated, (req, res) => {
    // db.User.findOne({
    //   where:{
    //     id: req.user.id
    //   }
    //   }).then(function(userData){
    //      res.render("generateResume", {userData}

    //   );
    //   })


    res.render("generateResume");
    // send an object across 
    // talk to it through handlebars
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("index");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
