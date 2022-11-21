import { Circle, NotificationsOutlined } from '@mui/icons-material';
import { ClickAwayListener, CircularProgress, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';

import useAuth from 'hooks/useAuth';
import { getMyNotifications, readAllNotifications } from 'api/ApiMethods';
import { INotification, INotificationTransformed } from 'interfaces/notification';
import transformNotificationsResponse from 'transformers/notifications';
import { AxiosResponse } from 'axios';
import stringAvatar from 'utils/stringAvatar';
import styles from './NotificationsPopper.module.scss';

const NotificationsPopper: React.FC<Props> = ({}) => {
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const { authData } = useAuth();
  const [notifications, setNotifications] = useState<INotificationTransformed[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const notifications: AxiosResponse<INotification[]> | undefined = await getMyNotifications(authData._id);
      if (notifications?.status === 200) {
        const transformedNotifications = transformNotificationsResponse(notifications.data);
        setNotifications(transformedNotifications);
        checkUnreadNotifications(transformedNotifications);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = async () => {
    if (!isPopperOpen) {
      fetchNotifications();

      if (hasUnreadNotifications) {
        const result = await readAllNotifications(authData._id);
        if (result?.status === 200) {
          setHasUnreadNotifications(false);
        }
      }
    }
    setIsPopperOpen(!isPopperOpen);
  };

  const checkUnreadNotifications = (notifications: INotificationTransformed[]) => {
    const hasUnreadNotifications = !!notifications?.find((n) => n.seen === false);
    setHasUnreadNotifications(hasUnreadNotifications);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsPopperOpen(false)}>
      <div className={styles.main}>
        <div className={styles.icon} onClick={handleClick}>
          <NotificationsOutlined fontSize="large" color="primary" />
          {hasUnreadNotifications && <Circle className={styles.unread} color="secondary" />}
        </div>
        {isPopperOpen && <Notifications loading={loading} notifications={notifications} />}
      </div>
    </ClickAwayListener>
  );
};

const Notifications: React.FC<INotifications> = ({ loading, notifications }) => {
  return (
    <div className={styles.popper}>
      <h4>Notifications</h4>
      <div className={styles.notifications}>
        {loading ? (
          <CircularProgress />
        ) : !notifications?.length ? (
          <h3>No notifications</h3>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className={styles.notification}>
              <Avatar {...stringAvatar(n.sender, 40, 40)} />
              <div className={styles.data}>
                <p className={styles.description} dangerouslySetInnerHTML={{ __html: n.description }}></p>
                <span className={styles.date}>{n.date}</span>
              </div>
              {!n.seen && <Circle className={styles.unread} color="secondary" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface Props {}

interface INotifications {
  loading: boolean;
  notifications: INotificationTransformed[] | undefined;
}

export default NotificationsPopper;
