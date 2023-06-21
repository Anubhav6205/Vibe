import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const ConversationModel=mongoose.model("ConversationModel",conversationSchema);
export default ConversationModel;