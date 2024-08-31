package controller

import (
	"net/http"

	"time"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)


func CreateComment(c *gin.Context) {
	var message entity.Comment
	var member entity.Member
	var episode entity.Episodes
	
	IDep := c.Param("IDep")
	idMember := c.Param("ID")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", idMember).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT * FROM episodes WHERE id = ?", IDep).Scan(&episode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	 commenttext := entity.Comment{
		MemberID: 				&member.ID,
		Message:				message.Message,
		Datetime: 				time.Now(),
		EpisodesID: 			&episode.ID,				
		
	 }
	if err := entity.DB().Create(&commenttext).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": message})
}

func GetComment(c *gin.Context) {
	var message []entity.Comment
	idEpisodes := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM comments WHERE episodes_id = ?", idEpisodes).Find(&message).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":message})
}

func GetUsernameByMemberID(c *gin.Context) {
    var username string
    memberID := c.Param("ID")

    // สร้างคำสั่ง SQL สำหรับ Subquery เพื่อเลือก username จากตาราง members โดยอ้างอิง member_id จากตาราง comments
    subquerySQL := "SELECT username FROM members WHERE id = ?"

    // ใช้คำสั่ง SQL และ memberID เพื่อเลือก username
    if err := entity.DB().Raw("SELECT ("+subquerySQL+") as username FROM comments WHERE member_id = ?", memberID).Scan(&username).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": username})
}