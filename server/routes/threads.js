const express = require('express')
const router = express.Router()
const threadCont = require('../controllers/threadController')
const responseCont = require('../controllers/responseController')

router.get('/', threadCont.get)
router.get('/:id', threadCont.getOne)
router.post('/', threadCont.create)
router.put('/:id', threadCont.update)
router.put('/:id/upvote', threadCont.upvote)
router.put('/:id/downvote', threadCont.downvote)
router.delete('/:id', threadCont.remove)

router.get('/:id/reply', responseCont.get)
router.get('/:id/reply/:repid', responseCont.getOne)
router.post('/:id/reply', responseCont.create)
router.put('/:id/reply/:repid', responseCont.update)
router.put('/:id/reply/:repid/upvote', responseCont.upvote)
router.put('/:id/reply/:repid/downvote', responseCont.downvote)
router.delete('/:id/reply/:repid', responseCont.remove)

module.exports = router
