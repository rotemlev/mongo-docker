'use strict';

const express = require('express');
const mongo = require('mongodb').MongoClient

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

function upper(lower) { return lower.replace(/^\w/, function (chr) { return chr.toUpperCase(); }); }

// App
const app = express();



app.get('/', async (req, res) => {
    try {
        const client = await mongo.connect("mongodb://test-mongo:27017/cr-db");
        const db = client.db('cr-db');
        const users = db.collection('users')
        const items = await users.find({}).sort({ firstname: 1 })
            .map(item => {
                return {
                    username: item.username,
                    firstname: upper(item.firstname),
                    lastname: upper(item.lastname),
                    password: '*'.repeat(item.password.length)
                }
            }
            ).toArray();


        res.json(items);
        client.close();
    } catch (err) {
        res.status(500).send(err);
    }

});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);