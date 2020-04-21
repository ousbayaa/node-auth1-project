const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require("../users/user-model");

router.post('/register', (req, res) => {
    let user = req.body;
    
    const rounds = process.env.HASH_ROUNDS || 15;

    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user).then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: err.message})
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

    Users.findBy({username})
      .then(([user]) => {
        
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.username = username;
          req.session.loggedIn = true;
          res.status(200).json({ message: `Hello, and Welcome ${username}` });
        } else {
          res.status(401).json({ error: "You... Shall Not... PAAASSSSS!!" });
        }
      }).catch(err => {
        res.status(500).json({ error: err });
      });
  });

  router.get("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(error => {
        if (error) {
          res.status(500).json({ message: "Unable to logout at this time" });
        } else {
          res.status(200).json({ message: "You are logged out" });
        }
      });
    } else {
      res.status(200).json({ message: "You are not logged in." });
    }
  });
  
  module.exports = router;