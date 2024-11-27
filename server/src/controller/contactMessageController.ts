import { Request, Response, NextFunction } from 'express';
import sendMessage from '../services/contactMessageService';
import { ObjectId } from 'mongodb';

interface MessageData {
  userId:ObjectId;
  topic: string;
  message: string;
}

const handleContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const messageData: MessageData = req.body;
    const savedMessage = await sendMessage(messageData);

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

export default handleContactMessage;
