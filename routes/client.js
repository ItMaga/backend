var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generatePassword = require('password-generator');

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "d0nma",
        pass: "Don6145"
    }
});


/* GET Получение информации о клиенте по Email */
router.get('/', function(req, res, next) {
    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    connection.query('SELECT * FROM client WHERE email = ?', [desh.payload[0]] ,function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/*GET Получение пароля пользователя*/
router.get('/pass', function(req, res, next) {
    let dash = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    connection.query('SELECT password FROM client WHERE email = ?', [dash.payload[0]] ,function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/*PUT Восстановление пароля*/
router.put('/reset', function(req, res, next) {
    let pass = generatePassword(8, false);

    var email = req.body.email;

    connection.query('SELECT * FROM client WHERE email = ?', email, function (error, results, fields) {
        if(error){
            console.log('error');
            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        } else{
            if(results.length === 0){
                return res.send(JSON.stringify({"status": 510, "error": error, "response": null}));
            } else{
                connection.query('UPDATE client SET password = ? WHERE email = ?',
                    [pass, email], function(error, results, fields) {
                        if (error) {
                            console.log('error');
                            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        } else {
                            console.log('success');
                            var message = {
                                from: "d0nma@ya.ru",
                                to: email,
                                subject: "Восстановление пароля",
                                text: "Ваши почта и пароль для входа в систему!\n" +
                                    "Ваша почта: " + email + "\nВаш пароль: " + pass,
                            };
                            transporter.sendMail(message, (error, info) => {
                                if (error) {
                                    console.log('Error occurred');
                                    console.log(error.message);
                                    return process.exit(1);
                                }
                            });
                            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                        }
                    })
            }
        }
    })

});




module.exports = router;
