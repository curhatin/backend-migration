require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require('cors')
const account = require("./api/account")
const tag = require("./api/tag")
const comment = require("./api/comment")
const postComment = require ("./api/post-comment")
const post = require("./api/post")

const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use("/account",account)
app.use("/tag",tag)
app.use("/post",post)
app.use("/comment",comment)
app.use("/postcomment",postComment)
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
