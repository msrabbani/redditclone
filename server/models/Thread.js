const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title tidak boleh kosong']
    },
    threadContent: {
        type: String,
        required: [true, 'Content tidak boleh kosong']
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Response'}],
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamp: true 
})

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
