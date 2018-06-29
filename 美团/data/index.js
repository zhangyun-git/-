var imgJson = require('./mock/img.json');
var listCityJson = require('./mock/list_city.json');
var list_bjJson = require('./mock/list_bj.json');
var list_shhJson = require('./mock/list_shh.json');
var list_alsmJson = require('./mock/list_alsm.json');

var obj = {
    '/api/img': imgJson,
    '/api/list_city': listCityJson,
    '/api/list?con=北京': list_bjJson,
    '/api/list?con=上海': list_shhJson,
    '/api/list?con=阿拉善盟': list_alsmJson
}

module.exports = function(path) {
    return obj[path] || [];
}