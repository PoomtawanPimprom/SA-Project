package entity
import (
	
	"gorm.io/gorm"
)
type PaymentEpisode struct {
	gorm.Model
	EpisodesID	*uint
	Episodes	Episodes `gorm:"foreignKey:EpisodesID"`

	MemberID	*uint
	Member	Member `gorm:"foreignKey:MemberID"`
}