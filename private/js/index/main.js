require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass' ], function ($, t, tc, mediaQueryClass) {

    $( function () {

        for( let i = 5; i > 0; i-- ) {

            $('.portfolio').fadeToggle('slow');

        }
        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

    });

});