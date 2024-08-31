package controller

import (
	"net/http"
	"time"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func CreateSeries(c *gin.Context) {
	var cartoon entity.Cartoon
	var member entity.Member
	var categories entity.Categories
	var cartoons []entity.Cartoon

	categoriesID := c.Param("categoriesID")
	idMember := c.Param("ID")


	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", idMember).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Raw("SELECT * FROM categories WHERE id = ?", categoriesID).Scan(&categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&cartoon); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	 series := entity.Cartoon{
		MemberID: 				&member.ID,
		CategoriesID: 			&categories.ID,
		Title: 					cartoon.Title,
		Summary: 				cartoon.Summary,
		Square_Thumbnail: 		cartoon.Square_Thumbnail,
		Horizontal_Thumbnail:	cartoon.Horizontal_Thumbnail,
		Datetime: 				time.Now(),	

		
	 }
	if err := entity.DB().Create(&series).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Find(&cartoons).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cartoons})
}


func GetCartoon(c *gin.Context) {
	var cartoon []entity.Cartoon
	idMember := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM cartoons WHERE member_id=?",idMember).Find(&cartoon).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":cartoon})
}

func GetNameCartoon(c *gin.Context){
	var cartoon entity.Cartoon
	idMember := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM cartoons WHERE member_id=?",idMember).Find(&cartoon).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":cartoon})
}

func GetCartoonByID(c *gin.Context) {
	var cartoon entity.Cartoon
	idCartoon := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM cartoons WHERE id = ?", idCartoon).Scan(&cartoon).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cartoon})

}