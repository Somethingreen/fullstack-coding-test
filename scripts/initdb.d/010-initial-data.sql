INSERT INTO `customer` (`id`, `name`, `contact_number`) VALUES (1, 'John Doe', '+385551234567');
INSERT INTO `customer` (`id`, `name`, `contact_number`) VALUES (2, 'Jane Smith', '+385557654321');

INSERT INTO `product_type` (`id`, `name`) VALUES (1, 'Product A');
INSERT INTO `product_type` (`id`, `name`) VALUES (2, 'Product B');
INSERT INTO `product_type` (`id`, `name`) VALUES (3, 'Product C');

INSERT INTO `product` (`id`, `product_type_id`, `customer_id`, `delivery_status`, `delivery_address`, `estimated_delivery_date`) VALUES (1, 1, 1, 'SHIPPED', 'some address', '2022-03-26');
INSERT INTO `product` (`id`, `product_type_id`, `customer_id`, `delivery_status`, `delivery_address`, `estimated_delivery_date`) VALUES (2, 3, 2, 'ORDERED', 'another address', '2022-03-28');
