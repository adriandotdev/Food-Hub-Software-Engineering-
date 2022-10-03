var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'food_hub'
});

connection.connect((err) => {
    if (err)
        console.log(err)

    console.log('connected to food cafe')
});

const verifyAdmin = (req, res) => {

    let query = `select * from admin where username = '${req.body['username']}' AND password = '${req.body['password']}'`
    console.log(req.body['username'] + " : " + req.body['password']);
    
    connection.query(query, function (error, results, fields) {

        if (error)
            console.log(error)

        console.log(results)
        res.json(JSON.stringify(results))
    })
}

module.exports = {

    verifyAdmin
};