package server

const (
	SELECT_QUERY = `
SELECT
product.*,
product_type.name AS product_type_name,
customer.name AS customer_name,
customer.contact_number AS customer_contact_number
FROM product
INNER JOIN product_type ON product_type.id = product.product_type_id
INNER JOIN customer ON customer.id = product.customer_id
`

	FIND_QUERY = `
SELECT
product.*,
product_type.name AS product_type_name,
customer.name AS customer_name,
customer.contact_number AS customer_contact_number
FROM product
INNER JOIN product_type ON product_type.id = product.product_type_id
INNER JOIN customer ON customer.id = product.customer_id
WHERE product.id = ?
`

	UPDATE_QUERY = `UPDATE product SET delivery_status = ? WHERE id = ?`
)
