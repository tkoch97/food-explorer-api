// configurações de autenticação da nossa aplicação.

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET,
    expiresIn: "1d"
  }
}