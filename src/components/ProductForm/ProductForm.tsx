import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { editProduct, newProduct } from 'api/ApiMethods';
import CustomInput from 'components/Input/Input';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { IProductPayload } from 'interfaces/product';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import MultipleSelectChip from 'components/ChipsInput/ChipsInput';
import categories from 'data/categories';
import { IProduct } from 'interfaces/product';
import styles from './ProductForm.module.scss';

const schema = yup.object({
  title: yup.string().required().label('Title'),
  description: yup.string().required().label('Description'),
  location: yup.string().required().label('Location')
});

interface ProductImages {
  url: string;
}

interface Props {
  isEditing?: boolean;
  product?: IProduct;
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({ isEditing = false, product, onClose }) => {
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
        userId: authData._id,
        ...(!isEditing && { images: productImages })
      };
      const result = await (isEditing ? editProduct(product?._id, payload) : newProduct(payload));
      if (result?.status === 200) {
        enqueueSnackbar(`Product ${isEditing ? 'updated' : 'posted'}!`, { variant: 'success' });
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
        <p className={styles.intro}>{isEditing ? 'Edit' : 'New'} Product</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
            <CustomInput defaultValue={product?.title} control={control} name="title" label="Title" errors={errors} />
            <CustomInput
              defaultValue={product?.location}
              control={control}
              name="location"
              label="Location"
              errors={errors}
            />
          </div>
          <CustomInput
            defaultValue={product?.description}
            control={control}
            name="description"
            label="Description"
            multiline
            errors={errors}
          />
          <MultipleSelectChip
            defaultValue={product?.categories}
            control={control}
            name="categories"
            label="Categories"
            options={categories}
          />
          {!isEditing && <ImageUpload productImages={productImages} setProductImages={setProductImages} />}
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
