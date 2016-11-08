var later = require("later");

var cron = {};
cron.tasks = {};

cron.add = function(name, pattern, foo) {
    var s = later.parse.cron(pattern);
    var schedule = {
        s: s,
        timer: later.setInterval(foo, s),
        go: function() {
            foo();
        },
        stop: function() {
            this.timer.clear();
        },
        next: function(count) {
            return later.schedule(this.s).next(count);
        },
    };
    cron.tasks[name] = schedule;

    return schedule;
};

cron.init = function() {
    // UTC TIME!!!
    // http://www.corntab.com/pages/crontab-gui
    // Every 60 minutes
    // cron.add('qq', '*/60 * * * *', function() {
    //     console.log('tick '+new Date());
    //     agg.getServiceList(true);
    // });

    console.log('cron inited');
    return Q();
};

module.exports = cron;


// module.exports = {};
