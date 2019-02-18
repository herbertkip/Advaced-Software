/**
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 Crawlink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

/**
 * Based on Crawlink version, modified by Yoannma
 */

var app = angular.module("pagination", []);

app.directive('pagination', PaginationDirective);

PaginationDirective.$inject = [];
function PaginationDirective() {
    return {
        restrict     : 'EA',
        scope        : { // parameters given to component
            ymPages        : '=', // nbr of page
            ymAlignModel   : '=', // alignment (design)
            ymPageChanged  : '&', // method to call when the page is changed
            ymNbrPageShown : '=', // nbr of page number to show
            ymCurrentPage  : '='  // current page
        },
        controller   : PaginationController,
        controllerAs : 'controller',
        template     : [
            '<md-button class="md-icon-button md-raised md-warn" aria-label="First" ng-hide="pageArray().shift() == 1" ng-click="gotoFirst()"><i class="material-icons">first_page</i></md-button>',
            '<md-button class="md-icon-button md-raised md-primary" aria-label="Previous" ng-click="gotoPrev()" ng-show="ymCurrentPage > 1"><i class="material-icons">navigate_before</i></md-button>',
            '<md-button class="md-icon-button md-raised" aria-label="Go to page {{ i }}" ng-repeat="i in pageArray()" ng-click="goto(i)" ng-class="{\'md-primary\': i == ymCurrentPage}"> {{ i }} </md-button>',
            '<md-button class="md-icon-button md-raised md-primary" aria-label="Next" ng-click="gotoNext()" ng-show="ymCurrentPage < ymPages"><i class="material-icons">navigate_next</i></md-button>',
            '<md-button class="md-icon-button md-raised md-warn" aria-label="Last" ng-click="gotoLast()" ng-hide="pageArray().pop() == ymPages"><i class="material-icons">last_page</i></md-button>',
        ].join('')
    };
}

PaginationController.$inject = [ '$scope' ];
function PaginationController($scope) {
    
    /**
     * Custom function to create an array of page number
     */
    $scope.pageArray = function () {
        var nbr = parseInt($scope.ymNbrPageShown);
        
        return _.intersection(
            _.range(Math.max($scope.ymCurrentPage - nbr, 1), $scope.ymCurrentPage + (nbr + 2)),
            _.range($scope.ymCurrentPage - (nbr + 1), Math.min(parseInt($scope.ymPages) + 1, parseInt($scope.ymCurrentPage) + (nbr + 1)))
        );
    };
    
    /**
     * Change to page X
     * @param page
     */
    $scope.goto = function (page) {
        $scope.ymCurrentPage = page;
    };
    
    /**
     * Go to previous page
     */
    $scope.gotoPrev = function () {
        $scope.ymCurrentPage--;
    };
    
    /**
     * Go to next page
     */
    $scope.gotoNext = function () {
        $scope.ymCurrentPage++;
    };
    
    /**
     * Go to first page
     */
    $scope.gotoFirst = function () {
        $scope.ymCurrentPage = 1;
    };
    
    /**
     * Go to last page
     */
    $scope.gotoLast = function () {
        $scope.ymCurrentPage = $scope.ymPages;
    };
    
    /**
     * Watch current page
     */
    $scope.$watch('ymCurrentPage', function () {
        $scope.ymPageChanged();
    });
}