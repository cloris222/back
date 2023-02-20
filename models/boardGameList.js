import { Schema, model } from 'mongoose'

const boardGameListSchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少桌遊名稱']
  },
  images: {
    type: [String],
    required: [true, '缺少圖片']
  },
  category: {
    type: [String],
    required: [true, '缺少標籤'],
    enum:
    {
      values: ['派對遊戲', '策略遊戲', '陣營遊戲', '親子遊戲', '紙牌遊戲', '其他遊戲', '熱門遊戲', '最新遊戲', '新手友善'],
      message: '分類錯誤'
    }
  },
  gamer: {
    type: String,
    required: [true, '缺少遊戲人數']
  },
  age: {
    type: Number,
    required: [true, '缺少適玩年齡']
  },
  rules: {
    type: String,
    required: [true, '缺少遊戲說明']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態'],
    default: false
  }
}, { versionKey: false })

export default model('boardGameList', boardGameListSchema)
