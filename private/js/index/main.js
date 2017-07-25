require( [ 'jquery', 'index/custom/test', 'testcommon' ], function ($, t, tc) {

    $( function () {

        for( let i = 5; i > 0; i-- ) {

            $('.portfolio').fadeToggle('slow');

        }

    })

});
