import { Box, styled } from "@mui/material";
import TextHeader from "./TextHeader";
import TextMain from "./TextMain";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../api/api";

const TextBoxContainer = styled(Box)`
  height: 84vh;
`;

export default function TextBox() {
  const [convData, setConvData] = useState({});
  const { account, user } = useContext(AccountContext);
  const [searchedText,setSearchedText]=useState('');
  useEffect(() => {
    const getConversationDetails = async () => {
      if(user && user.sub)
      {
      let conversationData = await getConversation({
        senderId: account.sub,
        recieverId: user.sub
      });
      //  console.log("Conv data in text box");
      // console.log(conversationData);
      //this conversation id is get from mongo and will be used
      //in sending text
      setConvData(conversationData);
    }
    };
    getConversationDetails();
  }, [user.sub]);

  return (
    <TextBoxContainer>
      <TextHeader setSearchedText={setSearchedText} searchedText={searchedText}/>
      <TextMain convData={convData} searchedText={searchedText}/>
    </TextBoxContainer>
  );
}
