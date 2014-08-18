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

            // log user in the session
            req.session.authenticated = true;
            req.session.User = user;

            res.redirect('/user/show/'+user.id);
            //res.json(user);

            // the code bellow is commented because we created this in polocies already 
            //req.session.flash = {};
        });
   },
   
    show: function(req, res, next){
        // the function bellow is from the User model
                                                        // err is undefined though
                                                        // but it is needed call back takes two arguements
                                                        // it assumes error and use                                              
        var foundUser = function(err, user){
            console.log(user);
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
        };

        User.findOne(req.param('id'), foundUser);
   },
   index: function(req, res, next){
        // get an array of all the users in the Users Collection
        User.find(function (err, users){
            if(err) next(err);
            // pass the array to index.ejs
            res.view({
                users: users
            });
        });
   },

   // render the edit view (e.g /views/edit.ejs)
   edit: function (req, res, next){

    // find the user from the id passed in via params
    User.findOne(req.param('id'),function foundUser(err, user){
        if(err) return next(err);
        if(!user) return next('User doesn\'t exist');
        res.view({
            user:user
        });
    });
   },

    update: function (req, res, next){
        User.update(req.param('id'), req.params.all(), function userUpdated(err){
            if(err){
                console.log(err);
                return res.redirect('/user/edit/'+req.param('id'));
            }
            res.redirect('/user/show/'+req.param('id'));
        });
   }, 

   destroy: function (req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);
            if(!user) return next('User doesn\'t exist');

            User.destroy(req.param('id'),function userDestroyed(err){
                if(err) return next(err);
            });

            res.redirect('/user');

        });
   }

};

module.exports = UserController;
