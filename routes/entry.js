var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* POST Запись авторизованного пользователя */
router.post('/', function(req, res, next) {
    var id_client_entry = req.body.id_client_entry;
    var carName_entry = req.body.carName_entry;
    var carModel_entry = req.body.carModel_entry;
    var reg_number = req.body.reg_number;
    var year_car = req.body.year_car;
    var date_entry = req.body.date_entry;

    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');

    connection.query('SELECT id_client FROM client WHERE email = ? ',
        [desh.payload[0]], function (error, results, fields) {
        if(error){
            console.log('error');
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            id_client_entry = results[0].id_client;
            connection.query('INSERT INTO entry SET id_client_entry = ?, carName_entry = ?, carModel_entry = ?,' +
                ' reg_number = ?, year_car = ?, date_entry = ?',
                [id_client_entry, carName_entry, carModel_entry, reg_number, year_car, date_entry],
                function (error, results, fields) {
                if(error){
                    console.log('error 2');
                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    //If there is error, we send the error in the error section with 500 status
                } else {
                    console.log(results.insertId);
                    res.end(JSON.stringify({"status": 200, "error": null, "response": results}));
                    //If there is no error, all is good and response is 200OK.
                }
            });
        }
    });

});

/* GET Вывод таблицы записей для авторизованных клиентов */
router.get('/get', function(req, res, next) {
    connection.query('SELECT id_entry, name, lastName, carName_entry, carModel_entry, reg_number, ' +
        ' year_car, phone, date_entry FROM entry, client WHERE entry.id_client_entry = client.id_client ORDER BY id_entry desc', function (error, results, fields) {
        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            for (let i in results) {
                results[i].date_entry = results[i].date_entry.toLocaleString()
            }
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/* GET Вывод таблицы записей по ID */
router.get('/get_id', function(req, res, next) {
    let tok = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    var id;
    connection.query('SELECT id_client FROM client WHERE email = ? ',
        [tok.payload[0]], function (error, results, fields) {
            if(error){
                console.log('error');
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                //If there is error, we send the error in the error section with 500 status
            } else {
                id = results[0].id_client;
                connection.query('SELECT id_entry, client.name, carName_entry, carModel_entry, reg_number, ' +
                    ' year_car, date_entry FROM entry, client WHERE entry.id_client_entry = ? AND client.id_client = ? ORDER BY id_entry desc',
                    [id,id],function (error, results, fields) {
                    if(error){
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        //If there is error, we send the error in the error section with 500 status
                    } else {
                        for (let i in results) {
                            results[i].date_entry = results[i].date_entry.toLocaleString()
                        }
                        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                        //If there is no error, all is good and response is 200OK.
                    }
                });
            }
        });

});

module.exports = router;
