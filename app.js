// 7. connect express to app.js
let express = require('express');
let app = express();
let mongoose = require('mongoose');
// this is the package to upload file
let multer = require('multer');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let Post = require('./models/posts').Post;


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

let imageStorage = multer.diskStorage({
	destination:(req, file, cb) => cb(null, 'public/images'),
	filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({storage: imageStorage }).single('imageFile'));


//11. app.use(express.static) to redirect default to public/index.html
app.use(express.static('public'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);

app.get('/sight', async (req, resp) =>{
	let id = req.query.id;
	let post = await Post.findOne({id: id});
	resp.render('sight', {
		title: post.title,
		imageURL: post.imageURL,
		date: post.date,
		text: post.text
	})
})
//9. to start the server
app.listen(3000, () => console.log('Listening to 3000....'));