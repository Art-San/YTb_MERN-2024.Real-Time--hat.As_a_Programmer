import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation'

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authUser._id
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

  const shakeClass = message.shouldShake ? 'shake' : ''

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs text-slate-100 flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  )
}
export default Message

// const Message = () => {
//   return (
//     // <>
//     //   <div className="chat chat-start">
//     //     <div className="chat-image avatar">
//     //       <div className="w-10 rounded-full">
//     //         <img
//     //           alt="Tailwind CSS chat bubble component"
//     //           src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//     //         />
//     //       </div>
//     //     </div>
//     //     <div className="chat-header">
//     //       Obi-Wan Kenobi
//     //       <time className="text-xs opacity-50">12:45</time>
//     //     </div>
//     //     <div className="chat-bubble">You were the Chosen One!</div>
//     //     <div className="chat-footer opacity-50">Delivered</div>
//     //   </div>
//     //   <div className="chat chat-end">
//     //     <div className="chat-image avatar">
//     //       <div className="w-10 rounded-full">
//     //         <img
//     //           alt="Tailwind CSS chat bubble component"
//     //           src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//     //         />
//     //       </div>
//     //     </div>
//     //     <div className="chat-header">
//     //       Anakin
//     //       <time className="text-xs opacity-50">12:46</time>
//     //     </div>
//     //     <div className="chat-bubble">I hate you!</div>
//     //     <div className="chat-footer opacity-50">Seen at 12:46</div>
//     //   </div>
//     // </>
//     <div className=" chat chat-end">
//       <div className=" chat-image avatar">
//         <div className="w-10 rounded-full ">
//           <img
//             alt="Tailwind CSS chat bubble component"
//             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//           />
//         </div>
//       </div>
//       <div className="chat-bubble text-white bg-blue-500">
//         You were the Chosen One!
//       </div>
//       <div className="chat-footer opacity-50 text-xs gap-1 items-center">
//         Seen at 12:46
//       </div>
//     </div>
//   )
// }

// export default Message
