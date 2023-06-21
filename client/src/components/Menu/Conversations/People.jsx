import { getUser } from "../../../api/api";
import { useState, useEffect } from "react";
import { Box, Divider, styled } from "@mui/material";
import Conversation from "./Conversation";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { SearchContext } from "../../../context/SearchProvider";

const PeopleContainer = styled(Box)`
height: 75vh;
overflow-y: overlay;
`;

const StyledDivider = styled(Divider)`
margin: 0 1rem;
background-color:white;
opacity:50%;
`;

export default function People() {
  const { account ,socket,setActiveUsers} = useContext(AccountContext);
  const [users, setUsers] = useState([]);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    const fetchUserData = async () => {
      let response = await getUser();
      let filteredResponse = response.user.filter(user=>user.name.toLowerCase().includes(search.toLowerCase()));

      setUsers(filteredResponse);
    };
    fetchUserData();
  }, [search]);

  //adding active user account to users array in socket controller
  //emits addUsers and sends current user account as parameter 
  useEffect(()=>{
    socket.current.emit('addUsers',account);
    

    //getting active users data from backend 
    //gets active users as parameter
    //when new user logs in account value changes and useeffect starts 
    socket.current.on('getUsers',(usersSocket)=>{
      setActiveUsers(usersSocket);
    })
  },[account])


  return (
    <PeopleContainer>
      {users.map(
        (user) =>
          user.sub !== account.sub && (
            <Box key={user._id}>
              <Conversation user={user} />
              <StyledDivider />
            </Box>
          )
      )}
    </PeopleContainer>
  );
}
