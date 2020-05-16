var express = require('express');
var router = express.Router();


/* POST Запись неавторизованных клиентов */
router.post('/', function(req, res, next) {
    var postData = req.body;
    connection.query('INSERT INTO entry_no_auth SET ?',
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

/* GET Вывод таблицы записей для неавториз. клиентов */
router.get('/get', function(req, res, next) {
    connection.query('SELECT * from entry_no_auth ORDER BY id_entry_no_auth desc', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            for (let i in results) {
                results[i].date = results[i].date.toLocaleString()
            }
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});


module.exports = router;
