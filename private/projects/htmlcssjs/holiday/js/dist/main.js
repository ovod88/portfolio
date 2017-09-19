'use strict';

requirejs.config({
    baseUrl: 'bower_components',
    waitSeconds: 200,
    paths: {
        'jquery': 'jquery/dist/jquery',
        'lodash': '../js/dist/libs/lodash',
        'jquery.masonry': 'masonry/masonry', //TODO version 3 for IE8,
        'jquery.bridget': 'jquery-bridget/jquery-bridget',
        'Modernizr': '../js/dist/libs/modernizr-custom',
        'globals': '../js/dist/scripts/globals',
        'images': '../js/dist/scripts/loadImages',
        'slider': '../js/dist/scripts/slider',
        'masonry': '../js/dist/scripts/initMasonry'
    },
    shim: {
        'Modernizr': {
            exports: 'Modernizr'
        }
    }
});

require(['globals', 'jquery', 'images', 'slider'], function (globals, $, loadImages, Slider) {
    $(function () {
        //console.log(window.innerWidth);//TODO MINIMISE CSS
        var categories = [{ 'sport': 'Sport and Activity' }, { 'health': 'Wellness and Health' }, { 'extreme': 'Extreme Sports and Expeditions' }, { 'games': 'Games' }, { 'culture': 'Culture and Education' }, { 'relaxation': 'Relaxation' }, { 'travelling': 'Travelling' }],
            sliderLoaded = false,
            slider = void 0;

        loadImages(categories);

        $('.discover_holiday_search_box__link').on('click', function (e) {
            var $this = $('.discover_holiday_search_box__input');
            e.preventDefault();

            if ($this.val()) {
                loadImages($this.val());
            }
            $this.val('');
        });
        if (window.innerWidth > globals.sliderLoadMinWidth) {
            slider = new Slider('.how_it_works__picture_block');
            slider.start();
            sliderLoaded = true;
        }
        $(window).resize(function () {
            if (!sliderLoaded && window.innerWidth > globals.sliderLoadMinWidth) {
                slider = new Slider('.how_it_works__picture_block');
                slider.start();
                sliderLoaded = true;
            }
            if (sliderLoaded && window.innerWidth <= globals.sliderLoadMinWidth) {
                slider.remove();
                sliderLoaded = false;
                slider = {};
            }
        });
    });
});