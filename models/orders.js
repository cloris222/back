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
  orderDate: {
    type: Date,
    required: [true, '缺少預約日期']
  },
  orderonDate: {
    type: Date,
    default: Date.now
  },
  participant: {
    type: Number,
    required: [true, '缺少預約人數']
  },
  time: {
    type: String,
    required: [true, '缺少預約時間'],
    enum:
    {
      values: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      message: '分類錯誤'
    }

  },
  hours: {
    type: Number,
    required: [true, '缺少預約時數']
  },
  others: {
    type: String,
    default: ''
  }
}, { versionKey: false })

export default model('orders', orderSchema)
