const domainGigs = require('../domain/gigs');

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Get gig list
/*router.get('/', (req, res) =>
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => console.log(err)));
*/

/*router.get('/', async function (req, res, next) {
  let domainGigs = await domainGigs.findAll();
  res.json(domainGigs)

});*/  //TEMP TO REFACTOR

router.get('/', function (req, res, next) {
  domainGigs.homeFindAll().then(function (gigs) {
    console.log(gigs)
    res.json(gigs)
  });
});


/*router.get('/', async function (req, res, next) {
  let gigs = await domainGigs.homeFindAll();
  res.json(gigs)

});*/

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig

/*router.post('/add',async function (req, res, next) {
  domainGigs.Post(req, res)
});*/

router.post('/add', function (req, res, next) {
  domainGigs.Post(req, res)
});


// Search for gigs
router.get('/search', (req, res) => {
  domainGigs.getSearch(req, res)
});

module.exports = router;
