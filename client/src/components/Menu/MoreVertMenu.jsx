import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
const options = ["Profile", "Settings"];

const ITEM_HEIGHT = 48;

const Items =styled(MenuItem)`
font-size:.8rem;
color:grey;
`


export default function MoreVertMenu() {
  const {setOpenProfile}=useContext(AccountContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{color:'white'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
        transformOrigin={{
            vertical:'top',
            horizontal:'right'

        }}
      >
        {options.map((option) => (
          <Items
            key={option}
            selected={option === "Pyxis"}
            onClick={()=>{handleClose();
            setOpenProfile(true)}}
          >
            {option}
          </Items>
        ))}
      </Menu>
    </div>
  );
}
