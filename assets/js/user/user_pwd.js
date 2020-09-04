$(function () {
    let form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能和上次密码重复'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '确认密码与修改密码不一致'
            }
        }
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layui.layer.msg('重置密码失败');
                layui.layer.msg('重置密码成功');
                $('.layui-form')[0].reset();
            }

        })
    })
})