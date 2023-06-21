import { Box, InputBase, List, ListItem, Popover } from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicNoneIcon from "@mui/icons-material/MicNone";
import styled from "@emotion/styled";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { uploadFile } from "../../../api/api";
import CircularProgress from '@mui/material/CircularProgress';


const FooterContainer = styled(Box)`
  display: flex;
  align-items: center;
  height: 10%;
  padding: 0 2%;
  background: #efefef;
  width: 100%;
  & > * {
    color: #aaaaaa;
    margin: 0 1rem 0 0rem;
  }
`;

const InputContainer = styled(Box)`
  width: 90%;
`;
const Input = styled(InputBase)`
  background: white;
  width: 100%;
  border-radius: 2rem;
  padding: 0.4rem 1.5rem;
`;

const EmojiList = styled(List)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  gap: 0.2rem;
`;

export default function TextFooter({
  sendInputText,
  text,
  setText,
  setFileValue,
  fileValue,
  setFileUrl
}) {
  const [emojiTab, setEmojiTab] = useState(false);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFileSentImage = async () => {
    
      if (fileValue) {
        setIsLoading(true);
        //file data broken in chunks and then stored in 'Data'
        //FormData helps to handle files data in format of HTML form
        const data = new FormData();
        //adding key value pair
        data.append("name", fileValue.name);
        data.append("file", fileValue);

        //calling api to upload file
        let response = await uploadFile(data);
        setFileUrl(response);
        setIsLoading(false);
      }
    };
    getFileSentImage();
  }, [fileValue]);
  const handleFile = (event) => {
    // console.log(event);
    // console.log(event.target.files[0]);
    setFileValue(event.target.files[0]);
    setText(event.target.files[0].name);
  };

  const handleEmojiTab = (event) => {
    setEmojiTab(true);
    setEmojiAnchor(event.currentTarget);
    console.log(event);
  };

  const handleEmojiClose = () => {
    setEmojiTab(false);
    setEmojiAnchor(null);
  };

  const emojis = [
    "😃",
    "🎉",
    "🌟",
    "❤️",
    "🔥",
    "👍",
    "😊",
    "🤩",
    "🥳",
    "😍",
    "🙌",
    "✨",
    "🎊",
    "👏",
    "🌈",
    "💖",
    "😎",
    "🍾",
    "👋",

    "😁",
    "😎",
    "😘",
    "🙃",
    "🌺",
    "💘",
    "😻",
    "🌸",
    "💓",
    "🥰",
    "🎵",
    "🤞",
    "🏅",
    "😇",
    "🎉",
    "⭐",
    "💕"
  ];

  const addEmoji = (emoji) => {
    setText(text + emoji);
  };

  return (
    <FooterContainer>
      {/* the function that calls the popover is current target */}
      <SentimentVerySatisfiedIcon onClick={handleEmojiTab} />
      {isLoading ?(<CircularProgress size={24}/>):
      (
      <label htmlFor="fileInput">
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={handleFile}
        ></input>
        <AttachFileIcon />
      </label>
      )}

      <InputContainer>
        <Input
          placeholder="Write a message"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            // console.log(event.target.value)
          }}
          onKeyDown={sendInputText}
        />
      </InputContainer>
      <MicNoneIcon />
      <Popover
        open={emojiTab}
        anchorEl={emojiAnchor}
        onClose={handleEmojiClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <EmojiList>
          {emojis.map((emoji) => (
            <ListItem key={emoji} onClick={() => addEmoji(emoji)}>
              {emoji}
            </ListItem>
          ))}
        </EmojiList>
      </Popover>
    </FooterContainer>
  );
}

TextFooter.propTypes = {
  sendInputText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  setFileValue: PropTypes.func.isRequired,
  fileValue: PropTypes.string,
  setFileUrl: PropTypes.func.isRequired
};
