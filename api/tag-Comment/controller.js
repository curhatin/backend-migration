require("dotenv").config();

const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.getAll = (req, res) => {
  models.tag
    .findAll()
    .then(account => res.send(account))
    .catch(err => res.send(err));
};

exports.post = (req, res) => {
  console.log(req.body);
  models.tag
    .create(req.body)
    .then(tag =>
      res.send({
        message: "insert data success",
        data: tag
      })
    )
    .catch(err => res.send(err));
};
exports.deleteOne = (req, res) => {
  models.tag
    .findOne({ where: { id: req.params.id } })
    .then(tag => {
      tag
        .destroy()
        .then(result => res.send("success"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.deleteAll = (req, res) => {
  models.tag
    .destroy({ where: {}, truncate: true })
    .then(result => res.send("success"))
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  console.log(req.query);
  models.tag
    .findAll({ where: req.query })
    .then(tag => res.send(tag))
    .catch(err => res.send(err));
};

exports.update = (req, res) => {
  models.tag
    .update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(result => res.send(result))
    .catch(err => res.send(err));
};

exports.login = (req, res) => {
  models.account
    .findOne({ where: { email: req.body.email } })
    .then(account => {
      if (account === null) {
        return res.send("user not found");
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        account.password
      );
      if (validPassword === false) {
        return res.send("password is incorrect");
      }
      const token_data = {
        payload: {
          id: account.id,
          name: account.fname
        },
        secret: process.env.JWT_SECRET,
        options: {
          expiresIn: "7d"
        }
      };

      const token = jwt.sign(
        token_data.payload,
        token_data.secret,
        token_data.options
      );
      res.send({
        message: "You are logged in",
        id: account.id,
        token: token
      });
    })
    .catch(err => res.send(err));
};
