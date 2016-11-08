/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    // MODULES
    global.moment   = require('moment');
    global._        = require('lodash');
    global.Q        = require('q');
    global.Q.series = function(list) {
        var done = Q();
        var results = [];
        _.each(list, function(fn) {
            done = done.then(function() {
                return fn();
            });
            results.push(done);
        });
        return Q.all(results);
    };

    // проверить по YYYY-MM-DD перед заменой!!! некоторые сервисы требуют
    // повторной инициализации ddf
    global.ddf = 'YYYY-MM-DD'; // Default Date Format

    global.appRoot = __dirname+'/..';

    global.canSee = function(menu, user) {
        if (!menu.canSee) {
            return true;
        }
        var roles = user.roles && _.map(user.roles, 'name') || ['ghost']; // гость
        return _.intersection(menu.canSee, roles).length !== 0;
    };

    // у пользователя есть роль...
    global.hasRole = function(user, role) {
        return _.findIndex(user.roles, {name: role}) !== -1;
    };

    global.toView = {
        ddf: ddf,
        pageTitle: 'Noname page', // заголовок вкладки
        title: 'Testing', // title страницы
        bc: [] // крошки
    };


    return Q()
        .then(filler.process())
        .then(cron.init())
        .nodeify(cb)
        ;

};
