package controller

import (
	"net/http"

	
	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func CreateEpisodes(c *gin.Context) {
	var episodes entity.Episodes
	var cartoon entity.Cartoon

	idCartoon := c.Param("ID")

	if err := entity.DB().Raw("SELECT * FROM episodes WHERE id = ?", idCartoon).Scan(&cartoon).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&episodes); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	Chapter := entity.Episodes{
		CartoonID:  &cartoon.ID,
		Title:      episodes.Title,
		Pictures:   episodes.Pictures,
		Epnumber:  	episodes.Epnumber,
		Thumbnail:  episodes.Thumbnail,
		Price:      episodes.Price,
	}

	if err := entity.DB().Create(&Chapter).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Chapter})
}

func GetEpisodeByID(c *gin.Context) {
	var episodes []entity.Episodes
	idCartoon := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM episodes WHERE cartoon_id = ?", idCartoon).Scan(&episodes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": episodes})

}

func GetChapterByID(c *gin.Context) {
	var episodes []entity.Episodes
	idEpisodes := c.Param("ID")
	if err := entity.DB().Raw("SELECT * FROM episodes WHERE id = ?", idEpisodes).Scan(&episodes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": episodes})

}