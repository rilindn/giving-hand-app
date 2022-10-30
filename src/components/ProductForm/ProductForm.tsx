import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { newProduct } from 'api/ApiMethods';
import CustomInput from 'components/Input/Input';
import useAuth from 'hooks/useAuth';
import styles from './ProductForm.module.scss';
import CustomButton from 'components/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { IProductPayload } from 'interfaces/post';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import MultipleSelectChip from 'components/ChipsInput/ChipsInput';
import categories from 'data/categories';

const schema = yup.object({
  title: yup.string().required().label('Title'),
  description: yup.string().required().label('Description'),
  location: yup.string().required().label('Location')
  // categories: yup.array().tuple([yup.string().required()]).label('Categories')
});

interface ProductImages {
  url: string;
}

interface Props {
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({ onClose }) => {
  const { authData } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<ProductImages[]>([]);
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
        images: productImages,
        userId: authData._id
      };
      const result = await newProduct(payload);
      if (result?.status === 200) {
        enqueueSnackbar('Product posted!', { variant: 'success' });
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
        <p className={styles.intro}>New Product</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <CustomInput control={control} name="title" label="Title" errors={errors} />
            <CustomInput control={control} name="location" label="Location" errors={errors} />
          </div>
          <CustomInput control={control} name="description" label="Description" multiline errors={errors} />
          <MultipleSelectChip control={control} name="categories" label="Categories" options={categories} />
          <ImageUpload productImages={productImages} setProductImages={setProductImages} />
          <div className={styles.inputsWrapper}>
            <CustomButton rounded title="Cancel" color="info" onClick={onClose} />
            <CustomButton rounded title="Submit" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.displayName = 'ProductForm';

export default ProductForm;
