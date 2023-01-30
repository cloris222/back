import { Schema, model, ObjectId } from 'mongoose'
import validator from 'validator'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    // ref:'products'
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
    minlength: [4, '請填入4-12字元'],
    maxlength: [12, '請填入4-12字元'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
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
        return validator.isMobilePhone(phone['zh-TW'])
      },
      message: '電話格式錯誤'
    }
  },
  picture: {
    type: String,
    required: true,
    default: ''
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

export default model('users', userSchema)
