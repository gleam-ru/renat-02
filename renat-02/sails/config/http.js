/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

    middleware: {
        passportInit: require('passport').initialize(),
        passportSession : require('passport').session(),
        setLocals : function(req, res, cb) {
            res.locals.DICT = {
                'Home': {
                    ru: 'Главная',
                    ch: '家园',
                },
                'About': {
                    ru: 'Кто мы',
                    ch: '关于',
                },
                'About us': {
                    ru: 'О компании',
                    ch: '关于富通资本',
                },
                'Accredetation': {
                    ru: 'Регулирование',
                    ch: '认可',
                },
                'Our partners': {
                    ru: 'Партнеры',
                    ch: '伙伴',
                },
                'Risk': {
                    ru: 'Риск',
                    ch: '风险披露',
                },
                'Product and service': {
                    ru: 'Продукты и услуги',
                    ch: '产品与服务',
                },
                'FX market': {
                    ru: 'FOREX',
                    ch: '外汇市场',
                },
                'Liquidity solutions': {
                    ru: 'Решения по ликвидности',
                    ch: '液体解决方案',
                },
                'Corporate FX': {
                    ru: 'Корпоративный FOREX',
                    ch: '公司FX',
                },
                'Securities': {
                    ru: 'Акции',
                    ch: '证券',
                },
                'Wealth management': {
                    ru: 'Управление активами',
                    ch: '财富管理',
                },
                'Affiliate program': {
                    ru: 'Партнерская программа',
                    ch: '在联盟计划下轻松赚取 富都资本',
                },
                'Contacts': {
                    ru: 'Контакты',
                    ch: '联系',
                },
                //
                'Login': {
                    ru: 'Вход',
                    ch: 'Login',
                },
                //
                '%FOOTER%': {
                    en: 'Futu Securities International, an organization with multiple business functional roles including global foreign exchange broker, liquidity provider, foreign exchange trading system provider, securities broker, service provider for corporate treasury management platform and many more, provides foreign exchange transactions, liquidity solutions, international settlement and corporate hedge, wealth management, securities investment, financial IT solutions and other financial products and services for global customers and enterprises.',
                    ru: 'Futu Securities International - компания, занимающаяся оказанием различных услуг в сфере финансовых рынков. В том числе, является международным валютным брокером, провайдером ликвидности, брокером ценных бумаг. Более того, выполняет валютные операции, предоставляет решения по ликвидности. Оказывает услуги по управлению активами.',
                    ch: '富通证券国际，具有多个业务职能的组织，包括全球外汇经纪人，流动性提供者，外汇交易系统提供商，证券经纪人，企业资金管理平台服务提供商等等，提供外汇交易，流动性解决方案，国际结算 企业对冲，财富管理，证券投资，金融IT解决方案等全球客户和企业的金融产品和服务。',
                },
            };
            cb();
        },

        order: [
            'startRequestTimer',
            'cookieParser',
            'session',

            'passportInit',
            'passportSession',
            'setLocals',

            'myRequestLogger',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            '$custom',
            'router',
            'www',
            'favicon',
            '404',
            '500',
        ],

        // example
        // myRequestLogger: function (req, res, next) {
        //     console.log("Requested :: ", req.method, req.url);
        //     return next();
        // }


        /***************************************************************************
        *                                                                          *
        * The body parser that will handle incoming multipart HTTP requests. By    *
        * default as of v0.10, Sails uses                                          *
        * [skipper](http://github.com/balderdashy/skipper). See                    *
        * http://www.senchalabs.org/connect/multipart.html for other options.      *
        *                                                                          *
        ***************************************************************************/
        // bodyParser: require('skipper')

    },

    /***************************************************************************
    *                                                                          *
    * The number of seconds to cache flat files on disk being served by        *
    * Express static middleware (by default, these files are in `.tmp/public`) *
    *                                                                          *
    * The HTTP static cache is only active in a 'production' environment,      *
    * since that's the only time Express will cache flat-files.                *
    *                                                                          *
    ***************************************************************************/

    // cache: 1000*60*60*20 // 20h
};
