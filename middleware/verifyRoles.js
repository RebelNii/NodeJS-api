//(...(is called rest operator(its diff from spread operator) and allws us to name multiple params))
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    const results = req.roles.map((rol) => rolesArray.includes(rol))
      .find((val) => val === true);
    if (!results) {
      return res.sendStatus(401);
    } else {
      next();
    }
  };
};

module.exports = verifyRoles ;
