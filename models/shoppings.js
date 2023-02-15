import { Schema, model, ObjectId } from 'mongoose'

const shoppingProductSchema = new Schema({
  p_id: {
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
  u_id: {
    type: ObjectId,
    refs: 'users',
    required: [true, '缺少購買者Id']
  },
  name: {
    type: String,
    required: [true, '缺少購買者姓名']
  },
  date: {
    type: Date,
    default: Date.now
  },
  products: {
    type: [shoppingProductSchema],
    default: []
  },
  status: {
    type: String,
    enum: {
      values: ['準備出貨', '已出貨'],
      message: '分類錯誤'
    }
  },
  others: {
    type: String,
    default: ''
  }
}, { versionKey: false })

export default model('shoppings', shoppingsSchema)
