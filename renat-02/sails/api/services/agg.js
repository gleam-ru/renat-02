var me = {};
module.exports = me;

var Q = require('Q');
var request = require('request');
var cheerio = require('cheerio');
var LRU = require("lru-cache");

var options = {
    max: 500,
    maxAge: 1000 * 60 * 60
};
me.cache = LRU(options);

me.config = {
    url: 'http://10.60.133.149:8080/rest/',
    login: 'admin',
    password: 'admin',
};

// непосредственно запрос к агрегату
//
var getData = function(params) {
    return Q()
        .then(function() {
            return Q.Promise(function(resolve, reject) {
                var url = me.config.url+_.map(_.extend({
                    p_username: me.config.login,
                    p_password: me.config.password,
                }, params), function(v, k) {
                    return k + '=' + v;
                })
                .join('&')
                ;
                console.info('aggregate request:', url);
                return request({
                    uri: url,
                    encoding: null,
                }, function(err, response, body) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(body);
                });
            });
        });
};


/**
 * Парсит XMl которую вернул сервис
 * @return Массив с информацией
 */
function pickFromXml() {
    var fields = arguments;
    return function(xml) {
        var $ = cheerio.load(xml);
        var info = [];
        var records = $('record');
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var service = {};
            _.each(fields, function(field) {
                service[field] = $('value[name=' + field + ']', record).text().trim();
            });
            info.push(service);
        }
        return info;
    };
}

/**
 * Возвращает кусок юрлки. Этот кусок ожидается аггрегатом
 *
 * @param  {[moment]} start
 * @param  {[moment]} end
 * @return {[URL-String]}
 */
function startEndToUrl(start, end) {
    if (!end) {
        end = moment();
    }
    if (!start) {
        start = end.clone().add(-1, 'days');
    }

    return [
        start.format('DD-MM-YYYYTHH:mm:ss'),
        getOffset(start),
        end.format('DD-MM-YYYYTHH:mm:ss'),
        getOffset(end),
        (end - start) / 10, // запрошу 10 точек
    ].join('&');


    function getOffset(momentDate) {
        var offset = momentDate.utcOffset() / 60;
        return [
            'GMT',
            offset > 0 ? '+' : '-',
            offset,
        ].join('');
    }
}

