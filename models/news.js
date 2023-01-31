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
  descruption: {
    type: String,
    required: [true, '缺少公告內容']
  }
}, { versionKey: false })

export default model('news', NewsSchema)
