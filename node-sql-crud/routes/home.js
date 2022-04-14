const express = require('express');
const router = express.Router();

//Main Page
router.get("/", (req, res) => res.render("index.pug"));


module.exports = router;