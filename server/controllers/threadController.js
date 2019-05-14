const Model = require('../models/Thread')

function create(req, res) {
    Model.create({
        title: req.body.title,
        threadContent: req.body.threadContent,
        author: req.body.author,
        createdAt: new Date()
    }).then(dataThread => {
        res.send(dataThread)
    }).catch(err => {
        res.send(err)
    })
}

function get(req, res) {
    Model.find({})
    .populate('author')
        .exec(function(err, thread) {
            res.send(err ? err : thread)
        })
}

function getOne(req, res) {
    Model.findById(req.params.id)
        .populate('author')
        .populate('replies')
        .exec(function(err, thread){
            res.send(err ? err: thread)
        })
}

function update(req,res) {
    Model.findById(req.params.id, (err, thread) => {
        if(thread.author == req.body.author){
            thread.title= req.body.title || thread.title,
                thread.threadContent= req.body.threadContent || thread.threadContent,
                thread.updatedAt = new Date()
            thread.save((err, editedThread) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(editedThread)
                }
            })
        } else {
            res.send('Not Authorized')
        }
    })
}

function upvote(req, res) {
    Model.findById(req.params.id, (err, thread) => {
    if(req.body.author) {
      var idxUp = thread.upvotes.indexOf(req.body.author);
      var idxDown = thread.downvotes.indexOf(req.body.author);
      if(idxUp == -1 && idxDown == -1) {
        thread.upvotes.push(req.body.author)
      } else if (idxDown !== -1) {
        thread.downvotes.splice(idxDown, 1)
      }
      thread.save((err, upvotedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(upvotedThread)
        }
      })
    } else {
      res.send('Not Authorized')
    }
  })
}

function downvote(req, res) {
  Model.findById(req.params.id, (err, thread) => {
    if(req.body.author) {
      var idxUp = thread.upvotes.indexOf(req.body.author);
      var idxDown = thread.downvotes.indexOf(req.body.author);
      if(idxUp == -1 && idxDown == -1) {
        thread.downvotes.push(req.body.author)
      } else if (idxUp !== -1) {
        thread.upvotes.splice(idxDown, 1)
      }
      thread.save((err, downvotedThread) => {
        if(err) {
          res.send(err)
        } else {
          res.send(downvotedThread)
        }
      })
    } else {
      res.send('Not authorized')
    }
  })
}

var remove = function(req, res) {
  Model.findOneAndRemove({_id: req.params.id}, (err, thread) => {
    if(err) res.send(err)
    res.send(thread)
  })
}


module.exports = {
    create, get, getOne, update, upvote, downvote, remove
}
