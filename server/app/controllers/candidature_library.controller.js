const db =require("../models");
const data = require("../config/db.config");
const Candidature_libraries = db.candidature_librarys
const Op = db.Sequelize.Op


exports.findAll = async(req, res)=>{
    
    Candidature_libraries.findAll({include:[{association:"library",},{association:"candidature"}]})
    .then(data=>{
        return res.send(data)
    })
    .catch(err=>{
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving candidature_offres."
        })
    })
}
exports.createCandidature_library= async(req, res)=>{
    const candidature_library = {
        candidatureId:req.body.candidatureId,
        libraryId:req.body.libraryId,
        score:req.body.score
         
    }
    Candidature_libraries.findOne({where:{candidatureId:req.body.candidatureId,libraryId:req.body.libraryId}})
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving candidature_offres."
        })
    })
    Candidature_libraries.create(candidature_library)
    .then(data=>{
        return res.send(data)
    })
    .catch(err=>{
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the candidture_offre."
        })
    })
}