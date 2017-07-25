define([ 'testcommon', 'index/custom/test' ], function (common, indexCustom) {

    describe('General tests',  function () {

        it('Check if common returns object', function () {

            expect(common.commonDependancy).toBe(true);

        });

        it('Check if index custom returns object', function () {

            expect(indexCustom.indexCustom).toBe(true);

        });

    });

});