import { render, screen } from '@testing-library/react';
import App from './App';
import { PRODUCT_1 } from './test/data';

it('Should render app', async () => {

  const productsResponse = {
    Products: [ PRODUCT_1 ]
  };

  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(productsResponse)
    });
  });

  render(<App />);


  const headerEl = screen.getByText(/Fullstack Coding Test/i);
  expect(headerEl).toBeInTheDocument();
  const childEl = screen.getByText(/Product Deliveries/i);
  expect(childEl).toBeInTheDocument();
});
