'user strict';

var mysql = require('mysql');
var logger = require('../config/winston');
const environment = require('../config/environment');
const dbconn = environment.getDBconn();

// create a new connection pool
const config = {
  host: dbconn.host,
  user: dbconn.user,
  password: dbconn.pass,
  database: dbconn.dbname,
  connectionLimit: 10
}

class database {

  async runQuery(querystring) {
    const self = this;
    return new Promise((resolve, reject) => {
      var con = mysql.createConnection(config);

      con.connect();
      con.query(querystring , function (err, result, fields) {
        if (err){logger.error('Error occured while fetching data from db Error: ' + err);}
        //console.log(result);
        if(result != null)
        resolve(result)
        con.end();
      });
  
    }).catch((err)=>{
        console.log(err)
        resolve(err)
    })
  }
}


//expose the ability to create new connections
module.exports = database;


// var mysql = require('mysql');
// var util = require('util')
// // prod
// var prod_config = {
//     host: 'localhost',
//     user: 'admin',
//     password: 'password',
//     database: 'onca-active',
//     insecureAuth: false
// };

// //local mysql db connection
// var dev_config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'onca-active',
//     insecureAuth: false
// }

// //- Create the connection variable
// var connection = mysql.createPool(dev_config);

// //- Establish a new connection
// connection.getConnection(function (err) {
//     if (err) {
//         console.log("\n\t *** Cannot establish a connection with the database. ***");
//         connection = reconnect(connection);
//     } else {
//         console.log("\n\t *** New connection established with the database. ***")
//     }
// });

// //- Reconnection function
// function reconnect(connection) {
//     console.log("\n New connection tentative...");

//     //- Create a new one
//     connection = mysql.createPool(dev_config);

//     //- Try to reconnect
//     connection.getConnection(function (err) {
//         if (err) {
//             setTimeout(reconnect(connection), 2000);
//         } else {
//             console.log("\n\t *** New connection established with the database. ***")
//             return connection;
//         }
//     });
// }

// //- Error listener
// connection.on('error', function (err) {
//     //- The server close the connection.
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//         return reconnect(connection);
//     }

//     else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//         return reconnect(connection);
//     }

//     else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//         return reconnect(connection);
//     }

//     else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//     }

//     else {
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
//         return reconnect(connection);
//     }
// });

// module.exports = connection;