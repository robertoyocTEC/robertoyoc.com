const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
//const data = require('./.env');
const dotenv = require('dotenv').config();
const uri = `mongodb+srv://roberto:${process.env.PASSWORD}@cluster0.bgu8x.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const indexRouter = require('./routes/index');
const watsonRouter = require('./routes/watson');
const whatsappRouter = require('./routes/whatsapp');
const messageRouter = require('./routes/message');

mongoose.connect(uri , {
	useNewUrlParser: true, useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/watson', watsonRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/message', messageRouter);
app.get('*', (req, res) => {
    res.send(404).send('Route not found');
});
app.use((error, req, res, next) => {
	if(error) {
		res.status(422).json({
			message: error.message,
			type: error.name
		})
	}
});

module.exports = app;
