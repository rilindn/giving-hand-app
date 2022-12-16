import PlaceIcon from '@mui/icons-material/Place';
import { Avatar } from '@mui/material';
import { FiberManualRecordRounded } from '@mui/icons-material';
import moment from 'moment';
import { IProductRequest } from 'interfaces/productRequest';
import stringAvatar from 'utils/stringAvatar';
import clsx from 'clsx';
import styles from './Request.module.scss';

const Request: React.FC<Props> = ({ request }) => {
  const fullName = `${request.product?.user?.firstName} ${request.product?.user?.lastName}`;

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
      <a href={`product/${request.product?._id}`} target="_blank" className={styles.product} rel="noreferrer">
        <div className={styles.user}>
          <Avatar {...stringAvatar(fullName, 40, 40, 18)} />
          <h3>{fullName}</h3>
        </div>
        <div className={styles.productData}>
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
        </div>
      </a>
    </div>
  );
};

interface Props {
  request: IProductRequest;
}

export default Request;
