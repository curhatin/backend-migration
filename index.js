require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const account = require("./api/account")

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use("/account",account)

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
