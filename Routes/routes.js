const express = require("express")
const authcontroller = require('../Controller/authcontroller')

const router = express.Router()

router.get('/signup', (req, res) => {
    console.log('Incoming request: GET /auth/signup', req.body)
    res.render('signup')
})
router.get('/signin', (req, res) => {
    console.log('Incoming request: GET /auth/signin', req.body)
    res.render('signin')
})

router.post('/signup', (req, res, next) => {
    console.log('Incoming request: POST /auth/signup', req.body)
    next()
}, authcontroller.signup)
router.post('/signin', (req, res, next) => {
    console.log('Incoming request: POST /auth/signin', req.body)
    next()
}, authcontroller.signin)

module.exports = router;


















// const express = require("express")
// const authcontroller = require('../Controller/authcontroller')

// const router = express.Router()

// router.get('/signup',(req,res)=>{
//     res.render('signup')
// })
// router.get('/signin',(req,res)=>{
//     res.render('signin')
// })

// router.post('/signup',authcontroller.signup)
// router.post('/signin',authcontroller.signin)
// // router.use((req,res)=>{
// //     res.status(404).json({message:'not found'})
// // })

// module.exports = router;