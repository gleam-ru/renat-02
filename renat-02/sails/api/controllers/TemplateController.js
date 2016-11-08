module.exports = {
    saveTemplate: function(req, res) {
        var template = req.param('template');
        console.log('template', template)
        return Q()
                .then(function(){
                    return Template.destroy();
                })
                .then(function(){
                    return Template.create({layout: JSON.stringify(template)});
                })
                .then(function(result){
                    console.log('результат записан', result);
                    return res.ok();
                })
                .catch(res.serverError);
    },
    editTemplate: function(req, res) {
        return res.render('Dashboard', _.extend({}, toView, {
                    pageTitle: 'Система мониторинга электронных сервисов ФНС России',
                    title: 'Система мониторинга электронных сервисов ФНС России',
                    bc: [
                            { name: 'Главная', href: '/' },
                            { name: 'Редактирование шаблона', href: '/' },
                        ],
                    vue: 'Vues/grid.js'
                }));
    },
    editLayout: function(req, res) {
        return res.render('Dashboard', _.extend({}, toView, {
                    pageTitle: 'Редактирование шаблона',
                    title: 'Редактирование шаблона',
                    bc: [
                            { name: 'Главная', href: '/' },
                            { name: 'Редактирование шаблона', href: '/' },
                        ],
                    vue: 'Vues/layout.js'
                }));
    },
    getTemplate: function(req, res) {
        return Q()
            .then(function(){
                return Template.find();
            })
            .then(function(templates) {
                return res.send(templates.pop());
            })
            .catch(res.serverError);
    },
    // Сохранить цветовую схему
    saveScheme: function(req, res) {
        var scheme = req.param('scheme');
        console.log('scheme', scheme)
        return Q()
                .then(function(){
                    return Scheme.destroy();
                })
                .then(function(){
                    return Scheme.create({colorscheme: JSON.stringify(scheme)});
                })
                .then(function(result){
                    console.log('результат записан', result);
                    return res.ok();
                })
                .catch(res.serverError);
    },
    // ПОлучить цветовую схему
    getScheme: function(req, res) {
        return Q()
            .then(function(){
                return Scheme.find();
            })
            .then(function(schemes) {
                return res.send(schemes.pop());
            })
            .catch(res.serverError);
    },
}
