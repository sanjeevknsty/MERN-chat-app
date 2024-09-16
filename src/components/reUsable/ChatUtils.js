export function checkAvatar (user,allMessages,i){
return i < allMessages.length &&
user._id !== allMessages[i].sender._id &&
( allMessages[i-1] === undefined || allMessages[i-1].sender._id !== allMessages[i].sender._id  )

}

export function checkChatName (element,user){
  return element.isGroup ? element.name : (user._id === element.users[0]._id) ? element.users[1].name : element.users[0].name        
}