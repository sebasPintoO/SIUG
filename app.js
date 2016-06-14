angular.module('siugApp', [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
            'siugApp.home'

    ]).
    config(function($routeProvider, $mdThemingProvider){
        //Aqui van las rutas
        $routeProvider
        .when('/about',{
            templateUrl: 'app/about/about.html',
            controller: 'AboutCtrl'
        })
        .when('/contact',{
            templateUrl: 'app/contact/contact.html',
            controller: 'ContactCtrl'
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
                    label: 'Contact',
                    icon: 'phone_android',
                    name: 'Contacto',
                    url: 'contact'
                }
            ];

        

}]);