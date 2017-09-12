define([ 'jquery', 'mediaQueryClass' ], function ( $, mediaQueryClass ) {
    return function(linknum) {

        $( function () {

            $('.portfolio_list_slider').eq(linknum).addClass('portfolio_list_slider--active');

            $(window).resize(function () {

                mediaQueryClass();

            });
            mediaQueryClass();

        });

    };

});