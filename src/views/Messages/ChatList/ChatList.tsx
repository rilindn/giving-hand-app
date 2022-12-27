import { Avatar, InputAdornment } from '@mui/material';
import stringAvatar from 'utils/stringAvatar';
import { IChat } from 'interfaces/chat';
import clsx from 'clsx';
import CustomInput from 'components/Inputs/Input/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Circle } from '@mui/icons-material';
import styles from './ChatList.module.scss';

interface IChatList {
  chats: IChat[];
  activeChat: IChat | undefined;
  setActiveChat: React.Dispatch<IChat>;
  setSearch: React.Dispatch<string>;
  refetchChats: () => void;
  loggedUserId: string;
}

const ChatList: React.FC<IChatList> = ({ chats, activeChat, setActiveChat, setSearch, refetchChats, loggedUserId }) => {
  const { control, watch } = useForm();
  const search = watch('search') || '';

  useEffect(() => {
    setSearch(search);
  }, [search]);

  const handleActiveChatChange = async (chat: IChat) => {
    setActiveChat(chat);
    refetchChats();
  };

  return (
    <div className={styles.main}>
      <CustomInput
        control={control}
        name="search"
        placeholder="Search"
        margin="none"
        customStyles={styles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          )
        }}
      />
      {!chats?.length ? (
        <span>No chats found</span>
      ) : (
        chats.map((chat) => (
          <ChatListUser
            key={chat._id}
            chat={chat}
            onClick={() => handleActiveChatChange(chat)}
            activeChatId={activeChat?._id}
            loggedUserId={loggedUserId}
          />
        ))
      )}
    </div>
  );
};

interface IChatListUser {
  chat: IChat;
  onClick: () => void;
  activeChatId?: string | undefined;
  loggedUserId: string;
}

const ChatListUser: React.FC<IChatListUser> = ({ chat, onClick, activeChatId, loggedUserId }) => {
  const fullName = `${chat.otherUser.firstName} ${chat.otherUser.lastName}`;
  const hasUnseenMessages = !!chat.messages.find((m) => !m.seen && m.receiverId === loggedUserId);

  return (
    <div onClick={onClick} className={clsx(styles.user, { [styles.active]: activeChatId === chat._id })}>
      <Avatar {...stringAvatar(fullName)} />
      <div className={styles.data}>
        <h4 className={styles.name}>{fullName}</h4>
        <div className={styles.bottomMsgContainer}>
          <p className={styles.lastMessage}>{chat.messages?.[0]?.text}</p>
          {hasUnseenMessages && <Circle color="primary" style={{ fontSize: 7 }} />}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
