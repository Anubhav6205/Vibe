import { createContext, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { io } from 'socket.io-client';

export const AccountContext = createContext("");

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState({});
  const [activeUsers,setActiveUsers]=useState([]);
  const [toggleMessageSent, setToggleMessageSent] = useState(true);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8000');
  }, []);

  return (
    <AccountContext.Provider
      value={{ account, setAccount, openProfile, setOpenProfile, user, setUser, socket ,activeUsers,setActiveUsers,toggleMessageSent,setToggleMessageSent}}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AccountProvider;
