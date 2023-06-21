import { Box } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import styled from "@emotion/styled";
import ChatIcon from '@mui/icons-material/Chat';

import MoreVertMenu from "./MoreVertMenu";
import ProfileDrawer from "../Drawer/ProfileDrawer";


const HeaderContainer=styled(Box)`
display:flex;
align-items:center;

padding:.5rem 1rem;
height:8vh;
background:#32349C;

`

const Image=styled('img')({
  height:40,
  width:40,
  borderRadius:'50%'
})

const IconsContainer=styled(Box)`
margin-left:auto;
display:flex;
align-items:center;
& > *{
  padding:0 0rem 0 .1rem;
  font-size:25px;
  color:white;
  
}
& :first-of-type{
  font-size:25px;
}
`
export default function Header() {
  const { account,setOpenProfile } = useContext(AccountContext);
  


  const toggleDrawer=()=>{
    setOpenProfile(true);
  }
  return (
    <HeaderContainer>
      <Image src={account.picture} alt="Profile Pic" onClick={()=>toggleDrawer()}></Image>
      <IconsContainer>
         <ChatIcon/>
         <MoreVertMenu/>
      </IconsContainer>
      <ProfileDrawer/>
    </HeaderContainer>

  );
}
