angular.module('nutritionix.dialog.quantity', [ QuantityDialog ]);

QuantityDialog.$inject = [ '$mdDialogProvider' ];
function QuantityDialog($mdDialogProvider) {
    $mdDialogProvider.addPreset('quantityDialog', {
        options : function () {
            return {
                template            : '',
                controller          : QuantityDialogController,
                templateUrl         : 'app/components/dialogs/quantity.tmpl.html',
                bindToController    : true,
                clickOutsideToClose : true,
                escapeToClose       : true,
                parent              : angular.element(document.body)
            };
        }
    });
}

QuantityDialogController.$inject = [ '$scope', '$mdDialog', 'item' ];
function QuantityDialogController($scope, $mdDialog, item) {
    $scope.item     = item;
    $scope.quantity = item.quantity || 1;
    $scope.hide     = $mdDialog.cancel;
    $scope.cancel   = $mdDialog.cancel;
    $scope.answer   = function () {
        $mdDialog.hide($scope.quantity);
    };
}
