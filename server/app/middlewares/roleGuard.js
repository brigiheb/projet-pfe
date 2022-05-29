const db = require("../models");
const User = db.users;
module.exports = (Roles)=>{
return async function (req,res,next){
const roles = await User.findByPk(req.user.id).then(async user => {
    return await user.getRole().map(role=>role.id)
})
console.log(roles)
for (let i = 0; i < Roles.length; i++) {
    if (roles.includes(Roles[i])) {
      next();
      return;
    }
  }
  return res.status(403).json("forbeiden")
}
}