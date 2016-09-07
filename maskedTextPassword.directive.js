(function(angular){
    'use strict';
    angular.module('nextsoft-directives', []).directive('maskedTextPassword', maskedTextPassword);
    function maskedTextPassword(){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                targetName: '='
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                console.log(attrs);
                var picker = element.maskedTextPassword();
                //ngModelCtrl.$setViewValue(picker.getDate());
                //model->view
                // ngModelCtrl.$render(function () {
                //     console.log('ngModelCtrl.$viewValue@' + ngModelCtrl.$viewValue);
                //     picker.setDate(ngModelCtrl.$viewValue || '');
                // });
                // picker.on('dp.change', function (e) {
                //     console.log('dp.change' + e.date);
                //     scope.$apply(function () {
                //         ngModelCtrl.$setViewValue(e.date);
                //     });
                // });
            }
        };
    }

})();