require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass' ], function ($, t, tc, mediaQueryClass) {

    $( function () {

        $('.portfolio_list_slider').eq(2).addClass('portfolio_list_slider--active');

        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

    });

});