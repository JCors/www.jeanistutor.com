/** @format */

const express = require("express");
const bodyPaser = require("body-parser");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", () => {
    console.log("Hello World!");
})


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});