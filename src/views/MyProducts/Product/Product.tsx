import Chip from '@mui/material/Chip';
import _ from 'lodash';

import { IProduct } from 'interfaces/product';
import PlaceIcon from '@mui/icons-material/Place';
import { Menu, MenuItem, Modal } from '@mui/material';
import { useState } from 'react';
import { FiberManualRecordRounded, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProductForm from 'components/ProductForm/ProductForm';
import moment from 'moment';
import styles from './Product.module.scss';

const Product: React.FC<Props> = ({ product, handleDeleteProduct }) => {
  const navigate = useNavigate();
  const [isProductFormShown, setIsProductFormShown] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateToProduct = () => {
    navigate(`/product/${product._id}`, { replace: true });
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setIsProductFormShown(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleDeleteProduct(product._id);
    setAnchorEl(null);
  };

  return (
    <div className={styles.main}>
      <img className={styles.image} src={product.images[0]?.url} alt={product.title} />
      <div className={styles.details}>
        <div className={styles.topContainer}>
          <div className={styles.categories}>
            {product.categories?.map((category) => (
              <Chip key={category} label={_.capitalize(category)} />
            ))}
          </div>
          <span className={styles.moreDots} onClick={handleClick}>
            <MoreHoriz />
          </span>
        </div>
        <div className={styles.descriptionGroup}>
          <div className={styles.topContainer}>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.bottomLeftContainer}>
              <div className={styles.locationGroup}>
                <PlaceIcon color="primary" fontSize="medium" />
                <span className={styles.location}>{product.location}</span>
              </div>
              <span className={styles.separator}>
                <FiberManualRecordRounded fontSize="small" />
              </span>
              <span className={styles.date}>{moment(product.createdAt).format('DD MMM YYYY')}</span>
            </div>
            <div>{product.requests?.length} Requests</div>
          </div>
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={navigateToProduct}>View</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
      <Modal className={styles.modal} open={isProductFormShown} onClose={() => setIsProductFormShown(false)}>
        <>
          <ProductForm isEditing product={product} onClose={() => setIsProductFormShown(false)} />
        </>
      </Modal>
    </div>
  );
};

interface Props {
  product: IProduct;
  handleDeleteProduct: (id: string) => Promise<void>;
}

export default Product;
