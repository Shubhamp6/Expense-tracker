const jwt = require("jsonwebtoken")


class TokenServices {
  constructor(type = 'acesss') {
    this.type = type // refresh | otp
  }
  generate(data) {
    if (data.password) {
      delete data['password']
    }
    const key = this.getKey()
    const expiresIn = this.getExpiryTime()
    return jwt.sign(
      {
        ...data
      },
      key,
      { expiresIn }
    )
  }
  verify(token) {

    const key = this.getKey()

    return jwt.verify(token, key, { complete: true })
  }
  decode(token) {
    return jwt.decode(token)
  }

  getKey() {
    let key = process.env.JSON_WEB_TOKEN_SECRET_KEY


    if (this.type === 'refresh') {
      key = process.env.JSON_REFRESH_TOKEN_SECRET_KEY
    }
    if (this.type === 'otp') {
      key = process.env.JSON_OTP_REFRESH_TOKEN_SECRET_KEY
    }
    return key
  }
  getExpiryTime() {


    let expiresIn = '1h'
    if (this.type === 'refresh') {

      expiresIn = '1y'
    }
    if (this.type === 'otp') {

      expiresIn = 300
    }
    return expiresIn
  }

}
module.exports = TokenServices
