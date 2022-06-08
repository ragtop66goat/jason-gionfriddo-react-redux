import {useSelector} from "react-redux";
import {Login} from "./components/Login/Login";
import {Threadlist} from "./components/Threadlist/Threadlist";
import {UserList} from "./components/UserList/UserList";
import {MessageList} from "./components/MessageList/MessageList";
import {MessageInput} from "./components/MessageInput/MessageInput";

function App({
               _useSelector = useSelector,
               _Login = Login,
               _UserList = UserList,
               _MessageInput = MessageInput,
               _MessageList = MessageList,
               _Threadlist = Threadlist,
             }) {

  const currentUser = _useSelector((state) => state.currentUser);
  const selectedUser = _useSelector((state) => state.selectedUser);


  if (!currentUser) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <_Login/>
      </div>
    );
  }

  if (selectedUser) {
    return <_MessageInput/>
  }

  return (
    <div className={"mt-3 d-flex justify-content-between"}>
      <div>
        <_MessageList/>
      </div>
      <div>
        <_Threadlist/>
      </div>
      <div>
        <_UserList/>
      </div>
    </div>
  )
}

export default App;
