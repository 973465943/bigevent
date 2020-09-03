$(function () {
    getUserInfo();
    let layer = layui.layer;
    $('#out').on('click', function () {
        layer.confirm('想好了要退出吗骚年?',
            {
                icon: 3,
                title: '提示'
            },
            function (index) {
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index);
            });
    });
});

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            renderAvatar(res.data)
        },
    })
}

function renderAvatar(use) {
    let name = use.nickname || use.username;
    $('#welcome').html('欢迎 &nbsp&nbsp' + name);
    if (use.user_pic !== null) {
        $('.layui-nav-img').attr('src', use.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
}