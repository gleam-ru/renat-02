module.exports = {
	index: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            title: 'Credit cards',
            pageTitle: 'Cards list',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'test', href: '/cards'},
            ],
        }));
    },
};

