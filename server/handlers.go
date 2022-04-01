package server

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (e *Env) GetProducts(c *gin.Context) {
	products := []Product{}

	err := e.DB.Select(&products, SELECT_QUERY)
	if err != nil {
		log.Fatal(err.Error())
	}

	resp := GetProductsResponse{products}
	c.JSON(http.StatusOK, resp)
}

func (e *Env) UpdateProduct(c *gin.Context) {
	id := c.Param("id")

	var req UpdateProductRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !isDeliveryStatus(req.DeliveryStatus) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Delivery Status"})
		return
	}

	var product Product

	err := e.DB.Get(&product, FIND_QUERY, id)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Not Found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	product.DeliveryStatus = req.DeliveryStatus

	_, err = e.DB.Exec(UPDATE_QUERY, product.DeliveryStatus, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, UpdateProductResponse{product})
}

func isDeliveryStatus(x string) bool {
	var statuses = map[string]bool{
		"PENDING":   true,
		"ORDERED":   true,
		"SHIPPED":   true,
		"CANCELLED": true,
	}
	return statuses[x]
}
