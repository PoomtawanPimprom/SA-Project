package entity

import (
	"time"

	"gorm.io/gorm"
)

type PaymentCoin struct {
	gorm.Model
	Datetime	time.Time

	PackageID	*uint
	Package 	Package 	`gorm:"foreignKey:PackageID"`

	MemberID	*uint
	Member		Member 		`gorm:"foreignKey:MemberID"`

}