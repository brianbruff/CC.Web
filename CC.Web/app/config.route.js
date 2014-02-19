(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/curves/overview.html',
                    title: 'Overview',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-bar-chart-o orange"></i> Overview'
                    }
                }
            },
            {
                url: '/dependencies',
                config: {
                    templateUrl: 'app/curves/dependencies.html',
                    title: 'Dependencies',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-code-fork orange"></i> Dependencies'
                    }
                }
            },
            {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-lock orange"></i> Admin'
                    }
                }
            }
        ];
    }
})();