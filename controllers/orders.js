import orders from '../models/orders.js'

export const createOrders = async (req, res) => {
  try {
    const result = await orders.create({
      u_id: req.body.u_id,
      name: req.body.name,
      phone: req.body.phone,
      orderDate: req.body.orderDate,
      participant: req.body.participant,
      hour: req.body.hour,
      others: req.body.others
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

export const getAvailableOrders = async (req, res) => {
  try {
    const result = await orders.find({ orderDate: req.body.orderDate }).select('time hour')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ u_id: req.user._id })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    // .populate(關聯資料路徑, 取的欄位)
    const result = await orders.find().populate('u_id', 'account', 'name')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
