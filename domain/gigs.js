/*import Models from '../models';
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    /*homeFindAll: async function (req, res) {
        try {
            let gigs = await Gig.findAll();
            res.render('gigs', {
                gigs
            });
            return gigs;
        } catch (err) {
            console.log(err)
        }

    },*/

   /* homeFindAll: async()=>{
        let domainGigs = await Gig.findAll();
        return domainGigs
    },*/ //TEMP TO REFACTOR

   /*  homeFindAll: async()=>{
       let domainGigs = await Gig.findAll();
       return domainGigs
   },

    Post: async function (req, res) {

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
        } else {
            if (!budget) {
                budget = 'Unknown';
            } else {
                budget = `$${budget}`;
            }

            // Make lowercase and remove space after comma
            technologies = technologies.toLowerCase().replace(/, /g, ',');

            // Insert into table
            try {
                let gigs = await Gig.create({
                    title: title,
                    technologies: technologies,
                    description: description,
                    budget: budget,
                    contact_email: contact_email
                });
                res.redirect('/gigs');
                return gigs;
            }catch (err) {
                console.log(err)
            }
                //.then(gig => res.redirect('/gigs'))
                //.catch(err => console.log(err));
        }
    },
    getSearch: async function (req, res) {
        let {term} = req.query;
        // Make lowercase
        term = term.toLowerCase();

        try {
            let gigs = await Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            res.render('gigs', {
                gigs
            });

            return gigs;
            //.then(gigs => res.render('gigs', { gigs }))
            //.catch(err => console.log(err));
        } catch (err) {
            console.log(err)
        }

    },


};

*/

//import Models from '../models';
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    homeFindAll: ()=>{
     let domainGigs =  Gig.findAll();
        console.log(domainGigs)
     return domainGigs
 },

  Post: function (req, res) {

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
      } else {
          if (!budget) {
              budget = 'Unknown';
          } else {
              budget = `$${budget}`;
          }

          // Make lowercase and remove space after comma
          technologies = technologies.toLowerCase().replace(/, /g, ',');

          // Insert into table
          Gig.create({
              title: title,
              technologies: technologies,
              description: description,
              budget: budget,
              contact_email: contact_email
          }).then(gig => res.redirect('/gigs'))
              .catch(err => console.log(err));
      }
  },
  getSearch: function (req, res) {
      let {term} = req.query;
      // Make lowercase
      term = term.toLowerCase();

      Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } }).then(gigs => res.render('gigs', { gigs }))
          .catch(err => console.log(err));

  },


};



