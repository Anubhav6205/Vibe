import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { convertCreatedTime } from "../../../constants/utils";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import DownloadIcon from "@mui/icons-material/Download";

const MessageContainer = styled(Box)`
  display: flex;
  justify-content: ${({ isSent }) => (isSent ? "flex-end" : "flex-start")};
  margin-bottom: 1rem;
`;

const MessageBubble = styled(Box)`
  max-width: 60%;
`;

const MessageSubBubble = styled(Box)`
  background: ${({ isSent }) => (isSent ? "#E3E6FF" : "#7E79D9")};
  color: ${({ isSent }) => (isSent ? "#111111" : "#ffffff")};
  border-radius: 0.2rem;
  padding: 0.8rem;
`;

const MessageText = styled(Typography)`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  width: 100%;
  font-family: 'Nunito', sans-serif;
  word-wrap: break-word;
`;

const MessageTime = styled(Typography)`
  font-size: 0.8rem;
  margin-top: 0.4rem;
  color: grey;
  align-self: ${({ isSent }) => (isSent ? "flex-start" : "flex-end")};
`;

const FileMessageContainer = styled(MessageContainer)`
  /* Styles for the file message container */
`;

const FileMessageBubble = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const FileMessageSubBubble = styled(Box)`
  background: #eeeaea;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  align-items: center;
  transition: 0.1s ease-in;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
`;

const FileMessageText = styled(Typography)`
  font-size: 0.8rem;
  margin: 0.8rem 0 0.5rem 0;
  font-family: 'Nunito', sans-serif;
`;

const FileMessageTime = styled(Typography)`
  font-size: 0.8rem;
  margin-top: 0.4rem;
  color: grey;
  align-items: ${({ isSent }) => (isSent ? "flex-start" : "flex-end")};
`;

const DownloadLink = styled.a`
  color: ${({ isSent }) => (isSent ? "#5f8c4a" : "#333333")};
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FileImage = styled("img")`
  width: 200px;
  height: 100%;
`;

const FilePdf = styled("img")`
  width: 50px;
  height: 100%;
`;

const FileVideo = styled("img")`
  width: 50px;
  height: 100%;
`;

export default function SingleMessage({ text, createdAt, message }) {
  const { account } = useContext(AccountContext);
  const isSent = message.senderId && message.senderId === account.sub;
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (message.type === "file") {
    if (message?.text?.includes(".pdf")) {
      return (
        <FileMessageContainer isSent={isSent}>
          <FileMessageBubble>
            <FileMessageSubBubble isSent={isSent}>
              <FilePdf
                src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-3388-thumb.png"
                alt=""
              />
              <FileMessageText>{message?.text.split("-").pop()}</FileMessageText>
              <DownloadLink
                href={message?.text}
                target="_blank"
                rel="noopener noreferrer"
                isSent={isSent}
              >
                <DownloadIcon />
              </DownloadLink>
            </FileMessageSubBubble>
            <FileMessageTime isSent={isSent}>
              {convertCreatedTime(createdAt)}
            </FileMessageTime>
          </FileMessageBubble>
        </FileMessageContainer>
      );
    } else if (message?.text?.includes(".xlsx")) {
      return (
        <FileMessageContainer isSent={isSent}>
          <FileMessageBubble>
            <FileMessageSubBubble isSent={isSent}>
              <FilePdf
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/.xlsx_icon.svg/2048px-.xlsx_icon.svg.png"
                alt=""
              />
              <FileMessageText>{message?.text.split("-").pop()}</FileMessageText>
              <DownloadLink
                href={message?.text}
                target="_blank"
                rel="noopener noreferrer"
                isSent={isSent}
              >
                <DownloadIcon />
              </DownloadLink>
            </FileMessageSubBubble>
            <FileMessageTime isSent={isSent}>
              {convertCreatedTime(createdAt)}
            </FileMessageTime>
          </FileMessageBubble>
        </FileMessageContainer>
      );
    } else if (
      message?.text?.includes(".jpg") ||
      message?.text?.includes(".jpeg") ||
      message?.text?.includes(".png")
    ) {
      return (
        <FileMessageContainer isSent={isSent}>
          <FileMessageBubble>
            <FileMessageSubBubble isSent={isSent}>
              <FileImage src={message?.text} alt="" />
              <FileMessageText>{message?.text.split("-").pop()}</FileMessageText>
              <DownloadLink
                href={message?.text}
                target="_blank"
                rel="noopener noreferrer"
                isSent={isSent}
              >
                <DownloadIcon />
              </DownloadLink>
            </FileMessageSubBubble>
            <FileMessageTime isSent={isSent}>
              {convertCreatedTime(createdAt)}
            </FileMessageTime>
          </FileMessageBubble>
        </FileMessageContainer>
      );
    } else if (message?.text?.includes(".mp4")) {
      return (
        <FileMessageContainer isSent={isSent}>
          <FileMessageBubble>
            <FileMessageSubBubble isSent={isSent}>
              <FileVideo
                src="https://img.icons8.com/ios/452/video--v1.png"
                alt=""
              />
              <FileMessageText>{message?.text.split("-").pop()}</FileMessageText>
              <DownloadLink
                href={message?.text}
                target="_blank"
                rel="noopener noreferrer"
                isSent={isSent}
              >
                <DownloadIcon />
              </DownloadLink>
            </FileMessageSubBubble>
            <FileMessageTime isSent={isSent}>
              {convertCreatedTime(createdAt)}
            </FileMessageTime>
          </FileMessageBubble>
        </FileMessageContainer>
      );
    } else {
      return null;
    }
  }

  return (
    <MessageContainer isSent={isSent} ref={messageRef}>
      <MessageBubble>
        <MessageSubBubble isSent={isSent}>
          <MessageText>{text}</MessageText>
        </MessageSubBubble>
        <MessageTime isSent={isSent}>{convertCreatedTime(createdAt)}</MessageTime>
      </MessageBubble>
    </MessageContainer>
  );
}

SingleMessage.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
};
