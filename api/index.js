const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asiugbaj34bfv4eajbg';

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

const dbURI = process.env.MONGO_URL;
mongoose.set('strictQuery', false);
mongoose.connect(dbURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/test', (req, res) => {
    res.json('testt ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.status(200).json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                {
                    email: userDoc.email,
                    id: userDoc._id
                },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        sameSite: 'none',
                        secure: true // The "secure" attribute is also required for cookies with SameSite="None"
                    }).json(userDoc);
                }
            );
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.listen(4000);