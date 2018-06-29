require(['jquery', 'swiper', 'render'], function($, swiper, render) {
    var url = location.search;
    if (url.indexOf('?') != -1) {
        url = url.substr(1);
    }
    var arr = url.split('=');
    var obj = {};
    obj[arr[0]] = arr[1];
    var con = decodeURI(obj.con);
    if (con == 'undefined') {
        $('.ads').html('北京');
        con = "北京";
    } else {
        $('.ads').html(con);
    }
    // 渲染轮播图
    $.ajax({
        url: '/api/img',
        dataType: 'json',
        success: function(res) {
            console.log(res.data);
            render('#img', '.wrapper', res.data);
            // new swiper
            new swiper('.swiper-container', {
                autoplay: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        },
        error: function(err) {
            console.log(err);
        }
    })

    // 点击tab让下划线切换
    $('.tab>span').on('click', function() {
        var idx = $(this).index();
        if (idx === 1) {
            $('.line').addClass('move');
        } else {
            $('.line').removeClass('move');
        }
    })

    // 点击目的地跳转页面
    $('.search_address').on('click', function() {
        location.href = '../../page/address.html';
    })

    // 点击查找酒店跳转页面
    $('button').on('click', function() {
        location.href = '../../page/list.html?con=' + con;
    })
})