define(['jquery'], function ($) {

    function showhideText(els) {

        let timeout = 3,
            l = els.length,
            i = 0;

        els.hide();

        function go () {

            els.eq(i % l).fadeIn(1000, function () {

                els.eq(i % l).delay(timeout * 1000).fadeOut(1000, go);
                i++;

            });

        }

        go();

    }

    return showhideText;

});