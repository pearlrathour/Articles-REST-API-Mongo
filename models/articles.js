const mongoose = require("mongoose");
const {endpoint} = require('../config');

const dburl = process.env.DB_URL;

function con() { 
    mongoose.connect(dburl).then(() => {
        console.log("Conn succ");
    }).catch((err) => console.log("No conn", err));
}

const ArticleSchema = new mongoose.Schema({
    name: String,
    content: String
});

const Articles = mongoose.model("Articles", ArticleSchema);

module.exports = {
    con,
    Articles
};