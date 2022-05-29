const db = require("../models");
const Link = db.links
const Op = db.Sequelize.Op
const multer = require('multer');
const path = require('path')

exports.addDocument = async (req, res) => {
    let doc = {
        description: req.body.description,
        uploadDocument: req.file.path
    }
    try {
        const document = await Link.create(doc)
        res.status(200).send(document)
        console.log(document)
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while uploading the document."
        })
    }
}


//Find All Doc
exports.findAllDoc = async (req, res) => {
    const description = req.query.description
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
    Link.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Docs."
            })
        })
}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|txt|ppt|pptx|xls|xlsx|zip|rar|doc|docx|pdf/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files Formate to upload')
    }
}).single('file')


