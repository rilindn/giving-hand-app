import React, { useState } from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { register } from 'api/ApiMethods';
import CustomInput from 'components/Inputs/Input/Input';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Inputs/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { IUser } from 'interfaces/user';
import CustomDatePicker from 'components/Inputs/DatePicker/DatePicker';
import CustomSelect from 'components/Inputs/Select/Select';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

const schema = yup.object({
  firstName: yup.string().required().label('Firstname'),
  lastName: yup.string().required().label('Lastname'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(7).max(30).label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm Password'),
  gender: yup.string().required().label('Gender')
});

const Register: React.FC = () => {
  const { handleSignIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    setLoading(true);
    try {
      const payload = _.omit(data, 'confirmPassword');
      const result = await register(payload);
      if (result?.status === 200) {
        handleSignIn(result.data);
        enqueueSnackbar('Successfully registered!', { variant: 'success' });
        navigate('/auth/login', { replace: true });
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
        <p className={styles.intro}>Register</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <CustomInput control={control} name="firstName" label="Firstname" errors={errors} />
            <CustomInput control={control} name="lastName" label="Surname" errors={errors} />
          </div>
          <CustomInput control={control} name="email" label="Email" errors={errors} />
          <CustomInput control={control} type="password" name="password" label="Password" errors={errors} />
          <CustomInput
            control={control}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            errors={errors}
          />
          <div className={styles.inputsWrapper}>
            <CustomSelect
              control={control}
              name="gender"
              label="Gender"
              errors={errors}
              options={[
                { label: 'Male', value: 'm' },
                { label: 'Female', value: 'f' }
              ]}
            />
            <CustomDatePicker control={control} name="birthDate" label="Birthdate" errors={errors} />
          </div>
          <CustomButton title="Register" rounded type="submit" loading={loading} />
        </form>
        <p className={styles.helper}>
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
