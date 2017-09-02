function VirtualClavier(input, box, language) {
    var isCapslockOn = false;
    var isShiftOn = false;

    var content = {
        'name': 'Екранна клавіатура',
        'line_first' : ["'", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
        'line1_first_alt' : ["₴", '!', '"', '№',';', '%', ':', '?', '*', '(', ')', '_', '+']

    };

    switch(language) {
        case 'uk':
            content['second_line'] = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', 'ґ'];
            content['third_line'] = ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'];
            content['fourth_line'] = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'];
            break;
    }

    this.init = function() {
        $('body').append(_.template($('#clavier_template').html()) (content));
        $('<link rel="stylesheet" href="css/vClavier.css" type="text/css" />').insertAfter($('link'));

        launchHandlers();
    };

    function launchHandlers() {
        $('.vClavier-line').click(function(event) {
            event.stopPropagation();
            var $this = $(event.target).is('li') ? $(event.target) : $(event.target).parent(), character;

            $this.mousedown(function() {
                $this.css('border', '1px inset #aaa');
            }).mouseup(function() {
                $this.css('border', '1px solid #aaa');
            });
            if($this.is('li.letter') && box.hasClass('highlighted')) {
                character = $.trim($this.html());
                input.val( input.val() + character );
            }
            if($this.is('li.capslock')) {
                if(!isCapslockOn) {
                    $this.css('border', '1px inset #aaa');
                    isCapslockOn = true;
                    $this.parents('.vClavier').find('li.letter').each(function() {
                        $(this).text($(this).text().toUpperCase());
                    });
                } else {
                    $this.css('border', '1px solid #aaa');
                    $this.parents('.vClavier').find('li.letter').each(function() {
                        $(this).text($(this).text().toLowerCase());
                    });
                    isCapslockOn = false;
                }
            }
            if($this.is('li.shift')) {
                if(!isShiftOn) {
                    $this.css('border', '1px inset #aaa');
                    isShiftOn = true;
                    $this.parents('.vClavier').find('li.letter').each(function() {
                        $(this).text($(this).text().toUpperCase());
                    });
                    $(this).parents('.vClavier')
                        .find('.vClavier-line')
                        .eq(1).find('li.letter')
                        .each(function(index) {
                            $(this).html(content['line1_first_alt'][index]);
                        });
                } else {
                    $this.css('border', '1px solid #aaa');
                    $this.parents('.vClavier').find('li.letter').each(function() {
                        $(this).text($(this).text().toLowerCase());
                    });
                    isShiftOn = false;
                    $(this).parents('.vClavier')
                        .find('.vClavier-line')
                        .eq(1).find('li.letter')
                        .each(function(index) {
                            $(this).html(content['line_first'][index]);
                        });
                }
            }
            if($this.is('.space')) {
                input.val( input.val() + ' ' );
            }

            if($this.is('.backline')) {
                input.val(input.val().substr(0, input.val().length - 1));
            }
        });

        $('.vClavier-closebutton').click(function() {
            $(this).parents('.vClavier').remove();
        });

        $('.vClavier-lines--header').hover(function() {
            $(this).parents('.vClavier').draggable(
                {containment: 'window'}
            );
        });
    }
}