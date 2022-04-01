package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/somethingreen/fullstack-coding-test/server"
	"github.com/stretchr/testify/suite"
)

type MainSuite struct {
	suite.Suite
	db *sqlx.DB
}

func (s *MainSuite) SetupSuite() {
	gin.SetMode(gin.ReleaseMode)
}

func (s *MainSuite) SetupTest() {
	s.db.MustExec("DELETE FROM product")
	s.db.MustExec("INSERT INTO `product` (`id`, `product_type_id`, `customer_id`, `delivery_status`, `delivery_address`, `estimated_delivery_date`) VALUES (1, 1, 1, 'PENDING', 'some address', '2022-03-26')")
	s.db.MustExec("INSERT INTO `product` (`id`, `product_type_id`, `customer_id`, `delivery_status`, `delivery_address`, `estimated_delivery_date`) VALUES (2, 3, 2, 'ORDERED', 'another address', '2022-03-28')")
}

func (s *MainSuite) TestGetProducts() {
	r := gin.Default()
	env := &server.Env{DB: s.db}
	r.GET(server.PATH_GET_PRODUCTS, env.GetProducts)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", server.PATH_GET_PRODUCTS, nil)
	r.ServeHTTP(w, req)

	s.Equal(http.StatusOK, w.Code)

	var resp server.GetProductsResponse
	err := json.NewDecoder(w.Body).Decode(&resp)
	s.NoError(err)
	s.Equal(2, len(resp.Products))
	s.Equal("PENDING", resp.Products[0].DeliveryStatus)
	s.Equal("ORDERED", resp.Products[1].DeliveryStatus)
}

func (s *MainSuite) TestUpdateProduct() {
	r := gin.Default()
	env := &server.Env{DB: s.db}
	r.GET(server.PATH_GET_PRODUCTS, env.GetProducts)
	r.POST(server.PATH_UPDATE_PRODUCT, env.UpdateProduct)

	// update product
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/product/1", strings.NewReader(`{"DeliveryStatus":"SHIPPED"}`))
	req.Header.Add("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	s.Equal(http.StatusOK, w.Code)

	var resp server.UpdateProductResponse
	err := json.NewDecoder(w.Body).Decode(&resp)
	s.NoError(err)
	s.Equal("SHIPPED", resp.Product.DeliveryStatus)

	// check that list is updated
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", server.PATH_GET_PRODUCTS, nil)
	r.ServeHTTP(w, req)

	s.Equal(http.StatusOK, w.Code)

	var resp2 server.GetProductsResponse
	err = json.NewDecoder(w.Body).Decode(&resp2)
	s.NoError(err)
	s.Equal(2, len(resp2.Products))
	s.Equal("SHIPPED", resp2.Products[0].DeliveryStatus)

}

func (s *MainSuite) TestUpdateMissingProduct() {
	r := gin.Default()
	env := &server.Env{DB: s.db}
	r.POST(server.PATH_UPDATE_PRODUCT, env.UpdateProduct)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/product/3", strings.NewReader(`{"DeliveryStatus":"SHIPPED"}`))
	req.Header.Add("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	s.Equal(http.StatusNotFound, w.Code)
}

func (s *MainSuite) TestUpdateProductWithIncorrectDeliveryStatus() {
	r := gin.Default()
	env := &server.Env{DB: s.db}
	r.POST(server.PATH_UPDATE_PRODUCT, env.UpdateProduct)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/product/1", strings.NewReader(`{"DeliveryStatus":"FOO"}`))
	req.Header.Add("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	s.Equal(http.StatusBadRequest, w.Code)
}

func TestMainSuite(t *testing.T) {
	db := sqlx.MustConnect("mysql", "dbuser:dbpwd@/xendit")
	defer db.Close()
	suite.Run(t, &MainSuite{db: db})

}
