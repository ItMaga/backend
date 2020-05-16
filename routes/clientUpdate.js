var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* PUT Изменение личных данных */
router.put('/', function(req, res, next) {
    var name = req.body.name;
    var lastName = req.body.lastName;
    var patronymic = req.body.patronymic;
    var phone = req.body.phone;
    var email = req.body.email;

    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    connection.query('UPDATE autoservice.client SET name = ?, lastName = ?, patronymic = ?, phone = ?, email = ? WHERE email = ?',
        [name, lastName, patronymic, phone, email, desh.payload[0]], function(error, results, fields) {
            if (error) {
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                connection.query('SELECT * FROM client WHERE email =  ?',
                    res.req.body.email, function(error, results, fields) {
                        if (error) {
                            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        } else {
                            console.log('success');
                            let payload = [];
                            payload.push(results[0].email);
                            payload.push(results[0].type);
                            let token = jwt.sign({payload}, 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E', {algorithm: 'HS512'});
                            payload.push(token);
                            return res.send(payload);
                        }
                    })
                }
            })

        });

/* PUT Изменение пароля */
router.put('/pass', function(req, res, next) {
    var pass = req.body.password;

    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    connection.query('UPDATE autoservice.client SET password = ? WHERE email = ?',
        [pass, desh.payload[0]], function(error, results, fields) {
            if (error) {
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        })

});

module.exports = router;
