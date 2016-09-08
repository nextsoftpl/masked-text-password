(function (window, angular) {
    'use strict';
    angular.module('nextsoft-directives', []).directive('maskedTextPassword', maskedTextPassword);
    function maskedTextPassword() {
        return {
            restrict: 'A',
            scope: {
                targetName: '=',
                beforeSubmit: '='
            },
            link: function (scope, element, attrs) {
                element.maskedTextPassword(function (newValue) {
                    scope.beforeSubmit(newValue);
                });
            }
        };
    }

})(window, window.angular);