/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    static: function(req, res) {
        var pageName = req.param('page');
        return res.render('static/'+pageName, _.extend({}, toView, {
            pageTitle: 'Static page',
            title: 'Static page',
            bc: [
                // {name: 'Home', href: '/'},
                // {name: 'test', href: '/test'},
            ],
        }));
    },


};

