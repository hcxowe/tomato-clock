var express = require('express');
var model 	= require('../model/usersModel');
var router = express.Router();

router.get('/', (req, res, next) => {
	if (!req.session.userName) {
        res.json({
			'ret': 404,
			'msg': '用户未登录'
		});
    } 
    else {
        res.json({
			'ret': 200,
			'msg': '用户已登录',
			'body':  {
				userID: req.session.userID,
				userName: req.session.userName,
				email: req.session.email
			}
		});
    }
});

router.post('/login', (req, res, next) => {
	model.login(req.body.email, req.body.passWD, (err, user) => {
		if (err) {
			res.json(err);
		}
		else {
			req.session.userName = user.userName;
			req.session.userID = user.userID;
			req.session.email = user.email;

			res.json({ 'code': 200, 'msg': 'success', body: { 
				userName: user.userName,
				email: user.email,
				userID: user.userID
			}});
		}
	});
});

router.post('/signin', (req, res, next) => {
	model.signin(req.body.userName, req.body.email, req.body.passWD, (err, user) => {
		if (err) {
			res.json(err);
		}
		else {
			res.json({ 'code': 0, 'msg': 'success'});
		}
	});
});

module.exports = router;
