// /routes/users.js

const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');

const router = express.Router();

router.route('/register')
	.get(users.renderRegisterForm)
	.post(users.registerUser);

router.route('/login')
	.get(users.renderLoginForm)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.loginUser);

router.route('/logout')
	.post(users.logoutUser);

module.exports = router;