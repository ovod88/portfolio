requirejs.config ({
    baseUrl     : '../js',
    waitSeconds : 200,
    paths       : {
            'jquery' : 'bower_components/jquery/dist/jquery',
            'lodash' : 'index/libs/lodash'
    }
});

require( [ 'jquery', 'lodash' ], function ($, _) {

    $( function () {

        for( let i = 5; i > 0; i-- ) {

            $('.portfolio').fadeToggle('slow');

        }

    })

});