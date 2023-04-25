import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <LoadMore onClick={onLoadMore} type="button">
      Load more
    </LoadMore>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
