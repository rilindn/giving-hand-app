import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';

import { IMessage } from 'interfaces/chat';
import { Circle, MoreVert } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styles from './Message.module.scss';

interface IMessageComponent {
  message: IMessage;
  loggedUserId: string;
  handleDeleteMessage: (messageId: string) => void;
}

const Message: React.FC<IMessageComponent> = ({ message, loggedUserId, handleDeleteMessage }) => {
  const [openActionMenu, setOpenActionMenu] = useState<boolean>(false);

  const isOwn = message.senderId === loggedUserId;
  const hasOnlyEmojis = /\p{Emoji}/u.test(message.text);
  const isUnseenMsg = !message.seen && !isOwn;
  const createdAt = moment(message.createdAt);

  return (
    <div className={clsx(styles.message, { [styles.own]: isOwn })}>
      <div>
        <div className={clsx(styles.messageText, { [styles.emojis]: hasOnlyEmojis })}>
          {isOwn && (
            <>
              <span onClick={() => setOpenActionMenu(true)}>
                <MoreVert fontSize="small" className={styles.more} />
              </span>
              {openActionMenu && (
                <ClickAwayListener onClickAway={() => setOpenActionMenu(false)}>
                  <div className={styles.actionMenu}>
                    <MenuItem
                      onClick={() => {
                        handleDeleteMessage(message._id);
                        setOpenActionMenu(false);
                      }}
                    >
                      <span className={styles.delete}>Delete</span>
                    </MenuItem>
                  </div>
                </ClickAwayListener>
              )}
            </>
          )}
          <span className={styles.text}>{message.text}</span>
          {message.media && <img src={message.media} alt="" />}
        </div>
      </div>

      <span title={createdAt.format('DD MMM YYYY [at] hh:mm A')} className={styles.time}>
        {createdAt.format('hh:mm A')}
      </span>
      {isUnseenMsg && <Circle className={styles.unseen} color="primary" />}
    </div>
  );
};

export default Message;
