'use strict';

angular.module('nutritionix.searchView', [ 'ngRoute', 'ngMaterial', 'nutritionix.pantry' ])
    .config([
        '$routeProvider', function ($routeProvider) { // register the route to the router
            $routeProvider.when('/search', {
                templateUrl : 'app/searchView/view.html',
                controller  : 'searchViewController'
            });
        }
    ])
    .controller('searchViewController', SearchViewController);

SearchViewController.$inject = [ '$scope', '$location', 'nutritionixApi', '$mdDialog', 'PantryService' ];

function SearchViewController($scope, $location, nutritionixApi, $mdDialog, PantryService) {
    
    // prepare the view data
    $scope.searchText             = '';
    $scope.autoCompleteSearchText = '';
    $scope.filter                 = {
        min       : parseFloat($location.search().min) || undefined, // get from the router
        max       : parseFloat($location.search().max) || undefined, // get from the router
        activated : $location.search().filter // get from the router
    };
    $scope.selectedItem           = $location.search().item ? { text : $location.search().item } : undefined; // get from the router
    $scope.foundResults           = [];
    $scope.paging                 = {
        total         : 0,
        current       : $location.search().page ? $location.search().page : 1, // get from the router
        onPageChanged : $scope.reloadListResults,
    };
    
    /**
     * When you change the item in the auto complete input trigger a 'reload' of the controller
     * @param selectedItem
     */
    $scope.selectedItemChange = function (selectedItem) {
        if (!selectedItem) {
            $scope.searchedItem = undefined;
            $scope.foundResults = [];
            $scope.paging.total = 0;
            return;
        }
        $scope.selectedItem   = selectedItem;
        $scope.paging.current = 1;
        $scope.search();
    };
    
    /**
     * 'reload' of the controller with updated route query params
     */
    $scope.search = function () {
        $location.search({
            item   : $scope.selectedItem.text,
            page   : $scope.paging.current,
            filter : $scope.filter.activated,
            min    : $scope.filter.min,
            max    : $scope.filter.max
        });
    };
    
    /**
     * Search through the nutritionix API 24 aliment using the route query params
     */
    $scope.reloadListResults = function () {
        var bulkSize = 24;
        nutritionixApi.searchV1($scope.selectedItem.text, bulkSize, ($scope.paging.current - 1) * bulkSize, $scope.filter.activated ? $scope.filter : undefined)
            .success(function (search) {
                $scope.foundResults = search.hits; // set result
                $scope.paging.total = Math.floor(search.total / bulkSize) + 1; // calculate the number of page
            });
    };
    
    /**
     * Using the auto complete endpoint, hydrate the input with the data
     * @param query the text you taped
     */
    $scope.autoCompleteQuerySearch = function (query) {
        return nutritionixApi.autocomplete(query).then(function (result) {
            return _.sortBy(result.data, 'text');
        });
    };
    
    /**
     * When you click on an aliment, to show other information
     * @param {object} ev
     * @param {object} item
     */
    $scope.showItemInfo = function (ev, item) {
        $mdDialog.show(
            $mdDialog.infoDialog({
                targetEvent : ev,
                locals      : {
                    item : item
                }
            })
        );
    };
    
    /**
     * To search if the aliment is already in the pantry
     * @param item
     * @return {boolean}
     */
    $scope.isAlreadyInPantry = function (item) {
        return PantryService.isInPantry(item._id);
    };
    
    /**
     * When you click on add, well it ask the quantity and add it to the pantry
     * @@param {object} ev
     * @param {object} item
     */
    $scope.addItem = function (ev, item) {
        $mdDialog.show(
            $mdDialog.quantityDialog({
                targetEvent : ev,
                locals      : {
                    item : item
                }
            })
        ).then(function (quantity) {
            PantryService.add(item, quantity);
        });
    };
    
    if ($location.search().item && $location.search().item !== '') { // trigger a search if query params found
        $scope.reloadListResults();
    }
    
    return SearchViewController;
}