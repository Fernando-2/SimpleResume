// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user.id,
        location: req.user.location
      });
    }
  });
  //Route for posting resume data
  // app.post("/api/resume",(req,res)=>{
  //   console.log("message")
  //   console.log(req.body)
  //   db.Resume.create(req.body).then(resumeData=>{
  //     res.json({data:resumeData})
  //   }).catch(err=>{
  //     res.json({err:err})
  //   })
  // })

  app.post("/api/resume", (req, res) => {
    db.jobHistory.findOne({
        where: {
            id: req.user.id
        }
    }).then(item => {
        if (!item) {
            let newResume = req.body;
            newResume.UserId=req.user.id;
            db.Resume.create(newResume).then(function (dbResume) {
                res.json(dbResume)
                return
            })
        } else {
            db.Resume.update(req.body, {
                where: {
                    id: req.user.id
                }
            }).then(function (dbResume) {
                res.json(dbResume)
            })
        }
    })
        
  })
  app.get("/api/resume", (req, res) =>{
      db.Resume.findAll({}).then(function(resumeData){
          res.json(resumeData);
            
      });
  });

};
