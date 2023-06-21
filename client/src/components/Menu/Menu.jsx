
import Header from "./Header"
import People from "./Conversations/People"
import Search from "./Search"
import styled from "@emotion/styled"
import { Box } from "@mui/material";
import { useState } from "react";

const MenuContainer=styled(Box)`
border-right:1px solid #efefef;
height:100%;
background:#32349C;

`;
export default function Menu() {
 
  const [search,setSearch]=useState("");
  return (

  
    <MenuContainer>
      <Header/>
      <Search search={search} setSearch={setSearch}/>
      <People/>
    </MenuContainer>
  )
}
