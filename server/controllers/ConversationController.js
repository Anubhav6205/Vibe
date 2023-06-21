import ConversationModel from "../models/ConversationModel.js";
export const addConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const recievedId = req.body.recievedId;
    //checking if array memebrs both filed match
    const existing = await ConversationModel.findOne({
      members: { $all: [recievedId, senderId] }
    });
    if (existing) {
      console.log("Conversation exists")
      return res.status(200).json({
        message: "Conversation already exists"
      });

    }
    const newConversation = new ConversationModel({
      members: [senderId, recievedId]
    });
    await newConversation.save();
    console.log("Conversation added")
    return res.status(200).json({
      message: "Conversation added successfully"
    });
   
  } catch (error) {
    console.log(`Error while adding conversation:${error}`);
    return res.status(400).json({
      error: error,
      message: "Error while adding conversation"
    });
  }
};

export const getConversation = async (req, res) => {
  try{
    const senderId = req.body.senderId;
    const recieverId = req.body.recieverId;
    const conversation=await ConversationModel.findOne({
      members: { $all: [recieverId,senderId]}
    })
    console.log("Found the conversation in getConversation")
    return res.status(200).json({
      conversation
    })
    

  }
  catch(error){
    console.log(`Error while getting conversation:${error}`);
    return res.status(400).json({
      error: error,
      message: "Error while getting conversation"
    });

  }
}