import PlaceIcon from '@mui/icons-material/Place';
import { Avatar } from '@mui/material';
import { FiberManualRecordRounded } from '@mui/icons-material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { IProductRequest } from 'interfaces/productRequest';
import stringAvatar from 'utils/stringAvatar';
import { newChat } from 'api/ApiMethods';
import { IChatPayload } from 'interfaces/chat';
import styles from './Request.module.scss';

const Request: React.FC<Props> = ({ request, loggedUserId }) => {
  const navigate = useNavigate();
  const fullName = `${request.product?.user?.firstName} ${request.product?.user?.lastName}`;

  const handleCreateChat = async () => {
    try {
      const secondUserId = request.product?.user?._id;
      if (!secondUserId) return;

      const payload: IChatPayload = {
        firstUserId: loggedUserId,
        secondUserId
      };
      const result = await newChat(payload);
      if (result?.status === 200) {
        const chatId = result.data._id;
        navigate(`/messages?chat=${chatId}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.request}>
        <div className={styles.topHeader}>
          <span className={styles.date}>{moment(request.createdAt).format('DD MMM YYYY')}</span>
          <h4
            className={clsx(styles.status, {
              [styles.pending]: request.status === 'Pending',
              [styles.accepted]: request.status === 'Accepted',
              [styles.rejected]: request.status === 'Rejected'
            })}
          >
            {request.status}
          </h4>
        </div>
        <p>
          <b>Description:</b> {request.description}
        </p>
      </div>
      <div className={styles.product}>
        <div className={styles.userContainer}>
          <div className={styles.user}>
            <Avatar {...stringAvatar(fullName, 40, 40, 18)} />
            <h3>{fullName}</h3>
          </div>
          {request.status === 'Accepted' && (
            <p onClick={handleCreateChat} className={styles.newMsgButton}>
              Send message
            </p>
          )}
        </div>
        <a href={`product/${request.product?._id}`} target="_blank" rel="noreferrer" className={styles.productData}>
          <img className={styles.image} src={request.product?.images?.[0]?.url} alt={request.product?.title} />
          <div className={styles.details}>
            <div className={styles.descriptionGroup}>
              <div className={styles.topContainer}>
                <h2 className={styles.title}>{request?.product?.title}</h2>
                <p className={styles.description}>{request.description}</p>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.bottomLeftContainer}>
                  <div className={styles.locationGroup}>
                    <PlaceIcon color="primary" fontSize="medium" />
                    <span className={styles.location}>{request?.product?.location?.address}</span>
                  </div>
                  <span className={styles.separator}>
                    <FiberManualRecordRounded fontSize="small" />
                  </span>
                  <span className={styles.date}>{moment(request.product?.createdAt).format('DD MMM YYYY')}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

interface Props {
  request: IProductRequest;
  loggedUserId: string;
}

export default Request;
