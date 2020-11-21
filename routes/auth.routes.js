const {
  Router
} = require('express')
const bcrypt = require('bcryptjs')
const {
  check,
  validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum length of password is 6 symbol')
    .isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data for registration'
        })
      }
      const {
        email,
        password
      } = req.body
      const candidate = await User.findOne({
        email
      })

      if (candidate) {
        return res.status(400).json({
          message: `User with email: ${email} already yet`
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword
      })

      await user.save()

      res.status(201).json({
        message: 'User Has been created'
      })


    } catch (e) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  })

// /api/auth/login
router.post('/login',
  [
    check('email', 'Enter a valid email').normalizeEmail().isEmail(),
    check('email', 'Enter a password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data Sign in'
        })
      }

      const {
        email,
        password
      } = req.body

      const user = await User.findOne({
        email
      })

      if (!user) {
        return res.status(400).json({
          message: 'User not Found'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect password, try again'
        })
      }

      const token = jwt.sign({
          userId: user.id
        },
        config.get("jwtSecret"), {
          expiresIn: '1h'
        }
      )

      res.json({
        token,
        userId: user.id
      })

    } catch (e) {
      res.status(500).json({
        message: 'something went wrong'
      })
    }
  })

module.exports = router
