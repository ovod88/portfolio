requirejs.config ({
    baseUrl     : '../js',
    waitSeconds : 200,
    paths       : {
        "jquery"      : "bower_components/jquery/dist/jquery",
        "testcommon"  : "commonCustom/testcommon",
        "test"        : "index/custom/test"
    }
});

require( [ 'jquery', 'test', 'testcommon' ], function ($, t, tc) {

    $( function () {

        for( let i = 5; i > 0; i-- ) {

            $('.portfolio').fadeToggle('slow');

        }

    })

});
