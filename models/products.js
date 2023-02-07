import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少商品名稱']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  category: {
    type: String,
    required: [true, '缺少標籤'],
    enum:
    {
      value: ['派對遊戲', '策略遊戲', '陣營遊戲', '親子遊戲', '紙牌遊戲', '其他遊戲', '暢銷遊戲', '最新上架', '撿便宜', '八成新', '近全新'],
      message: '分類錯誤'
    }
  },
  gamer: {
    type: Number,
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
  price: {
    type: Number,
    required: [true, '缺少商品價格']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態'],
    default: false
  }
}, { versionKey: false })

export default model('products', productSchema)
