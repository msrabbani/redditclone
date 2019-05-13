const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  responseContent: {
    type: String,
    required: [true, 'response content tidak boleh kosong']
  },
  parent: { type: Schema.Types.ObjectId, ref: 'Thread' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const Response  = mongoose.model('Response', responseSchema);

module.exports = Response;

