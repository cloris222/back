import { Schema, model, ObjectId } from 'mongoose'

const EventsSchema = new Schema({
  name: {
    type: String,
    reqired: [true, '缺少活動名稱']
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: [true, '缺少活動日期']
  },
  p_Id: {
    type: ObjectId,
    refs: 'users',
    required: [true, '缺少報名者Id']
  },
  p_name: {
    type: String,
    required: [true, '缺少報名者姓名']
  },
  fee: {
    type: Number,
    required: [true, '缺少活動費用']
  },
  closeDate: {
    type: Date,
    required: [true, '缺少截止報名日期']
  },
  status: {
    type: String,
    required: [true, '缺少活動狀態'],
    enum: {
      values: ['敬請期待', '報名中', '截止報名'],
      message: '分類錯誤'
    }
  },
  others: {
    type: String,
    default: ''
  }
}, { versionKey: false })

export default model('events', EventsSchema)
