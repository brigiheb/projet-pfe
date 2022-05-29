const db = require("../models");
const data = require("../config/db.config");
const User = db.users
const bcrypt = require("bcrypt")
const Op = db.Sequelize.Op
const Roles = db.roles
const jwt = require("jsonwebtoken")
//post hedhi
exports.createUser = async (req, res) => {
    User.count({where:{email:req.body.email}}).then(doc=>{
        if(doc!=0){
            res.status(400).send("This username is used")
        }{
            bcrypt.hash(req.body.motdepasse,10).then(hashedPassword=>{
                const data = {
                    nom: req.body.nom,
                    prénom: req.body.prénom,
                    email: req.body.email,
                    motdepasse: hashedPassword,
                    telNum: req.body.telNum,
                    companyName: req.body.companyName,
                    
                }
                User.create(data).then(async user=>{
                    const role = await Roles.findByPk(req.body.roles)
                    await user.addRole(role)
                    return user
                })
                .then((resp)=>res.status(200).send(resp))
                .catch((err)=>res.status(400).send(err))
            })
        }
    })



    



    // .then(doc=>{
    //     if(doc!=0){
    //       res.status(400).send("This username is used")
    //     }
    
    // // User.create(user)
    //     .then(data => {
    //         res.send(data)
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the user."
    //         })
    //     })
}
//hedhi find all
exports.findAll = async (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            })
        })
}
// Find a single Demande with id 
exports.findOneUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(400).send({
                    message: `Cannot find User with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        })
};
exports.findMailUser = (req, res) => {
    const email = req.params.email;
    const password=req.params.password

    User.findByPk(email, password)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(400).send({
                    message: `Cannot find User with email=${email}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        })
};

//hedhi apdate
exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            })
        })
}

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully"
                })
            } else {
                res.send({
                    message: ` Cannot delete User with id=${id}. Maybe User was not found!`
                })

            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            })
        })
}

const privateKey = "PINOPS TEAM"
exports.login = (req,res)=>{
  User.findOne({where:{email:req.body.email}})
  .then(collab =>{
    if(!collab){
      res.status(400).json({msg:"invalid username and password"})
    }else{
      bcrypt.compare(req.body.motdepasse,collab.motdepasse)
      .then(async same=>{
        if(same){
          let tocken = jwt.sign({id:collab.id,email:collab.id,collab_role:collab.role},privateKey,{
            expiresIn:"1h"
          })
          console.log(collab)
          res.status(200).json({tocken:tocken,
            collabID: collab.id,
            role:await collab.getRole() 
          })
        }else{
          res.status(400).json({msg:"invalid username and password"})
        }
      })
    }
  })
}

exports.profile = (req, res,next) => {
    // const id = req.params.id;
    User.findByPk(req.user.id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with cin =${id} `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };