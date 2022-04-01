import React, { useState, useEffect } from 'react';
import Product from './Product.js';
import { fetchProducts } from "../services/product.js";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(xs => setProducts(xs))
      .finally(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      <h3>Product deliveries</h3>
      {loading
      ? <div>Loading...</div>
      : (
        <table>
          <thead>
            <tr>
              <th>Product Type</th>
              <th>Customer</th>
              <th>Delivery Address</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0
              ? products.map(x =>
                <Product key={x.id} product={x}></Product>
              )
              : (
                <tr>
                  <td colSpan="6">There are no product deliveries</td>
                </tr>
              )
            }
          </tbody>
        </table>
      )
      }
    </React.Fragment>
  );
};
