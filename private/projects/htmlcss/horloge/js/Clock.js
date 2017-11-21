function Clock(arrows) {
    var SECDEGREE = 6,
        MINDEGREE = 6,
        HOURDEGREE = 30,
        isRunning = false,
        currentTime,
        interval,
        seconds,
        minutes,
        hours;

    function toggle() {
        if(isRunning) {
            stop();
        } else {
            start();
        }
    }

    function ifIsRunning() {
        return isRunning;
    }
    function start() {
        var currentDate = new Date();

        isRunning = true;
        currentTime = Date.now();
        if(!seconds) {
            seconds = currentDate.getSeconds();
        }
        if(!minutes) {
            minutes = currentDate.getMinutes();
        }
        if(!hours) {
            hours = currentDate.getHours();
        }

        setArrows();
        interval = setTimeout(update, 1000);
    }

    function setArrows() {
        arrows.seconds.rotate({
            endDeg: seconds * SECDEGREE,
            easing: 'easeInOutElastic'
        });
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if(minutes == 60) {
            minutes = 0;
            hours++;
        }

        arrows.minutes.rotate({endDeg: minutes * MINDEGREE + (seconds/60) * MINDEGREE});

        if( hours > 12) {
            hours -= 12;
        }
        arrows.hours.rotate({endDeg: hours * HOURDEGREE + (minutes/60) * HOURDEGREE});
    }

    function stop() {
        isRunning = false;
        seconds = minutes = hours = 0;
        clearTimeout(interval);
    }

    function update() {
        setArrows();
        interval = setTimeout(update, 1000);
    }

    return {
        toggle: toggle,
        isRunning: ifIsRunning
    }
}
