import passport from 'passport'
import bcrypt from 'bcrypt'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import users from '../models/users.js'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy

passport.use('login', new LocalStrategy({
  usernameField: 'loginaccount',
  passwordField: 'loginpassword'
//   done(錯誤，傳到下一步的資料，傳到下一步info的內容)
}, async (loginaccount, loginpassword, done) => {
  try {
    const user = await users.findOne({ account: loginaccount })
    if (!user) {
      return done(null, false, { message: '帳號不存在' })
    }
    if (!bcrypt.compareSync(loginpassword, user.password)) {
      return done(null, false, { message: '密碼錯誤' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))
// 用JWT策略寫jwt方式
passport.use('jwt', new JWTStrategy({
  // JWT從哪裡來的
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
//   payload為jwt解譯出來的資料
}, async (req, payload, done) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const user = await users.findOne({ _id: payload._id, tokens: token })
    if (user) {
      return done(null, { user, token })
    }
    return done(null, false, { message: '使用者不存在或JWT無效' })
  } catch (error) {
    return done(error, false)
  }
}))
