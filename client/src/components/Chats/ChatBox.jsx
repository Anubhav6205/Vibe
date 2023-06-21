import { Dialog, Box } from "@mui/material";
import Menu from "../Menu/Menu";
import NoChat from "./No Chat/NoChat";
import styled from "@emotion/styled";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import TextBox from "./Texts/TextBox";


const dialogStyle = {
  width: "85%",
  height: "92%",
  bottom: "5rem",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "10rem 0 0 0",
  borderRadius: ".5rem",
};

const ChatContainer = styled(Box)`
  display: flex;
  height: 100%;
`;

const MenuContainer = styled(Box)`
  width: 30%;
  min-width: 340px;
`;

const MessagesContainer = styled(Box)`
  width: 100%;
  min-width: 450px;
  height: 100%;
`;

export default function ChatBox() {
  const { user } = useContext(AccountContext);



 
  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} maxWidth={"md"}>
      <ChatContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
        <MessagesContainer>
          {Object.keys(user).length  ? <TextBox /> : <NoChat />}
        </MessagesContainer>
      </ChatContainer>
    </Dialog>
  );
}
