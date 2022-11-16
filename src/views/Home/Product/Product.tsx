import Chip from '@mui/material/Chip';
import _ from 'lodash';

import { IProduct } from 'interfaces/product';
import { DescriptionOutlined } from '@mui/icons-material';
import styles from './Product.module.scss';

const Post: React.FC<Props> = ({ product }) => {
  return (
    <a
      href={`product/${product._id}`}
      className={styles.main}
      style={{
        backgroundImage: `url(${product.images[0]?.url})`
      }}
    >
      <div className={styles.header}>
        <div className={styles.categories}>
          {product.categories?.map((category) => (
            <Chip key={category} label={_.capitalize(category)} />
          ))}
        </div>
        <div className={styles.requests}>
          <span>{product.requests.length}</span>
          <DescriptionOutlined fontSize="small" />
        </div>
      </div>
      <div className={styles.details}>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.location}>{product.location?.address}</span>
      </div>
    </a>
  );
};

interface Props {
  product: IProduct;
}

export default Post;
