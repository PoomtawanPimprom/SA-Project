package controller

import (
	"net/http"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)



func GetCartoonToDashboard(c *gin.Context) {
	var cartoon []entity.Cartoon
	if err := entity.DB().Raw("SELECT * FROM cartoons").Find(&cartoon).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":cartoon})
}