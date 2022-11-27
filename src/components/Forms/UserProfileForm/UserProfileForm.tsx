import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { editProfile } from 'api/ApiMethods';
import CustomInput from 'components/Inputs/Input/Input';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Inputs/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import CustomSelect from 'components/Inputs/Select/Select';
import CustomDatePicker from 'components/Inputs/DatePicker/DatePicker';
import { IUserPayload } from 'interfaces/user';
import styles from './UserProfileForm.module.scss';

const schema = yup.object({
  firstName: yup.string().required().label('Firstname'),
  lastName: yup.string().required().label('Lastname'),
  email: yup.string().email().required().label('Email'),
  gender: yup.string().required().label('Gender')
});

interface Props {
  onClose: () => void;
}

const UserProfileForm: React.FC<Props> = ({ onClose }) => {
  const { authData, handleSignIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserPayload>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IUserPayload> = async (data: IUserPayload) => {
    setLoading(true);
    try {
      const result = await editProfile(authData?._id, data);
      if (result?.status === 200) {
        handleSignIn(result.data);
        enqueueSnackbar('Updated your data!', { variant: 'success' });
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
        <p className={styles.intro}>Edit profile</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <CustomInput
              defaultValue={authData?.firstName}
              control={control}
              name="firstName"
              label="Firstname"
              errors={errors}
            />
            <CustomInput
              defaultValue={authData?.lastName}
              control={control}
              name="lastName"
              label="Surname"
              errors={errors}
            />
          </div>
          <CustomInput defaultValue={authData?.email} control={control} name="email" label="Email" errors={errors} />
          <div className={styles.inputsWrapper}>
            <CustomSelect
              defaultValue={authData?.gender}
              control={control}
              name="gender"
              label="Gender"
              errors={errors}
              options={[
                { label: 'Male', value: 'm' },
                { label: 'Female', value: 'f' }
              ]}
            />
            <CustomDatePicker
              defaultValue={authData?.birthDate}
              control={control}
              name="birthDate"
              label="Birthdate"
              errors={errors}
            />
          </div>
          <div className={styles.inputsWrapper}>
            <CustomButton rounded title="Cancel" color="info" onClick={onClose} />
            <CustomButton rounded title="Save" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

UserProfileForm.displayName = 'UserProfileForm';

export default UserProfileForm;
