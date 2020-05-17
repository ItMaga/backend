var express = require('express');
var router = express.Router();

/* GET Вывод всех услуг */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM work ORDER BY id_work desc', function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

/* POST Добавление услуги*/
router.post('/add', function(req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var timeFrame = req.body.timeFrame;

  connection.query('SELECT * FROM work WHERE name =  ?', name, function(error, results, fields) {
    if (error) {
      return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    } else {
      if (results.length > 0) {
        return res.send(JSON.stringify({"status": 510, "error": error, "response": null}));
      } else {
        connection.query('INSERT INTO work SET name = ?, price = ?, timeFrame = ?',
            [name, price, timeFrame], function (error, results, fields) {
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
    }
  });


});

/*GET Получение услуги по ID*/
router.get('/get_id', function(req, res, next) {
    var id = req.get('Id');

    connection.query('SELECT * FROM work WHERE id_work = ? ',
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

/* PUT Изменение данных услуги */
router.put('/change', function(req, res, next) {
    var id = req.get("Id");

    var name = req.body.name;
    var price = req.body.price;
    var timeFrame = req.body.timeFrame;

    connection.query('SELECT * FROM work WHERE name = ?',
        [name], function(error, results, fields) {
            if (error) {
                console.log('error');
                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            } else {
                if(results.length > 0){
                    return res.send(JSON.stringify({"status": 510, "error": error, "response": null}));
                } else {
                    connection.query('UPDATE autoservice.work SET name = ?, price = ?, timeFrame = ? WHERE id_work = ?',
                        [name, price, timeFrame, id], function(error, results, fields) {
                            if (error) {
                                console.log('error');
                                return res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                            } else {
                                console.log('success');
                                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                            }
                        })
                }
            }
        })

});

/* DELETE Удаление услуги */
router.delete('/delete', function(req, res, next) {
    var id = req.get("Id");

    connection.query('DELETE FROM work WHERE id_work = ?',
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
