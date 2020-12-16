const userModel = require("../models/users");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add", (req, res) => {
  console.log("body",req.body)
  const newData = new userModel({
    _id: req.body._id,
    username: req.body.username,
    password: req.body.password,
  });
  newData.save().then((data) => {
    if (!data) {
      return res.status(400).send("insertion error");
    }
    return res.json(data);
  });
});

router.get("/", (req, res) => {
  userModel.find().then((data) => {
    if (!data) {
      return res.status(400).send("no data");
    }
    return res.json(data);
  });
});

router.get("/:id", (req, res) => {
  console.log(mongoose.Types.ObjectId.isValid(req.params.id));
  userModel.findById(req.params.id).then((data) => {
    if (!data) {
      return res.status(400).send("no data");
    }
    return res.json(data);
  });
});

module.exports = router;
