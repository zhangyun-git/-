require(['jquery', 'render'], function($, render) {
    var url = location.search;
    if (url.indexOf('?') != -1) {
        url = url.substr(1);
    }
    var obj = {};
    var arr = url.split('&');
    arr.forEach(function(item) {
        item = item.split('=')
        obj[item[0]] = item[1]
    });
    var poiid = obj.poiid;
    var con = decodeURI(obj.con);
    $.ajax({
        url: '/api/list?con=' + con,
        dataType: 'json',
        success: function(res) {
            var target = res.data.searchresult.filter(function(item) {
                return item.poiid == poiid
            });
            console.log(target)
            render('#detail', '.top', target);
            $('.back').on('click', function() {
                history.go(-1);
            })
        },
        error: function(err) {
            console.log(err)
        }
    })

})