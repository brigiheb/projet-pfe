const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  port : dbConfig.port,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});



sequelize.authenticate()
.then(() => {
    console.log('connected..')
})

.catch(err => {
    console.log('Error'+ err)
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.degrees=require("./degree")(sequelize,Sequelize)
db.experiences=require("./experience")(sequelize,Sequelize)
db.jobs=require("./job")(sequelize,Sequelize)
db.disponibilites=require("./disponibilite")(sequelize,Sequelize)
db.links=require("./link")(sequelize,Sequelize)
db.candidatures=require("./candidature")(sequelize,Sequelize)
db.offres=require("./offre")(sequelize,Sequelize)
db.questions=require("./question")(sequelize,Sequelize)
db.choixs=require("./choix")(sequelize,Sequelize)
db.librarys=require("./library")(sequelize,Sequelize)
db.keyclouds=require("./keycloud")(sequelize,Sequelize)
db.users=require("./user")(sequelize,Sequelize)
db.roles=require("./role.model")(sequelize,Sequelize)
db.candidature_offres=require("./candidature_offre")(sequelize,Sequelize)
db.offre_librarys=require("./offre_library")(sequelize,Sequelize)
db.evaluations=require("./evaluation")(sequelize,Sequelize)
db.valid=require("./valid")(sequelize,Sequelize)
db.candidature_librarys=require("./candidature_library")(sequelize,Sequelize)








//  //****Many to Many******** */

// //  //candidature & library
// db.candidatures.belongsToMany(db.librarys,{
//   through : 'Candidature_libraries',
//   as:'library',
//   foreignKey:'candidatureId',

// })
// db.librarys.belongsToMany(db.candidatures,{
//   through : 'Candidature_libraries',
//   as:'candidature',
//   foreignKey:'libraryId',

// })

//keycloud & offres
db.keyclouds.belongsToMany(db.offres,{
  through : 'cloud_offre',
  as:'offre',
  foreignKey:'keycloudId',

})
db.offres.belongsToMany(db.keyclouds,{
  through : 'cloud_offre',
  as:'keycloud',
  foreignKey:'offreId',

})




 /

//role & user
db.roles.belongsToMany(db.users,{
  through: "user_role",
  as:"user",
  foreignKey: "role_id"
})

db.users.belongsToMany(db.roles,{
  through: "user_role",
  as : "role",
  foreignKey : "user_id"
})

//user  & librairy

db.users.belongsToMany(db.librarys,{
  through: "user_library",
  foreignKey : 'userId',
  as: 'library'
})

db.librarys.belongsToMany(db.users,{
  through: "user_library",
  foreignKey : 'libraryId',
  as: 'user'

})



// //ONE to MANY
// //offre & degree

db.degrees.hasMany(db.offres,{
  foreignKey : 'degreeId',
  as: 'offre'
})

db.offres.belongsTo(db.degrees,{
  foreignKey : 'degreeId',
  as: 'degree'

})

// offre experience

db.experiences.hasMany(db.offres,{
  foreignKey : 'experienceId',
  as: 'offre'
})

db.offres.belongsTo(db.experiences,{
  foreignKey : 'experienceId',
  as: 'experience'

})

// offre  disponibilite

db.disponibilites.hasMany(db.offres,{
  foreignKey : 'disponibiliteId',
  as: 'offre'
})

db.offres.belongsTo(db.disponibilites,{
  foreignKey : 'disponibiliteId',
  as: 'disponibilite'

})

//offre & job

db.jobs.hasMany(db.offres,{
  foreignKey : 'jobId',
  as: 'offre'
})

db.offres.belongsTo(db.jobs,{
  foreignKey : 'jobId',
  as: 'job'

})

//library & questions
db.librarys.hasMany(db.questions,{
  foreignKey : 'libraryId',
  as: 'questions',
  onDelete:"CASCADE"
})

db.questions.belongsTo(db.librarys,{
  foreignKey : 'libraryId',
  as: 'library'

})

//question & choix
db.questions.hasMany(db.choixs,{
  foreignKey : 'questionId',
  as: 'choix'
})

db.choixs.belongsTo(db.questions,{
  foreignKey : 'questionId',
  as: 'question'

})





// candidature_offre & offre

db.offres.hasMany(db.candidature_offres,{
  foreignKey : 'offreId',
  as: 'candidature_offre'
})

db.candidature_offres.belongsTo(db.offres,{
  foreignKey : 'offreId',
  as: 'offre'

})

// candidature_offre & candidature
db.candidatures.hasMany(db.candidature_offres,{
  foreignKey : 'candidatureId',
  as: 'candidature_offre'
})

db.candidature_offres.belongsTo(db.candidatures,{
  foreignKey : 'candidatureId',
  as: 'candidature'

})

// candidature_offre & links
db.links.hasMany(db.candidature_offres,{
  foreignKey : 'linkId',
  as: 'candidature_offre'
})

db.candidature_offres.belongsTo(db.links,{
  foreignKey : 'candidatureId',
  as: 'link'

})

// offre_library & offre
db.offres.hasMany(db.offre_librarys,{
  foreignKey : 'offreId',
  as: 'offre_library'
})

db.offre_librarys.belongsTo(db.offres,{
  foreignKey : 'offreId',
  as: 'offre'

})

// offre_library & library
db.librarys.hasMany(db.offre_librarys,{
  foreignKey : 'libraryId',
  as: 'offre_library'
})

db.offre_librarys.belongsTo(db.librarys,{
  foreignKey : 'libraryId',
  as: 'library'

})

// // evaluation & candidature_offre
// db.candidature_offres.hasMany(db.evaluations,{
//   foreignKey : 'candidature_offreId',
//   as: 'evaluation'
// })

// db.evaluations.belongsTo(db.candidature_offres,{
//   foreignKey : 'candidature_offreId',
//   as: 'candidature_offre'

// })

// // evaluation & offre_library
// db.offre_librarys.hasMany(db.evaluations,{
//   foreignKey : 'offre_libraryId',
//   as: 'evaluation'
// })

// db.evaluations.belongsTo(db.offre_librarys,{
//   foreignKey : 'offre_libraryId',
//   as: 'offre_library'

// })

//user offre 


db.users.hasMany(db.offres,{
  foreignKey : 'userId',
  as: 'offre'
})

db.offres.belongsTo(db.users,{
  foreignKey : 'userId',
  as: 'user'

})


db.candidatures.hasMany(db.candidature_librarys,{
  foreignKey : 'candidatureId',
  as: 'candidature'
})

db.candidature_librarys.belongsTo(db.candidatures,{
 
  as: 'candidature'

})

db.librarys.hasMany(db.candidature_librarys,{
  foreignKey : 'libraryId',
  as: 'candidaturelibrary'
})

db.candidature_librarys.belongsTo(db.librarys,{
  as: 'library'

})

module.exports = db ;