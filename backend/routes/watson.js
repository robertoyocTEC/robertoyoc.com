const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Watson = require('../models/watson');

//GET Method
router.get('/', (req, res, next) => {
	Watson.find({})
	.then(result => {
		if(result.length) {
  			res.status(200).json({result});
  		}
	})
	.catch(next);
});

//POST Watson
router.post('/', (req, res) => {
    const body = req.body;
    let newWatson = new Watson({
        _id: mongoose.Types.ObjectId(),
        ...body,
    });
    newWatson.save()
    .then(result => {
        res.status(201).send(result);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

//DELETE Watson
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Watson.findByIdAndRemove(id)
    .then(() => {
        res.status(204).send('Watson deleted');
    })
    .catch(error => {
        res.status(500).send('Cant delete');
    });
})

module.exports = router;