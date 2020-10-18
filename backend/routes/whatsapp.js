const { json } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WhatsApp = require('../models/whatsapp');
const Watson = require('../models/watson');
const axios = require('axios');


//GET Method
router.get('/', (req, res, next) => {
	WhatsApp.find({})
	.then(result => {
		if(result.length) {
  			res.status(200).json({result});
  		}
	})
	.catch(next);
});

router.post('/', (req, res) => {
    const body = req.body;
    const to = req.body.To;
    const from = req.body.From;
    const message = req.body.Message;
    axios.post('http://127.0.0.1:5002/whatsApp', {
        message: message
    })
    .then(response_watson => {
        const accountSid = 'AC2e3df18d71dff943e78320f145f29052';
        const authToken = 'be37a141d1d080d6cc9eaf0647fb14b7';
        const client = require('twilio')(accountSid, authToken);
    
        client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: response_watson.text,
            to: 'whatsapp:+5215583023701'
        });
        let newWatson = new Watson({
            _id: mongoose.Types.ObjectId(),
            user: from,
            message: response_watson.text,
            channel: 'whatsapp',
            intent: response_watson.intent
        });
        newWatson.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(error => {
            res.status(500).send(error);
        });
    });
});

module.exports = router;