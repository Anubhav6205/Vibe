import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import styled from "@emotion/styled";
const ProfileHeaderContainer=styled(Box)`
height:70px;
background-color:#32349C;
color:white;
display:flex;
align-items:center; 

`;

const HeaderSubContainer=styled(Box)`
width:100%;
display:flex;
height:100%;
align-items:center;
padding:0 0 0 1rem;

&>p{
    padding:0 .5rem 0rem .5rem;
    font-size:1rem;
   
}

`;

const StyledArrowBackIosIcon = styled(ArrowBackIosIcon)`
color: white;
`;
export default function ProfileHeader({ sOpen }) {
   
  return (
    <ProfileHeaderContainer>
      <HeaderSubContainer>
   
        <StyledArrowBackIosIcon onClick={() => sOpen(false)} />
        <Typography>Profile</Typography>
      </HeaderSubContainer>
    </ProfileHeaderContainer>
  );
}

ProfileHeader.propTypes = {
  sOpen: PropTypes.func
};
