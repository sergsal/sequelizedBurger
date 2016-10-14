'use strict';
module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define('burgers', {
    burger_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    devoured: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
  }
  },{    
	  classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })
								 
  return burgers;
};