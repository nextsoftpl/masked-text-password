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
                console.log(attrs);
                element.maskedTextPassword(attrs.targetName, function (newValue) {
                    scope.beforeSubmit(newValue);
                });
            }
        };
    }

})(window, window.angular);