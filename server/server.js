const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const User=require("../server/app/models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const compression = require('compression');

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(compression());

const url= "mongodb://localhost:27017/personal_budget";
let user_data= require("./app/routes/user_route");
let budget_data= require("./app/routes/budget_route");
let expense_data= require("./app/routes/expense_route");

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((Connectionerror) => {
    console.log(Connectionerror);
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Personal Budget Backend" });
});
app.post("/userSignup",(req,res)=>{
    // console.log(req.body);
    User.find({ username: req.body.username })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: "User exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                // console.log(result);
                                res.status(201).json({
                                    message: "User Created"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
    // console.log(res);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

app.post("/userLogin",(req,res)=>{
    // console.log(req.body);
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
               // console.log(user);
                if (err) {
                    res.status(401).json({
                        message: 'Auth Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        'JWT_KEY', {
                            expiresIn: "1H"
                        }
                    );
                    res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: 'Auth Failed'
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



})

app.post("/generateToken",(req,res)=>{
    let token=req.body.token;
    // console.log("generate",req.body)
    jwt.verify(token,'JWT_KEY', function (err, decode) {      
        if (err) {
          // decide what to do with the error...
          console.log("err",err)
        }      
        else {  
        //   console.log(decode)
          
            const token = jwt.sign({
                    username:decode.username,
                    userId:decode.userId
                },
                'JWT_KEY', {
                    expiresIn: "60000"
                }
            );
            res.status(200).json({
                message: 'Auth Successful',
                token: token
            });
  
        }
      });
})
app.use("/user", user_data);
app.use("/budget", budget_data);
app.use("/expense", expense_data);

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});