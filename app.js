angular.module('siugApp', [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'firebase',
        'pdf',
        'chart.js', 
            'siugApp.home',
            'siugApp.register',
            'siugApp.reader',
            'siugApp.report'

    ]).
    config(function($routeProvider, $mdThemingProvider){
        //Aqui van las rutas
        $routeProvider
        .when('/home',{
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/register',{
            templateUrl: 'app/register/register.html',
            controller: 'RegCtrl'
        })
        .when('/reader',{
            templateUrl: 'app/reader/reader.html',
            controller: 'RdrCtrl'
        })
        .when('/report',{
            templateUrl: 'app/report/report.html',
            controller: 'RepCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('blue');

    })
        

    .controller('AppCtrl', ['$scope','$mdSidenav', function($scope, $mdSidenav) {
        $scope.toggleSidenav = function () {
                return $mdSidenav('left').toggle();
            };
            $scope.list = [
                {
                    label: 'Home',
                    icon: 'home',
                    name: 'Inicio',
                    url:  'home'
                },
                {
                    label: 'About',
                    icon: 'info',
                    name: 'Ayuda',
                    url:  'about'
                },
                {
                    label: 'Reader',
                    icon: 'local_library',
                    name: 'Reader',
                    url: 'reader'
                },
                {
                    label: 'Report',
                    icon: 'pie_chart',
                    name: 'Report',
                    url: 'report'
                }
            ];

        

}]);