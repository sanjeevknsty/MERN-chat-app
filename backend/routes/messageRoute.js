const express = require("express")
const authToken = require("../middleware/authToken")
const { chatMessage, allMessages } = require("../controllers/messageControllers")

const router = express.Router()

router.post('/',authToken,chatMessage)
router.get('/:chatId',authToken,allMessages)

module.exports = router