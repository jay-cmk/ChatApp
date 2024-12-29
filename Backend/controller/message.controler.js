import Conversation from '../Model/conversation.model.js'
import Message from '../Model/message.model.js';
import { getReceiverSocketId, io } from '../socket/server.js';
export const sendMessage = async (req, res) => {

    console.log("message sent", req.params.id, req.body.message)

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;  //current logged user id
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()
        await Promise.all([conversation.save(),newMessage.save()])
        const receiverSockedId=getReceiverSocketId(receiverId)
        if(receiverSockedId){
           io.to(receiverSockedId).emit("newMessage",newMessage)
        }
        res.status(201).json({
            message:" send Successfully",
            newMessage
        })
    }
    catch (error) {
        console.log("error in sendMessage", error)
        res.status(500).json({ error: "internal server error" })
    }
}

export const getMessage=async(req,res)=>{
    try{
       const {id:chatUser}=req.params
       const senderId=req.user._id;

       let conversation = await Conversation.findOne({
        members: { $all: [senderId, chatUser] }
    }).populate("messages")
    if (!conversation) {
       return res.status(201).json([])
    }
    const messages=conversation.messages;
    res.status(201).json(messages)
    }
    catch{
       console.log("error in get message")
       res.status(500).json({error:"internal server error"})
    }
}