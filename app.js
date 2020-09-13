/** @format */

const express = require("express");
const bodyPaser = require("body-parser");
const ejs = require("ejs");
const e = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let publishedList = [];
app.use(express.static("public"));
app.use(bodyPaser.urlencoded({ extended: true }));

// Template Engine
app.set("view engine", "ejs");

// Route to Home Page
app.get("/", function (req, res) {
	res.render("home", {
		homeContent: homeStartingContent,
		posts: publishedList,
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

// Post About Us
app.post("/about", function (req, res) {
	res.redirect("about");
});

// Compose Page
app.get("/compose", function (req, res) {
	res.render("compose");
});

//Post Compose Page
app.post("/compose", function (req, res) {
	var post = {
		title: req.body.textTitle,
		content: req.body.textHere,
	};
	if (post === "") {
		publishedList.push(post);
		res.redirect("/");
	} else {
		res.redirect("compose");
	}
});

// Post Page
// app.get("/post", function (req, res) {
// 	res.render("post", { publishedArticles: publishedList });
// });

// Port listener
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
