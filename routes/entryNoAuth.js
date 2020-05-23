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

/* PUT Изменение отметки записи*/
router.put('/change', function(req, res, next) {
    var id = req.get("Id");

    var mark = req.body.mark;

    connection.query('UPDATE entry_no_auth SET entry_no_auth.mark = ? WHERE id_entry_no_auth = ?',
        [mark, id], function(error, results, fields) {
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
