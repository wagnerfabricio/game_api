import dotenv from "dotenv";
import Pusher from "pusher";

dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "sa1",
  useTLS: true,
});

export default pusher;
