const ModelResponse = require('../models/Response');
const ModelThread = require('../models/Thread');

function create(req, res) {
    let newResponse = new Response({
        responseContent: req.body.responseContent,
        author: req.body.author,
        parent: req.params.id,
        createdAt: new Date()
    })
    newResponse.save((err, createdResponse) => {
        if(err) {
            res.send(err)
        } else {
            ModelThread.findById(req.params.id, ( err, thread ) => {
                thread.comments.push(createdResponse)
                thread.save((err, updatedResponse)=> {
                    res.send(err ? err : updatedResponse)
                })
            })
        }
    })
} 

function get(req, res) {
  ModelResponse.find({ parent: req.params.id })
  .populate('author')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

function getOne(req, res) {
  ModelResponse.findById(req.params.repid)
  .populate('author')
  .exec(function (err, responses) {
    res.send(err ? err : responses)
  })
}

function update(req, res) {
  ModelResponse.findById(req.params.repid, (err, response) => {
    if(response.author == req.body.author) {
      response.responseContent = req.body.responseContent || response.responseContent
      response.updatedAt = new Date()
      response.save((err, editedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(editedResponse)
        }
      })
    } else {
      res.send('Not Authorized')
    }
  })
}

 function upvote(req, res) {
  ModelResponse.findById(req.params.repid, (err, response) => {
    if(req.body.author) {
      var idxUp = response.upvotes.indexOf(req.body.author);
      var idxDown = response.downvotes.indexOf(req.body.author);
      if(idxUp == -1 && idxDown == -1) {
        response.upvotes.push(req.body.author)
      } else if (idxDown !== -1) {
        response.downvotes.splice(idxDown, 1)
      }
      response.save((err, upvotedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(upvotedResponse)
        }
      })
    } else {
      res.send('Not Authorized')
    }
  })
}

function downvote(req, res) {
  ModelResponse.findById(req.params.repid, (err, response) => {
    var idxUp = response.upvotes.indexOf(req.body.author);
    var idxDown = response.downvotes.indexOf(req.body.author);
    if(req.body.author) {
      if(idxUp == -1 && idxDown == -1) {
        response.downvotes.push(req.body.author)
      } else if (idxUp !== -1) {
        response.upvotes.splice(idxDown, 1)
      }
      response.save((err, downvotedResponse) => {
        if(err) {
          res.send(err)
        } else {
          res.send(downvotedResponse)
        }
      })
    } else {
      res.send('Not Authorized')
    }
  })
}

function remove(req, res) {
  ModelResponse.findOneAndRemove({_id: req.params.repid}, (err, response) => {
    if(err) res.send(err)
    ModelThread.findById(req.params.id, (err, thread) => {
      let idx = thread.comments.indexOf(response._id)
      thread.comments.splice(idx, 1)
      thread.save((err, updatedThread) => {
        res.send(err ? err : response)
      })
    })
  })
}

module.exports = {
    create, get, getOne, update, upvote, downvote, remove }
