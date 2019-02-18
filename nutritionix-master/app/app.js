'use strict';

// Declare app level module which depends on views, and components
angular.module('nutritionix', [
    'ngRoute',
    'ngStorage',
    'ngMaterial',
    'ngAnimate',
    'pagination',
    'nutritionix.menu',
    'nutritionix.api',
    'nutritionix.profile',
    'nutritionix.pantry',
    'nutritionix.searchView',
    'nutritionix.profileView',
    'nutritionix.pantryView',
    'nutritionix.dialog.info',
    'nutritionix.dialog.quantity',
    'nutritionix.version'
]).config([
    '$locationProvider',
    '$routeProvider',
    'nutritionixApiProvider',
    'MenuProvider',
    function ($locationProvider, $routeProvider, nutritionixApiProvider, MenuProvider) {
        nutritionixApiProvider.setApiCredentials('a1dae454', '11d2ef2c51fc274cf359a274a1cc2df0'); // App1
        //nutritionixApiProvider.setApiCredentials('81074c61', 'd2fc5d0a8959ac2066130942e7a40e5d'); // App2
        //nutritionixApiProvider.setApiCredentials('db67f640', '6d3a917f26933266438f8c90c4fb061f'); // App3 (not mine, nutritionix demo app)
        //nutritionixApiProvider.setApiCredentials('51d31f2b', '0af0130e116927468561ae1f536068d2'); // App4
    
        MenuProvider.add({ // hydrate the menu with the different route
            url   : '#/search',
            icone : 'search',
            title : 'Search aliment'
        });
        MenuProvider.add({
            url   : '#/pantry',
            icone : 'restaurant_menu',
            title : 'What you\'ll eat'
        });
        MenuProvider.add({
            url   : '#/profile',
            icone : 'accessibility',
            title : 'Change your profile'
        });
    }
]).constant('_', window._); // yeah lodash is great