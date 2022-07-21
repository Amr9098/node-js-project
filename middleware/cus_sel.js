const jwt = require("jsonwebtoken");

module.exports = {
  validateRequest: (req, res, next) => {
    if ( req.body.name.length < 3) {
      return res.status(404).send({
        message: "please enter a name min 3 characters .",
      });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(400).send({
        message: "Please enter a password with min 6 characters",
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        '363636'
      );
      req.userData = decoded;
    
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  },
};
