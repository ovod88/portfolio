require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass', 'index/custom/Portfolio' ],
                        function ($, t, tc, mediaQueryClass, Portfolio ) {

    $( function () {

        $('.portfolio_list_slider').eq(0).addClass('portfolio_list_slider--active');

        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

        let portfolioController = new Portfolio($('.portfolio_container_block'));

    });

});