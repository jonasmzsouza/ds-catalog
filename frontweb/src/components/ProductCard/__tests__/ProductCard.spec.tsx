import { render, screen } from '@testing-library/react';
import { Product } from 'types/product';
import ProductCard from '..';

test('should render ProductCard', () => {
  const product: Product = {
    name: 'Smart TV',
    price: 1234.56,
    imgUrl: 'https://github.com',
  } as Product;

  render(<ProductCard product={product} />);
  expect(screen.getByText(product.name)).toBeInTheDocument();
  expect(screen.getByAltText(product.name)).toBeInTheDocument();
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('1.234,56')).toBeInTheDocument();
});
