$(function() {
    var clock = new Clock(
        {
            seconds: $('#second_arrow'),
            minutes: $('#minute_arrow'),
            hours: $('#hour_arrow')
        }
    );

    $('button').click(function () {
        clock.toggle();
        if(clock.isRunning()) {
            $(this).html('Stop');
        } else {
            $(this).html('Start');
        }
    })
});
