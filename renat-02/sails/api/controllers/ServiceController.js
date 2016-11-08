module.exports = {
    index: function(req, res) {
        console.debug('i am here');
        var serviceGroupName = req.param('serviceGroupName');
        var serviceName = req.param('serviceName');
        return res.render('Dashboard', _.extend({}, toView, {
            pageTitle: 'serviceGroup',
            title: 'Система мониторинга электронных сервисов ФНС России',
            bc: [
                { name: 'Главная', href: '/' },
                { name: 'Группы сервисов', href: '/serviceGroups' },
                { name: serviceGroupName, href: '/serviceGroup/'+serviceGroupName},
                { name: serviceName, href: '/'},
            ],
            vue: 'Vues/service/service.js'
        }));
    },
    getServiceData: function(req, res) {
        var serviceGroupName = req.param('serviceName');
        var serviceGroups = [];
        var service = {
            // 1 - Критическя ошибка
            // 2 - Останов
            // 3 - Ошибка
            // 4 - Предупреждение
            title: 'Личный кабинет физического лица',
            incidents: [
                {
                    icode: 1,
                    startDate: moment(),
                    endDate: moment().add(1, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123451
                },
                {
                    icode: 2,
                    startDate: moment(),
                    endDate: moment().add(2, 'minutes'),
                    info: 'Пропуск измерения',
                    id: 123452
                },
                {
                    icode: 3,
                    startDate: moment(),
                    endDate: moment().add(3, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123453
                },
                {
                    icode: 4,
                    startDate: moment(),
                    endDate: moment().add(4, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123454
                },
                {
                    icode: 1,
                    startDate: moment(),
                    endDate: moment().add(5, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123455
                },
                {
                    icode: 2,
                    startDate: moment(),
                    endDate: moment().add(6, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123456
                },
                {
                    icode: 3,
                    startDate: moment(),
                    endDate: moment().add(7, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123457
                },
                {
                    icode: 4,
                    startDate: moment(),
                    endDate: moment().add(8, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123458
                },

            ]
        };
        console.log(service)
        return res.send({service: service});
    },
    getCurrentState: function(req, res) {
        var serviceName = req.param('serviceName');
        var state = {
            scode: 1,
            date: moment().format('MM.DD.YYYY, HH:mm:ss'),
            duration: 1459350,
            bad: 'Канал не доступен',
            good: 'Зонд доступен',
        };
        return res.send({state: state});
    },
    incidents: function(req, res) {
        var serviceGroupName = req.param('serviceGroupName');
        var incidentName = req.param('incidentName');
        return res.render('Dashboard', _.extend({}, toView, {
            pageTitle: 'serviceGroup',
            title: 'Система мониторинга электронных сервисов ФНС России',
            bc: [
                { name: 'Главная', href: '/' },
                { name: 'Группы сервисов', href: '/serviceGroups' },
                { name: serviceGroupName, href: '/serviceGroup/'+serviceGroupName},
                { name: 'Список инцидентов', href: '/'},
            ],
            vue: 'Vues/incidents/incidents.js'
        }));
    },
    getIncidentData: function(req, res) {
        var incidentName = req.param('serviceName');

            // 1 - Критическя ошибка
            // 2 - Останов
            // 3 - Ошибка
            // 4 - Предупреждение
            var incidents = [
                {   serviceName: 'Федеральная информационная адресная система',
                    icode: 1,
                    startDate: moment(),
                    endDate: moment().add(1, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123451
                },
                {   serviceName: 'Заплати налоги',
                    icode: 2,
                    startDate: moment(),
                    endDate: moment().add(2, 'minutes'),
                    info: 'Пропуск измерения',
                    id: 123452
                },
                {   serviceName: 'Предоставление налоговой и бухгалтерской отчетности',
                    icode: 3,
                    startDate: moment(),
                    endDate: moment().add(3, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123453
                },
                {   serviceName: 'Обратиться в ФНС России',
                    icode: 4,
                    startDate: moment(),
                    endDate: moment().add(4, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123454
                },
                {   serviceName: 'Подача документов на государственную регистрацию',
                    icode: 1,
                    startDate: moment(),
                    endDate: moment().add(5, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123455
                },
                {   serviceName: 'Почтовая рассылка сайта ФНС',
                    icode: 2,
                    startDate: moment(),
                    endDate: moment().add(6, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123456
                },
                {   serviceName: 'Адрес и платежные реквизиты вашей инспекции',
                    icode: 3,
                    startDate: moment(),
                    endDate: moment().add(7, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123457
                },
                {   serviceName: 'Онлайн запись на прием в инспекцию',
                    icode: 4,
                    startDate: moment(),
                    endDate: moment().add(8, 'minutes'),
                    info: 'Сервис недоступен',
                    id: 123458
                },

            ];

        return res.send({incidents: incidents});
    },
    getIncidentPieData: function(req, res) {
        var  count = {
            yellow: '20',
            red: '60',
            orange: '5',
            blue: '5',
        };
        var  duration = {
            yellow: '20',
            red: '32',
            orange: '34',
            blue: '14',
        };
        return res.send({count: count, duration: duration});
    },
};
