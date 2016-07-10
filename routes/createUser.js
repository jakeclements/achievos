'use strict';

// express
var express = require('express');
var router = express.Router();

// database
var Datastore = require('nedb'),
    db = new Datastore({
        filename: './db/yep.json',
        autoload: true // You can issue commands right away
    });




router.get('/', function(req, res) {

    if (req.query.user) {

        db.find({ user: req.query.user }, function (err, docs) {

          if (!err && docs.length) {

            res.json(docs);

          } else {

            res.send('no results')

          }
        });

    } else {
        res.send('supply a user')
    }

});



router.post('/', function(req, res) {

	// check for existing user already
	db.find(req.query, function(err, docs) {


		if (!docs.length) {
			//console.log('looks fresh, lets add it')


			db.insert(req.query, function (err, newDoc) {
		        // newDoc is the newly inserted document, including its _id

		        if (err) {
		            res.send('err');
		        } else {
		            res.send(newDoc)
		        }

		    });

		} else {
			res.send('User already exists')
			//console.log('already got it')
		}
	})


});

module.exports = router;