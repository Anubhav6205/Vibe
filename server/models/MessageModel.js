import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: String
    },
    recieverId: {
      type: String
    },
    senderId: {
      type: String
    },
    text: {
      type: String
    },
    type: {
      type: String
    }
  },
  {
    timestamps: true // Move the `timestamp` option inside the schema object
  }
);

const MessageModel = mongoose.model("MessageModel", messageSchema);
export default MessageModel;
