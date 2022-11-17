import { NotificationsOutlined } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';

import styles from './NotificationsPopper.module.scss';

const NotificationsPopper: React.FC<Props> = ({}) => {
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsPopperOpen(false)}>
      <div className={styles.main}>
        <span className={styles.icon} onClick={handleClick}>
          <NotificationsOutlined fontSize="large" color="primary" />
        </span>
        {isPopperOpen && (
          <div className={styles.popper}>
            <h4>Notifications</h4>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

interface Props {}

export default NotificationsPopper;
