module.exports = {

    // /me
    index: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Me',
            // pageTitle: 'My me',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'me', href: '/me'},
            ],
            html: 'my profile',
        }));
    },

    // /me/settings
    settings: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Admin',
            // pageTitle: 'Admin panel',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'me', href: '/me'},
                {name: 'settings', href: '/me/settings'},
            ],
            html: 'my settings',
        }));
    },

    // /me/company
    company: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Admin',
            // pageTitle: 'Admin panel',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'me', href: '/me'},
                {name: 'company', href: '/me/company'},
            ],
            html: 'my current company',
        }));
    },

};

