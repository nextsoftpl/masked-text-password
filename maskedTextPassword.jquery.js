(function ($) {
    $.fn.maskedTextPassword = function (tN, cb) {

        var h = [];
        var $this = $(this);
        var parentForm = $(this).closest('form');

        $this.on('keypress', function (e) {
            console.log(e.keyCode);
            var key = (!!e.key) ? e.key : String.fromCharCode(e.keyCode);
            var p = e.target;
            if (key.length === 1) {
                e.preventDefault();
                if (p.selectionStart != p.selectionEnd) {
                    h.splice(p.selectionStart, p.selectionEnd);
                }
                h[getCursorPosition(p)] = key;
                mask(h.length);
                applyCallback();
            }
        });

        $this.on('paste', function (e) {
            e.preventDefault();
            var pastedText = e.originalEvent.clipboardData.getData('text');
            h = pastedText.split("");
            mask(h.length);
            applyCallback();
        });

        $this.on('focus', function () {
            clear();
        });

        $this.on('keydown', function (e) {
            if (e.keyCode === 8) {
                clear();
            }
            else if (e.keyCode === 13) {
                parentForm.submit();
            }
        });

        parentForm.on('submit', function (e) {
            var ph = $("#" + tN);
            if (!ph.length) {
                $(this).append('<input type="hidden" name="' + tN + '" id="' + tN + '" />');
            }
            ph = $("#" + tN);
            ph.val(h.join(""));
        });

        function clear() {
            $this.val('');
            h = [];
            applyCallback();
        }

        function applyCallback(){
            if (!!cb) {
                cb.apply(this, [h.join("")]);
            }
        }

        function mask(length) {
            var arr = [];
            for (var i = 0; i < length; i++) {
                arr[i] = "*";
            }
            $this.val(arr.join(""));
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