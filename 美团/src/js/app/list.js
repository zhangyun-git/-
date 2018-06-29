require(['jquery', 'render'], function($, render) {
    // 获取地址栏传来的参数
    var url = location.search;
    if (url.indexOf('?') != -1) {
        url = url.substr(1);
    }
    var arr = url.split('=');
    var obj = {};
    obj[arr[0]] = arr[1];
    var con = decodeURI(obj.con);
    if (con == 'undefined') {
        con = "北京";
    }
    // 渲染数据
    renders();

    function renders() {
        $.ajax({
            url: '/api/list?con=' + con,
            dataType: 'json',
            success: function(res) {
                console.log(res)
                render('#list', '.con', res, true);
                // 点击dl
                $('.con>dl').on('click', function() {
                    var poiid = $(this).attr('data-id');
                    location.href = '../../page/detail.html?poiid=' + poiid + '&con=' + con;
                });
                // 给盒子绑定srcoll事件
                $('section').on('scroll', loadMore)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }

    function loadMore() {
        var conHeight = $('.con').height(); // 内容高
        var sectionHeight = $('section').height(); // 盒子高
        var maxScrollY = conHeight - sectionHeight;
        if ($(this).scrollTop() > maxScrollY - 40) {
            $('section').off('scroll');
            renders();
        }
    }
    // 点击back跳转到上一页
    $('.back').on('click', function() {
        history.go(-1);
    });


})