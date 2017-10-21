require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass', 'index/custom/Portfolio',
            'index/custom/showhideText' ],
                        function ($, t, tc, mediaQueryClass, Portfolio, shtext ) {

    $( function () {

        $('.portfolio_list_slider').eq(0).addClass('portfolio_list_slider--active');

        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

        let portfolioController = new Portfolio($('.portfolio_container_block'));
        portfolioController.start();

        shtext($('.portfolio_intro_desc_text_show_hide'));

    });

});