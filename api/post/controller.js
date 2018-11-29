require("dotenv").config();

const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  models.post
    .findAll({
      include: [
        {
          model: models["posts-comments"],
          include: [{ model: models.comment }]
        }
      ]
    })
    .then(post => res.send(post))
    .catch(err => res.send(err));
};
exports.getOne = (req, res) => {
  models.post
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models["posts-comments"],
          include: [{ model: models.comment }]
        }
      ]
    })
    .then(post => res.send(post))
    .catch(err => res.send(err));
};
exports.getBoth = (req, res) => {
  models.post
    .findOne({ where: { id: req.params.id }, include: [models.comment] })
    .then(post => console.log(post))
    .catch(err => res.send(err));
};

exports.post = (req, res) => {
  req.body = { ...req.body, accountId: req.decoded.id };
  models.post
    .create(req.body)
    .then(post => {
      models["tags-posts"]
        .create({ postId: post.id, tagId: req.body.tagId })
        .then(tagPost =>
          res.send({
            message: "insert data success",
            data: { post, tagPost }
          })
        )
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
};
exports.deleteOne = (req, res) => {
  const postComment = models["posts-comments"].destroy({
    where: { postId: req.params.id }
  });

  const comment = models.comment.destroy({ where: { postId: req.params.id } });
  const tagPost = models["tags-posts"].destroy({
    where: { postId: req.params.id }
  });
  const post = models.post.destroy({ where: { id: req.params.id } });

  Promise.all([postComment, comment, tagPost, post])
    .then(() => console.log("success"))
    .catch(err => console.log(err));
};

exports.deleteAll = (req, res) => {
  models.post
    .destroy({ where: {}, truncate: true })
    .then(result => res.send("success"))
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  let objWhere = {};
  for (key in req.query) {
    objWhere[key] = { $like: "%" + req.query[key] + "%" };
  }

  console.log(objWhere);

  models.post
    .findAll({ where: objWhere })
    .then(result => {
      res.send(result);
    })
    .catch(err => res.send(err));
};

exports.update = (req, res) => {
  req.body = { ...req.body, accountId: req.decoded.id };
  models.post
    .update({post : req.body.post , topic : req.body.topic}, {
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

exports.emailGetOne = (req, res) => {
  models.post
    .findOne({ where: { email: req.params.email } })
    .then(post => res.send(post))
    .catch(err => res.send(err));
};

exports.getById = (req, res) => {
  models.post
    .findAll({ where: { accountId: req.decoded.id } })
    .then(post => res.send(post))
    .catch(err => res.send(err));
};
