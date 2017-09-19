define([ 'jquery', 'jqueryeasing' ], function ($, $e) {

    class Portfolio {
        constructor(catLinks) {

            this.catLinks = catLinks;
            this.catLinksVisible = this.catLinks.filter(':visible');
            this.arrow = this.catLinks.filter('.arrow');
            this.parent = catLinks.parent();

        }

        clear() {

            this.catLinks.remove();

        }

        hideAll() {

            this.catLinks.css('display', 'none');

        }

        goDown(el) {

            let href = el.find('a').attr('href');
            this.hideAll();
            this.arrow.show();
            this.catLinks.find('a[href*="' + href + '/"]').parent().fadeIn(1000, 'easeInOutExpo');

        }

        goUp() {

            this.hideAll();
            this.catLinksVisible.show();

        }

        start() {
            let that = this;

            this.arrow.on('click', function (event) {

                event.preventDefault();
                that.goUp();

            });

            this.catLinksVisible.on('click', function (event) {

                event.preventDefault();
                that.goDown($(this));

            });

        }
    }

    return Portfolio;

});