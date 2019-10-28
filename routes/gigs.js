const domainGigs = require('../domain/gigs');

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.param('id', async (req, res, next, idParams) => {
  req.id = idParams;
  return next();
});

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
    console.log('------>',gigs)
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

router.post('/add', async function (req, res, next) {
  let {title, technologies, budget, description, contact_email} = req.body;


  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({text: 'Please add a title'});
  }
  if (!technologies) {
    errors.push({text: 'Please add some technologies'});
  }
  if (!description) {
    errors.push({text: 'Please add a description'});
  }
  if (!contact_email) {
    errors.push({text: 'Please add a contact email'});
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
    return ;
  }

  let gig = await domainGigs.PostVariable({title, technologies, budget, description, contact_email});

  res.json(gig)

});

/*router.post('/add',  function (req, res, next) {
  domainGigs.Post(req, res);
  //console.log("++error+++", gig);
 // res.json(gig)

});*/

/*router.post('/add', async function (req, res, next) {
  domainGigs.Post(req, res)
  let postData = req.body;
  let gig = await domainGigs.create(postData);
  res.json(gig)

});*/

// Search for gigs
router.get('/search', async function(req, res)  {
  let {term} = req.query;
  let gigs = await domainGigs.getSearchGig(term)
  console.log("++error+++>>>>>>>>>>>>", gigs);
  res.render('gigs', { gigs });
});

router.put('/edit/:id',  async function (req, res, next) {
  let postData = req.body;
  postData.id = req.id;
  console.log('postDatapostData',postData)
  let gigs = await domainGigs.updateData(postData);
  res.json(gigs)
});

router.delete('/delete/:id',  async function (req, res, next) {
  let idNumber = req.id;
  let status = await domainGigs.deleteData(idNumber);
  //console.log('req.id++++++-->',req.id)
  res.json({status: status})
});



module.exports = router;
