import { AvatarGroup,Avatar } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { checkChatName } from '../reUsable/ChatUtils'
import userContext from '../context/userContext'

const AvatarFrame = ({element}) => {
  const context = useContext(userContext)
  const {user} = context

  return (
    <>
      {element.isGroup ? <AvatarGroup size="md" spacing={-10} max={2} >
                  {element.users.map((ele) => {
                    return <Avatar name='Ryan Florence' src={ele.profilePicture} />

                  })}
                </AvatarGroup> : <Avatar display="flex" size='md' alignItems="center" name={checkChatName(element,user)}
                  src={element.profilePicture} />
      }
    </>
  )
}

export default AvatarFrame
