package entity

import "gorm.io/gorm"

type Categories struct {
	gorm.Model
	Type 	string


	Cartoons	[]Cartoon	`gorm:"foreignKey:CategoriesID"`
}