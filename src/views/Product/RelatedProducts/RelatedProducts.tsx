import React, { useState } from 'react';
import moment from 'moment';

import { IProduct } from 'interfaces/product';
import { FiberManualRecordRounded } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from 'components/Slider/NextArrow/NextArrow';
import PrevArrow from 'components/Slider/PrevArrow/PrevArrow';
import styles from './RelatedProducts.module.scss';

interface Props {
  products: IProduct[];
}

const RelatedProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.main}>
      <h2>Related Products</h2>
      <Slider
        arrows={true}
        slidesToShow={3}
        slidesToScroll={1}
        infinite={false}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        className={styles.lane}
      >
        {products.map((p) => {
          return (
            <a href={`/product/${p._id}`} className={styles.product} key={p._id}>
              <img src={p.images[0]?.url} alt={p.title} />
              <div className={styles.details}>
                <div className={styles.titleContainer}>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
                <div className={styles.footer}>
                  <span className={styles.location}>{p.location?.address}</span>
                  <span className={styles.separator}>
                    <FiberManualRecordRounded fontSize="small" />
                  </span>
                  <span className={styles.date}>{moment(p.createdAt).format('DD MMM YYYY')}</span>
                </div>
              </div>
            </a>
          );
        })}
      </Slider>
    </div>
  );
};

RelatedProducts.displayName = 'RelatedProducts';

export default RelatedProducts;
