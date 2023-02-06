import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少商品數量']
  }
})

const userSchema = new Schema({
  account: {
    type: String,
    required: [true, '請輸入帳號'],
    minlength: [4, '請填入4~12字元'],
    maxlength: [12, '請填入4~12字元'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  name: {
    type: String,
    required: [true, '請輸入姓名']
  },
  email: {
    type: String,
    required: [true, '請輸入信箱'],
    unique: true,
    // 自訂驗證
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  phone: {
    type: String,
    required: [true, '請輸入電話'],
    unique: true,
    validate: {
      validator (phone) {
        return validator.isMobilePhone(phone, 'zh-TW')
      },
      message: '電話格式錯誤'
    }
  },
  avatar: {
    type: String
  },
  tokens: {
    type: [String],
    default: []
  },
  cart: {
    type: [cartSchema],
    default: []
  },
  role: {
    type: Number,
    // 0 = user
    // 1 = admin
    default: 0
  },
  favorites: {
    type: [ObjectId],
    default: []
  }
}, { versionKey: false })

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 12) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 12) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default model('users', userSchema)
