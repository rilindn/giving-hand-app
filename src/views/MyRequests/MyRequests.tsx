import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Skeleton } from '@mui/material';

import useAuth from 'hooks/useAuth';
import { getMyRequests } from 'api/ApiMethods';
import { IProductRequest } from 'interfaces/productRequest';
import Request from './Request/Request';
import styles from './MyRequests.module.scss';

const MyRequests: React.FC<Props> = () => {
  const { authData } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<IProductRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const requests = await getMyRequests(authData?._id);
      if (requests?.status === 200) {
        setRequests(requests.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>My Requests</h2>
        {loading ? (
          <div className={styles.requests}>
            {_.range(6).map((m) => (
              <div key={m}>
                <Skeleton key={m} variant="rectangular" height={250} />
              </div>
            ))}
          </div>
        ) : requests?.length ? (
          <div className={styles.requests}>
            {requests.map((request: IProductRequest) => (
              <Request key={request?._id} request={request} />
            ))}
          </div>
        ) : (
          <h5>You don&apos;t have any requests</h5>
        )}
      </div>
    </div>
  );
};

interface Props {}

export default MyRequests;
