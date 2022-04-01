import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryStatus from './DeliveryStatus';

it("Should render delivery status dropdown with correct option selected", () => {

  const value = "ORDERED";
  render(<DeliveryStatus value={value} />);

  const selectEl = screen.getByRole("combobox");
  expect(selectEl).toBeInTheDocument();
  expect(selectEl.value).toEqual(value);
});

it("Should call onChange callback when changed", () => {

  const value = "ORDERED";
  const onChange = jest.fn();
  render(<DeliveryStatus value={value} onChange={onChange} />);

  const selectEl = screen.getByRole("combobox");
  expect(selectEl).toBeInTheDocument();

  fireEvent.change(selectEl, { target: { value: "SHIPPED" } });

  expect(onChange).toBeCalled();
});
