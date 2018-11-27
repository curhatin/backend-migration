require("dotenv").config();

const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  models.post
    .findAll()
    .then(post => res.send(post))
    .catch(err => res.send(err));

};
exports.getOne = (req, res) => {
    models.post
      .findOne({ where: { id: req.params.id } })
      .then(post => res.send(post))
      .catch(err => res.send(err));


  };
  exports.getBoth = (req,res) =>{
    models.post
    .findOne ({ where: { id: req.params.id},include : [models.comment]})
    .then(post => console.log(post))
    .catch(err => res.send(err))
  }


exports.post = (req, res) => {
  models.post
  .create(req.body)
  .then(post => {
    models['tags-posts']
    .create({postId:post.id,tagId:req.body.tagId})
    .then(tagPost =>
      res.send({
        message: "insert data success",
        data: {post, tagPost}
      })
    )
    .catch(err => res.send(err));
    })
  .catch(err => res.send(err));
};
exports.deleteOne = (req, res) => {
  models.post
    .findOne({ where: { id: req.params.id } })
    .then(post => {
      post
        .destroy()
        .then(result => res.send("success"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.deleteAll = (req, res) => {
  models.post
    .destroy({ where: {}, truncate: true })
    .then(result => res.send("success"))
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  console.log(req.query);
  models.post
    .findAll({ where: req.query })
    .then(tag => res.send(tag))
    .catch(err => res.send(err));
};

exports.update = (req, res) => {
  models.post
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

exports.emailGetOne = (req, res) => {
  models.post
    .findOne({ where: { email: req.params.email } })
    .then(post => res.send(post))
    .catch(err => res.send(err));
};