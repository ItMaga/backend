var express = require('express');
var router = express.Router();

/* POST Создание заявки на обратный звонок*/
router.post('/', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO call_back SET ?',
        postData ,function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            console.log(results.insertId);
            res.end(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET Вывод обратных звонков*/
router.get('/get', function(req, res, next) {
    connection.query('SELECT * from call_back ORDER BY id_call_back desc', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* PUT Изменение отметки звонков*/
router.put('/change', function(req, res, next) {
    var id = req.get("Id");

    var select = req.body.select;

    connection.query('UPDATE call_back SET call_back.select = ? WHERE id_call_back = ?',
        [select, id], function(error, results, fields) {
            if (error) {
                console.log('error');
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                console.log('success');
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        })

});

module.exports = router;
