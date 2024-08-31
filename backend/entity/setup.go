package entity

import (
	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("ProjectSA.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		&Member{},
		&Categories{},
		&Cartoon{},
		&Episodes{},
		&Package{},
		&PaymentCoin{},
		&PaymentEpisode{},
		&History{},
		&Rating{},
		&Comment{},
		&Follow{},
	)

	db = database

	
}
