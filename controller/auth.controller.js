var md5 = require('md5');
const db = require('../db')


module.exports.login = (req, res) => {
    res.render('auth/login')
}
module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email: email }).value();
    if (!user) {
        res.render('auth/login', {
            errors: ['User dose not exit!'],
            value: req.body
        })
    }
    var hashPassword = md5(password);
    if (md5(user.password) !== hashPassword) {
        res.render('auth/login', {
            errors: ['Password error!'],
            value: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/')
}