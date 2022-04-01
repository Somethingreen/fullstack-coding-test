package server

type Product struct {
	Id                    int    `db:"id" json:"id"`
	ProductTypeId         int    `db:"product_type_id"`
	ProductTypeName       string `db:"product_type_name"`
	CustomerId            int    `db:"customer_id"`
	CustomerName          string `db:"customer_name"`
	CustomerContactNumber string `db:"customer_contact_number"`
	DeliveryStatus        string `db:"delivery_status"`
	DeliveryAddress       string `db:"delivery_address"`
	EstimatedDeliveryDate string `db:"estimated_delivery_date"`
}

type GetProductsResponse struct {
	Products []Product
}

type UpdateProductRequest struct {
	DeliveryStatus string
}

type UpdateProductResponse struct {
	Product Product
}
