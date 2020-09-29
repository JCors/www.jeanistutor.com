/** @format */

const express = require("express");
const bodyPaser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");

//	Server Port
const PORT = process.env.PORT || 3000;

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({ extended: true }));

// Template Engine
app.set("view engine", "ejs");

// Connect to the local databaseDatabase
mongoose.connect("mongodb://localhost:27017/blogDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
 });

// Add Schema for Database
const postSchema = {
	title: String,
	content: String,
};

//Create Model for the post collection
const Post = mongoose.model("Post", postSchema);

// Route to Home Page
app.get("/", function (req, res) {
	Post.find({}, function (err, posts) {
		res.render("home", {
			startingContent: homeStartingContent,
			posts: posts,
		});
	});
});


// Route to About Page
app.get("/about", function (req, res) {
	res.render("about", { aboutContents: aboutContent });
});

// Route to Contact Us Page
app.get("/contact", function (req, res) {
	res.render("contact", { contactContents: contactContent });
});

// Route Compose Page
app.get("/compose", function (req, res) {
	res.render("compose");
});

// Route to Post Compose Page
app.post("/compose", function (req, res) {
	const post = new Post({
		title: req.body.postTitle,
		content: req.body.postBody,
	});
	console.log(post.title);
	post.save(function (err) {
		if (!err) {
			res.redirect("/");
			console.log("Successfully save in the database");
		}
	});
});

// Post Page
app.get("/posts/:postId", function (req, res) {
	const requestedPostId = req.params.postId;
	console.log(requestedPostId);
	Post.findOne({ _id: requestedPostId }, function (err, post) {
		res.render("post", {
			title: post.title,
			content: post.content,
		});
	});
});

// Port listener
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
