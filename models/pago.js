'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pago = sequelize.define('Pago', {
    idPago: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tarjeta: DataTypes.STRING(19),
    codseguridad: DataTypes.STRING(3),
    fvenc: DataTypes.STRING(5),
    importe: DataTypes.STRING(8),
    approved: DataTypes.BOOLEAN,
    token: DataTypes.STRING(40),
    reason: DataTypes.STRING(40)
    }, 
    {
    //Para que no se agreguen los timestamp attributes (updatedAt, createdAt)
    timestamps: false,   
    },
    );
  
  Pago.associate = function(models) {
    //Acá se definen las asociaciones
  };
  return Pago;
};