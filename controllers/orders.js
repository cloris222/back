import orders from '../models/orders.js'

export const createOrders = async (req, res) => {
  try {
    //  console.log(req)
    const result = await orders.create({
      u_id: req.user._id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      orderDate: req.body.orderDate,
      orderonDate: req.body.orderonDate,
      participant: req.body.participant,
      time: req.body.time,
      hours: req.body.hours,
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
    const result = await orders.find({ orderDate: req.body.orderDate }).select('time hours')
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
    const result = await orders.find().populate('u_id', 'name')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
