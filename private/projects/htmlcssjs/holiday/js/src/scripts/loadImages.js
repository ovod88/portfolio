define(['globals' , 'Modernizr', 'jquery', 'lodash', 'masonry'], function(globals, Modernizr, $, _, initMasonry) {
    Modernizr.addTest('retina', function() {
        // starts with default value for modern browsers
        var dpr = window.devicePixelRatio ||

                // fallback for IE
            (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

                // default value
            1;

        return !!(dpr > 1);
    });

    let template = _.template($('#discover_holiday_block_template').html()),
        discoverHolidayBlocks = $('.discover_holiday_blocks'),
        atLeastOnePictureLoaded = true,
        $errormessage = $('.discover_holiday_search_box__link__error'),
        activeRequests = 0;

    function initialLoad(categories) {

        for(let i = 0; i < categories.length; i++) {
            for(let category in categories[i]) {
                activeRequests++;
                $.ajax({
                        url: `https://pixabay.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=${ globals.imageNumbers }`,
                        dataType: 'json'
                    })
                    .then(function (data) {
                            if (data.hits.length) {
                                $(template({
                                    id: i,
                                    category: category,
                                    text: categories[i][category]
                                })).appendTo(discoverHolidayBlocks)
                                    .css('display', 'block')
                                    .find('.discover_holiday_block_content')
                                    .css({
                                        'background': `url(${data.hits[Math.floor((Math.random() * data.hits.length))].webformatURL})
                                                                                                                        no-repeat center center`,
                                        'background-size': 'cover'
                                    });
                            }
                            syncMasonry(--activeRequests, 'init');
                        },
                        function () {
                            switch (category) {
                                case 'sport':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Sport_and_avctivity_pic@2x.jpg)' :
                                                'url(img/dist/Sport_and_avctivity_pic.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'health':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Welness_and_health_pic@2x.jpg)' :
                                                                'url(img/dist/Welness_and_health_pic.jpg)') +
                                                                    ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'extreme':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Extreme_sports_expeditions_pic@2x.jpg)' :
                                                'url(img/dist/Extreme_sports_expeditions_pic.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'games':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Games_pic@2x.jpg)' :
                                                'url(img/dist/Games_pic.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'culture':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Culture_education_pic@2x.jpg)' :
                                                'url(img/dist/Culture_education_pic.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'relaxation':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Relaxation@2x.jpg)' :
                                                'url(img/dist/Relaxation.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                case 'travelling':
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': (Modernizr.retina ? 'url(img/dist/Travelling@2x.jpg)' :
                                                'url(img/dist/Travelling.jpg)') +
                                            ' no-repeat center center',
                                            'background-size': 'cover'
                                        });
                                    break;
                                default:
                                    $(template({
                                        id: i,
                                        category: category,
                                        text: categories[i][category]
                                    })).appendTo(discoverHolidayBlocks)
                                        .css('display', 'block')
                                        .find('.discover_holiday_block_content')
                                        .css({
                                            'background': 'grey'
                                        });
                                    break;
                            }
                            syncMasonry(--activeRequests, 'init');
                        });
            }
        }
    }

    function loadPartner(category) {
        activeRequests++;
        $.ajax({
                url: `https://pixabay.com/api/?key=4214596-4796665cc8384e50741647005&q=${category}
                                                                                &image_type=photo&per_page=${ globals.maxImagesNumber }`,
                dataType: 'json'
            })
            .then(function (data) {
                    if (data.hits.length) {
                        $errormessage.hide('slow');
                        if (atLeastOnePictureLoaded) {
                            syncMasonry(null, 'destroy');
                            $('.discover_holiday_block').remove();
                            atLeastOnePictureLoaded = false;
                        }
                        for(let i = 0; i < data.hits.length; i++) {
                            $(template({
                                id: i,
                                category: category,
                                text: category
                            })).appendTo(discoverHolidayBlocks)
                                .css('display', 'block')
                                .find($('.discover_holiday_block_content'))
                                .css({
                                    'background': `url(${data.hits[i].webformatURL}) no-repeat center center`,
                                    'background-size': 'cover'
                                });
                        }
                        syncMasonry(--activeRequests, 'init');
                    } else {
                        $errormessage.text('Unfortunately - no partners for your request');
                        $errormessage.show('slow');
                        activeRequests--;
                    }
                },
                function () {
                    $errormessage.text('Error accessing server');
                    $errormessage.show('slow');
                });
    }

    function syncMasonry(activeSessions, option) {
        if(activeSessions != null) {
            if (!activeSessions) {
                atLeastOnePictureLoaded = true;
                initMasonry(option);
            }
        } else {
            initMasonry(option);
        }
    }

    return function (categories) {
        if(Array.isArray(categories)) {
            initialLoad(categories);
        } else {
            loadPartner(categories);
        }
    }
});
