const express = require('express')
const router = express.Router()
const threadCont = require('../controllers/threadController')
const responseCont = require('../controllers/responseController')
const userCont = require('../controllers/userController')

router.get('/', threadCont.get)
router.get('/:id', threadCont.getOne)
router.post('/', userCont.userInfo, threadCont.create)
router.put('/:id', userCont.userInfo,threadCont.update)
router.put('/:id/upvote', userCont.userInfo,threadCont.upvote)
router.put('/:id/downvote', userCont.userInfo, threadCont.downvote)
router.delete('/:id', threadCont.remove)

router.get('/:id/reply', responseCont.get)
router.get('/:id/reply/:repid', responseCont.getOne)
router.post('/:id/reply', userCont.userInfo, responseCont.create)
router.put('/:id/reply/:repid', userCont.userInfo, responseCont.update)
router.put('/:id/reply/:repid/upvote', userCont.userInfo, responseCont.upvote)
router.put('/:id/reply/:repid/downvote', userCont.userInfo, responseCont.downvote)
router.delete('/:id/reply/:repid', responseCont.remove)

module.exports = router
