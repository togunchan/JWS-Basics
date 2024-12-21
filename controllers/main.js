const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(`Username: ${username} and password: ${password}`)
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  // just for demo, normally this is provided by DB
  const id = new Date().getDate()
  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  console.log('BURADAYIM')
  res.status(200).json({ msg: 'user created!', token })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  const { id, username } = req.user
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello ${username} with the ID of ${id}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
