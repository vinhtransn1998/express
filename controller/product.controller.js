const shortid = require('shortid');

const db = require('../db')


module.exports.index = (req, res) => {
    let dbs = db.get('product').value();
    var page = parseInt(req.query.page) || 1; // trang 1,2

    var perPage = 12; //9 item ,9
    var start = (page - 1) * perPage; //0,9
    var end = page * perPage; //9,18

    var limited = dbs.length;
    var limitPage = parseInt(limited / perPage);

    num <= limitPage ? '?page=' + num1 : ''

    console.log(limitPage);

    var pre = page - 1;
    var num = page;
    var num1 = num + 1;
    var num2 = num1 + 1;
    var next = page + 1;

    // console.log(dbs.length);
    // console.log(page);
    // console.log(perPage);
    // console.log(start);
    // console.log(end);

    res.render('product/index', {
        product: dbs.slice(start, end),
        end,
        dbs,
        pre,
        next,
        num,
        num1,
        num2,
        limitPage

    })
}

module.exports.search = (req, res) => {

    var q = req.query.p;
    var matchProduct = db.get('product').write().filter(function(product) {
        return product.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('product/index', {
        product: matchProduct
    })
}