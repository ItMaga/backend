var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* POST Авторизация*/
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM client WHERE email =  ?', [email], function(error, results, fields) {
        if (error) {
            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        } else {
            if (results.length > 0) {
                if (password === results[0].password) {
                    console.log('success');
                    let payload = [];
                    payload.push(email);
                    payload.push(results[0].type);
                    let token = jwt.sign({payload}, 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E', {algorithm: 'HS512'});
                    payload.push(token);
                    return res.send(payload);
                }else {
                    return res.send(JSON.stringify({"status": 400, "error": error, "response": null}));
                }
            }else{
                return res.send(JSON.stringify({"status": 400, "error": error, "response": null}));
            }
        }

    })

});


module.exports = router;
