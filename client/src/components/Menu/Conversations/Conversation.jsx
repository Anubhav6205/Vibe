import { Box, Typography, styled } from "@mui/material";
import { PropTypes } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { getConversation, setConversation } from "../../../api/api";
import { AccountContext } from "../../../context/AccountProvider";
import { convertCreatedTime } from "../../../constants/utils";

const ConversationContainer = styled(Box)`
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled("img")`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const UserName = styled(Typography)`
font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  color: white;
  font-weight: 600;
`;

const LatestMessage = styled(Typography)`
  font-family: 'Dosis', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const Time = styled(Typography)`
  font-family: 'Dosis', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

export default function Conversation({ user }) {
  const { setUser, account, toggleMessageSent } = useContext(AccountContext);
  const [latestMessage, setLatestMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      if (user && user.sub) {
        let conversationData = await getConversation({
          senderId: account.sub,
          recieverId: user.sub
        });
        setLatestMessage({
          text: conversationData?.conversation?.message,
          timestamp: conversationData?.conversation?.updatedAt
        });
      }
    };
    getConversationDetails();
  }, [toggleMessageSent]);

  useEffect(() => {
    console.log(latestMessage);
  }, [latestMessage]);

  const selectedUser = async () => {
    setUser(user);
    await setConversation({ senderId: account.sub, recievedId: user.sub });
  };

  return (
    <ConversationContainer onClick={selectedUser}>
      <Image src={user.picture} alt="User" />
      <UserInfoContainer>
        <UserName>{user.name}</UserName>
        <LatestMessage>
          {latestMessage?.text?.includes("localhost")
            ? "Media File"
            : latestMessage?.text}
        </LatestMessage>
      </UserInfoContainer>
      <Time>{convertCreatedTime(latestMessage?.timestamp)}</Time>
    </ConversationContainer>
  );
}

Conversation.propTypes = {
  user: PropTypes.object
};
