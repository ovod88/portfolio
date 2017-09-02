$.fn.rotate = function(options) {
    var $this = $(this),
        settings = $.extend({
        startDeg: false,
        endDeg: 360,
        duration: 1,
        animate: {},
        easing: 'linear'
    }, options),
        prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];

    function supports(prop) {
        var isSupport=false,
            style=document.createElement('div').style;

        $.each(prefixes, function(i, prefix) {
            if (style[prefix.replace(/\-/g, '')+prop]==='') {
                isSupport=true;
            }
        });
        return isSupport;
    }

    supports.transform = supports('Transform');
    supports.transition = supports('Transition');

    function prefixed(prop, value) {
        var css={};
        if (!supports.transform) {
            return css;
        }
        $.each(prefixes, function(i, prefix) {
            css[prefix.toLowerCase()+prop]=value || '';
        });
        return css;
    }

    if(supports.transform) {
        if (settings.startDeg===false) {
            settings.startDeg=$this.data('rotated') || 0;
        }
        settings.animate.perc=100;

        if(settings.endDeg == 0 && settings.startDeg != 0) {
            settings.startDeg -= 360;
        }

        $this.animate(settings.animate, {
            duration: settings.duration*400,
            easing: settings.easing,
            step: function(perc, fx) {
                var deg;
                if (fx.prop==='perc') {
                    deg=settings.startDeg+(settings.endDeg-settings.startDeg)*perc/100;
                    $this.css(prefixed('transform', 'rotate('+deg+'deg)'));
                }
            },
            complete: function() {
                $this.css('perc', 0).data('rotated', settings.endDeg);
            }
        });
    }

    return $this;
};