// /models/posts.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Post', postSchema);