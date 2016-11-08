/**
 * AggregateController
 *
 * Контроллер для работы с необходимой частью Aggregate
 *
 */


module.exports = {

    test: function(req, res) {
        return Q()
            .then(function() {
                return agg.getServiceIncidents({
                    "context": "serviceTestCases.7843157839286632448login",
                  });
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },

    // /aggregate
    index: function(req, res) {
        return res.render('index', _.extend({}, toView, {
            pageTitle: 'Aggregate',
            title: 'Пробное АПИ для работы с Agg',
            bc: [
                {name: 'Home', href: '/'},
                {name: 'aggregate', href: '/aggregate'},
            ],
            vue: 'Vues/aggregate/index.js'
        }));
    },


    // получает список групп сервисов
    getAllServiceGroups: function(req, res) {
        return Q()
            .then(function() {
                return agg.getAllServiceGroups();
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },

    // получает данные по группе сервисов (стиралке)
    getServiceGroupData: function(req, res) {
        var context = req.param('context');
        var start = req.param('start');
        var end = req.param('end');

        console.log('start: ', start);
        console.log('end: ', end);
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        return Q()
            .then(function() {
                return agg.getServiceGroupData({
                    context: context,
                }, momentStart, momentEnd);
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },


    // получает список групп сервисов
    getAllServiceGroupsData: function(req, res) {
        var start = req.param('start');
        var end = req.param('end');
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        return Q()
            .then(function() {
                return agg.getAllServiceGroups();
            })
            .then(function(data) {
                return Q.all(_.map(data, function(sg) {
                    return agg.getServiceGroupData(sg, momentStart, momentEnd);
                }));
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },

    // Cписок сервисов в группе сервисов
    getServicesInGroup: function(req, res) {
        var context = req.param('context');
        var start = req.param('start');
        var end = req.param('end');
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        var services = [];
        return Q()
            .then(function() {
                return agg.getServiceGroupServices({
                    context: context,
                });
            })
            .then(function(data) {
                services = _.map(data, function(el) {
                    el.serviceTitle = {
                        title: el.testCaseDescription,
                        href: el.context,
                    }
                    return el;
                });
                return Q.all(_.map(data, function(service) {
                    return agg.getServiceTimeline(service, momentStart, momentEnd);
                }));
            })
            .then(function(data) {
                services = _.map(services, function(s, i) {
                    s.componentData = data[i];
                    return s;
                })
                return res.send(services)
            })
            .catch(res.serverError)
            ;
    },

    getAllServiceGroupTimeline: function(req, res) {
        var start = req.param('start');
        var end = req.param('end');

        console.log('start: ', start);
        console.log('end: ', end);
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        return Q()
            .then(function() {
                return agg.getAllServiceGroupTimeline(momentStart, momentEnd);
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },
    getServiceGroupTimeline: function(req, res) {
        var start = req.param('start');
        var end = req.param('end');
        var serviceGroup = req.param('serviceGroup');

        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        return Q()
            .then(function() {
                return agg.getServiceGroupTimeline({context:serviceGroup}, momentStart, momentEnd);
            })
            .then(function(data) {
                return res.send(data);
            })
            .catch(res.serverError)
            ;
    },
    // Список событий для таблицы
    getIncidentData: function(req, res) {
        var service = req.param('service');
        var start = req.param('start');
        var end = req.param('end');
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        console.debug(service.context, momentStart, momentEnd)
        return Q()
            .then(function() {
                return agg.getServiceGroupIncidents(service, momentStart, momentEnd);
            })
            .then(function(data) {
                return res.send(data.slice(0,10))
            })
            .catch(res.serverError)
            ;
    },
    // Список инцидентов для сервиса
    getServiceIncidentData: function(req, res) {
        var service = req.param('service');
        var start = req.param('start');
        var end = req.param('end');
        var momentStart;
        var momentEnd;
        if (start) {
            momentStart = moment(start);
        };
        if (end) {
            momentEnd = moment(end);
        };
        console.debug(service.context, momentStart, momentEnd)
        return Q()
            .then(function() {
                return agg.getServiceIncidents(service, momentStart, momentEnd);
            })
            .then(function(data) {
                return res.send(data.slice(0,10))
            })
            .catch(res.serverError)
            ;
    }

};
