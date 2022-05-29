const db = require("../models")
const role = db.roles;
const Op = db.Sequelize.Op;


exports.findAll = async (req, res)=>{
    role.findAll({})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Contrats."
        })
    })
}