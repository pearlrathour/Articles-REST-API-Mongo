const express = require("express");
const bodyParser = require("body-parser");
const { con, Articles } = require('./models/articles');
const { Port } = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
con();

app.route("/articles")
    .get(function (req, res) {
        Articles.find()
            .then(function (foundarticles) {
                res.send(foundarticles);
            })
            .catch(function (error) {
                res.send(error);
                console.error("Error fetching tasks:", error);
            });
    })

    .post(function (req, res) {
        const newArticle = new Articles({
            name: req.body.name,
            content: req.body.content
        });
        newArticle.save();
    })

    .delete(function (req, res) {
        Articles.deleteMany({})
            .then(result => {
                res.send(`${result.deletedCount} documents deleted`);
            })
            .catch(error => {
                console.error("Error deleting documents:", error);
                res.status(500).send("Error deleting documents");
            });
    });


/////////////     Requestes for a specific article    ///////////////

app.route('/articles/:name')
    .get(function (req, res) {
        Articles.findOne({ name: req.params.name })
            .then(function (foundarticles) {
                if (foundarticles)
                    res.send(foundarticles);
                else
                    res.send("No article matching the title");
            })
            .catch(function (error) {
                res.send(error);
                console.error("Error fetching tasks:", error);
            });
    })

    .put(function (req, res) {
        // ModelName.update(
        //     {cond},
        //     {updates},
        //     {overwrite: true}
        // )
        
        Articles.findOneAndUpdate(
            {name: req.params.name},
            {name: req.body.name, content: req.body.content}
        )
        .then(function () {
            res.send("Put");
        })
        .catch(function (error) {
            res.send(error);
            console.error("Put error:", error);
        });
    })
    
    // Update a specific field in a specific document
    .patch(function (req, res) {
        Articles.findOneAndUpdate(
            {name: req.params.name},
            {$set: req.body}
        )
        .then(function () {
            res.send("Patch");
        })
        .catch(function (error) {
            res.send(error);
            console.error("Patch error:", error);
        });
    })
    
    .delete(function (req, res) {
        Articles.deleteOne(
            {name: req.params.name},
        )
        .then(function () {
            res.send("Delete");
        })
        .catch(function (error) {
            res.send(error);
            console.error("Delete error:", error);
        });
    });

app.listen(process.env.Port, function () {
    console.log("Server started on port 4000");
}); 