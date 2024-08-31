package entity

import "gorm.io/gorm"

type Package struct {
	gorm.Model
	Price	int 
	Coin	int

	PaymentCoin		[]PaymentCoin	`gorm:"foreignKey:PackageID"`
}