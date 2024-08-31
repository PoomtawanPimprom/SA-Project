package controller

import (
	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)
//GET bookshelf/history/:memberID/:cartoonID
func CreateHistory(c *gin.Context) {
	var member entity.Member
	var cartoon entity.Cartoon
	idMember := c.Param("memberID")
	idCartoon := c.Param("cartoonID")

	if tx := entity.DB().Where("id=?", idCartoon).Find(&cartoon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cartoon not found"})
		return
	}
	if tx := entity.DB().Where("id=?", idMember).Find(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	
	his := entity.History{
		CartoonID:  &cartoon.ID,
		MemberID:   &member.ID,

	}
	if err := entity.DB().Create(&his).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": his})
}


//GET bookshelf/history/:memberID
func GetCartoonHistoryByID(c *gin.Context) {
	var history []entity.History
	var cartoons []entity.Cartoon
	memberID := c.Param("memberID")
	if err := entity.DB().Raw("SELECT * FROM histories WHERE member_id = ? ORDER BY created_at DESC LIMIT 1", memberID).Scan(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, cartoon := range history {
		var singleCartoon entity.Cartoon
		if err := entity.DB().Raw("SELECT * FROM cartoons WHERE id = ?", cartoon.CartoonID).Scan(&singleCartoon).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		cartoons = append(cartoons, singleCartoon)
	}
	c.JSON(http.StatusOK, gin.H{"data": cartoons})
}