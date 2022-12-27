import { useEffect, useState } from 'react';

import useAuth from 'hooks/useAuth';
import { getMyChats } from 'api/ApiMethods';
import { IChat } from 'interfaces/chat';
import { socket } from 'api/ApiBase';
import useQuery from 'hooks/useQuery';
import styles from './Messages.module.scss';
import ActiveChat from './ActiveChat/ActiveChat';
import ChatList from './ChatList/ChatList';

const Messages: React.FC<Props> = () => {
  const { authData } = useAuth();
  const query = useQuery();
  const previousActiveChat = query.get('chat');
  const [activeChat, setActiveChat] = useState<IChat>();
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [search, setSearch] = useState<string>('');

  const fetchChats = async () => {
    try {
      const products = await getMyChats(authData?._id, search);
      if (products?.status === 200) {
        setChats(products.data);

        if (previousActiveChat) {
          const chat = products.data.find((chat: IChat) => chat._id === previousActiveChat);
          setActiveChat(chat);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [search]);

  useEffect(() => {
    socket.on('receive-message', (payload) => {
      if (activeChat) {
        console.log({ payload });
        setActiveChat({ ...activeChat, messages: payload.messages });
      }
    });
    return () => {
      socket.off('receive-message');
    };
  }, [activeChat]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Messages</h2>
        </div>
        <div className={styles.chat}>
          <ChatList
            chats={chats}
            refetchChats={fetchChats}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
            setSearch={setSearch}
            loggedUserId={authData?._id}
          />
          {activeChat ? (
            <ActiveChat activeChat={activeChat} loggedUserId={authData?._id} setActiveChat={setActiveChat} />
          ) : (
            <div className={styles.activeChatPlaceholder} style={{ margin: 'auto' }}>
              <p style={{ fontSize: 21 }}>Select a chat or start a new conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface Props {}

export default Messages;
