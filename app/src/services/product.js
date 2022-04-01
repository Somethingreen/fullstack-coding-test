export async function fetchProducts() {
  const response = await fetch('/product');
  return response.ok ? (await response.json()).Products : [];
}

export async function updateProductDeliveryStatus(product) {
  const response = await fetch(`/product/${product.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ DeliveryStatus: product.DeliveryStatus })
  });
  return response.ok ? (await response.json()).Product : product;
}
