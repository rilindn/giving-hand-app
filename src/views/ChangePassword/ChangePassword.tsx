import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import CustomButton from 'components/Inputs/Button/Button';
import CustomInput from 'components/Inputs/Input/Input';
import { resetPassword, validateResetToken } from 'api/ApiMethods';
import _ from 'lodash';
import styles from './ChangePassword.module.scss';

const schema = yup.object({
  password: yup.string().min(7).max(30).label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm Password')
});

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [phase, setPhase] = useState<'validating' | 'approved' | 'rejected'>('validating');
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequestResetFormData>({
    resolver: yupResolver(schema)
  });

  const handleResetPassword: SubmitHandler<IRequestResetFormData> = async (data: IRequestResetFormData) => {
    setLoading(true);
    if (!token) return;
    try {
      data = _.omit(data, 'confirmPassword');
      const result = await resetPassword({ ...data, resetToken, email });
      if (result?.status === 200) {
        navigate('/auth/login', { replace: true });
        enqueueSnackbar('Password changed!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (data: IValidateTokenFormData) => {
    try {
      const result = await validateResetToken(data);
      if (result?.status === 200) {
        setResetToken(result.data.resetToken.token);
        setPhase('approved');
      } else {
        console.log('first');
        setPhase('rejected');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    if (!token || !email) {
      setPhase('rejected');
      return;
    }

    setEmail(email);
    setToken(token);
    validateToken({ token, email });
  }, [email, token, searchParams]);

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <Logo width={81} height={64} />
        {phase === 'approved' ? (
          <>
            <p className={styles.intro}>Set your new password</p>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <CustomInput control={control} type="password" name="password" label="Password" errors={errors} />
              <CustomInput
                control={control}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                errors={errors}
              />
              <CustomButton title="Submit" type="submit" loading={loading} />
            </form>
          </>
        ) : phase === 'rejected' ? (
          <h3>Invalid reset link. Please try again!</h3>
        ) : (
          <h3>Validating...</h3>
        )}
      </div>
    </div>
  );
};

interface IRequestResetFormData {
  password: string;
  token: string;
}

interface IValidateTokenFormData {
  email: string;
  token: string;
}

export default ChangePassword;
