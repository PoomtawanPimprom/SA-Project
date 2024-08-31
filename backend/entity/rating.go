package entity

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	// MemberID  uint
	// CartoonID uint
	MemberID  *uint
	CartoonID *uint
	Cartoon		Cartoon		`gorm:"foreignKey:CartoonID"`
}