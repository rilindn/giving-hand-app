import React, { useState } from 'react';
import moment from 'moment';

import { IProductRequest } from 'interfaces/productRequest';
import CustomButton from 'components/Inputs/Button/Button';
import { editProductRequest } from 'api/ApiMethods';
import _ from 'lodash';
import { Avatar } from '@mui/material';
import stringAvatar from 'utils/stringAvatar';
import styles from './ProductRequests.module.scss';

interface Props {
  requests: IProductRequest[];
}

const ProductRequests: React.FC<Props> = ({ requests = [] }) => {
  return (
    <div className={styles.main}>
      <h2>Requests</h2>
      <div className={styles.requests}>
        {requests.map((r: IProductRequest) => {
          return <Request key={r._id} request={r} />;
        })}
      </div>
    </div>
  );
};

ProductRequests.displayName = 'ProductRequests';

const Request: React.FC<IRequest> = ({ request }) => {
  const [status, setStatus] = useState(request.status || 'Pending');

  const handleEditRequest = async (status: string) => {
    const payload = { ..._.omit(request, ['_id', 'createdAt', 'updatedAt', 'requester', '__v']), status };
    const result = await editProductRequest(request._id, payload);
    if (result?.status === 200) {
      setStatus(status);
    }
  };

  const fullName = `${request.requester.firstName} ${request.requester.lastName}`;

  return (
    <div className={styles.request}>
      <div className={styles.header}>
        <div className={styles.requester}>
          <Avatar {...stringAvatar(fullName, 40, 40, 18)} />
          <h3>{fullName}</h3>
        </div>
        <span className={styles.date}>{moment(request.createdAt).fromNow()}</span>
      </div>
      <p>{request.description}</p>
      <div className={styles.actions}>
        {status === 'Pending' ? (
          <>
            <CustomButton onClick={() => handleEditRequest('Accepted')} title="Accept" color="primary" />
            <CustomButton onClick={() => handleEditRequest('Rejected')} title="Reject" color="secondary" />
          </>
        ) : (
          <CustomButton title={status} color={status === 'Accepted' ? 'primary' : 'secondary'} disabled />
        )}
      </div>
    </div>
  );
};

interface IRequest {
  request: IProductRequest;
}

export default ProductRequests;
