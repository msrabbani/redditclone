const express = require('express')
const router = express.Router()
const threadCont = require('../controllers/threadController')

router.get('/', threadCont.get)
router.get('/:id', threadCont.getOne)
router.post('/', threadCont.create)
router.put('/:id', threadCont.update)
router.put('/:id/upvote', threadCont.upvote)
router.put('/:id/downvote', threadCont.downvote)
router.delete('/:id', threadCont.remove)

module.exports = router
