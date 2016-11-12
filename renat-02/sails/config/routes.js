/**
 *
 * Презентация с описанием:
 * https://docs.google.com/presentation/d/1R5QC0LArCI5E8WMRBun2IjAlD0ByWgO1I-SSr63JQmg/edit#slide=id.p23
 *
 *
 */

module.exports.routes = {

    'get  /': {
        view: 'landing',
    },
    'get  /sample': {
        view: 'sample',
    },

    'get  /static/:page' : 'Main.static',

    //
    // Auth
    //
    'get  /auth'       : 'Auth',
    'post /doLogin'    : 'Auth.doLogin',
    'get  /register'   : 'Auth.register',
    'post /doRegister' : 'Auth.doRegister',
    'get  /logout'     : 'Auth.logout',

    //  ╔╦╗╔═╗╔═╗╔╦╗
    //   ║ ║╣ ╚═╗ ║
    //   ╩ ╚═╝╚═╝ ╩
    'get  /403': {response: 'forbidden'},
    'get  /404': {response: 'notFound'},
    'get  /500': {response: 'serverError'},
};
