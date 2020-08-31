$(function () {
    $('#link_reg').on('click', function () {
        // $('.log-box').hide();
        // $('.reg-box').show();
        $(this).parent('.log-box').hide().siblings('.reg-box').show()
    })
    
    $('#link_login').on('click', function () {
        // $('.log-box').show();
        // $('.reg-box').hide();
        $(this).parent('.reg-box').hide().siblings('.log-box').show()
    })
})