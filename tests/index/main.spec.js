define([ 'testcommon', 'index/custom/test', 'index/main' ], function (common, indexCustom) {

    describe('General tests',  function () {

        it('Check if common returns object', function () {

            expect(common.commonDependancy).toBe(true);

        });

        it('Check if index custom returns object', function () {

            expect(indexCustom.indexCustom).toBe(true);

        });

        xit('Check if main has sum function', function () {
            console.log(main);
            expect(sum(1, 2)).toBe(3);

        });

    });

});