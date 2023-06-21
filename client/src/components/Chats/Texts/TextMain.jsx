import { Box, styled } from "@mui/material";
import TextFooter from "./TextFooter";
import { useContext, useState, useEffect,useRef } from "react";
import { AccountContext } from "../../../context/AccountProvider.jsx";
import { PropTypes } from "prop-types";
import { getMessages, newMessage } from "../../../api/api.jsx";
import SingleMessage from "./SingleMessage";
const Wrapper = styled(Box)`
  background: #f0f1ff;
  height: 100%;
  background-size: cover;
`;

const Container = styled(Box)`
  height: 90%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #7289da transparent;
  padding:1.5rem 1.2em;

  &::-webkit-scrollbar {
    display:none;
  }

  &
`;

export default function TextMain({ convData, searchedText }) {
  const { account, user,socket ,toggleMessageSent,setToggleMessageSent} = useContext(AccountContext);
  const [allMessages, setAllMessages] = useState([]);


  //socket's realtime message 
  const [incomingMessage,setIncomingMessage]=useState(null);

  
  //recieving realtime messages 
  useEffect(() => {
    socket.current.on("getMessage", (userData) => {
      setIncomingMessage((prevIncomingMessage) => ({
        ...userData,
        createdAt: Date.now(),
      }));
      console.log("there is an incoming message");
    });
  }, []);



  //used to store the file
  const [fileValue, setFileValue] = useState();
  const [fileUrl, setFileUrl] = useState("");

  //fetching the messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (convData && convData.conversation) {
        const convId = convData.conversation._id;
        const messages = await getMessages(convId);
        setAllMessages(messages);
        //  console.log(messages);
        // console.log(convData); 
      }
    };

    convData.conversation && fetchMessages();
  }, [convData, user._id, toggleMessageSent]);


  //updating messages with incoming message
  useEffect(()=>{
    incomingMessage&& convData.conversation?.members?.includes(incomingMessage.senderId)&&
    setAllMessages(prev=>[...prev,incomingMessage])


  },[incomingMessage,convData?.conversation])

  //to store state for sendText input
  const [text, setText] = useState("");

  const sendInputText = async (event) => {
    let code = event.keyCode || event.which;
    if (code === 13 && fileValue) {
      console.log("its file");
      const message = {
        senderId: account.sub,
        recieverId: user.sub,
        //getting the conversationId
        conversationId: convData.conversation._id,
        type: "file",
        text: fileUrl.data
      };
      setFileUrl("");
      setFileValue("");
      setText("");
      console.log("msg in text main");
      console.log(message);
      await newMessage(message);
      setToggleMessageSent(!toggleMessageSent);
    } else if (code === 13 && text.length > 0) {
      // console.log("its text");

      //get the senderId , recieverId and search for existing data in db
      //storing the data of the conversation between sender and reciever
      const message = {
        senderId: account.sub,
        recieverId: user.sub,
        //getting the conversationId
        conversationId: convData?.conversation?._id,
        type: "text",
        text: text
      };
      setFileUrl("");
      setFileValue("");
      setText("");
      // console.log("msg in text main");
      // console.log(message);

      //sending message in real time 
      socket.current.emit('sendMessage',message);

      await newMessage(message);
      setToggleMessageSent(!toggleMessageSent);
    }
  };


  //scrolling effect

  const scrollRef=useRef();

  useEffect(()=>{
     scrollRef.current?.scrollIntoView({ behavior: "smooth"});

  },[allMessages])


  
  return (
    <Wrapper>
      <Container ref={scrollRef}>
        {allMessages.map((message) => {
          if (searchedText.length > 0) {
            if(message.text.toLowerCase().includes(searchedText.toLowerCase()))
            {
            return (
              <SingleMessage
                key={message._id}
                text={message.text}
                createdAt={message.createdAt}
                message={message}
              />
            );
            }
          } else {
            return (
              <SingleMessage
                key={message._id}
                text={message.text}
                createdAt={message.createdAt}
                message={message}
              />
            );
          }
        })}
        {/* makes sure scroll effect works correctly */}
           <div ref={scrollRef}></div>
      </Container>
      <TextFooter
        sendInputText={sendInputText}
        text={text}
        setText={setText}
        fileValue={fileValue}
        setFileValue={setFileValue}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
    </Wrapper>
  );
}

TextMain.propTypes = {
  convData: PropTypes.object,
  searchedText: PropTypes.string
};
