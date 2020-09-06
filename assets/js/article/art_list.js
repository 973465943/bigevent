$(function () {

    // template.defaults.imports

    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    let layer = layui.layer;
    let form = layui.form;
    var laypage = layui.laypage;

    initTable();
    initCate()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success(res) {
                let str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success(res) {
                let str = template('tpl-cate', res);
                $('[name=cate_id]').html(str)
                form.render();
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        q.cate_id = $('[cate_id]').val();
        q.state = $('[name=state]').val();
        initTable();
    })

    function renderPage(total) {
        laypage.render({
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 7, 10],
            jump: function (obj, first) {
                q.pagesize = obj.limit;
                q.pagenum = obj.curr;
                if (!first) {
                    initTable();
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('沙雕网友，确认删除吗?', function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                data: "data",
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败了，废物')
                    layer.msg('删除成功了，机灵鬼儿')
                    initTable();
                }
            });
            layer.close(index);
        });
    })

})