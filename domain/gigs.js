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

    /*homeFindAll: async ()=>{
     let domainGigs =  await Gig.findAll();
        console.log("+++++", domainGigs)
     return domainGigs
 },*/

    /*homeFindAll:  ()=>{
     let domainGigs =   Gig.findAll().then((domainGigs) => {
         console.log("+++++", domainGigs)
     });
     return domainGigs
 },*/

    homeFindAll: ()=>{
        return Gig.findAll().then((gigs) => {
            console.log("+++++", gigs)
             return  gigs
        });

    },

    PostVariable: function ({title, technologies, budget, description, contact_email}) {


        console.log('title',title)
        console.log('technologies',technologies)
        console.log('description',description)
        console.log('contact_email',contact_email)
        console.log('budget',budget)

        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }

        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        return Gig.create({
            title: title,
            technologies: technologies,
            description: description,
            budget: budget,
            contact_email: contact_email
        })
        .then(gig => {return gig})
        //.then(gig => res.redirect('/gigs'))
        .catch(err => console.log('err ++++++>',err));
    },

 /* Post: function (req, res) {

      let {title, technologies, budget, description, contact_email} = req.body;
      console.log('title',title)
      console.log('technologies',technologies)
      console.log('description',description)
      console.log('contact_email',contact_email)
      console.log('budget',budget)
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
          })
              .then(gig => res.json(gig))
              //.then(gig => res.redirect('/gigs'))
              .catch(err => console.log('err ++++++>',err));
      }
  },*/
  /*getSearch: function (req, res) {
      let {term} = req.query;
      // Make lowercase
      term = term.toLowerCase();

      Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } }).then(gigs => res.render('gigs', { gigs }))
          .catch(err => console.log(err));

  },*/

    getSearchGig: function (term) {

        // Make lowercase
        term = term.toLowerCase();

        return Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            .then(gigs => {return gigs })
            .catch(err => console.log(err));

    },

/*
 getSearch: function (req, res) {
      let {term} = req.query;
      // Make lowercase
      term = term.toLowerCase();

      Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            .then(gigs => res.render('gigs', { gigs }))
            .catch(err => console.log(err));

  },
 */

    updateData: async(postdata)=>{
        console.log('postdata.id------',postdata.id)

        let gig = await Gig.findOne( {where: {id: postdata.id}});
        if(!gig) throw new Error('gig not found');
        if(!postdata.id) throw new Error('id required for update gigs');
        console.log('gig.id------*',gig.id.toString())
        console.log('********',postdata.id === gig.id.toString())
        if(postdata.id !== gig.id.toString()) throw new Error('id mismatched');

        if (!postdata.budget) {
            postdata.budget = 'Unknown';
        } else {
            postdata.budget = `$${postdata.budget}`;
        }

        // Make lowercase and remove space after comma
        postdata.technologies = postdata.technologies.toLowerCase().replace(/, /g, ',');


        await gig.update({title: postdata.title, technologies:postdata.technologies, budget:postdata.budget, description:postdata.description, contact_email:postdata.contact_email},{where: {id: postdata.id}});
        return gig
    },

    deleteData: async(idNumber)=>{
        //console.log('id Check ++++++-->',idNumber)
        let gig = await Gig.findOne({ where: {id: idNumber} });
        //console.log('id Check ++++++-->',idNumber)
        //console.log('gig Check ++++++-->',gig)

        if(gig){
            await gig.destroy();
            return true
        } else {
            return false
        }

    }

};



