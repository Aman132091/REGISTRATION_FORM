const express = require("express")
const authmiddleware = require("../Middleware/authmiddleware")

const dataController = require("../Controller/data")

const router = express.Router()
router.use(authmiddleware)

router.post('/create',dataController.create)
router.get('/read/:id',dataController.read)
router.put('/update/:id',dataController.update)
router.delete('/delete/:id',dataController.deleteDocument)

module.exports = router;