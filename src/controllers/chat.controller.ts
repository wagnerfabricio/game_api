import { Request, Response } from "express";
import { chatService } from "../services";

class ChatController {
  sendMessage = async (req: Request, res: Response): Promise<Response> => {
    await chatService.sendMessage(req);
    return res.status(200).json();
  };
  auth = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    await chatService.auth(req);
    return;
  };
}

export default new ChatController();
