require("dotenv").config();

const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.getAll = (req, res) => {
  models.comment
    .findAll()
    .then(comment => res.send(comment))
    .catch(err => res.send(err));
};
exports.getOne = (req, res) => {
  models.comment
    .findAll({where : {postId : req.params.id}})
    .then(comment => res.send(comment))
    .catch(err => res.send(err));
};

exports.post = (req, res) => {
  req.body = {
    ...req.body,
    accountId:req.decoded.id
  }
  models.comment
    .create(req.body)
    .then(comment => {
      models['posts-comments']
      .create({postId:req.body.postId,commentId:comment.id})
      .then(postComment =>
        res.send({
          message: "insert data success",
          data: {comment, postComment}
        })
      )
      .catch(err => res.send(err));
      })
    .catch(err => res.send(err));
  

};
exports.deleteOne = (req, res) => {
  models.account
    .findOne({ where: { id: req.params.id } })
    .then(user => {
      user
        .destroy()
        .then(result => res.send("success"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.deleteAll = (req, res) => {
  models.account
    .destroy({ where: {}, truncate: true })
    .then(result => res.send("success"))
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  console.log(req.query);
  models.account
    .findAll({ where: req.query })
    .then(account => res.send(account))
    .catch(err => res.send(err));
};

exports.update = (req, res) => {
  models.account
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
