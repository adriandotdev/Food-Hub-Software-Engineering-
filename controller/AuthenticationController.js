var mysql  = require('mysql');
const generateUniqueId = require('generate-unique-id');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'food_hub'
});

connection.connect((err) => {
    if (err)
        console.log(err)

    console.log('connected to pnc-cafe')
});

const verifyUser = (req, res) => {

    const query = `SELECT * FROM users WHERE username = '${req.body['userName']}'`

    connection.query(query, function (error, results, fields) {

        if (error) {
            console.log(error);
            return;
        }
        console.log(results)
        res.json(JSON.stringify(results))
    })
}

const getUser = (req, res) => {

    const query = `SELECT * FROM users WHERE username = '${req.body['userName']}'`

    connection.query(query, function (error, results, fields) {

        if (error) {
            console.log(error);
            return;
        }
        console.log(results)
        res.json(JSON.stringify(results))
    })
}

const addUser = (req, res) => {

    const id = generateUniqueId({
        includeSymbols: ['@','#','|'],
        excludeSymbols: ['0']
    });

    const birthdayOfUser = new Date(req.body['birthday']);
    const dateNow = new Date(Date.now());

    let ageOfUser = Math.abs(dateNow.getUTCFullYear() - birthdayOfUser.getUTCFullYear());

    const query = `INSERT INTO users VALUES ('${id}', '${req.body['givenName']}', '${req.body['middleName']}', '${req.body['lastName']}', '${req.body['birthday']}', '${ageOfUser}', 'male', '${req.body['userName']}', '${req.body['password']}', '${req.body['mobileNumber']}', 'none')`;

    connection.query(query, function (error, results, fields) {

        if (error) {
            console.log(error);
            return;
        }
        console.log(results)
        res.json(JSON.stringify({status: 200}))
    })
}

module.exports ={

    verifyUser,
    getUser,
    addUser
}