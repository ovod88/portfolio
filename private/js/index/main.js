require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass' ], function ($, t, tc, mediaQueryClass) {

    $( function () {

        console.log($('.portfolio_list_slider').eq(0));
        $('.portfolio_list_slider').eq(0).addClass('portfolio_list_slider--active');

        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

    });

});