const Model = require('../models/User')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const jwt = require('jsonwebtoken');
require('dotenv').config();
const kunci = process.env.DB_SK;

function signup(req, res){
   let hash = bcrypt.hashSync(req.body.password, salt);
   Model.create({
     name: req.body.name,
     email: req.body.email,
     password: hash,
   }).then(dataUser => {
     res.send(dataUser)
   }).catch(error => {
     res.send(error)
   })
}

function getAllUsers(req, res){
  Model.find({}).then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function getSingleUser(req, res){
  Model.findById({'_id':req.params.id})
  .then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function deleteUser(req, res){
  Model.remove({"_id":req.params.id})
  .then(dataUser=>{
    res.send("terhapus")
  }).catch(error=>{
    res.send(error)
  })
}

function signin(req, res){
  Model.findOne({email:req.body.email}).then(dataUser => {
    console.log('==>>',dataUser);
        if (bcrypt.compareSync(req.body.password, dataUser.password)) {
           let token = jwt.sign({email: dataUser.email, userid: dataUser._id}, kunci, {expiresIn:'1h'})
           console.log('success');
           res.send({_id: dataUser._id, name: dataUser.name, token: token})
      } else {
        console.log('failed');
        res.send('wrong password')
      }
  }).catch(error=>{
    console.log('error');
    res.send(error)
  })
}

//Auth
function userInfo(req, res, next) {
    let token = req.body.token
    if(token) {
        jwt.verify(token, kunci, (err, decoded) =>  {
            if(err) {
              res.send(err)
            } else {
               req.body.author = decoded.name
               next()
            }
        })
    } else { 
        res.send({msg: 'Not Logged in'}) 
    }
}

function userData(req, res, next) {
    let token = req.body.token
    if(token) {
        jwt.verify(token, kunci, (err, decoded) => {
            if(err) {
                res.send(err)
            } else {
                res.send(decoded)
            }
        })
    } else {
        res.send({msg: 'Not Logged in'})
    }
}

function authUser(req, res, next) {
    let token = req.body.token

    if(token){
        jwt.verify(token, kunci, (err, decoded) => {
            if(decoded.id == req.params.id) {
                next()
            } else {
                res.send(err)
            }
        })
    } else {
        res.send({msd: 'Not Logged in'})
    }

}

module.exports = {
  signup,
  getAllUsers,
  getSingleUser,
  deleteUser,
  signin,
  userInfo,
  userData,
  authUser
}
