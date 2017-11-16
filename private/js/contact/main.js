require( [ 'jquery', 'resizeFunc' ], function ($, resizeF) {

    resizeF(3);

    $('.contact_hire_form_submit').on('click', function(e) {
            let form = $('.contact_hire_form').serialize();
            e.preventDefault();

            $.ajax({
                url      : "/contact/hire",
                method   : "POST",
                data     : form,
                dataType : "text"
            }).then(function(msg){
                alert(msg);
            },
            function(error) {
                alert(error);
            });

        });

});