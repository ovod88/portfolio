'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['globals', 'jquery'], function (global, $) {

    var arrowLeft = void 0,
        arrowRight = void 0,
        isAnimated = false,
        targetClass = void 0,
        target = void 0;

    function updateListeners() {
        arrowLeft = $('.' + targetClass + '_arrowLeft');
        arrowRight = $('.' + targetClass + '_arrowRight');
        arrowLeft.off();
        arrowRight.off();
        arrowLeft.on("click", function (e) {
            moveLeft(e, $(target));
        });
        arrowRight.on("click", function (e) {
            moveRight(e, $(target));
        });
    }

    function reorderDivs(target) {
        target.parent().find('.how_it_works__picture_block--third').insertAfter(target.parent().children(':last-child'));
        target.parent().find('.how_it_works__picture_block--first').insertBefore(target.parent().children(':first-child'));
    }

    function moveLeft(e, target) {
        var $firstDiv = target.parent().children(':first-child');
        e.preventDefault();
        if (!isAnimated) {
            isAnimated = true;

            $firstDiv.clone().appendTo(target.parent()).css('width', 0);
            $firstDiv.animate({
                width: 0
            }, {
                duration: global.sliderScrollSpeed,
                queue: false,
                complete: function complete() {
                    $(this).remove();
                    isAnimated = false;
                    updateListeners();
                }
            });

            target.parent().children(':last-child').animate({
                width: $firstDiv.width() / $firstDiv.parent().width() * 100 + '%'
            }, {
                duration: global.sliderScrollSpeed,
                queue: false
            });
        }
    }

    function moveRight(e, target) {
        var $lastDiv = target.parent().children(':last-child');
        e.preventDefault();
        if (!isAnimated) {
            isAnimated = true;

            $lastDiv.clone().prependTo(target.parent()).css('width', 0);
            $lastDiv.animate({
                width: 0
            }, {
                duration: global.sliderScrollSpeed,
                queue: false,
                complete: function complete() {
                    $(this).remove();
                    isAnimated = false;
                    updateListeners();
                }
            });

            target.parent().children(':first-child').animate({
                width: $lastDiv.width() / $lastDiv.parent().width() * 100 + '%'
            }, {
                duration: global.sliderScrollSpeed,
                queue: false
            });
        }
    }

    var Slider = function () {
        function Slider(targetBox) {
            _classCallCheck(this, Slider);

            target = targetBox;
        }

        _createClass(Slider, [{
            key: 'start',
            value: function start() {
                targetClass = $(target).attr('class').split(' ')[0];
                $(target).append('<a href=\'#\' class=\'' + targetClass + '_arrowLeft\' />');
                $(target).append('<a href=\'#\' class=\'' + targetClass + '_arrowRight\' />');
                updateListeners();
            }
        }, {
            key: 'remove',
            value: function remove() {
                reorderDivs($(target));
                $(target).parent().children().removeAttr('style');
                arrowLeft.off();
                arrowRight.off();
                arrowLeft.remove();
                arrowRight.remove();
            }
        }]);

        return Slider;
    }();

    return Slider;
});