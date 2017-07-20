require( [ 'jquery', 'index/custom/test', 'testcommon' ], function ($, t, tc) {

    $( function () {

        for( let i = 6; i > 0; i-- ) {

            $('.portfolio').fadeToggle('slow');

        }

        function sum (a, b) {

            return a + b;

        }

    })

});
