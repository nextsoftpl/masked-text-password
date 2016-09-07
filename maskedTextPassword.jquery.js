(function ($) {
    $.fn.maskedTextPassword = function (tN, cb) {

        var h = [];
        var $this = $(this);

        $(this).on('keypress', function (e) {
            //e.preventDefault();
            var key = (!!e.key) ? e.key : String.fromCharCode(e.keyCode);
            var p = e.target;
            if (/[a-zA-Z0-9-_ ]/.test(key)) {
                console.log(key);
                if (p.selectionStart != p.selectionEnd) {
                    h.splice(p.selectionStart, p.selectionEnd);
                }
                h[getCursorPosition(p)] = key;
                createFinalValue(h.length, p);
                if (!!cb) {
                    cb.apply(this, [h.join("")]);
                }
            }
        });

        $(this).on('focus', function () {
            clear();
        });

        $(this).on('keydown', function (e) {
            if (e.keyCode === 8) {
                clear();
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

        function clear(){
            $this.val('');
            h = [];
            if (!!cb) {
                cb.apply(this, [h.join("")]);
            }
        }

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