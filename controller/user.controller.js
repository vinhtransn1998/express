const shortid = require('shortid');

const db = require('../db')


module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}
module.exports.search = (req, res) => {
    var q = req.query.p;
    var matchUser = db.get('users').write().filter(function(users) {
        return users.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: matchUser
    })
}
module.exports.create = (req, res) => {
    res.render('users/create')
}
module.exports.get = (req, res) => {
    var id = req.params.id;
    var users = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        users: users
    })
}
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    // console.log(req.file.path.replace(/\\/g, '/'), "dsd")
    var path = req.file.path.replace(/\\/g, '/');

    console.log(path.split('/'));
    console.log(path.split('/').slice(2)) //chia ra thanh mang 4 phan tu 
    console.log(path.split('/').slice(4).join('/')) //chon phan tu thu 2 tro di
    req.body.avatar = path.split('/').slice(4).join('/');

    db.get('users').push(req.body).write();
    res.redirect('/users')
}