module.exports = {
    index: function(req, res) {
        var serviceGroupName = req.param('serviceGroupName');
        return res.render('Dashboard', _.extend({}, toView, {
            pageTitle: 'serviceGroup',
            title: 'Система мониторинга электронных сервисов ФНС России',
            bc: [
                { name: 'Главная', href: '/' },
                { name: 'Группы сервисов', href: '/serviceGroups' },
                { name: serviceGroupName, href: '/' },
            ],
            vue: 'Vues/serviceGroup/serviceGroup.js'
        }));
    },
    getServiceGroupData: function(req, res) {
        var serviceGroupName = req.param('serviceGroupName');
        var serviceGroups = [];
        var serviceGroup = {
            title: 'Налог',
            count: 17,
            services: [
                {
                    title: 'Недействительные ИНН ФЛ',
                    access: {
                        percent: '38,5%',
                        time: moment().add(-4, 's')
                    },
                    state:'images/s1.jpg'
                },
                {
                    title: 'Вакансии',
                    access: {
                        percent: '69,2%',
                        time: moment().add(-4, 's')
                    },
                    state:'images/s1.jpg'
                },
                {
                    title: 'Адрес и платежные реквизиты вашей инспекции',
                    access: {
                        percent: '84,6%',
                        time: moment().add(-4, 's')
                    },
                    state:'images/s2.jpg'
                },
                {
                    title: 'Налоговый калькулятор, расчет стоимости патента',
                    access: {
                        percent: '100%',
                        time: 0
                    },
                    state:'images/s3.jpg'
                },
                {
                    title: 'Проверка корректности заполнения счет-фактур',
                    access: {
                        percent: '100%',
                        time: 0
                    },
                    state:'images/s4.jpg'
                },
                 {
                    title: 'Открытые и общедоступные сведения ОГРН',
                    access: {
                        percent: '100%',
                        time: 0
                    },
                    state:'images/s5.jpg'
                },
            ]
        };
        console.log(serviceGroupName)
        return res.send({serviceGroup: serviceGroup});
    },
};
