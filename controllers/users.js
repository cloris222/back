import users from '../models/users.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    await users.create({
      account: req.body.registeraccount,
      password: req.body.registerpassword,
      name: req.body.registername,
      email: req.body.registeremail,
      phone: req.body.registerphone
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
export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '',
      result: {
        token,
        phone: req.user.phone,
        name: req.user.name,
        account: req.user.loginaccount,
        email: req.user.loginemail,
        cart: req.user.cart.reduce((total, current) => total + current.quantity, 0),
        favorites: req.user.loginfavorites,
        role: req.user.loginrole
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getUser = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: '',
      result: {
        account: req.user.loginaccount,
        email: req.user.loginemail,
        cart: req.user.cart,
        favorites: req.user.loginfavorites,
        role: req.user.loginrole
      }
    })
  } catch (error) {
    // console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
