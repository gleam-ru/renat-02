/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function(req, res) {
        return res.render('serviceList', _.extend({}, toView, {
            pageTitle: 'Main page',
            title: 'Функциональные группы',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'test', href: '/test'},
            ],


        }));
    },
    widget: function(req, res) {
        return res.render('widget', _.extend({}, toView, {
            pageTitle: 'Widget',
            title: 'Отдельный виджет',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'test', href: '/widget'},
            ],
            vue: '/Vues/widget.js',

        }));
    },
    charts: function(req, res) {
        console.debug('i am at charts');
        return res.render('charts', _.extend({}, toView, {
            pageTitle: 'Main page',
            title: 'Сводное состояние сервиса ',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'Сводное состояние сервиса ', href: '/test'},
            ],
            vue: '/Vues/charts/charts.js',
        }));
    },




    // /sampletable
	sampletable: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            pageTitle: 'Sample table',
            title: 'Sample table',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'sampletable', href: '/sampletable'},
            ],
            // не знаю - приживется или нет :)
            vue: '/Vues/sampletable/index.js',
        }));
    },



};

