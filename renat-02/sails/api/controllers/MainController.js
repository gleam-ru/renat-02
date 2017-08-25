/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    static: function(req, res) {
        var pageName = req.param('page');
        var lang = req.param('lang');

        if (!lang) {
            lang = 'en';
        }
        if (!pageName) {
            pageName = 'index';
        }
        console.debug(`Show lang: ${lang}, file: ${pageName}`);

        res.locals.LNG_PREFIX = 'lng-';
        res.locals.lng = lang;

        return res.render('static/'+lang+'/'+pageName, _.extend({}, toView, {
            // pageTitle: 'Static page',
            // title: 'Static page',
            bc: [
                // {name: 'Home', href: '/'},
                // {name: 'test', href: '/test'},
            ],
        }));
    },


};

