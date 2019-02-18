angular.module('nutritionix.dialog.info', [ InfoDialog ]);

InfoDialog.$inject = [ '$mdDialogProvider' ];
function InfoDialog($mdDialogProvider) {
    $mdDialogProvider.addPreset('infoDialog', {
        options : function () {
            return {
                template            : '',
                controller          : InfoDialogController,
                templateUrl         : 'app/components/dialogs/itemInfo.tmpl.html',
                bindToController    : true,
                clickOutsideToClose : true,
                escapeToClose       : true,
                parent              : angular.element(document.body)
            };
        }
    });
}

InfoDialogController.$inject = [ '$scope', '$mdDialog', 'item', 'PantryService' ];
function InfoDialogController($scope, $mdDialog, item, PantryService) {
    $scope.item   = item;
    $scope.hide   = $mdDialog.cancel;
    $scope.add    = function (ev) {
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
    $scope.cancel = $mdDialog.cancel;
    $scope.answer = $mdDialog.cancel;
}
