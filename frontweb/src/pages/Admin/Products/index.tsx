import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

import './styles.css';

const Products = () => {
  return (
    <div className="product-container">
      <Switch>
        <Route path={'/admin/products'} exact>
          <List />
        </Route>
        <Route path={'/admin/products/:productId'}>
          <Form />
        </Route>
      </Switch>
    </div>
  );
};

export default Products;
