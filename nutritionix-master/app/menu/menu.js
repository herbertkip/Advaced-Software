var module = angular.module('nutritionix.menu', [ 'nutritionix.pantry', 'nutritionix.profile' ]);
module.provider('Menu', MenuProvider);

/**
 * Honestly i won't say that from me, i used the material angular menu provider
 * @constructor
 */

function MenuProvider() {
    var _menu = [];
    
    this.$get = function () {
        return {
            getItems : function () {
                return _menu;
            }
        };
    };
    
    this.add = function (item) {
        _menu.push(item);
    };
}

module.controller('MenuCtrl', MenuController);

function MenuController($scope, Menu, ProfileService, PantryService) {
    $scope.menu = Menu.getItems();
    
    /**
     * When you hate the long floating number, you cut them off, it's so funny
     *
     * @param number
     * @param dec
     * @return {number}
     */
    $scope.floor = function (number, dec) {
        return Math.floor(number * Math.pow(10, dec)) / Math.pow(10, dec);
    };
    
    /**
     * Update the little div in the bottom of the menu
     */
    this.updateInfo = function () {
        $scope.calories     = PantryService.calories();
        $scope.sodium       = PantryService.sodium();
        $scope.saturatedFat = PantryService.saturatedFat();
        
        $scope.maxCalories = ProfileService.getMaxCalories();
        $scope.maxSodium   = ProfileService.getMaxSodium();
        
        $scope.warning = PantryService.isWarning();
    };
    
    /**
     * Listen to the event sent by the 2 Service when they use the sync() method.
     */
    $scope.$on('profile:updated', this.updateInfo);
    $scope.$on('pantry:updated', this.updateInfo);
    
    this.updateInfo();
}