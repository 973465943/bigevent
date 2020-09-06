$(function () {
    initArtCateList();
    let layer = layui.layer;
    let form = layui.form;
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success(res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#add').html()
        });
    });

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('添加文章失败')
                initArtCateList();
                layer.msg('添加成功了 真是个小机灵鬼');
                layer.closeAll('page');
            }
        })
    });

    $('tbody').on('click', '#edi', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#edit').html()
        });
        let id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success(res) {
                form.val("form-edit", res.data)
            }
        });
    });

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('更新分类失败');
                layer.msg('更新分类成功');
                initArtCateList();
                layer.closeAll('page');
            }
        })
    });

    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/deletecate/' + id,
            method: 'GET',
            success(res) {
                if (res.status !== 0) return layer.msg('删除失败')
                layer.msg('删除成功')
                initArtCateList();
                layer.closeAll('page');
            }
        })
        // layer.confirm('确认删除吗，骚年？', { icon: 3, title: '提示' }, function (index) {
        // 
        // });
    })


})