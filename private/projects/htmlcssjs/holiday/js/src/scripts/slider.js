define(['globals', 'jquery'], function(global, $) {

    let arrowLeft, arrowRight, isAnimated = false, targetClass, target;

    function updateListeners() {
        arrowLeft = $(`.${targetClass}_arrowLeft`);
        arrowRight = $(`.${targetClass}_arrowRight`);
        arrowLeft.off();
        arrowRight.off();
        arrowLeft.on("click", function(e) {
            moveLeft(e, $(target));
        });
        arrowRight.on("click", function(e) {
            moveRight(e, $(target));
        });
    }

    function reorderDivs(target) {
        target.parent().find('.how_it_works__picture_block--third').insertAfter(target.parent().children(':last-child'));
        target.parent().find('.how_it_works__picture_block--first').insertBefore(target.parent().children(':first-child'));
    }

    function moveLeft(e, target) {
        let $firstDiv = target.parent().children(':first-child');
        e.preventDefault();
        if(!isAnimated) {
            isAnimated = true;

            $firstDiv.clone().appendTo(target.parent()).css('width', 0);
            $firstDiv.animate(
                    {
                        width : 0
                    },
                    {
                        duration: global.sliderScrollSpeed,
                        queue: false,
                        complete: function () {
                        $(this).remove();
                        isAnimated = false;
                        updateListeners();
                    }
                }
            );

            target.parent().children(':last-child').animate({
                    width: $firstDiv.width() / $firstDiv.parent().width() * 100 + '%'
                },
                {
                    duration: global.sliderScrollSpeed,
                    queue: false
                });
        }
    }

    function moveRight(e, target) {
        let $lastDiv = target.parent().children(':last-child');
        e.preventDefault();
        if(!isAnimated) {
            isAnimated = true;

            $lastDiv.clone().prependTo(target.parent()).css('width', 0);
            $lastDiv.animate(
                {
                    width : 0
                },
                {
                    duration: global.sliderScrollSpeed,
                    queue: false,
                    complete: function () {
                        $(this).remove();
                        isAnimated = false;
                        updateListeners();
                    }
                }
            );

            target.parent().children(':first-child').animate({
                    width: $lastDiv.width()/ $lastDiv.parent().width() * 100 + '%'
                },
                {
                    duration: global.sliderScrollSpeed,
                    queue: false
                });
        }
    }

    class Slider {
        constructor(targetBox) {
            target = targetBox;
        }

        start() {
            targetClass = $(target).attr('class').split(' ')[0];
            $(target).append(`<a href='#' class='${targetClass}_arrowLeft' />`);
            $(target).append(`<a href='#' class='${targetClass}_arrowRight' />`);
            updateListeners();
        }

        remove() {
            reorderDivs($(target));
            $(target).parent().children().removeAttr('style');
            arrowLeft.off();
            arrowRight.off();
            arrowLeft.remove();
            arrowRight.remove();
        }
    }

    return Slider;
});
