/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

var me = {

    // /auth
    index: function (req, res) {
        // авторизирован? иди в профиль.
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        var data = _.extend({}, toView, {
            form: req.flash('form'),
        });
        return res.render('auth', {
            title: 'Login',
            pageTitle: 'Login',
        });
    },
    // post: /doLogin
    doLogin: function(req, res) {
        return passport.authenticate(['local'], function (err, user, challenges) {
            if (err || !user) {
                // ошибка или оправдание - показать пользователю
                var errorText = err || challenges;
                return me.tryAgain(req, res, errorText);
            }
            // аутентификация успешна
            return passport.login(req, res, user, function(err) {
                if (err) {
                    return me.tryAgain(req, res, err);
                }
                return passport.rememberme.issue(user, function(err, token) {
                    if (err) {
                        console.warn('token not assigned...', err);
                    }
                    res.cookie(sails.config.passport.rememberme.key, token, { path: '/', httpOnly: true, maxAge: 604800000 });
                    return res.redirect('/');
                });
            });
        })(req, res);
    },



    // /regiser
    register: function(req, res) {
        // авторизирован? иди в ...
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        var data = _.extend({}, toView, {
            title: 'Registering',
            pageTitle: 'Registering',
        });
        return res.render('register', data);
    },
    // post: /doRegister
    doRegister: function(req, res) {
        var params = {
            firstname:  req.param('firstname'),
            surname:    req.param('surname'),
            email:      req.param('email'),
            login:      req.param('login'),
            password:   req.param('password'),
            repassword: req.param('repassword'),
        };

        // minLength от Waterline всегда пропускает 0 символов... -_-
        if (!params.login || !params.password || !params.repassword) {
            return me.tryAgain(req, res, new Error('All fields are required'));
        }

        if (params.password !== params.repassword) {
            return me.tryAgain(req, res, new Error('Passwords doesn`t match'));
        }

        var created = [];
        return Q.resolve()
            .then(function() {
                return Q.all([
                    User.create(params).populateAll(),
                    Role.findOne({name: 'user'}),
                ]);
            })
            .spread(function(user, role) {
                user.roles.add(role.id);
                user.save();
                return user;
            })
            .then(function(user) {
                created.push(user);
                return Passport.create({
                    user     : user.id,
                    strategy : 'local',
                    password : params.password,
                })
                .then(function(passport) {
                    created.push(passport);
                    return user;
                })
                ;
            })
            .then(function(user) {
                console.info('New local user! ID:', user.id, user.email);
                // аутентифицируем пользователя
                passport.login(req, res, user, function(err) {
                    if (err) return me.tryAgain(req, res, err);
                    return res.redirect(sails.config.passport.fillCredentials);
                });
            })
            .catch(function(err) {
                console.error('Ошибка при регистрации. Откат.');
                console.info('user cred:', params);
                return Q.all(_.map(created, function(inst) {
                    return Q()
                        .then(function() {
                            console.log('destroy:', inst);
                            inst.destroy();
                        })
                        ;
                }))
                .then(function() {
                    return me.tryAgain(req, res, err);
                })
                ;
            })
            ;
    },



    // /logout
    logout: function (req, res) {
        return passport.logout(req, res, function(err) {
            if (err) {
                return res.serverError(err);
            }
            return res.redirect('/');
        });
    },




    // has no route
    //
    // возвращает на предыдущую страницу, но теперь с ошибками.
    // сохраняет заполненные данные
    tryAgain: function(req, res, err) {
        // сообщения об ошибке
        if (err) {
            flashes.error(req, err);
        }

        // чтобы форма восстановила свои данные
        flashes.push(req, 'signup', req.body);

        var referer = req.get('referer');
        res.redirect(referer || '/');
    },

};

module.exports = me;
