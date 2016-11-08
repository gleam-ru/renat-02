module.exports = {
    index: function(req, res) {
        return res.render('serviceList', _.extend({}, toView, {
            pageTitle: 'Service page',
            title: 'Система мониторинга электронных сервисов ФНС России',
            bc: [
                {name: 'Список сервисов', href: '/'},
                {name: 'test', href: '/test'},
            ],
        }));
    },


};
