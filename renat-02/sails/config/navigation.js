module.exports.navigation = [
    // {
    //     name   : 'Register',
    //     href   : '/register',
    //     icon   : 'fa fa-envelope',
    //     canSee : ['ghost'],
    // },
    // {
    //     name   : 'Auth',
    //     href   : '/auth',
    //     icon   : 'fa fa-sign-in',
    //     canSee : ['ghost'],
    // },
     {
        name   : 'Список сервисов',
        href   : '/serviceList',
        icon   : 'fa fa-list-ul',
    },
    {
        name   : 'Сводная',
        icon   : 'fa fa-desktop',
        children : [
            {
                name   : 'Online',
                href   : '/charts#tab=1',
                icon   : '',
            },
            {
                name   : 'Статистика',
                href   : '/charts#tab=2',
                icon   : '',
            },
            {
                name   : 'Управление',
                href   : '/charts#tab=3',
                icon: '',
            },
        ],
    },
    // {
    //     name   : 'Admin panel',
    //     href   : '/admin',
    //     icon   : 'fa fa-terminal',
    //     canSee : ['admin'],
    //     children : [
    //         {
    //             name   : 'Panel',
    //             href   : '/admin',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Users',
    //             href   : '/admin/users',
    //             icon   : '',
    //         },
    //         // {
    //         //     name   : 'SubPage 2',
    //         //     href   : '/',
    //         //     icon: '',
    //         // },
    //     ],
    // },
    // {
    //     name   : 'Campaigns',
    //     href   : '/campaigns',
    //     icon   : 'fa fa-bullhorn',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name   : 'View all',
    //             href   : '/campaigns',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'New',
    //             href   : '/campaigns/new',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Archieved',
    //             href   : '/campaigns/archieved',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Advertisers',
    //     href   : '/advertisers',
    //     icon   : 'fa fa-star-o',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name   : 'View all',
    //             href   : '/advertisers',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'New',
    //             href   : '/advertisers/new',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Groups',
    //             href   : '/advertisers/groups',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Publishers',
    //     href   : '/publishers',
    //     icon   : 'fa fa-users',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name: 'View all',
    //             href: '/publishers',
    //             icon   : '',
    //         },
    //         {
    //             name: 'New',
    //             href: '/publishers/new',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Numbers',
    //     href   : '/numbers',
    //     icon   : 'fa fa-phone',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name: 'View all',
    //             href: '/numbers',
    //             icon   : '',
    //         },
    //         {
    //             name: 'New',
    //             href: '/numbers/new',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Pools',
    //     href   : '/pools',
    //     icon   : 'fa fa-cloud',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name: 'View all',
    //             href: '/pools',
    //             icon   : '',
    //         },
    //         {
    //             name: 'New',
    //             href: '/pools/new',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Tags',
    //     href   : '/tags',
    //     icon   : 'fa fa-tag',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name: 'View all',
    //             href: '/tags',
    //             icon   : '',
    //         },
    //         {
    //             name: 'New',
    //             href: '/tags/new',
    //             icon   : '',
    //         },
    //     ],
    // },
    // {
    //     name   : 'Reports',
    //     href   : '/reports',
    //     icon   : 'fa fa-bar-chart-o',
    //     // canSee : ['admin'],
    //     children : [
    //         {
    //             name   : 'Advertiser',
    //             href   : '/reports/advertiser',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Publisher',
    //             href   : '/reports/publisher',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Number',
    //             href   : '/reports/number',
    //             icon   : '',
    //         },
    //         {
    //             name   : 'Full',
    //             href   : '/reports/full',
    //             icon   : '',
    //         },
    //     ],
    // },
];
