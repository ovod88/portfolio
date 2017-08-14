define([ 'jquery', 'Modernizr', 'sassToJs' ], function ( $, Modernizr, sassToJs ) {

    function normilizeBreakpoint (breakpoint) {

        let keyWords = [ 'min-width', 'max-width' ],
            regExp = /^(\d+..)(\d+..)$/g,
            result = '',
            matched = false;

        for( let key in keyWords) {

            let re = new RegExp(keyWords[key]);

            if (re.test(breakpoint) && !matched) {

                result = breakpoint.replace(re, keyWords[key] + ': ');
                matched = true;

            }

        }

        if ( regExp.test(breakpoint) && !matched) {

            result = breakpoint.replace(regExp,
                                `(min-width: $1) and (max-width: $2)`);

        }

        return result;

    }

    function removeBreakpointClasses (root, keys) {

        for(let i = 0; i < keys.length; i++) {

            root.classList.remove(keys[i]);

        }

    }

    return function () {

        let breakpointEl = $('.breakpoints'),
            breakpointsData = sassToJs(breakpointEl[0]),
            breakpoints = breakpointsData.breakpoints,
            root = document.getElementsByTagName( 'html' )[0],
            keys = Object.keys(breakpoints);

        removeBreakpointClasses(root, keys);
        keys.forEach(function (key) {

            if (Modernizr.mq(normilizeBreakpoint(breakpoints[key]))) {

                root.classList.add(key);

            }

        });

    };

});