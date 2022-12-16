import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Skeleton } from '@mui/material';

import useAuth from 'hooks/useAuth';
import { getMyRequests } from 'api/ApiMethods';
import { IProductRequest } from 'interfaces/productRequest';
import CustomInput from 'components/Inputs/Input/Input';
import { useForm } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CustomSelect from 'components/Inputs/Select/Select';
import Request from './Request/Request';
import styles from './MyRequests.module.scss';

const MyRequests: React.FC<Props> = () => {
  const { authData } = useAuth();
  const { control, watch } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<IProductRequest[]>([]);
  const search = watch('search') || '';
  const status = watch('statusFilter') || '';

  const fetchRequests = async () => {
    try {
      const requests = await getMyRequests(authData?._id, search, status);
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
  }, [search, status]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Requests</h2>
          <div className={styles.filters}>
            <CustomSelect
              control={control}
              name="statusFilter"
              label="Status"
              defaultValue="All"
              options={[
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Accepted', value: 'Accepted' },
                { label: 'Rejected', value: 'Rejected' }
              ]}
            />
            <CustomInput
              control={control}
              rounded
              name="search"
              placeholder="Search"
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>

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
          <h5>No requests to show</h5>
        )}
      </div>
    </div>
  );
};

interface Props {}

export default MyRequests;
