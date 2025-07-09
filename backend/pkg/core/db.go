package core

import "gorm.io/gorm"

var db *gorm.DB

func SetDB(conn *gorm.DB) {
	db = conn
}

func GetDB() *gorm.DB {
	return db
}
