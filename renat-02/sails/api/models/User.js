var User = {
    attributes: {
        firstname : { type: 'string', minLength: 3 },
        surname   : { type: 'string', minLength: 3 },
        email     : { type: 'email',  unique: true },

        login     : { type: 'string', unique: true, minLength: 3 },

        roles     : { collection: 'Role', via: 'users' },
        passports : { collection: 'Passport', via: 'user' },
        theme     : { type: 'string', minLength: 3 }
    },
};

module.exports = User;
