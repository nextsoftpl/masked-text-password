(function(window, angular){
    'use strict';
    angular.module('nextsoft-directives', []).directive('maskedTextPassword', maskedTextPassword);
    function maskedTextPassword(){
        return {
            restrict: 'A',
            scope: {
                targetName: '=',
                beforeSubmit: '&'
            },
            link: function (scope, element, attrs) {
                console.log(attrs);



                element.maskedTextPassword(attrs.targetName, function(newValue){
                    console.log('callback', newValue);
                    attrs.beforeSubmit(newValue);
                    //ngModelCtrl.$setViewValue(picker.getDate());
                });

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

})(window, window.angular);