import { Box, Drawer } from "@mui/material";
import { PropTypes } from "prop-types";
import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";
export default function ProfileDrawer() {
  const { openProfile, setOpenProfile } = useContext(AccountContext);
  const toggleDrawer = () => {
    setOpenProfile(false);
  };



  const drawerStyles = {
    left: "7.5%",
    width: "25%",
    minWidth: "330px",
    height: "92%",
    top: "4%",
    borderTopLeftRadius: ".2rem",
    borderBottomLeftRadius: ".2rem",
    backgroundColor:"#f8faf0",
  };

  const [openDrawer,setOpenDrawer]=useState(false);
  useEffect(()=>{
    setOpenDrawer(openProfile)
  },[openProfile])

  return (
    <Drawer
      open={openDrawer}
      onClose={toggleDrawer}
      PaperProps={{ sx: drawerStyles }}
      style={{ zIndex: 1500 }}
    >
      <Box>
        <ProfileHeader sOpen={setOpenProfile}/>
        <ProfileMain/>
      </Box>
    </Drawer>
  );
}

ProfileDrawer.propTypes = {
  openProfile: PropTypes.bool,
  setOpenProfile: PropTypes.func
};
