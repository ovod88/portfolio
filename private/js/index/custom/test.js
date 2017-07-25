define([], function () {

    console.log('Custom script connected ....');

    return {
        indexCustom    : true,
        functionToTest : function (a, b) {

            return a * b;

        }
    }

});