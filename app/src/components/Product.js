import React, { useState } from 'react';
import DeliveryStatus from './DeliveryStatus.js';
import { updateProductDeliveryStatus } from '../services/product.js';

export default function Product(props) {

  let [ product, setProduct ] = useState(props.product);
  let [ dirty, setDirty ] = useState(false);

  function handleDeliveryStatusChange(x) {
    setDirty(true);
    setProduct({ ...product, DeliveryStatus: x });
  }

  function handleClick() {
    updateProductDeliveryStatus(product)
      .then(setProduct)
      .then(setDirty(false));
  }

  return (
    <tr>
      <td>{product.ProductTypeName}</td>
      <td>{product.CustomerName} ({product.CustomerContactNumber})</td>
      <td>{product.DeliveryAddress}</td>
      <td>{product.EstimatedDeliveryDate}</td>
      <td><DeliveryStatus value={product.DeliveryStatus} onChange={handleDeliveryStatusChange} /></td>
      <td><button type="button" onClick={handleClick} disabled={!dirty}>save</button></td>
    </tr>
  );
}
