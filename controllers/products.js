import products from '../models/products.js'

// 新增商品
export const createProducts = async (req, res) => {
  try {
    const result = await products.create({
      name: req.body.name,
      images: req.files?.images.map(file => file.path) || [],
      category: req.body.category,
      gamer: req.body.gamer,
      age: req.body.age,
      rules: req.body.rules,
      price: req.body.price,
      sell: req.body.sell
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

// 查詢商品
export const getSellProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

// 篩選商品
export const getFilterSellProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true }, { gamer: { $gte: req.params.gamer }, category: { $in: req.params.category }, price: { $gte: req.params.price } })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

// 編輯商品
export const editProducts = async (req, res) => {
  try {
    const result = await products.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      images: req.files?.images.map(file => file.path) || req.body.images,
      category: req.body.category,
      gamer: req.body.gamer,
      age: req.body.age,
      rules: req.body.rules,
      price: req.body.price,
      sell: req.body.sell
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
