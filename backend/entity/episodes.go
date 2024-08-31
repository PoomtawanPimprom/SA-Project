package entity

import (
"gorm.io/gorm"
)

type Episodes struct {
	gorm.Model
	Title		string		`gorm:"uniqueIndex"`
	Pictures	string		`gorm:"not null"`
	Thumbnail  	string
	Epnumber	int	 		
	Price		int



	PaymentEpisodes	[]PaymentEpisode `gorm:"foreignKey:EpisodesID"`
	Comments		[]Comment	`gorm:"foreignKey:EpisodesID"`


	CartoonID	*uint
	Cartoon		Cartoon		`gorm:"foreignKey:CartoonID"`
}