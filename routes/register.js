var express = require('express');
var router = express.Router();

/* POST Регистрация нового пользователя*/
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var regData = req.body;
        connection.query('SELECT * FROM client WHERE email =  ?', [email], function(error, results, fields) {
            if (results.length > 0) {
                return res.send(JSON.stringify({"status": 505, "error": error, "response": null}));
            } else {
                connection.query('INSERT INTO client SET ?',
                    regData ,function (error, results, fields) {
                        if(error){
                            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                            //If there is error, we send the error in the error section with 500 status
                        } else {
                            console.log('success');
                            return res.end(JSON.stringify({"status": 200, "error": null, "response": results}));
                            //If there is no error, all is good and response is 200OK.
                        }
                    });
            }
        })

});

module.exports = router;
