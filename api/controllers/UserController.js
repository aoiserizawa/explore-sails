/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var UserController = {
   'new': function(req, res){
        // the code bellow is commented because we created this in polocies already 
        // res.locals.flash = _.clone(req.session.flash);
        // res.view();
        // req.session.flash = {};
        res.view();
   },
   create: function(req, res, next){
    
        // the function bellow is from the User model
        User.create(req.params.all(), function userCreated(err, user){
            //OLD error handling
            //if(err) return next(err);
            //NEW
            if(err){
                console.log(err);
                req.session.flash = {
                    err: err
                }

                return res.redirect('/user/new');
            }

            res.json(user);

            // the code bellow is commented because we created this in polocies already 
            //req.session.flash = {};
        });
   }
   show: function(req, res, next){

        // the function bellow is from the User model
        User.findOne(req.param(id), function foundUser (err, user) {
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
        });
   }

};

module.exports = UserController;
