const budgetModel = require("../models/budgets");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
var jwt = require("jsonwebtoken");


router.post("/add", (req, res) => {
  // console.log(req.body);
  let token=req.headers.token;
    // var decode=jwt.verify(token, 'JWT_KEY', function(err, decoded) {
    //     if (err) throw err;
    //     console.log(err);
    // });
    jwt.verify(token,'JWT_KEY', function (err, vt) {      
      if (err) {
        // decide what to do with the error...
        console.log("err",err)
      }      
      else {
        decode=vt;   
        const newData = new budgetModel({
          _id: new mongoose.Types.ObjectId(),
          userId: decode.userId,
          title: req.body.title,
          budget: req.body.budget,
        });
        newData.save().then((data) => {
          if (!data) {
            return res.status(400).send("insertion error");
          }
          return res.json(data);
        });
      }
    });
    //console.log("decoded",decode);

});

router.get("/byId", (req, res) => {
  // extract the JWT from the header of the request 
  // verification of the JWT 
  // Extract the value of the user id from the JWT 
  // use this user id to query 
  
  // console.log(mongoose.Types.ObjectId.isValid(req.params.id));
  
  const token=req.headers.token;
    jwt.verify(token,'JWT_KEY', function (err, decode) {      
      if (err) {
        // decide what to do with the error...
        console.log("err",err)
      }      
      else {  
        budgetModel.find({userId : decode.userId}).then((data) => {
            if (!data) {
              return res.status(400).send("no data");
            }
            return res.json(data);
          });

      }
    });
});

module.exports = router;
