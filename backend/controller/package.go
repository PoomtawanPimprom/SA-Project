package controller

import (
	"net/http"
	"time"

	"github.com/Chinnapatz/ProjectSA/entity"
	"github.com/gin-gonic/gin"
)

//GET /package
func PackageCoin(c *gin.Context) {
	var packageC []entity.Package
	if err := entity.DB().Raw("SELECT * FROM packages").Find(&packageC).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":packageC})
}

// GET /package/:id/:id
func UpdateCoin(c *gin.Context){
	var pkCoin entity.Package
	var member entity.Member
	
	idMember := c.Param("ID")
  idPackage := c.Param("ID_package")


	// ค้นหา user ด้วย id
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", idMember).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw("SELECT * FROM packages WHERE id = ?", idPackage).Scan(&pkCoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	 // Add Coins from the Package to the existing Coins of the Member
	 member.Coins += pkCoin.Coin

	 // Update the Member with the new Coins value
	 if err := entity.DB().Model(&member).Update("Coins", member.Coins).Error; err != nil {
			 c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			 return
	 }



	 payment := entity.PaymentCoin{
		MemberID:   &member.ID,
		PackageID:  &pkCoin.ID,
		Datetime: time.Now(),
}

if err := entity.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
}

c.JSON(http.StatusOK, gin.H{"data":payment})


}