import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './ResetPassword.module.scss';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import CustomButton from 'components/Button/Button';
import CustomInput from 'components/Input/Input';
import { requestResetPassword } from 'api/ApiMethods';

const schema = yup.object({
  email: yup.string().email().required().label('Email')
});

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phase, setPhase] = useState<'request' | 'done'>('request');
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequestResetFormData>({
    resolver: yupResolver(schema)
  });

  const handleRequestReset: SubmitHandler<IRequestResetFormData> = async (data: IRequestResetFormData) => {
    setLoading(true);
    try {
      await requestResetPassword(data);
      setPhase('done');
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
        {phase === 'request' ? (
          <>
            <p className={styles.intro}>Fill in your email</p>
            <form onSubmit={handleSubmit(handleRequestReset)}>
              <CustomInput control={control} name="email" label="Email" errors={errors} />
              <CustomButton title="Submit" type="submit" loading={loading} />
            </form>
          </>
        ) : (
          <h2>We sent you a magic link in your email</h2>
        )}
      </div>
    </div>
  );
};

interface IRequestResetFormData {
  email: string;
}

export default ResetPassword;
