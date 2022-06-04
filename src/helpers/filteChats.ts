export const filteredChats = (prev: any, newMessage: any, receiver?: any) => {
  const previousChat = prev.find((chat: { messagesWith: any }) =>
    receiver !== undefined
      ? chat.messagesWith === newMessage.receiver
      : chat.messagesWith === newMessage.sender
  );
  previousChat.lastMessage = newMessage.message;
  previousChat.date = newMessage.date;
  return previousChat;
};
