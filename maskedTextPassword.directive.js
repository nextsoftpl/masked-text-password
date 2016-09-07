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


(function ($) {
    $.fn.maskedTextPassword = function (tN) {

        var h = [];
        var $this = $(this);

        $(this).on('keypress', function (e) {
            e.preventDefault();
            var key = (!!e.key) ? e.key : String.fromCharCode(e.keyCode);
            var p = e.target;
            if (p.selectionStart != p.selectionEnd) {
                h.splice(p.selectionStart, p.selectionEnd);
            }
            if (/[a-zA-Z0-9-_ ]/.test(key)) {
                h[getCursorPosition(p)] = key;
                createFinalValue(h.length, p);
            }

        });

        $(this).on('focus', function () {
            $this.val('');
            h = [];
        });

        $(this).on('keydown', function (e) {
            var keyCode = e.keyCode;
            var p = e.target;
            if (keyCode === 8) {
                if (!!p.selectionStart) {
                    h.splice(p.selectionStart - 1, p.selectionEnd - p.selectionStart);
                } else {
                    h.splice(getCursorPosition(p) - 1, 1);
                }
                console.log(h.length);
                createFinalValue(h.length, p);
            }

        });

        $(this).closest('form').on('submit', function (e) {
            var ph = $("#" + tN);
            if (!ph.length) {
                $(this).append('<input type="hidden" name="' + tN + '" id="' + tN + '" />');
            }
            ph = $("#" + tN);
            ph.val(h.join(""));
        });

        function createFinalValue(length, p) {
            var arr = [];
            for (var i = 0; i < length; i++) {
                arr[i] = "*";
            }
            p.value = arr.join("");
        }

        function getCursorPosition(i) {
            if (!i) return;
            if ('selectionStart' in i) {
                return i.selectionStart;
            } else if (document.selection) {
                i.focus();
                var s = document.selection.createRange();
                var sL = document.selection.createRange().text.length;
                s.moveStart('character', -i.value.length);
                return s.text.length - sL;
            }
        }

    }
})(jQuery);