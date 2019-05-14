const model = require('../models/User')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const jwt = require('jsonwebtoken');
require('dotenv').config();
const kunci = process.env.DB_SK;


function signup(req, res){
   let hash = bcrypt.hashSync(req.body.password, salt);
   model.create({
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
  model.find({}).then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function getSingleUser(req, res){
  model.findById({'_id':req.params.id})
  .then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function deleteUser(req, res){
  model.remove({"_id":req.params.id})
  .then(dataUser=>{
    res.send("terhapus")
  }).catch(error=>{
    res.send(error)
  })
}

function signin(req, res){
  model.findOne({email:req.body.email}).then(dataUser => {
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

module.exports = {
  signup,
  getAllUsers,
  getSingleUser,
  deleteUser,
  signin
}
