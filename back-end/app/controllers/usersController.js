const express = require('express');
const { generateID } = require('../common-functions/generate-id');
const { users_db_keys } = require('../constants/db-keys');
const router = express.Router();
const {con} = require('../../config/db');
const { createUserTable } = require('../models/users-table');

router.post('/', (req, res) => {
    createUserTable();
    let { first_name, last_name, ph_num, role } = req.body;
    let id = generateID();
    console.log('id created', id);
    let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    ph_num = new Number(ph_num);
    const insertQuery = `INSERT INTO users (
        ${users_db_keys.id},
        ${users_db_keys.first_name},
        ${users_db_keys.last_name},
        ${users_db_keys.role},
        ${users_db_keys.ph_num},
        ${users_db_keys.created_at}
    ) VALUES (${id},"${first_name}","${last_name}","${role}","${ph_num}","${created_at}")`;
    con.query(insertQuery, function (err, result) {
        console.log('error in user creation', err);
        if (err) throw err;
        console.log('user created::', result);
        res.send({message: 'Created user', result: result});
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    con.query(`SELECT * FROM users WHERE ${users_db_keys.id} = ${id}`, function (err, result) {
        if (err) throw err;
        console.log('user fetched::',result);
        res.send({message: 'Found User', result: result});
    });
});

router.get('/', (req, res) => {
    con.query(`SELECT * FROM users`, function (err, result) {
        if (err) throw err;
        console.log('user fetched::',result);
        res.send({message: 'All users found!', result: result});
    });
});


module.exports = {
    usersController: router
}