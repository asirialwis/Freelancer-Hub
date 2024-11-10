import ContactMessage from '../models/ContactMessage'


export default async function sendMessage(messageData: any) {
    const message = new ContactMessage(messageData)
    await message.save();
    return message;
}