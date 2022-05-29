const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Documents = sequelize.define("Dacuments", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        fichier: {
            type: DataTypes.STRING,
            allowNull: false
        },


    })

    return Candidature_offre;
};