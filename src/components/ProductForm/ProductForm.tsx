import React, { useState } from 'react';
import * as yup from 'yup';
import _ from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { editProduct, newProduct } from 'api/ApiMethods';
import CustomInput from 'components/Input/Input';
import useAuth from 'hooks/useAuth';
import CustomButton from 'components/Button/Button';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { IProductPayload, ILocation } from 'interfaces/product';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import MultipleSelectChip from 'components/ChipsInput/ChipsInput';
import categories from 'data/categories';
import { IProduct } from 'interfaces/product';
import GooglePlacesInput from 'components/GooglePlacesInput/GooglePlacesInput';
import styles from './ProductForm.module.scss';

const schema = yup.object({
  title: yup.string().required().label('Title'),
  description: yup.string().required().label('Description'),
  location: yup.string().required().label('Location')
});

const editSchema = yup.object({
  title: yup.string().required().label('Title'),
  description: yup.string().required().label('Description')
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
  const [location, setLocation] = useState<ILocation | undefined>(_.omit(product?.location, ['_id']));
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IProductPayload>({
    resolver: yupResolver(!!isEditing ? editSchema : schema)
  });

  const onSubmit: SubmitHandler<IProductPayload> = async (data: IProductPayload) => {
    setLoading(true);
    if (!location) return;
    try {
      const payload = {
        ...data,
        userId: authData._id,
        location,
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
          <FormLayout
            isEditing={isEditing}
            titleInput={
              <CustomInput defaultValue={product?.title} control={control} name="title" label="Title" errors={errors} />
            }
            descriptionInput={
              <CustomInput
                defaultValue={product?.description}
                control={control}
                name="description"
                label="Description"
                multiline
                errors={errors}
              />
            }
            imageInput={<ImageUpload productImages={productImages} setProductImages={setProductImages} />}
            categoriesInput={
              <MultipleSelectChip
                defaultValue={product?.categories}
                control={control}
                name="categories"
                label="Categories"
                options={categories}
              />
            }
            locationInput={
              <GooglePlacesInput
                name="location"
                label="Location"
                control={control}
                location={location}
                setLocation={setLocation}
              />
            }
          />
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

interface IFormLayout {
  isEditing: boolean;
  titleInput: React.ReactNode;
  descriptionInput: React.ReactNode;
  imageInput: React.ReactNode;
  categoriesInput: React.ReactNode;
  locationInput: React.ReactNode;
}

const FormLayout: React.FC<IFormLayout> = ({
  isEditing,
  titleInput,
  descriptionInput,
  imageInput,
  categoriesInput,
  locationInput
}) =>
  isEditing ? (
    <div>
      {titleInput}
      {descriptionInput}
      {categoriesInput}
    </div>
  ) : (
    <div className={styles.inputsWrapper}>
      <div>
        {titleInput}
        {descriptionInput}
        {imageInput}
      </div>
      <div>
        {categoriesInput}
        {locationInput}
      </div>
    </div>
  );

export default ProductForm;
