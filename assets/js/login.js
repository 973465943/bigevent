$('#link_reg').on('click', function () {
    $(this).parents('.login-box').hide().siblings('.reg-box').show()
})
$('#link_login').on('click', function () {
    $(this).parents('.reg-box').hide().siblings('.login-box').show()
})

let form = layui.form;
var layer = layui.layer;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
    repwd: function (value) {
        const pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次输入密码不一致'
        }
    }
});

$('#form_reg').on('submit', function (e) {
    e.preventDefault();
    let data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',
        data,
        function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功，去登陆')
            $('#link_login').click();
        }
    )
})

$('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(this).serialize(),
        success(res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }

    })
})
