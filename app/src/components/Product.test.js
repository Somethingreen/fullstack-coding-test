import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';
import { PRODUCT_1 } from '../test/data';

it("Should render component with data and button disabled", () => {

  render(<Product product={PRODUCT_1} />);

  const tableCells = screen.getAllByRole("cell");
  expect(tableCells.length).toEqual(6);
  expect(tableCells[0].innerHTML).toEqual(PRODUCT_1.ProductTypeName);
  expect(tableCells[1].innerHTML).toEqual(`${PRODUCT_1.CustomerName} (${PRODUCT_1.CustomerContactNumber})`);
  expect(tableCells[2].innerHTML).toEqual(PRODUCT_1.DeliveryAddress);
  expect(tableCells[3].innerHTML).toEqual(PRODUCT_1.EstimatedDeliveryDate);

  const selectEl = screen.getByRole("combobox");
  expect(selectEl).toBeInTheDocument();
  expect(selectEl.value).toEqual(PRODUCT_1.DeliveryStatus);

  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
  expect(buttonEl).toBeDisabled();
});

it("Should update select and enable button after status change", () => {
  render(<Product product={PRODUCT_1} />);

  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();

  const selectEl = screen.getByRole("combobox");

  fireEvent.change(selectEl, { target: { value: "SHIPPED" } });

  expect(selectEl.value).toEqual("SHIPPED");

  expect(buttonEl).not.toBeDisabled();
});

it("Should post update on button click", () => {
  const updatedProduct = Object.assign({}, PRODUCT_1, { DeliveryStatus: "SHIPPED" });

  const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Product: updatedProduct })
    });
  });

  render(<Product product={PRODUCT_1} />);


  const buttonEl = screen.getByRole("button");
  const selectEl = screen.getByRole("combobox");

  fireEvent.change(selectEl, { target: { value: "SHIPPED" } });
  fireEvent.click(buttonEl);

  expect(fetchMock).toHaveBeenCalledWith("/product/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ DeliveryStatus: 'SHIPPED' })
  });
  expect(buttonEl).toBeDisabled();
});
