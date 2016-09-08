(function ($) {
    $.fn.maskedTextPassword = function (arg) {

        var splittedPassword = [];
        var element = $(this);
        var callback;
        checkArguments();

        element.on('keypress', function (e) {
            var key = (!!e.key) ? e.key : String.fromCharCode(e.keyCode);
            var passwordInput = $this.get(0);
            if (key.length === 1) {
                e.preventDefault();
                if (passwordInput.selectionStart != passwordInput.selectionEnd) {
                    splittedPassword.splice(passwordInput.selectionStart, passwordInput.selectionEnd);
                }
                splittedPassword[getCursorPosition(passwordInput)] = key;
                mask(splittedPassword.length);
                applyCallback();
            }
        });

        element.on('paste', function (e) {
            e.preventDefault();
            var pastedText = e.originalEvent.clipboardData.getData('text');
            splittedPassword = pastedText.split("");
            mask(splittedPassword.length);
            applyCallback();
        });

        element.on('focus', function () {
            clear();
        });

        element.on('keydown', function (e) {
            if (e.keyCode === 8) {
                clear();
            }
            /*else if (e.keyCode === 13) {
                parentForm.submit();
            }*/
        });


        function bindOnSubmit(){
            element.closest('form').on('submit', function () {
                var targetId = "#" + arg;
                var hiddenPasswordInput = $(targetId);
                if (!hiddenPasswordInput.length) {
                    $(this).append('<input type="hidden" name="' + arg + '" id="' + arg + '" />');
                }
                hiddenPasswordInput = $(targetId);
                hiddenPasswordInput.val(splittedPassword.join(""));
            });
        }

        function checkArguments(){
            if(typeof arg === 'function'){
                callback = arg;
            }else{
                bindOnSubmit();
            }
        }

        function clear() {
            element.val('');
            splittedPassword = [];
            applyCallback();
        }

        function applyCallback() {
            if (!!callback) {
                callback.apply(this, [splittedPassword.join("")]);
            }
        }

        function mask(length) {
            element.val(new Array(length).map(function () {
                return "*";
            }).join(""));
        }

        function getCursorPosition(input) {
            if ('selectionStart' in input) {
                return input.selectionStart;
            } else if (document.selection) {
                input.focus();
                var s = document.selection.createRange();
                var sL = document.selection.createRange().text.length;
                s.moveStart('character', -input.value.length);
                return s.text.length - sL;
            }
        }

    }
})(jQuery);