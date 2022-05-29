const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize)=>{
    const Candidature_libraries = sequelize.define("Candidature_library",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull:false
          },
        score:{
            type: DataTypes.TEXT,
        },
       
       
    })

    return Candidature_libraries;
};