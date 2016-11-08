module.exports = {

    // /admin
    index: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Admin panel',
            // pageTitle: '',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'admin panel', href: '/admin'},
            ],
        }));
    },

    // /admin/users
    users: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Admin - users',
            // pageTitle: '',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'admin panel', href: '/admin'},
                {name: 'users', href: '/admin/users'},
            ],
            // html: 'admin users',
            vue: '/Vues/admin/users/index.js',
        }));
    },

    // /admin/users/table
    //
    // рест-сервис для получения данных для таблицы пользователей
    usersTable: function(req, res) {
        return Q()
            .then(function() {
                return User.find().populateAll();
            })
            .then(function(users) {
                return res.send(users);
            })
            .catch(res.serverError)
            ;
    },

};

