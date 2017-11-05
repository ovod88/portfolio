define([ 'jquery'], function ( $ ) {
    return function () {

        $( window ).on( "load", function () {

            $('.preload').css('display', 'none');

        });

    };

});