import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { newProductRequest } from 'api/ApiMethods';
import CustomInput from 'components/Input/Input';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { IProductPayload } from 'interfaces/product';
import styles from './RequestProduct.module.scss';

const schema = yup.object({
  description: yup.string().required().label('Description')
});

interface Props {
  onClose: () => void;
  productId: string;
}

const RequestProduct: React.FC<Props> = ({ productId, onClose }) => {
  const { authData } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IProductPayload>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IProductPayload> = async (data: IProductPayload) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        productId,
        userId: authData._id
      };
      const result = await newProductRequest(payload);
      if (result?.status === 200) {
        enqueueSnackbar('Product request sent!', { variant: 'success' });
        onClose();
      } else enqueueSnackbar('Please try again!', { variant: 'error' });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <Logo width={81} height={64} />
        <p className={styles.intro}>Request Product</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput control={control} name="description" label="Description" multiline rows={4} errors={errors} />
          <div className={styles.inputsWrapper}>
            <CustomButton rounded title="Cancel" color="info" onClick={onClose} />
            <CustomButton rounded title="Submit" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

RequestProduct.displayName = 'RequestProduct';

export default RequestProduct;
