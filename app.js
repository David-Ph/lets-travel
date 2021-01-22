// 7. connect express to app.js
let express = require('express');
let app = express();
let mongoose = require('mongoose');
// to connect app.js to the post.js
// and get the schema of post
let Post = require('./models/posts').Post;
// this is the package to upload file
let multer = require('multer');
// this is a package to use path.sep
let path = require('path');
// this is a package to get a unique id
let uniqid = require('uniqid');


mongoose.connect('mongodb://localhost/travels', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

let imageStorage = multer.diskStorage({
	destination:(req, file, cb) => cb(null, 'public/images'),
	filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({storage: imageStorage }).single('imageFile'));

app.get('/posts', async (req, resp) => {
	let posts = await Post.find()
	resp.send(posts);
}) 

app.post('/posts', async (req, resp) => {
	let reqBody = req.body;
	let imgPath;
	if(reqBody.imageURL){
		imgPath = reqBody.imageURL;
	}else{
		imgPath = req.file.path.substring(req.file.path.indexOf(path.sep), req.file.path.length);
	}
	let newPost = new Post({
		id: uniqid(),
		title: reqBody.title,
		date: new Date(),
		description: reqBody.description,
		text: reqBody.text,
		country: reqBody.country,
		imageURL: imgPath
	})
	await newPost.save();
	resp.send('Created!');
})
//11. app.use(express.static) to redirect default to public/index.html
app.use(express.static('public'));

//9. to start the server
app.listen(3000, () => console.log('Listening to 3000....'));