var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* POST Добавить машину*/
router.post('/', function(req, res, next) {
    var id_client = req.body.id_client;
    var carName = req.body.carName;
    var carModel = req.body.carModel;
    var regNumber = req.body.regNumber;
    var year = req.body.year;

    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');

    connection.query('SELECT * FROM car WHERE regNumber =  ?', regNumber, function(error, results, fields) {
        if (error) {
            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        } else {
            if(results.length > 0){
                return res.send(JSON.stringify({"status": 510, "error": error, "response": null}));
            } else {
                connection.query('SELECT id_client FROM client WHERE email = ? ',[desh.payload[0]], function (error, results, fields) {
                    if(error){
                        console.log('error 1');
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        //If there is error, we send the error in the error section with 500 status
                    } else {
                        id_client = results[0].id_client;
                        connection.query('INSERT INTO car SET id_client = ?, carName = ?, carModel = ?, regNumber = ?, year = ?',
                            [id_client, carName, carModel, regNumber, year],function (error, results, fields) {
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
            }
        }

    })


});

router.get('/get', function(req, res, next) {
    var id;
    let desh = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');

    connection.query('SELECT id_client FROM client WHERE email = ? ',
        [desh.payload[0]], function (error, results, fields) {
        if(error){
            console.log('error 1');
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            id = results[0].id_client;
            connection.query('SELECT * FROM car WHERE id_client = ?',
                id,function (error, results, fields) {
                    if(error){
                        console.log('error 2');
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        //If there is error, we send the error in the error section with 500 status
                    } else {
                        res.end(JSON.stringify({"status": 200, "error": null, "response": results}));
                        //If there is no error, all is good and response is 200OK.
                    }
                });
        }
    });
});

/*GET Получение услуги по ID*/
router.get('/get_id', function(req, res, next) {
    var id = req.get('Id');

    connection.query('SELECT * FROM car WHERE id_car = ? ',
        id, function (error, results, fields) {
            if(error){
                console.log('error');
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                //If there is error, we send the error in the error section with 500 status
            } else {
                res.end(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
});


/* PUT Изменение данных автмобиля */
router.put('/change', function(req, res, next) {
    var id = req.get("Id");

    var carName = req.body.carName;
    var carModel = req.body.carModel;
    var regNumber = req.body.regNumber;
    var year = req.body.year;

    connection.query('UPDATE autoservice.car SET carName = ?, carModel = ?, regNumber = ?, year = ? WHERE id_car = ?',
        [carName, carModel, regNumber, year, id], function(error, results, fields) {
            if (error) {
                console.log('error');
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                console.log('success');
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        })

});

/* DELETE Удаление автомобиля */
router.delete('/delete', function(req, res, next) {
    var id = req.get("Id");

    connection.query('DELETE FROM car WHERE id_car = ?',
        [id], function(error, results, fields) {
            if (error) {
                console.log('error');
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                console.log('deleted');
                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        })

});

module.exports = router;
