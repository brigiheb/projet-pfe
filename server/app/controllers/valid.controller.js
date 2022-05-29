const db = require("../models");
const data = require("../config/db.config");
const Valid = db.valid
const Op = db.Sequelize.Op
const nodemailer = require("nodemailer");

//post hedhi
exports.createValid = async (req, res) => {
    const valid = {
        subject: req.body.subject,
        text: req.body.text,
        mail: req.body.mail,
        password: req.body.password


    }

    Valid.create(valid)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            })
        })
                  
          let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true, // true for 465, false for other ports
            auth: {
              user: "kaycerkhouini99@gmail.com", // generated ethereal user
              pass: "its goddamn kay", // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let mailOptions = {
            from: 'kaycerkhouini99@gmail.com', // sender address
            to: req.body.mail, // list of receivers
            subject: 'Validation Du Compte Pinops Talent', // Subject line
            text: 'Votre compet a été accepté sur Pinops Talent\nVotre Email: '+req.body.mail+'\nVotre Mot De Passe: '+req.body.password , // plain text body
            
          };

          transporter.sendMail(mailOptions,(error)=>{
            if(error){
              return console.log(error)
            }
            console.log('Message %s sent: %s');
          });
        
         
        }
        
//hedhi find all
exports.findAll = async (req, res) => {
    const mail = req.query.mail;
    var condition = mail ? { mail: { [Op.like]: `%${nom}%` } } : null;
    Valid.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Valid."
            })
        })
}
// Find a single Demande with id 
exports.findOneValid = (req, res) => {
    const id = req.params.id;

    Valid.findByPk(id)
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

//hedhi apdate
exports.updateValid = (req, res) => {
    const id = req.params.id;

    Valid.update(req.body, {
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
exports.deleteValid = (req, res) => {
    const id = req.params.id;
    Valid.destroy({
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
