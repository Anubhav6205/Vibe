import LoginBox from "../Login Box/LoginBox";
import Login from "../Login/Login";
import ChatBox from "../Chats/ChatBox";
import { useContext, useEffect,useState } from "react";

import { AccountContext } from "../../context/AccountProvider";

const Message = () => {
  const { account } = useContext(AccountContext);
  const [access,setAccess]=useState(false);

  useEffect(() => {
    // console.log(account);
    if(account) setAccess(true)
  }, [account]);

  return (
    <>
      {access ? (
        <>
        <Login />
        <ChatBox />
        </>
      ) : (
        <>
          <Login />
          <LoginBox />
        </>
      )}
    </>
  );
};

export default Message;
