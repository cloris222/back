import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
  u_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少預約人Id']
  },
  name: {
    type: String,
    required: [true, '缺少預約人姓名']
  },
  phone: {
    type: String,
    required: [true, '缺少預約人電話']
  },
  date: {
    type: Date,
    required: [true, '缺少預約日期']
  },
  participant: {
    type: Number,
    required: [true, '缺少預約人數']
  },
  hours: {
    type: Number,
    required: [true, '缺少預約時數']
  },
  consumptionPatterns: {
    type: String,
    required: [true, '缺少消費方式']
  },
  others: {
    type: String,
    default: ''
  }
}, { versionKey: false })

export default model('orders', orderSchema)
