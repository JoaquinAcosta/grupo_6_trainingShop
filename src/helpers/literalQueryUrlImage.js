const { literal } = require("sequelize");
// avatar    urlAvatar
const literalQueryUrlImage = (
  req,
  field,
  alias,
  pathRoute = "/apiProducts"
) => {
  const urlImage = () => `${req.protocol}://${req.get("host")}${pathRoute}/image/`;

  return [literal(`CONCAT( '${urlImage()}', ${field} )`), alias];
};

module.exports = { literalQueryUrlImage }
