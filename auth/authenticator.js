module.exports = (req, res, next) => {
    console.log(req.session);
  
    if (req.session && req.session.username) {
      next();
    } else {
      res.status(401).json({ message: "You... Shall Not... PAAASSSSS!!" });
    }
  };
