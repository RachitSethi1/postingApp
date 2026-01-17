// /controllers/users.js

const User = require('../models/users');

module.exports.renderRegisterForm = (req, res) => {
	res.render('users/register');
};

module.exports.registerUser = async function (req, res, next) {
	const { username, password, email } = req.body;
	const user = new User({ username, email });
	const registeredUser = await User.register(user, password);
	req.login(registeredUser, err => {
		if(err) return next(err);
		req.flash('success', 'Successfully Registered');
		res.redirect('/');
	});
};

module.exports.renderLoginForm = (req, res) => {
	res.render('users/login');
};

module.exports.loginUser = (req, res) => {
	const redirectUrl = req.session.returnTo || '/';
	delete req.session.returnTo;
	req.flash('success', 'Successfully Logged In');
	res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
	req.logout(err => {
		if(err) return next(err);
		req.flash('success', 'Successfully Logged Out');
		res.redirect('/');
	});
};