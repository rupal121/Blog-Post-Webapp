//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "You can see some famous blogs here...";
const aboutContent = "To create a post in this website is easy once you set up your website. The editor is simple and minimalist, and it offers a live preview of your text on the right side of the screen. On the front-end, you get a Medium vibe, so it’s nice. Near the editor screen, there is a sidebar with settings, where you can choose your preferences."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-rupal:Rupal@123@cluster0.lq3fq.mongodb.net/blogDB", {useNewUrlParser:true});

const postSchema = {
	title: String,
	content: String
};

const Post = mongoose.model("Post", postSchema);
 //let posts = [];
app.get("/", function(req, res){
	Post.find({}, function(err, posts){
	res.render("home", {
		startingContent: homeStartingContent,
		posts: posts
	});
});
});

app.get("/about", function(req, res){
	res.render("about", {parb:  aboutContent} );
});
app.get("/contact", function(req, res){
	res.render("contact", {parc:  contactContent} );
});
app.get("/compose", function(req, res){
	res.render("compose");
});
 
app.post("/compose", function(req, res){
	const post = new Post ({
			title: req.body.title,
		content: req.body.blog	
	});
	//posts.push(post);
	post.save(function(err){
		if(!err){
			res.redirect("/");

		}
	});


});



app.get("/posts/:postId", function(req,res){
	const requestedPostId = req.params.postId;
	Post.findOne({_id: requestedPostId}, function(err, post){    
         res.render("post", {
         	title: post.title,
         	content: post.content
         });

		});
	
});






let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});