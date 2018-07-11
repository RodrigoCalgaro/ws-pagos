const Pago = require('./../models').Pago;

var pagoController = {};
var randtoken = require("rand-token");



pagoController.list = function (req, res) {
    var list = Pago.findAll().then(pagos => {
        res.status(200).json(pagos);
        return; 
    })
}


pagoController.show = function(req, res) {
    Pago.find({ where: { idPago: req.params.id } }).then(pago => {
        res.status(200).json(pago);
        return;
    });
};


pagoController.save = function (req, res) {
    //Forming object from modal
    console.log(req.body);
    var reqPago = req.body;
    var token = randtoken.generate(16);
    reqPago.token = token;
    if (reqPago.codseguridad == "123"){
        reqPago.approved = true;
        reqPago.reason = "Pago Aprobado"
    } else {
        reqPago.approved = false;
        reqPago.reason = "Tarjeta Invalida"
    }

    var newPago = Pago.build(reqPago);
    //Inserting Data into database
    newPago.save().then(() => {
        console.log("Successfully created an pago.");
        res.status(200).json({
            "token" : newPago.token,
            "approved" : newPago.approved,
            "reason" : newPago.reason
        });
        
        return;
    })
    .catch(error => {
    console.log('Error in Inserting Record: ' + error);
    })
};


pagoController.edit = function (req, res) {
    Pago.find({ where: { idPago: req.params.id } }).then(pago => {    
        res.status(200).json(pago);
        return;
    })    
};


pagoController.update = function(req, res) {
  Pago.findById(req.params.id).then(function (pago) {
    pago.updateAttributes(req.body);
    res.status(200).json("Actualizado Correctamente");
    return;
    });
};


pagoController.delete = function (req, res) {
    Pago.findById(req.params.id).then((pago) => {
        pago.destroy();
        console.log("Pago deleted!");
        res.status(200).json("Borrado Correctamente");
        return;
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    })
};


module.exports = pagoController;