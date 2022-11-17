import React, { useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

import { login } from 'api/ApiMethods';
import useAuth from 'hooks/useAuth';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import CustomButton from 'components/Inputs/Button/Button';
import CustomInput from 'components/Inputs/Input/Input';
import styles from './Login.module.scss';

const schema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(8).required().label('Password')
});

const Login: React.FC = () => {
  const { handleSignIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    setLoading(true);
    try {
      const result = await login(data);
      if (result?.status === 200) {
        handleSignIn(result.data);
      } else enqueueSnackbar('Invalid credentials! Please try again!', { variant: 'error' });
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
        <p className={styles.intro}>Login to your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput control={control} name="email" label="Email" errors={errors} />
          <CustomInput control={control} type="password" name="password" label="Password" errors={errors} />
          <CustomButton title="Login" type="submit" rounded loading={loading} />
        </form>
        <a href="/auth/reset-password" className={styles.forgotPsw}>
          Forgotten password?
        </a>
        <p className={styles.helper}>
          Don&apos;t have an account? <a href="/auth/register">Register</a>
        </p>
      </div>
    </div>
  );
};

interface IFormData {
  email: string;
  password: string;
}

export default Login;
