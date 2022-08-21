import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductFilter from 'components/ProductFilter';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';

import './styles.css';

type ControlComponentData = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({ activePage: pageNumber });
  };

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentData.activePage,
        size: 3,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <div className="product-crud-bar-container">
        <Link to={'/admin/products/create'}>
          <button className="btn btn-primary btn-crud-add">ADICIONAR</button>
        </Link>
        <ProductFilter />
      </div>
      <div className="row">
        {page?.content.map((product) => {
          return (
            <div className="col-sm-6 col-md-12" key={product.id}>
              <ProductCrudCard product={product} onDelete={getProducts} />
            </div>
          );
        })}
      </div>
      <Pagination
        pageCount={page ? page?.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
