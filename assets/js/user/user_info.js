$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6 || value.length < 1) {
                return '昵称需要1~6个字符';
            } else if (/妈的|基情/.test(value)) {
                return '不能出现敏感字符';
            }
        }
    });

    init();

    function init() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                form.val("formUserInfo", res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        init();
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status === 1) return layui.layer.msg('更新信息失败');
                layui.layer.msg('更新信息成功');
                window.parent.getUserInfo()
            }
        })
    })


})