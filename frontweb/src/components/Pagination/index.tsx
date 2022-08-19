import './styles.css';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ pageCount, range, onChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      activeLinkClassName="pagination-link-active"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeClassName="arrow-active"
      disabledClassName="arrow-inactive"
      previousLabel={<ArrowIcon />}
      nextLabel={<ArrowIcon />}
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};

export default Pagination;
