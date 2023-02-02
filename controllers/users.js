import users from '../models/users.js'

export const register = async (req, res) => {
  try {
    await users.create({
      account: req.body.account,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    })
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    console.log(error.errors)
    if (error.name === 'validationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]] })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ success: false, message: '帳號重複' })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
