import { Schema, model, ObjectId } from 'mongoose'

const shoppingProductSchema = new Schema({
  p_Id: {
    type: ObjectId,
    refs: 'products',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  },
  price: {
    type: Number,
    required: [true, '缺少價格']
  }
})

const shoppingsSchema = new Schema({
  user: {
    type: ObjectId,
    refs: 'users',
    required: [true, '缺少購買者Id']
  },
  name: {
    type: String,
    required: [true, '缺少購買者姓名']
  },
  products: {
    type: [shoppingProductSchema],
    default: []
  },
  total: {
    type: Number,
    required: [true, '缺少總金額']
  },
  status: {
    type: String,
    enum: {
      value: ['準備出貨', '已出貨'],
      message: '分類錯誤'
    }
  },
  others: {
    type: String,
    default: ''
  }
}, { versionKey: false })

export default model('shoppings', shoppingsSchema)
