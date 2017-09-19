define([ 'jquery' ], function ($) {

    class Portfolio {
        constructor(catLinks) {

            this.catLinks = catLinks;
            this.parent = catLinks.parent();

        }

        clear() {

            this.catLinks.remove();

        }

        start() {
            let that = this;
            this.catLinks.on('click', function (event) {

                let $this = $(this);
                event.preventDefault();

            });

        }
    }

    return Portfolio;

});