import boardGameList from '../models/boardGameList.js'

// 新增商品
export const createList = async (req, res) => {
  try {
    const result = await boardGameList.create({
      name: req.body.name,
      images: req.files?.images.map(file => file.path) || [],
      category: req.body.category,
      gamer: req.body.gamer,
      age: req.body.age,
      rules: req.body.rules,
      sell: req.body.sell
    })
    console.log(result)
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
export const getSellList = async (req, res) => {
  try {
    const result = await boardGameList.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllList = async (req, res) => {
  try {
    const result = await boardGameList.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getList = async (req, res) => {
  try {
    const result = await boardGameList.findById(req.params.id)
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
export const editList = async (req, res) => {
  try {
    const result = await boardGameList.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      images: req.files?.images.map(file => file.path) || [],
      category: req.body.category,
      gamer: req.body.gamer,
      age: req.body.age,
      rules: req.body.rules,
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
