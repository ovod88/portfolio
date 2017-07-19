// requirejs.config ({
//     baseUrl     : '../js',
//     waitSeconds : 200,
//     paths       : {
//         "jquery"      : "bower_components/jquery/dist/jquery",
//         "lodash"      : "bower_components/lodash/dist/lodash",
//         "test"        : "index/custom/test",
//         "testcommon"  : "commonCustom/testcommon"
//     }
// });

requirejs([ '../commonCustom/requirejs.config' ], function () {


    require( [ 'jquery', '../index/custom/test', 'testcommon' ], function ($, t, tc) {

        $( function () {

            for( let i = 5; i > 0; i-- ) {

                $('.portfolio').fadeToggle('slow');

            }

        })

    });

})