import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RemoveCircle } from '@mui/icons-material';

import stringAvatar from 'utils/stringAvatar';
import { IChat, IMessage } from 'interfaces/chat';
import CustomButton from 'components/Inputs/Button/Button';
import CustomInput from 'components/Inputs/Input/Input';
import { deleteMessage, newMessage, readAllMessages } from 'api/ApiMethods';
import { socket } from 'api/ApiBase';
import moment from 'moment';
import ImageUpload from 'components/Inputs/ImageUpload/ImageUpload';
import styles from './ActiveChat.module.scss';
import Message from './Message/Message';

interface IActiveChat {
  activeChat: IChat;
  loggedUserId: string;
  setActiveChat: React.Dispatch<IChat>;
}

interface IChatMessage {
  message: string;
}

interface IImages {
  url: string;
}

const ActiveChat: React.FC<IActiveChat> = ({ activeChat, loggedUserId, setActiveChat }) => {
  const { control, handleSubmit, reset } = useForm<IChatMessage>();
  const [messagesByDay, setMessagesByDay] = useState<any>('');
  const [images, setImages] = useState<IImages[]>([]);

  const onSubmit: SubmitHandler<IChatMessage> = async ({ message }: IChatMessage) => {
    const media = images[0]?.url || '';
    try {
      const payload = {
        text: message,
        senderId: loggedUserId,
        receiverId: activeChat.otherUser._id,
        media
      };
      const result = await newMessage(activeChat?._id, payload);
      if (result?.status === 200) {
        const otherUserKeyField = activeChat.firstUserId.toString() === loggedUserId ? 'secondUserId' : 'firstUserId';
        socket.emit('send-message', { chatId: activeChat?._id, otherUserKeyField });
        reset();
        setImages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const splitMessagesByDay = () => {
    const msgByDay: any = {};

    for (const message of activeChat.messages) {
      const dayKey = moment(message.createdAt).format('MM-DD-YYYY');

      msgByDay[dayKey] ||= [];
      msgByDay[dayKey].push(message);
    }
    setMessagesByDay(msgByDay);
  };

  const handleReadMessages = async () => {
    try {
      const hasUnseenMessages = !!activeChat.messages.find((m) => !m.seen && m.receiverId === loggedUserId);
      if (hasUnseenMessages) await readAllMessages(activeChat?._id, loggedUserId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeChat?._id) {
      socket.emit('join-chat', activeChat?._id);
    }
    handleReadMessages();
  }, [activeChat?._id]);

  useEffect(() => {
    splitMessagesByDay();
  }, [activeChat?._id, activeChat?.messages]);

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const result = await deleteMessage(activeChat._id, messageId);
      if (result?.status === 200) {
        const otherUserKeyField = activeChat.firstUserId.toString() === loggedUserId ? 'secondUserId' : 'firstUserId';
        socket.emit('send-message', { chatId: activeChat?._id, otherUserKeyField });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fullName = `${activeChat.otherUser.firstName} ${activeChat.otherUser.lastName}`;
  return (
    <div className={styles.main}>
      {activeChat ? (
        <>
          <div className={styles.chat}>
            <div className={styles.chatHeader}>
              <div className={styles.activeUser}>
                <Avatar {...stringAvatar(fullName, 35, 35, 15)} />
                <h4>{fullName}</h4>
              </div>
              <span>...</span>
            </div>
            <div className={styles.messagesContainer}>
              <div className={styles.messages}>
                {Object.keys(messagesByDay).map((msgDay) => {
                  return (
                    <div key={msgDay} className={styles.messageContainer}>
                      <span className={styles.messagesDay}>{moment(new Date(msgDay)).format('dddd, DD MMM YYYY')}</span>
                      {messagesByDay[msgDay].map((message: IMessage) => (
                        <Message
                          key={message._id}
                          message={message}
                          loggedUserId={loggedUserId}
                          handleDeleteMessage={handleDeleteMessage}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>

              <div className={styles.expandedSenderData}>
                <Avatar {...stringAvatar(fullName, 75, 75, 29)} />
                <h2>{fullName}</h2>
                <p className={styles.senderEmail}>{activeChat.otherUser.email}</p>
                <p className={styles.beginningNote}>
                  This is the very beginning of your direct message history with <b>{fullName}</b>
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputsContainer}>
            <ImageUpload productImages={images} setProductImages={setImages} isChat />
            <div className={styles.input}>
              <CustomInput
                control={control}
                rounded
                name="message"
                placeholder="Say something..."
                margin="none"
                InputProps={{
                  startAdornment: <Image images={images} setImages={setImages} />,
                  endAdornment: (
                    <InputAdornment position="start">
                      <CustomButton title="Send" rounded customStyles={styles.button} type="submit" />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </form>
        </>
      ) : (
        <div>Chat with someone</div>
      )}
    </div>
  );
};

interface IImagesComponent {
  images: IImages[];
  setImages: React.Dispatch<IImages[]>;
}

const Image: React.FC<IImagesComponent> = ({ images, setImages }) => {
  const image = images[0];

  if (!image) return <></>;

  return (
    <div className={styles.imageInput}>
      <RemoveCircle fontSize="small" className={styles.remove} onClick={() => setImages([])} />
      <img src={image.url} alt="" className={styles.image} />
    </div>
  );
};

export default ActiveChat;
