require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass', 'index/custom/Portfolio',
            'index/custom/showhideText', 'resizeFunc' ],
                        function ($, t, tc, mediaQueryClass, Portfolio, shtext, resizeF) {
    resizeF(0);

    $( function () {

        let portfolioController = new Portfolio($('.portfolio_container_block'));
        portfolioController.start();

        shtext($('.portfolio_intro_desc_text_show_hide'));

    });

});