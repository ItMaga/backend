var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/*GET Вывод контракта*/
router.get('/', function(req, res, next) {

    connection.query('SELECT id_contract, id_entry_contract, name, employee, dateStart, dateEnd, contract.price, status ' +
        'FROM contract, work, entry WHERE contract.id_entry_contract = entry.id_entry AND contract.id_work_contract = work.id_work' +
        ' ORDER BY id_contract desc', function (error, results, fields) {
            if(error){
                console.log('error 1');
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                //If there is error, we send the error in the error section with 500 status
            } else {
                for (let i in results) {
                    results[i].dateStart = results[i].dateStart.toLocaleString();
                    if(results[i].dateEnd !== null) {
                        results[i].dateEnd = results[i].dateEnd.toLocaleString();
                    }
                }
                res.end(JSON.stringify({"status": 200, "error": null, "response": results}));

            }
        });
});

/*GET Вывод контракта по идентификатору клиента*/
router.get('/get_id', function(req, res, next) {
    let tok = jwt.verify(req.get('Token'), 'McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6w9y$B&E');
    var id;
    var id_id;

    connection.query('SELECT id_client FROM client WHERE email = ? ',
        [tok.payload[0]], function (error, results, fields) {
            if(error){
                console.log('error 1');
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                //If there is error, we send the error in the error section with 500 status
            } else {
                id = results[0].id_client;
                id_id = results[0].id_client;
                connection.query('SELECT id_contract, id_entry_contract, work.name, employee, dateStart, dateEnd, contract.price, status ' +
                    'FROM autoservice.contract, autoservice.entry, autoservice.work, autoservice.client ' +
                    'WHERE entry.id_client_entry = ? AND client.id_client = ? AND contract.id_entry_contract = entry.id_entry ' +
                    'AND contract.id_work_contract = work.id_work ' +
                    'ORDER BY id_contract desc',
                    [id,id_id],function (error, results, fields) {
                        if(error){
                            console.log('error 2');
                            return  res.end(JSON.stringify({"status": 500, "error": error, "response": null}));
                            //If there is error, we send the error in the error section with 500 status
                        } else {
                            for (let i in results) {
                                results[i].dateStart = results[i].dateStart.toLocaleString();
                                if(results[i].dateEnd !== null) results[i].dateEnd = results[i].dateEnd.toLocaleString();
                            }
                            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                            //If there is no error, all is good and response is 200OK.
                        }
                    });
            }
        });
});

/* POST Добавление контракта*/
router.post('/add', function(req, res, next) {
    var work = decodeURI(req.get('Work'));

    var id_entry_contract = req.body.id_entry_contract;
    var id_work_contract = req.body.id_work_contract;
    var employee = req.body.employee;
    var dateStart = req.body.dateStart;
    var dateEnd = req.body.dateEnd;
    var price = req.body.price;
    var status = req.body.status;

    connection.query('SELECT id_work FROM work WHERE name =  ?', work, function(error, results, fields) {
        if (error) {
            return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        } else {
            id_work_contract = results[0].id_work;
            connection.query('INSERT INTO contract SET id_entry_contract = ?, id_work_contract = ?, employee = ?,' +
                ' dateStart = ?, dateEnd = ?, price = ?, status = ?',
                [id_entry_contract,id_work_contract,employee,dateStart,dateEnd,price,status],
                function (error, results, fields) {
                    if (error) {
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

/* DELETE Удаление контракта*/
router.delete('/delete', function(req, res, next) {
    var id = req.get("Id");

    connection.query('DELETE FROM contract WHERE id_contract = ?',
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