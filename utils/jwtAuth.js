const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_TOKEN || "secret",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (authorization) {
    const token = authorization && authorization.split(' ')[1]

    jwt.verify(
      token,
      process.env.SECRET_TOKEN || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ message: "Admin Token is not valid." });
  }
};

module.exports.getToken = getToken;
module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;
