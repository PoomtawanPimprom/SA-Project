package entity

import (
	"gorm.io/gorm"
)

type History struct {
	gorm.Model


	CartoonID	*uint
	Cartoon		Cartoon		`gorm:"foreignKey:CartoonID"`

	MemberID	*uint
	Member	Member `gorm:"foreignKey:MemberID"`

}