_.extend(me, {

    // получает список групп сервисов
    getAllServiceGroups: function() {
        return Q()
            .then(function() {
                return me.cache.get('allServiceGroups');
            })
            .then(function(cached) {
                if (cached) {
                    return cached;
                }
                return getData({
                    p_operation: 'call',
                    p_function: 'list',
                    p_context: 'serviceTestCaseGroups',
                })
                .then(pickFromXml('context', 'description'))
                .then(function(allServiceGroups) {
                    me.cache.set('allServiceGroups', allServiceGroups);
                    return allServiceGroups;
                })
                ;
            })
            ;
    },

    // Статистика по ВСЕМ группам сервисов с временными рамками
    getAllServiceGroupTimeline: function(start, end) {
        return getData({
            p_operation: 'call',
            p_context: 'serviceTestCaseGroups',
            p_function: 'getStatisticsTop'+'&'+startEndToUrl(start, end),
        })
        .then(pickFromXml('total', 'time', '2', '3', '5'));
    },





    // получает данные по группе сервисов (стиралке)
    getServiceGroupData: function(serviceGroup, start, end) {
        var that = this;
        return Q()
            .then(function() {
                return me.cache.get('serviceGroupData_'+serviceGroup.context);
            })
            .then(function(cached) {
                if (cached) {
                    return cached;
                }
                return Q.all([
                    that.getServiceGroupChildrenStatuses(serviceGroup),
                    that.getServiceGroupCurrentState(serviceGroup),
                    that.getServiceGroupTimeline(serviceGroup,start,end),
                ])
                .spread(function(statuses, state, timeline) {
                    return _.extend(
                        {},
                        serviceGroup,
                        {
                            childrenStatuses: statuses,
                        },
                        {
                            currentState: state,
                        },
                        {
                            timeline: timeline
                        }
                    );
                })
                .then(function(filledServiceGroup) {
                    me.cache.set('serviceGroupData_'+serviceGroup.context, filledServiceGroup);
                    return filledServiceGroup;
                })
                ;
            })
            ;
    },

    // Статистика по группе сервисов с временными рамками
    getServiceGroupTimeline: function(serviceGroup, start, end) {
        return getData({
            p_operation: 'call',
            p_context: serviceGroup.context,
            p_function: 'getStatisticsTop'+'&'+startEndToUrl(start, end),
        })
        .then(pickFromXml('total', 'time', '2', '3', '5'));
    },

    // статус группы (красный\зеленый)
    //   - содержит текущий статус
    //     http://joxi.ru/DmBx31XIN9LB8A
    //   - и время, которое группа находится в этом статусе
    //
    getServiceGroupCurrentState: function(serviceGroup) {
        return getData({
            p_operation: 'get',
            p_variable: 'currentStateTop',
            p_context: serviceGroup.context,
        })
        .then(pickFromXml('value', 'startTime'));
    },

    // количества сервисов в группе по статусу
    //   - содержит текущий статус
    //     http://joxi.ru/DmBx31XIN9LB8A
    //
    getServiceGroupChildrenStatuses: function(serviceGroup) {
        return getData({
            p_operation: 'call',
            p_function: 'getStatisticsTop',
            p_context: serviceGroup.context,
        })
        .then(pickFromXml('total', '5'/*red*/, '2'/*green*/, '3'/*yellow*/));
    },

    // Список инцидентов группы сервисов за период времени
    getServiceGroupIncidents: function(serviceGroup, start, end) {
        return getData({
            p_operation: 'call',
            p_context: serviceGroup.context,
            p_function: 'getIncidentsDurationTop'+'&'+startEndToUrl(start, end)+'&true',
        })
        .then(pickFromXml.apply(null, [
            'id',
            // время возникновения
            'initdate',
            // время завершения
            'closeddate',
            // длительность с учетом запрошенного периода
            'duration',
            // критичность
            'level',
            // описание триггера, сформировавшего инцидент
            'description',
            // Описание
            'trigger',
            // время возникновения, ограниченное запрошенным периодом
            'consideringThePeriodInitDate',
            // время завершения, ограниченное запрошенным периодом
            'consideringThePeriodClosedDate',
        ]));
    },


    // Cписок сервисов в группе сервисов
    getServiceGroupServices: function(serviceGroup) {
        return getData({
            p_operation: 'call',
            p_function: 'getTestCaseList',
            p_context: serviceGroup.context,
        })
        .then(pickFromXml('context', 'testCaseDescription'));
    },





    // Статистика по сервисам внутри группы сервисов с временными рамками
    getServiceTimeline: function(service, start, end) {
        return getData({
            p_operation: 'call',
            p_context: service.context,
            p_function: 'getStatisticsTop'+'&'+startEndToUrl(start, end),
        })
        .then(pickFromXml('total', 'time', '2', '3', '5'));
    },

    // Список инцидентов сервиса за период времени
    getServiceIncidents: function(service, start, end) {
        return getData({
            p_operation: 'call',
            p_context: service.context,
            p_function: 'getIncidentsDurationTop'+'&'+startEndToUrl(start, end)+'&true',
        })
        .then(pickFromXml.apply(null, [
            'id',
            // время возникновения
            'initdate',
            // время завершения
            'closeddate',
            // длительность с учетом запрошенного периода
            'duration',
            // критичность
            'level',
            // описание триггера, сформировавшего инцидент
            'description',
            // Описание
            'trigger',
            // время возникновения, ограниченное запрошенным периодом
            'consideringThePeriodInitDate',
            // время завершения, ограниченное запрошенным периодом
            'consideringThePeriodClosedDate',
        ]));
    },








});
