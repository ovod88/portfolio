define([], function () {

    console.log('Common custom script connected ....');

    return {
        commonDependancy : true,
        functionToTest   : function (a, b) {

            return a - b;

        }
    }

});