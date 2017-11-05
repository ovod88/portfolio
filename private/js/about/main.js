require( [ 'jquery', 'resizeFunc', "hideHeadScreen" ], function ($, resizeF, hideScreen) {

    $( function () {

        resizeF(2);

    });

    hideScreen();

});