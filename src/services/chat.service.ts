import { Request } from "express";
import { pusher } from "../configs";

import dotenv from "dotenv";

dotenv.config();

class ChatService {
  auth = async ({ body }: Request) => {
    const { socket_id, channel_id } = body;
    const auth = pusher.authenticate(process.env.PUSHER_CHANNEL, socket_id);
    return auth;
  };
  sendMessage = async ({ body, user }: Request) => {
    const { message } = body;
    console.log(message, user.username);
    await pusher.trigger(process.env.PUSHER_CHANNEL, "message", {
      message,
      username: user.username,
    });
    return;
  };
}

export default new ChatService();
