import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types"; // Import PropTypes
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const Image = styled("img")`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  background: #f0f4ff;
  border-bottom: 1px solid #c4c3d9;
  color: black;
  height: 8vh;
  position: relative;
  
`;

const Icons = styled(Box)`
  & > svg {
    margin-right: 1rem;
    color: black;
    cursor: pointer;
  }
`;

const LeftContainer = styled(Box)`
  display: flex;
  align-items: center;
  color: black;
`;

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: absolute;
  right: 12%;
`;

const SearchInput = styled("input")`
  border: none;
  outline: none;
  margin-left: 0.5rem;
  padding: 0.3rem 1rem;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.isSearchOpen ? "130px" : "0")};
  opacity: ${(props) => (props.isSearchOpen ? "1" : "0")};

  &:focus {
    width: 150px;
  }
`;

SearchInput.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired // Validate isSearchOpen prop
};

export default function TextHeader({setSearchedText,searchedText}) {
  const { user,activeUsers } = useContext(AccountContext);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
  };

  const currentActiveUser=activeUsers.find((currentUser)=>currentUser.sub===user.sub);



  return (
    <HeaderContainer>
      <LeftContainer>
        <Image src={user.picture} alt="Other user's Profile Pic" />
        <Box marginLeft="1rem">
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="caption">{currentActiveUser?"Online":"Offline"}</Typography>
        </Box>
      </LeftContainer>
      <Icons>
        <SearchIcon onClick={handleSearchClick} />
        <MoreVertIcon />
      </Icons>
      <SearchContainer>
        <SearchInput
          isSearchOpen={isSearchOpen}
          type="text"
          placeholder="Search..."
          value={searchedText}
          onChange={(event)=>setSearchedText(event.target.value)}
        />
      </SearchContainer>
    </HeaderContainer>
  );
}



TextHeader.propTypes={
  searchedText:PropTypes.string.isRequired,
  setSearchedText:PropTypes.func.isRequired
}