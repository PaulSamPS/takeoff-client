export const filteredChats = (previous: any, newMessage: any, receiver?: string) => {
  const previousChat = previous.find((chat: { messagesWith: string }) =>
    receiver !== undefined
      ? chat.messagesWith === newMessage.receiver
      : chat.messagesWith === newMessage.sender
  );
  previousChat.lastMessage = newMessage.message;
  previousChat.date = newMessage.date;
  return { previousChat };
};
