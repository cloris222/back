import { Schema, model } from 'mongoose'

const NewsSchema = new Schema({
  date: {
    type: Date,
    required: [true, '缺少公告日期'],
    default: Date.now
  },
  title: {
    type: String,
    required: [true, '缺少公告標題']
  },
  description: {
    type: String,
    required: [true, '缺少公告內容']
  },
  images: {
    type: [String],
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態']
  }
}, { versionKey: false })

export default model('news', NewsSchema)
