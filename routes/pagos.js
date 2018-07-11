var express = require('express');
var router = express.Router();

var pago = require("../controllers/pagoController.js");

// Get all pagos
router.get('/', pago.list);

// Get single pago by id
router.get('/show/:id', pago.show);

// Save pago
router.post('/save', pago.save);

// Edit pago
router.get('/edit/:id', pago.edit);

// Update pago
router.put('/update/:id', pago.update);

// Delete pago
router.delete('/delete/:id', pago.delete);

module.exports = router;