import MessageContainer from "../../Components/Message/MessageContainer"
import Sidebar from "../../Components/Message/Sidebar"

function MessageHome() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-blue-500 bg-clip-padding 
    backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default MessageHome
