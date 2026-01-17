// /controllers/posts.js

const Post = require('../models/posts');

module.exports.showAllPosts = async (req, res) => {
	const allPosts = await Post.find({}).populate('creator');
	res.render('posts/index', { allPosts });
};

module.exports.createPost = async (req, res) => {
	const { post } = req.body;
	const newPost = new Post(post);
	newPost.creator = req.user._id;
	await newPost.save();
	req.flash('success', 'Succesfully Created New Post');
	res.redirect(`/posts/${newPost._id}`);
};

module.exports.renderNewPostForm = (req, res) => {
	res.render('posts/new');
};

module.exports.showSpecificPost = async (req, res) => {
	const { id } = req.params;
	const foundPost = await Post.findById(id).populate('creator');
	res.render('posts/show', { foundPost });
};

module.exports.editPost = async (req, res) => {
	const { id } = req.params;
	const { post } = req.body;
	const updatedPost = await Post.findByIdAndUpdate(id, { title: post.title, description: post.description }, { new: true });
	req.flash('success', 'Successfully Updated Post');
	res.redirect(`/posts/${id}`);
};

module.exports.deletePost = async (req, res) => {
	const { id } = req.params;
	await Post.findByIdAndDelete(id);
	req.flash('success', 'Successfully Deleted Post');
	res.redirect('/posts');
};

module.exports.renderEditPostForm = async (req, res) => {
	const { id } = req.params;
	const foundPost = await Post.findById(id).populate('creator');
	res.render('posts/edit', { foundPost });
};