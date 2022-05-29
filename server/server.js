const express = require("express");
const path = require("path")
const bodyParser = require("body-parser"); 
const cors = require("cors");
const app = express();
const degreeRoute = require("./app/routes/degree.route")
const experienceRoute = require("./app/routes/experience.route")
const jobRoute = require("./app/routes/job.route")
const disponibiliteRoute = require("./app/routes/disponibilite.route")
const linkRoute = require("./app/routes/link.route")
const candidatureRoute = require("./app/routes/candidature.route")
const offreRoute = require("./app/routes/offre.route")
const questionRoute = require("./app/routes/question.route")
const choixRoute = require("./app/routes/choix.route")
const keycloudRoute = require("./app/routes/keycloud.route")
const libraryRoute = require("./app/routes/library.route")
const userRoute = require("./app/routes/user.route")
const candidature_offreRoute = require("./app/routes/candidature_offre.route")
const candidature_libraryRoute = require("./app/routes/candidature_library.route")
const offre_libraryRoute = require("./app/routes/offre_library.route")
const evaluationRoute = require("./app/routes/evaluation.route")
const valideRoute = require("./app/routes/valid.route")

const roleRoute = require('./app/routes/role.route')









var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});



const db = require("./app/models");
const Role = db.roles;
const roleModel = require("./app/models/role.model");

app.use(degreeRoute)
app.use(experienceRoute)
app.use(jobRoute)
app.use(disponibiliteRoute)
app.use(linkRoute)
app.use(candidatureRoute)
app.use(offreRoute)
app.use(questionRoute)
app.use(choixRoute)
app.use(keycloudRoute)
app.use(libraryRoute)
app.use(userRoute)
app.use(candidature_offreRoute)
app.use(offre_libraryRoute)
app.use(evaluationRoute)
app.use(valideRoute)
app.use("/role",roleRoute)
app.use(candidature_libraryRoute)
app.use("/cv",express.static(path.join(__dirname, "uploads")))


// app.use(database);



db.sequelize.sync();





// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "Admin"
  });
  Role.create({
    id: 2,
    name: "Recruteur"
  });
}
