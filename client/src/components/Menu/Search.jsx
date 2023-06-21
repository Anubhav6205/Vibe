import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

import { useContext } from "react";
import { SearchContext } from "../../context/SearchProvider";
const Input = styled(InputBase)`
  padding: 0 2rem;

  color:white;
`;

const Icon = styled(Box)`
  position: absolute;
  color: #aaaaaa;
  display:flex;
  align-items:center;


`;

const SearchContainer = styled(Box)`
  margin:0 0 .5rem 0;
  padding: 0.5rem 1rem;
  background:transparent;
`;

const SubContainer = styled(Box)`
  display: flex;
  align-items: center;
  background: transparent;
  border-bottom:1px solid white;
  padding: 0.1rem 0.5rem;
  
 
`;

export default function Search() {
  const {search,setSearch}=useContext(SearchContext)

  const handleChange = (event) => {
    setSearch(event.target.value);
    // console.log(search);
  };

  return (
    <SearchContainer>
      <SubContainer>
        <Icon>
          <SearchIcon style={{height:'18px'}} />
        </Icon>
        <Input
          placeholder="Search a chat"
          value={search}
          onChange={handleChange}
   
        />
      </SubContainer>
    </SearchContainer>
  );
}

