const express = require("express")
const authToken = require("../middleware/authToken")
const { accesschat, fetchchats, groupChat, rename, addUserToGroup, deleteUser } = require("../controllers/chatController")
const router  = express.Router()


router.post('/',authToken,accesschat)
router.get('/',authToken,fetchchats)
router.post("/groupchat",authToken,groupChat)
router.put("/rename",authToken,rename)
router.put("/adduser",authToken,addUserToGroup)
router.put("/deleteuser",authToken,deleteUser)



module.exports = router