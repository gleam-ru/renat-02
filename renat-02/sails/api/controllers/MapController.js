/**
 * AggregateController
 *
 * Контроллер для работы с необходимой частью Aggregate
 *
 */

var cheerio = require('cheerio');

module.exports = {

    // /map
    index: function(req, res) {
        return res.render('map', _.extend({}, toView, {
            pageTitle: 'Map',
            // title: 'Пробное АПИ для работы с Agg',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'map', href: '/map'},
            ],
            vue: 'Vues/map/index.js'
        }));
    },

};
