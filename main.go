package main

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/somethingreen/fullstack-coding-test/server"
)

func main() {
	db, err := sqlx.Connect("mysql", "dbuser:dbpwd@/xendit")

	if err != nil {
		log.Fatal(err.Error())
	}

	defer db.Close()

	server.Start(":8080", db)
}
