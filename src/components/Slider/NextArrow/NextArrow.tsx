import { ArrowForwardIos } from '@mui/icons-material';

import styles from './NextArrow.module.scss';

const NextArrow = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={['slick-next slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : ''), styles.main]}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <ArrowForwardIos color="info" fontSize="large" />
  </button>
);

export default NextArrow;
