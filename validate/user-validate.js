module.exports.postCreate = (req, res, next) => {
    var errors = [];
    !req.body.name ? errors.push('Name is required.') : [];
    !req.body.phone ? errors.push('Phone Number is required.') : [];
    // if (!req.body.name) {
    //     errors.push('name is required.');
    // }
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            value: req.body
        })
        return;
    }
    next();

}