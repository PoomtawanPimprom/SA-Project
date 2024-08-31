package entity

import "gorm.io/gorm"

type Member struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string
	Email    string `gorm:"uniqueIndex"`
	Coins    int

	PaymentCoins    []PaymentCoin    `gorm:"foreignKey:MemberID"`
	PaymentEpisodes []PaymentEpisode `gorm:"foreignKey:MemberID"`
	Comments        []Comment        `gorm:"foreignKey:MemberID"`
	Historys        []History        `gorm:"foreignKey:MemberID"`
	Ratings         []Rating         `gorm:"foreignKey:MemberID"`
	Cartoons        []Cartoon        `gorm:"foreignKey:MemberID"`
	FollowedCartoon []Follow         `gorm:"foreignKey:MemberID"`
}
