require( [ 'jquery', 'index/custom/test', 'testcommon', 'mediaQueryClass' ], function ($, t, tc, mediaQueryClass) {

    $( function () {
        $(window).resize(function () {

            mediaQueryClass();

        });
        mediaQueryClass();

    });

});