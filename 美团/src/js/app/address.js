require(['jquery', 'render', 'bscroll'], function($, render, bscroll) {

    // 点击图标跳到主页
    $('.back').on('click', function() {
        history.go(-1);
    })

    // 渲染轮播图
    var obj = {};
    $.ajax({
        url: '/api/list_city',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            getdata(res);
            // 渲染列表
            render('#list', 'ul', getdata(res));
            $('.list_citys').on('click', 'li', function() {
                var con = $(this).html();
                location.href = '../../index.html?con=' + con;
            });
            // 渲染title
            render('#list_titile', 'ol', getdata(res));
            // new bscroll
            var scroll = new bscroll('.list', {
                click: true,
                probeType: 2
            });
            toElement(scroll);

        },
        error: function(err) {
            console.log(err);
        }
    });

    // 转换数据
    function getdata(res) {
        res.data.forEach(function(item) {
            var key = item.pinyin.substr(0, 1).toUpperCase();
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item);
        })
        var arr = [];
        for (k in obj) {
            arr.push(obj[k]);
        }
        // 排序
        arr.sort(function(a, b) {
            return a.title.charCodeAt() - b.title.charCodeAt();
        })
        return arr;
    }

    function toElement(scroll) {
        $('.list_titile>ol li').on('click', function() {
            var html = $(this).html();
            console.log(html)
            $('.list h1').each(function(i, item) {
                var val = $(this).text();
                if (html === val) {
                    scroll.scrollToElement(item);
                }
            })
        })
    }
})