import { render, screen, getAllByRole } from '@testing-library/react';
import ProductList from './ProductList';
import { PRODUCT_1, PRODUCT_2 } from '../test/data';

const headerText = ["Product Type", "Customer", "Delivery Address", "Delivery Date", "Delivery Status", ""];
const productText = [
  PRODUCT_1.ProductTypeName,
  `${PRODUCT_1.CustomerName} (${PRODUCT_1.CustomerContactNumber})`,
  PRODUCT_1.DeliveryAddress,
  PRODUCT_1.EstimatedDeliveryDate,
];
const product2Text = [
    PRODUCT_2.ProductTypeName,
    `${PRODUCT_2.CustomerName} (${PRODUCT_2.CustomerContactNumber})`,
    PRODUCT_2.DeliveryAddress,
    PRODUCT_2.EstimatedDeliveryDate,
];

it("Should render header, fetch and render product list", async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Products: [ PRODUCT_1 ] })
    });
  });

  render(<ProductList />);

  const headerEl = screen.getByText(/Product Deliveries/i);
  expect(headerEl).toBeInTheDocument();

  expect(fetchMock).toBeCalledWith("/product");

  const rows = await screen.findAllByRole("row");
  expect(rows.length).toEqual(2);

  const row1 = getAllByRole(rows[0], "columnheader");
  expectCellsToMatch(row1, headerText);

  const row2 = getAllByRole(rows[1], "cell");
  expectCellsToMatch(row2, productText);
});

it("Should render multiple products", async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Products: [ PRODUCT_1, PRODUCT_2 ] })
    });
  });

  render(<ProductList />);

  const rows = await screen.findAllByRole("row");
  expect(rows.length).toEqual(3);

  const row2 = getAllByRole(rows[1], "cell");
  expectCellsToMatch(row2, productText);
  const row3 = getAllByRole(rows[2], "cell");
  expectCellsToMatch(row3, product2Text);
});

it("Should render message if there are no products", async () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Products: [] })
    });
  });

  render(<ProductList />);

  const rows = await screen.findAllByRole("row");
  expect(rows.length).toEqual(2);

  const cells = getAllByRole(rows[1], "cell");
  expect(cells.length).toEqual(1);
});

function expectCellsToMatch(cells, contents) {
  contents.forEach((x, i) => expect(cells[i].innerHTML).toEqual(x));
}
