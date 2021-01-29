let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
let path = require('path');
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');


router.post('/login', async (req, resp) =>{
	let email = req.body.email;
	let password = req.body.password;
	// search through the database
	// and find a user which has the same email and password 
	// with the one requested
	let user = await User.find().where({email: email});
	if(user.length > 0){
		let compare = await bcrypt.compare(password, user[0].password);
		if(compare){
			let token = auth.generateToken(user[0]);
			resp.cookie('auth_token', token);
			resp.send({
				redirectURL: '/admin'
			})
		}else{
			resp.status(400);
			resp.send('Rejected');	
		}
	}else{
		resp.status(400);
		resp.send('Rejected');
	}
});

router.post('/register', async (req, resp) =>{
	let email = req.body.email;
	let password = req.body.password;
	// search through the databse
	// and see if the email has been used by another user
	let user = await User.find().where({email: email});
	// if no user is found
	if(user.length === 0){
		let encryptedPass = await bcrypt.hash(password, 12);
		let newUser = new User({
			email: email,
			password: encryptedPass
		})
		await newUser.save();
		resp.send('Done');
	}else{
		resp.send('Rejected');
	}
});

module.exports = router;