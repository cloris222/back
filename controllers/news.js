import news from '../models/news.js'

// 新增公告
export const createNews = async (req, res) => {
  try {
    const result = await news.create({
      date: req.body.date,
      title: req.body.title,
      images: req.files?.images.map(file => file.path) || [],
      description: req.body.description,
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

// get公告
export const getSellNews = async (req, res) => {
  try {
    const result = await news.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllNews = async (req, res) => {
  try {
    const result = await news.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getNews = async (req, res) => {
  try {
    const result = await news.findById(req.params.id)
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

// 編輯公告
export const editNews = async (req, res) => {
  try {
    const result = await news.findByIdAndUpdate(req.params.id, {
      date: req.body.date,
      title: req.body.title,
      images: req.files?.images.map(file => file.path) || [],
      description: req.body.description,
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
