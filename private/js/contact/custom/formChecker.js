define([ 'jquery' ], function ( $ ) {

    function checkEmail (value) {

        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return value.match(regExp) ? true : false;

    }

    class formChecker {

        constructor(form) {

            this.$form = form;
            this.$fields = this.$form.find('.contact_hire_form_input, textarea');
            this.$errors = this.$form.find('.error_message');

        }

        ifVerified () {

            let isOk = true;

            this.$errors.hide();
            this.$fields.each(function () {

                let current = $(this);

                if (current.val().trim().length === 0) {

                    current.next('.error_message').fadeIn('slow').delay(3000).fadeOut('slow');
                    isOk = false;

                }

                if (current.is('#client_email') && current.val().trim().length > 0) {

                    if (!checkEmail(current.val().trim())) {

                        current.next('.error_message').fadeIn('slow').delay(3000).fadeOut('slow');
                        isOk = false;

                    }

                }

            });

            return isOk;

        }

    }

    return formChecker;

});