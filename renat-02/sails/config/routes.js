/**
 *
 * Презентация с описанием:
 * https://docs.google.com/presentation/d/1R5QC0LArCI5E8WMRBun2IjAlD0ByWgO1I-SSr63JQmg/edit#slide=id.p23
 *
 *
 */

module.exports.routes = {

    'get /': '/lng-en',

    'get /lng-:lang': 'Main.static',
    'get /lng-:lang/:page': 'Main.static',



    //  ╔╦╗╔═╗╔═╗╔╦╗
    //   ║ ║╣ ╚═╗ ║
    //   ╩ ╚═╝╚═╝ ╩
    'get /403': {response: 'forbidden'},
    'get /404': {response: 'notFound'},
    'get /500': {response: 'serverError'},
};
