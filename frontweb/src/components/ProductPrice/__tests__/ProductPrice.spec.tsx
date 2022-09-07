import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const price = 950.2;
  render(<ProductPrice price={price} />);
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('950,20')).toBeInTheDocument();
});
