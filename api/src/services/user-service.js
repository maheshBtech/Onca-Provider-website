'use strict';
// var connection = require('../db');


var users = function () {

};

users.getInfo = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve({ message: `'Hello ${name}` })
        } catch (error) {
            reject(error)
        }
    })
}

var getRegisterdUser = async (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            var query = 'select * from users where userName = ? or userID = ?';
            await connection.query(query, [body['userName'], body['userId']], async (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    if (res && res.length > 0) {
                        resolve({ status: 'Success', data: res });
                    } else {
                        resolve({ status: 'Failure' });
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = users;