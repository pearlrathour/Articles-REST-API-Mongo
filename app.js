const express = require("express");
const bodyParser = require("body-parser");
const { con, Articles } = require('./models/articles');
const { port } = require('./config');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
con();

app.route("/articles")
    .get(function (req, res) {
        console.log("get 1")
        Articles.find()
            .then(function (foundarticles) {
                res.send(foundarticles);
            })
            .catch(function (error) {
                res.send(err);
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


///// Requestes for a specific article

app.route('/articles/:name')
    .get(function (req, res) {
        console.log(req.params.name)
        console.log("get 2")
        Articles.findOne({ name: req.params.name })
            .then(function (foundarticles) {
                if (foundarticles)
                    res.send(foundarticles);
                else
                    res.send("No article matching the title");
            })
            .catch(function (error) {
                res.send(err);
                console.error("Error fetching tasks:", error);
            });
    })

    // .put(function (req, res) {
    //     console.log(req.params.name)
    //     console.log("update 2")
    //     Articles.update(
    //         {name: req.params.name},
    //         {name: req.body.name},
    //         {content: req.body.content}
    //     5)
    //         .then(function (foundarticles) {
    //             if (foundarticles)
    //                 res.send(foundarticles);
    //             else
    //                 res.send("No article matching the title");
    //         })
    //         .catch(function (error) {
    //             res.send(err);
    //             console.error("Error fetching tasks:", error);
    //         });
    // });

app.listen(process.env.Port, function () {
    console.log("Server started on port 4000");
}); 