package entity

import (
	"gorm.io/gorm"
	"time"
)

type Cartoon struct {
	gorm.Model
	Title              string `gorm:"uniqueIndex"`
	Summary            string
	Square_Thumbnail   string
	Horizontal_Thumbnail string
	Datetime           time.Time
	

	Followers []*Follow  `gorm:"many2many:follows;"`
	Episodess []Episodes `gorm:"foreignKey:CartoonID"`
	Historys  []History  `gorm:"foreignKey:CartoonID"`
	Ratings   []Rating   `gorm:"foreignKey:CartoonID"`

	CategoriesID *uint
	Categories   Categories `gorm:"foreignKey:CategoriesID"`

	MemberID *uint
	Member   Member   `gorm:"foreignKey:MemberID"`
	Follows  []Follow `gorm:"many2many:follows;"`
}
