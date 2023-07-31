const bcrypt = require('bcrypt')
const saultRounds = 12

const hashPass = value =>
{
  return bcrypt.hashSync(value, saultRounds)
}
const comparePass = (originVal, hashedVal) =>
{
  return bcrypt.compareSync(originVal, hashedVal)
}

module.exports = {
  hashPass,
  comparePass
}
