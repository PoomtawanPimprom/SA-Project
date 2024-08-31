package controller

import (
	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreatePaymentEpisodes(c *gin.Context) {
	var paymentEpisode entity.PaymentEpisode
	var member entity.Follow
	var episodes entity.Episodes
	if err := c.ShouldBindJSON(&paymentEpisode); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id=?", episodes.ID).Find(&episodes); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cartoon not found"})
		return
	}
	if tx := entity.DB().Where("id=?", member.ID).Find(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	PayEp := entity.PaymentEpisode{
		
		MemberID:   &member.ID,
		EpisodesID: &episodes.ID,
	
		
	}
	if err := entity.DB().Create(&PayEp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": PayEp})
}

// GET bookshelf/paymentEpisodes
func ListPaymentEpisode(c *gin.Context) {
	var follow []entity.Follow
	if err := entity.DB().Preload("Member").Preload("Cartoon").Raw("SELECT * FROM follows").Find(&follow).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": follow})
}

// GET bookshelf/paymentEpisodes/:id
func GetEpisodePaymentEpisodeByID(c *gin.Context) {
	var episodes[]entity.Episodes
	idMember := c.Param("ID")
	if err := entity.DB().Preload("Cartoon").Preload("Episodes").Raw("SELECT * FROM episodes WHERE id IN (SELECT episodes_id FROM payment_episodes WHERE member_id = ?)", idMember).Find(&episodes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": episodes})
}
//GET
func GetCartoonPaymentEpisodesByID(c *gin.Context){
	var episodes []entity.Episodes
	var paymentEp []entity.PaymentEpisode
	idMember := c.Param("ID")
	
	if err := entity.DB().Raw("SELECT * FROM payment_episodes WHERE member_id = ?", idMember).Scan(&paymentEp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	for _, episode := range paymentEp {
		var singleEpisode entity.Episodes
		if err := entity.DB().Raw("SELECT * FROM episodes WHERE id = ?", episode.EpisodesID).Scan(&singleEpisode).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		episodes = append(episodes, singleEpisode)
	}
	c.JSON(http.StatusOK, gin.H{"data": episodes})
}
