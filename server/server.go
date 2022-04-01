package server

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Env struct {
	DB *sqlx.DB
}

func Start(port string, db *sqlx.DB) {

	env := &Env{db}

	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./app/build", false)))

	router.GET(PATH_GET_PRODUCTS, env.GetProducts)
	router.POST(PATH_UPDATE_PRODUCT, env.UpdateProduct)

	router.Run(port)
}
