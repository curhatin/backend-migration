
const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports.isAuthenticated = (req, res, next) => {
  // Check Token
  const token =
    (req.body.token && req.body.token.split(" ")[1]) ||
    (req.query.token && req.query.token.split(" ")[1]) ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    undefined;

// console.log(token)

  if (token === undefined) {
    return res.send("token not found");
  }

  // Decode Token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find Account
    models.account
      .findOne({ where: { id: decoded.id } })
      .then(account => {
        if (account === null) {
          return res.send("Account not found");
        }
        

        req.decoded = decoded;
        req.account = account
        next();
      })
      .catch(err => res.send(err));
  } catch (err) {
    return res.send("token not valid");
  }

 
};