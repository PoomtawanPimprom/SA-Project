package controller

import (
	"net/http"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

func CreateCategories(c *gin.Context) {
	var categories entity.Categories

	if err := c.ShouldBindJSON(&categories); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&categories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func GetCategories(c *gin.Context) {
	var categories []entity.Categories
	if err := entity.DB().Raw("SELECT * FROM categories").Find(&categories).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":categories})
}