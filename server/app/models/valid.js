const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize)=>{
    const Valid = sequelize.define("valid",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull:false
          },
        subject:{
            type: DataTypes.STRING,
            allowNull: false
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },        
        
    })

    return Valid;
};