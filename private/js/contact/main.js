require( [ 'jquery', 'resizeFunc' ], function ($, resizeF) {

    resizeF(3);

    $('.contact_hire_form_submit').on('click', function (e) {
            let form = $('.contact_hire_form').serialize(),
                $preload = $('.preload'),
                $email_result_message = $('.email_result_message'),
                $email_result = $('.email_result'),
                $email_result_cover = $('.email_result_cover'),
                $email_result_button = $('.email_result_button');

            e.preventDefault();

            $preload.delay(200).show();

            $.ajax({
                url      : "/contact/hire",
                method   : "POST",
                data     : form,
                dataType : "text"
            }).then(function(msg){
                $preload.hide(100,function() {
                    $email_result_cover.show();
                    $email_result_message.text(msg);
                    $email_result_button.one('click', function() {
                        $email_result_cover.hide();
                    });
                });
            },
            function(error) {
                alert(error);
            });

        });

});