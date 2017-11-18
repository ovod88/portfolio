require( [ 'jquery', 'resizeFunc', 'contact/custom/formChecker' ], function ($, resizeF, formChecker) {

    resizeF(3);

    $('.contact_hire_form_submit').on('click', function (e) {
            let $form = $('.contact_hire_form'),
                formData = $form.serialize(),
                $preload = $('.preload'),
                $email_result_message = $('.email_result_message'),
                $email_result = $('.email_result'),
                $email_result_cover = $('.email_result_cover'),
                $email_result_button = $('.email_result_button'),
                formCheck = new formChecker($form);

            e.preventDefault();

            if (formCheck.ifVerified()) {

                $preload.delay(200).show();
                $.ajax({
                    url      : "/contact/hire",
                    method   : "POST",
                    data     : formData,
                    dataType : "text"
                }).then(function (msg){

                    showHideEmailBlock(msg);

                },
                function (error) {

                    showHideEmailBlock(error);

                });

            }

            function showHideEmailBlock (msg) {

                $preload.hide(100,function() {
                    $email_result_cover.show();
                    $email_result_message.text(msg);
                    $email_result_button.one('click', function() {
                        $form.find('.contact_hire_form_input, textarea').val('');
                        $email_result_cover.hide();
                    });
                });

            }

        });

});