/**
 * Created by adm-wta on 8/25/15.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://pbv-webapps02/gods');
var God = require('./models/god');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

// middleware to use for all requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.route('/gods')


    .post(function(req, res) {

        var god = new God();      // create a new instance of the model
        god.name = req.body.name;  // set the bears name (comes from the request)

        // save and check for errors
        god.save(function(err) {
            if (err)
                res.send(err);

            res.json(god);
        });

    })
    .get(function(req, res) {
        God.find(function(err, gods) {
            if (err)
                res.send(err);

            res.json(gods);
        });
    });


router.route('/gods/:god_id')

    .get(function(req, res) {
        God.findById(req.params.god_id, function(err, god) {
            if (err)
                res.send(err);
            res.json(god);
        });
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        God.findById(req.params.god_id, function(err, god) {

            if (err)
                res.send(err);
            console.log("This is the God found with that ID in MongoDB " + god.name);

            console.log(req.body.name);

            //console.log(god.name);

            // save the god
            god.save(function(err) {
                if (err)
                    res.send(err);

                res.json(god);
            });

        });
    })

    .delete(function(req, res) {
        God.remove({
            _id: req.params.god_id
        }, function(err, god) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);