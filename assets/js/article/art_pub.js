$(function () {

    let layer = layui.layer
    let form = layui.form

    initCate()
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layer.msg('失败了，嘤嘤嘤')
                let str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        });
    }

    initEditor();

    let $image = $('#image')

    let options = {
        aspectRatio: 290 / 300,
        preview: '.img-preview'
    }

    $image.cropper(options);

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                pbl(fd)
            });
    });

    function pbl(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layer.msg('失败')
                layer.msg('成功')
                location.href = '/article/art_list.html'
            }
        });
    }
})