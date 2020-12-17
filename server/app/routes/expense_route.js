const expenseModel = require("../models/expenses");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
var jwt = require("jsonwebtoken");


router.post("/add", (req, res) => {
  let token=req.headers.token
    // var decode=jwt.verify(token, 'JWT_KEY', function(err, decoded) {
    //     if (err) throw err;
    //     console.log(err);
    // });
    jwt.verify(token,'JWT_KEY', function (err, vt) {      
      if (err) {
        // decide what to do with the error...
      }      
      else {
        decode=vt;  
        // console.log("decoded",decode); 
        const newData = new expenseModel({
          _id: new mongoose.Types.ObjectId(),
          userId: decode.userId,
          title: req.body.title,
          expense: req.body.expense,
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

// router.get("/", (req, res) => {
//   console.log("get");
//   budgetModel.find().then((data) => {
//     if (!data) {
//       return res.status(400).send("no data");
//     }
//     return res.json(data);
//   });
// });

router.get("/byId", (req, res) => {
  
  // console.log(mongoose.Types.ObjectId.isValid(req.params.id));
  
  const token=req.headers.token;
  // console.log("get by id",token);
    jwt.verify(token,'JWT_KEY', function (err, decode) {      
      if (err) {
        console.log("err",err)
      }      
      else {  
        // console.log(decode)
        expenseModel.find({userId : decode.userId}).then((data) => {
            if (!data) {
              return res.status(400).send("no data");
            }
            return res.json(data);
          });

      }
    });
});

router.get("/", (req, res) => {
  expenseModel.find().then((data) => {
    if (!data) {
      return res.status(400).send("no data");
    }
    return res.json(data);
  });
});

module.exports = router;
