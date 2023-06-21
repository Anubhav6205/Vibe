import MessageModel from "../models/MessageModel.js";
import ConversationModel from "../models/ConversationModel.js"
export const newMessage = async(req, res) => {
  try {
    const newMessage = new MessageModel(req.body);
    await newMessage.save();

    //saving the latest message in people.js
    await ConversationModel.findByIdAndUpdate(req.body.conversationId, {message:req.body.text})


    res.status(200).json({
      message: "New message sent",
      newMessage: newMessage
    });
  } catch (error) {
    console.log("Error in sending message");
    res.status(200).json({
      message: "Error in sending message",
      error: error
    });
  }
};


export const getMessages = async(req, res) => {
    try{
        //will send id in params through frontend
        //fetching the messages based on conversationId
        const messages = await MessageModel.find({
            conversationId:req.params.id
        })
        res.status(200).json(
            messages
        )

    }
    catch(error){
        console.log("Error in getting messages");
        res.status(200).json({
            message:"Error in getting messages",
            error:error
        })
    }
}