require("dotenv").config()
const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
// const bodyParser = require('body-parser')

const route = require('./Routes/routes')

const router = require('./Routes/data')
require('./DB/db')

// app.use((req,res,next)=>{
//     console.log('Incoming request: ',req.method,req.url,req.body);
//     next()
// })



// const static_path = path.join(__dirname,"./index.html")
// app.use(express.static(static_path))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.json())
// app.use(bodyParser.json())
app.use(cors())
// app.use((req, res, next) => {
//     if (req.originalUrl === '/favicon.ico') {
//       return res.status(204).send();
//     }
//     next();
//   });
app.use('/auth',route)
app.use('/data',router)



const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server listened at http://localhost:${port}`);
})
